import { AppActions } from "../actions"

export interface IUIState {
	sidePanel: {
		toggled: boolean,
		content: "PERSON_FORM" | null,
	}
}

export const defaultUiState = (): IUIState => {
	return {
		sidePanel: {
			toggled: false,
			content: null,
		},
	}
}

export const uiReducer = (state: IUIState, action: AppActions): IUIState => {
	console.log(action, state)
	switch (action.type) {
		case "ACTION_UI_TOGGLE_PERSON_CREATION_FORM":
			return {
				...state,
				sidePanel: {
					toggled: !state.sidePanel.toggled,
					content: !state.sidePanel.toggled ? "PERSON_FORM" : null,
				}
			}
	}
	return state
}