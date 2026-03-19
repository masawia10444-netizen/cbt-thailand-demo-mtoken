import { useEffect } from 'react'
import Store from '../../stores/rootStore'
import { useRouter } from 'next/router'

type returnType = {
    infos: {
        isLoading: boolean
    }
    functions: {
        setShowLoading: Function
        setHideLoading: Function
    }
}
const UseLoading = (): returnType => {
    const router = useRouter()

    const { LoadingStore } = Store()

    useEffect(() => {
        const handleStart = () => LoadingStore.setLoading(true)
        const handleComplete = () => LoadingStore.setLoading(false)

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    }, [])

    return {
        infos: {
            isLoading: LoadingStore.isLoading,
        },
        functions: {
            setShowLoading: () => LoadingStore.setLoading(true),
            setHideLoading: () => LoadingStore.setLoading(false),
        },
    }
}

export default UseLoading
