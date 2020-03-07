import { combineReducers, AnyAction } from "redux"
import { IAppState } from "../appState"

const initialSidePanelState = {
	toggled: false,
	content: null,
}

const sidePanel = (sidePanelState: IAppState["ui"]["sidePanel"] = initialSidePanelState, action: AnyAction) => {
	if (action.type === "UI_SIDE_PANEL_TOGGLE") {
		return {
			...sidePanelState,
			toggled: !sidePanelState.toggled,
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
