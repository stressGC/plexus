import { combineReducers } from "redux"
import { IAppState } from "../appState"
import { IAllActions } from "../actions"

const initialSidePanelState: IAppState["ui"]["sidePanel"] = {
	toggled: false,
	isLoading: false,
	content: null,
}

const sidePanel = (sidePanelState: IAppState["ui"]["sidePanel"] = initialSidePanelState, action: IAllActions) => {
	if (action.type === "UI_SIDE_PANEL_TOGGLE") {
		return {
			...sidePanelState,
			toggled: !sidePanelState.toggled,
		}
	}
	if (action.type === "UI_SIDE_PANEL_LOADING") {
		return {
			...sidePanelState,
			isLoading: action.payload,
		}
	}
	if (action.type === "UI_OPEN_ADD_PERSON_FORM") {
		return {
			...sidePanelState,
			toggled: true,
			content: {
				type: "ADD_PERSON_FORM"
			}
		}
	}
	return sidePanelState
}

export default combineReducers({
	sidePanel,
})
