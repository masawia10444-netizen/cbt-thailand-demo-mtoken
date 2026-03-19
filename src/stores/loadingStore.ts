
import { observable, action } from 'mobx'

class LoadingStore {
    @observable isLoading: boolean = false

    @action
    setLoading = (isLoading: boolean) => {
        this.isLoading = isLoading
    }
}



export default LoadingStore
