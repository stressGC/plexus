import { IAppState } from "../../../../store/appState"

export const addPersonGetAllContactsSelector = (state: IAppState) => state.network.data?.persons
