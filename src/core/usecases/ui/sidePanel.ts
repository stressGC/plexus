import { ThunkAction } from "redux-thunk"
import { IAppState } from "../../../store/appState"
import { AnyAction } from "redux"
import { Dispatch } from "react"

type ThunkResult<D> = ThunkAction<void, IAppState, D, AnyAction>

// tslint:disable-next-line: no-any
export const toggleSidePanel = (): ThunkResult<void> => (dispatch: Dispatch<any>, _getState) => {
	dispatch({ type: "UI_SIDE_PANEL_TOGGLE" })
}
