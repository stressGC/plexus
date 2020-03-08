import { IActionCreator, IDispatch } from "../../../plexus"

export const toggleSidePanel: IActionCreator = () => (dispatch: IDispatch) => {
	dispatch({ type: "UI_SIDE_PANEL_TOGGLE" })
}
