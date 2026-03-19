import React, { FC } from 'react'
// import Loading from '../../controls/loading/loading'
import useAppLoading from './useAppLoading'
import { observer } from 'mobx-react-lite'
import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(() => import('../../controls/loading/loading'))

const AppLoading: FC = () => {
    const load = useAppLoading()
    return <DynamicComponentWithCustomLoading isOpen={load.infos.isLoading} />
}

export default observer(AppLoading)
