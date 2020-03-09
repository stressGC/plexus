import { IAppState } from "../../../../store/appState"

export const addPersonGetAllContactsSelector = (state: IAppState) => state.network.data?.persons

export const getAddPersonFormMutualRelationIdSelector = (state: IAppState) => state.ui.sidePanel.content?.mutualRelationId
