import { Badge, IconButton, Avatar } from '@material-ui/core'
import { useField } from 'formik'
import React, { useState, useCallback, useEffect } from 'react'
import { useStylesEditMode } from '../style'
import { apiConfig } from '../../../../configs/webAPIConfig'
import { useConfirmationDialog } from '../../../../controls/dialog/confirmationDialog'
import { useTranslation } from 'react-i18next'

const publicPath = process.env.NEXT_PUBLIC_WEB_URL

const uploadFileToTempFolder = async (file: File) => {
    const formData = new FormData()
    formData.append('files', file)
    const fetchUpload = await fetch(apiConfig.uploadFile.toTemp, {
        method: 'POST',
        body: formData,
    })
    const response = await fetchUpload.json()
    return response
}

const getBase64 = (originFileObj: File | Blob, callback: (base64: string | ArrayBuffer | null) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result))
    reader.readAsDataURL(originFileObj)
}

type HookUploadAvatarProps = { name: string }
const useUploadAvatar = ({ name }: HookUploadAvatarProps) => {
    const { t, i18n } = useTranslation()
    const { openDialogConfirmation } = useConfirmationDialog()
    const [field, meta, helpers] = useField(name)
    const [stateUpload, setStateUpload] = useState<{ loading: boolean; imageBase64?: string | null }>({
        loading: false,
        imageBase64: field?.value?.url ?? null,
    })

    useEffect(() => {
        setStateUpload((prevState) => ({
            ...prevState,
            imageBase64: field?.value?.url ?? null,
        }))
    }, [field?.value?.url])

    const onChangeUpload = useCallback(
        async (event: React.ChangeEvent<HTMLInputElement>) => {
            const file = event?.target?.files?.[0]
            if (file) {
                const isJpgOrPng = file?.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
                const isLt5M = file?.size / 1024 < 5000

                if (!isJpgOrPng) {
                    openDialogConfirmation({
                        title: t('PROFILE.ERROR_UPLOAD_FILE_TO_TEMP_MAIN_TEXT'),
                        message: t('PROFILE.ERROR_UPLOAD_FILE_TO_TEMP_TYPE_MINOR_TEXT'),
                        showButtonCancel: false,
                        okText: t('PROFILE.OK_TEXT'),
                    })
                    return
                }
                if (!isLt5M) {
                    openDialogConfirmation({
                        title: t('PROFILE.ERROR_UPLOAD_FILE_TO_TEMP_MAIN_TEXT'),
                        message: t('PROFILE.ERROR_UPLOAD_FILE_TO_TEMP_SIZE_MINOR_TEXT'),
                        showButtonCancel: false,
                        okText: t('PROFILE.OK_TEXT'),
                    })

                    return
                }

                try {
                    const tokenFiles = await uploadFileToTempFolder(file)
                    helpers.setValue({
                        url: null,
                        tokenFile: tokenFiles[0],
                    })
                    getBase64(file, (imageBase64: string | ArrayBuffer | null) => {
                        if (typeof imageBase64 === 'string') {
                            setStateUpload({ loading: false, imageBase64 })
                            // onUploading?.(false)
                        }
                    })
                } catch (err) {
                    console.log('uploadFileToTempFolder', err)
                }
            }
        },
        [i18n.language],
    )

    return { onChangeUpload, stateUpload }
}

type UploadAvatarViewProps = {} & ReturnType<typeof useUploadAvatar>
const UploadAvatarView: React.FC<UploadAvatarViewProps> = ({ onChangeUpload, stateUpload }) => {
    const classes = useStylesEditMode()
    return (
        <>
            <input
                accept='image/*'
                id='icon-button-file'
                type='file'
                style={{ display: 'none' }}
                onChange={onChangeUpload}
            />
            <Badge
                overlap='circle'
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                badgeContent={
                    <label htmlFor='icon-button-file'>
                        <IconButton aria-label='upload picture' className={classes.uploadBadge} component='span'>
                            <img loading='lazy'
                                src={publicPath + '/images/profile/photo.svg'}
                                alt='upload'
                                className={classes.smallAvatar}
                            />
                        </IconButton>
                    </label>
                }
            >
                {stateUpload.imageBase64 ? (
                    <Avatar alt='Remy Sharp' src={stateUpload.imageBase64} className={classes.avatarImg} />
                ) : (
                        <Avatar
                            alt='Remy Sharp'
                            src={process.env.NEXT_PUBLIC_WEB_URL + '/images/profile/avatar.svg'}
                            className={classes.avatarImg}
                        />
                    )}
            </Badge>
        </>
    )
}

type UploadAvatarProps = { name: string }
const UploadAvatar: React.FC<UploadAvatarProps> = (props) => {
    const stateUpload = useUploadAvatar(props)
    return <UploadAvatarView {...stateUpload} />
}

export default UploadAvatar
