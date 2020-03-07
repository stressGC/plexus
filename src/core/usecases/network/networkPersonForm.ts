import { ThunkAction } from "redux-thunk"
import { IAppState } from "../../../store/appState"
import { AnyAction } from "redux"
import { Dispatch } from "react"
import IPerson from "../../models/Person"

type ThunkResult<D> = ThunkAction<void, IAppState, D, AnyAction>

// tslint:disable-next-line: no-any
export const openAddPersonForm = (): ThunkResult<void> => (dispatch: Dispatch<any>, _getState) => {
	dispatch({ type: "UI_OPEN_ADD_PERSON_FORM" })
}

// tslint:disable-next-line: no-any
export const submitAddPersonForm = (person: Partial<IPerson>): ThunkResult<void> => (dispatch: Dispatch<any>, _getState) => {
	dispatch({ type: "NETWORK_ADD_PERSON_SUBMITTED", payload: person })
}