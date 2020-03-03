import { Action, Dispatch } from "redux"

export const ACTION_UI_TOGGLE_PERSON_CREATION_FORM = "ACTION_UI_TOGGLE_PERSON_CREATION_FORM"

export interface IActionUITogglePersonCreationForm extends Action {
	type: "ACTION_UI_TOGGLE_PERSON_CREATION_FORM",
}

export type IUiActions = IActionUITogglePersonCreationForm


export const dispatchUiTogglePersonCreationForm = (): IActionUITogglePersonCreationForm => ({
	type: ACTION_UI_TOGGLE_PERSON_CREATION_FORM,
})

export const actionUiTogglePersonCreationForm = () => async (dispatch: Dispatch) => {
	dispatch(dispatchUiTogglePersonCreationForm())
}
