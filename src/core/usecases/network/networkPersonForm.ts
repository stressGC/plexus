import { ThunkAction } from "redux-thunk"
import { IAppState } from "../../../store/appState"
import { AnyAction } from "redux"
import { Dispatch } from "react"
import IPerson from "../../models/Person"
import { INetworkGateway } from "../../gateways/network.gateway"
import { IAllActions } from "../../../store/actions"

type ThunkResult<D> = ThunkAction<void, IAppState, D, AnyAction>

export const openAddPersonForm = (): ThunkResult<void> => (dispatch: Dispatch<IAllActions>) => {
	dispatch({ type: "UI_OPEN_ADD_PERSON_FORM" })
}

export const submitAddPersonForm = (person: Partial<IPerson>): ThunkResult<{ networkGateway: INetworkGateway }> => async (dispatch: Dispatch<IAllActions>, _getState, { networkGateway }) => {
	dispatch({ type: "UI_SIDE_PANEL_LOADING", payload: true })
	try {
		const { person: createdPerson, relation: createdRelation } = await networkGateway.addPersonToNetwork(person)
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
