interface IUISidePanelToggleAction {
	type: "UI_SIDE_PANEL_TOGGLE"
}

interface IUISidePanelLoadingAction {
	type: "UI_SIDE_PANEL_LOADING"
	payload: boolean
}

export interface IUIOpenAddPersomFormAction {
	type: "UI_OPEN_ADD_PERSON_FORM"
}

export type IUIActions = IUISidePanelToggleAction | IUISidePanelLoadingAction |IUIOpenAddPersomFormAction