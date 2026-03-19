import { useEffect } from 'react'
import { useRouter } from 'next/router'

const BlankPage = () => {
    const router = useRouter()

    useEffect(() => {
        router.replace('/')
    }, [])

    return <></>
}
export default BlankPage
