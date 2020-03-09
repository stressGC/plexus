import IPerson from "../../models/Person"
import { IActionCreator, IDispatch } from "../../../plexus"

export const openAddPersonForm: IActionCreator = (mutualRelationId: string | undefined) => (dispatch: IDispatch) => {
	dispatch({ type: "UI_OPEN_ADD_PERSON_FORM", payload: mutualRelationId })
}

export const submitAddPersonForm: IActionCreator = (person: Partial<IPerson>, mutualRelationId?: string) => async (dispatch: IDispatch, _getState, { networkGateway }) => {
	dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: true })
	try {
		const { person: createdPerson, relation: createdRelation } = await networkGateway.addPersonToNetwork(person, mutualRelationId)
		dispatch({
			type: "NETWORK_ADD_PERSON_SUCCESS",
			payload: {
				createdPerson,
				createdRelation,
			},
		})
		dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: false })
		dispatch({ type: "UI_SIDE_PANEL_TOGGLE" })
	} catch (error) {
		// TODO: handle error
		dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: false })
	}
}
