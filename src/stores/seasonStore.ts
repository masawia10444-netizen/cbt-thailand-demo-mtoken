import { useContext, createContext } from 'react'
import { observable, action, runInAction } from 'mobx'

class SeasonStore {

    @observable example: any = undefined

    @observable mapImage: string = ''


    @action setMapImage = (imagePath: string) => {
        this.mapImage = imagePath
    }

}

export default SeasonStore