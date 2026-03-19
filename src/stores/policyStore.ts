
import { observable, action } from 'mobx'

class PolicyStore {
    @observable isShowPolicy: boolean = false

    @action
    showPolicy = () => {
        // console.log('show')
        this.isShowPolicy = true
        sessionStorage.setItem(process.env.NEXT_PUBLIC_ACCEPT_POLICY, 'false')
    }

    @action
    hidePolicy = () => {
        // console.log('hide')
        this.isShowPolicy = false
        sessionStorage.setItem(process.env.NEXT_PUBLIC_ACCEPT_POLICY, 'true')
    }
}



export default PolicyStore
