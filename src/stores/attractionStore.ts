import { observable, action } from 'mobx'

export type SearchParamsType = {
    attractionType: string
    province: string
    community: string
    keyword: string
}
class AttractionStore {
    @observable searchParams: SearchParamsType = {
        attractionType: '',
        province: '',
        community: '',
        keyword: '',
    }

    @action setSearchParams = (attractionType?: string) => {
        this.searchParams = {
            attractionType: attractionType || '',
            province: '',
            community: '',
            keyword: '',
        }
    }
}

export default AttractionStore
