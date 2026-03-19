import { useContext, createContext } from 'react'
import { observable, action, runInAction } from 'mobx'

class SearchStore {
    @observable example: any = undefined
}

export default SearchStore
