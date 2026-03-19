import { useEffect, useState, useMemo } from 'react'
import Store from '../../../stores/rootStore'
import Router from 'next/router'
import { apiConfig } from '../../../configs/webAPIConfig'
import { fetchPostWithAuthorization } from '../../../utilities/request'
import { TInsertInterestResponse } from '../../../stores/userStore'

const useInterest = () => {
    const { UserStore, LookupStore, LayoutStore } = Store()

    const handleSubmit = async (values) => {
        let tmpInterests = []
        values.interests.forEach((item, index: number) => {
            if (item) {
                return tmpInterests.push(index + 1)
            }
        })
        let tmpInterestsString = tmpInterests.toString()

        const params = {
            userID: UserStore.userInfo.userID,
            listInterestMenuID: tmpInterestsString,
        }

        const res: TInsertInterestResponse = await fetchPostWithAuthorization({
            url: apiConfig.user.authentication.insertInterestMenu,
            data: params,
        })
        LayoutStore.setDisplayInterestDialog(false)
        Router.push('/profile')
    }

    const handleCancel = () => {
        LayoutStore.setDisplayInterestDialog(false)
        Router.push('/profile')
    }

    const filteredMenuList = () => {
        return LookupStore.menuList.filter((item) => item.menuID !== '7')
    }

    return {
        handleSubmit,
        handleCancel,
        interestList: filteredMenuList(),
    }
}
export default useInterest
