import { ResponseTripCommon } from './../../trip/apiTrip'
import { useEffect, useState, useMemo, useCallback } from 'react'
import Store from '../../../stores/rootStore'
import Router from 'next/router'
import { useConfirmationDialog } from '../../../controls/dialog/confirmationDialog'
import { deleteTrip } from '../../trip/apiTrip'
import { useTranslation } from 'react-i18next'
import { decrypt } from '../../../utilities/registerUltility'
import { apiConfig } from '../../../configs/webAPIConfig'
import { fetchPostWithAuthorization } from '../../../utilities/request'
import { TUpdateUserStatus } from '../../../stores/userStore'
import { isJsonString } from '../../../utilities/formatTextUtils'

export type UseProfileProps = {}
export type ProfileSubmitValuesType = {
    email: string
    firstName: string
    interests: {
        1: boolean
        2: boolean
        3: boolean
        4: boolean
        5: boolean
        6: boolean
    }
    lastName: string
    tel: string
    profileImage?: {
        url: string | null
        tokenFile: string | null
    }
}

const useProfile = ({}) => {
    const { t, i18n } = useTranslation()
    const { UserStore, LookupStore, LoadingStore, LayoutStore } = Store()
    const [editMode, setEditMode] = useState(false)
    const [interests, setInterests] = useState({})
    const [interested, setInterested] = useState([
        {
            th: '',
            en: '',
        },
    ])
    const [openDialog, setOpenDialog] = useState(false)
    const [formValue, setFormValue] = useState<ProfileSubmitValuesType>({
        email: '',
        firstName: '',
        interests: { 1: false, 2: false, 3: false, 4: false, 5: false, 6: false },
        lastName: '',
        tel: '',
        profileImage: {
            url: null,
            tokenFile: null,
        },
    })

    const { openDialogConfirmation } = useConfirmationDialog()

    const tripName = 'My Trip'

    const handleSubmit = async (values: ProfileSubmitValuesType) => {
        setOpenDialog(true)
        setFormValue(values)
    }

    const handleClickEdit = (isEditMode: boolean) => {
        setEditMode(isEditMode)
    }

    const genInterests = () => {
        let interestsValue = {}
        let interested = []

        LookupStore.menuList.forEach((menuListItem, i) => {
            let count = 0

            UserStore.userInfo.listInterestMenuID?.forEach((userMenuItem, j) => {
                if (Number(menuListItem.menuID) === Number(userMenuItem.menuID)) {
                    Object.assign(interestsValue, {
                        [menuListItem.menuID]: true,
                    })

                    interested.push({
                        th: menuListItem.menuNameTH,
                        en: menuListItem.menuNameEN,
                    })

                    count++
                }
            })

            count === 0 &&
                Object.assign(interestsValue, {
                    [menuListItem.menuID]: false,
                })
        })

        setInterested(interested)
        setInterests(interestsValue)
    }

    const handleSubmitDialog = async () => {
        LoadingStore.setLoading(true)

        let tmpInterests: string[] | string = []

        for (const key in formValue.interests) {
            if (Object.prototype.hasOwnProperty.call(formValue.interests, key)) {
                formValue.interests[key] && tmpInterests.push(key)
            }
        }
        tmpInterests = tmpInterests.toString()
        try {
            const res = await UserStore.updateProfile({
                firstName: formValue.firstName,
                lastName: formValue.lastName,
                tel: formValue.tel,
                profileImage: formValue?.profileImage?.tokenFile ?? null,
                listInterestMenuID: tmpInterests,
            })

            if (res.statusCode === 1) {
                await UserStore.getProfile({
                    email: UserStore.userInfo.email,
                    userID: UserStore.userInfo.userID,
                })
                genInterests()
                setEditMode(false)
            }
        } catch (err) {
            //console.log('Update profile fail.' ,err)
        }

        LoadingStore.setLoading(false)
        setOpenDialog(false)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const onRemoveTrip = ({ tripID, tripName }: { tripID: number; tripName: string }) => {
        openDialogConfirmation({
            title: t('TRIP.CONFIRM_DELETE_TRIP_MAIN_TEXT'),
            message: t('TRIP.CONFIRM_DELETE_TRIP_MINOR_TEXT').replace('[{tripName}]', tripName),
            okText: t('TRIP.BTN_DELETE_TEXT'),
            cancelText: t('TRIP.BTN_CANCEL_TEXT'),
            actionCallbackOk: async () => {
                try {
                    LoadingStore.setLoading(true)

                    const response: ResponseTripCommon = await deleteTrip(tripID)

                    LoadingStore.setLoading(false)
                    if (response.statusCode === 1) {
                        await UserStore.getProfile({
                            email: UserStore.userInfo.email,
                            userID: UserStore.userInfo.userID,
                        })

                        openDialogConfirmation({
                            title: t('TRIP.SUCCESS_REMOVE_TRIP_MAIN_TEXT'),
                            message: t('TRIP.SUCCESS_REMOVE_TRIP_MINOR_TEXT').replace('[{tripName}]', tripName),
                            showButtonCancel: false,
                            okText: t('TRIP.BTN_OK_TEXT'),
                        })
                    } else {
                        openDialogConfirmation({
                            title: t('TRIP.ERROR_SYSTEM_MAIN_TEXT'),
                            message: t('TRIP.ERROR_SYSTEM_MINOR_TEXT'),
                            showButtonCancel: false,
                            okText: t('TRIP.BTN_OK_TEXT'),
                        })
                    }
                } catch (error) {
                    //console.log('onRemoveTrip -->>> ', error)

                    openDialogConfirmation({
                        title: t('TRIP.ERROR_SYSTEM_MAIN_TEXT'),
                        message: t('TRIP.ERROR_SYSTEM_MINOR_TEXT'),
                        showButtonCancel: false,
                        okText: t('TRIP.BTN_OK_TEXT'),
                    })
                }
            },
        })
    }

    const handleCloseAccount = () => {
        openDialogConfirmation({
            title: t('PROFILE.CONFIRM_CLOSE_ACCOUNT_MAIN_TEXT'),
            message: t('PROFILE.CONFIRM_CLOSE_ACCOUNT_MINOR_TEXT'),
            okText: t('PROFILE.BTN_CONFIRM_TEXT'),
            cancelText: t('PROFILE.BTN_CANCEL_TEXT'),
            actionCallbackOk: async () => {
                try {
                    const param = {
                        userID: UserStore.userInfo.userID,
                    }
                    const res: TUpdateUserStatus = await fetchPostWithAuthorization({
                        url: apiConfig.user.authentication.updateUserStatus,
                        data: param,
                    })
                    if (res && res.statusCode === 1) {
                        await UserStore.logout()
                        await LayoutStore.clearStatePolicyDialog()
                        Router.push('/')
                    }
                } catch (err) {
                    console.log('Error update user status: ', err)
                }
            },
            // handleConfirmDeleteAccount()
        })
    }

    const handleConfirmDeleteAccount = () => {
        return //console.log('ยิง service ลบ account')
    }

    const checkUserLogin = async () => {
        let localData = await localStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        let sessionData = await sessionStorage.getItem(process.env.NEXT_PUBLIC_LOCAL_STORAGE_USER_INFO)
        let userInfo = null

        if (localData && isJsonString(decrypt(localData))) {
            userInfo = await JSON.parse(decrypt(localData))
        } else if (sessionData && isJsonString(decrypt(sessionData))) {
            userInfo = await JSON.parse(decrypt(sessionData))
        }

        return userInfo !== null
    }

    useEffect(() => {
        LoadingStore.setLoading(true)
        if (UserStore.userInfo.email) {
            ;(async () => {
                await UserStore.getProfile({
                    email: UserStore.userInfo.email,
                    userID: UserStore.userInfo.userID,
                })
            })()
        }
        LoadingStore.setLoading(false)
    }, [UserStore.userInfo.email])

    useEffect(() => {
        genInterests()
    }, [LookupStore.menuList, UserStore.userInfo])

    const filteredMenuList = () => {
        return LookupStore.menuList.filter((item) => item.menuID !== '7')
    }

    return {
        onRemoveTrip,
        handleSubmit,
        handleClickEdit,
        editMode,
        tripName,
        interests,
        userInfo: UserStore.userInfo,
        openDialog,
        handleSubmitDialog,
        handleCloseDialog,
        handleCloseAccount,
        menuList: filteredMenuList(),
        interested,
    }
}
export default useProfile

export type ReturnTypeUseProfile = ReturnType<typeof useProfile>
