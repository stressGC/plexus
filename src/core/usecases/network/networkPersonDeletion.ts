import { IActionCreator, IDispatch } from "../../../plexus"

export const deletePerson: IActionCreator = (personId: string) => async (dispatch: IDispatch, _getState, { networkGateway }) => {
	// dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: true })
	try {
		await networkGateway.deletePersonFromNetwork(personId)
		dispatch({
			type: "NETWORK_DELETE_PERSON_SUCCESS",
			payload: personId,
		})
		// dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: false })
	} catch (error) {
		// TODO: handle error
		// dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: false })
	}
}
