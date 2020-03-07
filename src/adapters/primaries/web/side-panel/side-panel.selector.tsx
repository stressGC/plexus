import { IAppState } from "../../../../store/appState"

export const getSidePanelToggleSelector = (state: IAppState) => state.ui.sidePanel.toggled

export const getSidePanelContentSelector = (state: IAppState) => state.ui.sidePanel.content
