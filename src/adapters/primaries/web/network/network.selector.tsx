import { IAppState } from "../../../../store/appState"

export const getNetworkSelector = (state: IAppState) => state.network
