import { IAppState } from "../../../../store/appState"

export const getSidePanelToggleSelector = (state: IAppState) => state.ui.sidePanel.toggled

export const getSidePanelIsLoadingSelector = (state: IAppState) => state.ui.sidePanel.isLoading

export const getSidePanelContentSelector = (state: IAppState) => state.ui.sidePanel.content
