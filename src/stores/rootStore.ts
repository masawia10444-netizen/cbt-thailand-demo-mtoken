import { useContext, createContext } from 'react'
import { configure } from 'mobx'
import { useStaticRendering } from 'mobx-react-lite'

import LoadingStore from './loadingStore'
import CommunityStore from './communityStore'
import LayoutStore from './layoutStore'
import HomeStore from './homeStore'
import UserStore from './userStore'
import TripStore from './tripStore'
import PolicyStore from './policyStore'
import SearchStore from './searchStore'
import LookupStore from './lookupStore'
import AttractionStore from './attractionStore'
import SeasonStore from './seasonStore'

const isServer = typeof window === 'undefined'
useStaticRendering(isServer)
configure({ enforceActions: 'observed' })

const store = {
    LayoutStore: new LayoutStore(),
    LoadingStore: new LoadingStore(),
    PolicyStore: new PolicyStore(),
    HomeStore: new HomeStore(),
    CommunityStore: new CommunityStore(),
    UserStore: new UserStore(),
    TripStore: new TripStore(),
    SearchStore: new SearchStore(),
    LookupStore: new LookupStore(),
    AttractionStore: new AttractionStore(),
    SeasonStore: new SeasonStore(),
}
const context = createContext(store)
const useRootStore = () => useContext(context)

export default useRootStore
