import { ThunkAction } from "redux-thunk"
import { IAppState } from "../../../store/appState"
import { AnyAction } from "redux"
import { Dispatch } from "react"
import { INetworkGateway } from "../../gateways/network.gateway"

type ThunkResult<D> = ThunkAction<void, IAppState, D, AnyAction>

export const retrieveNetwork = ():
	ThunkResult<{ networkGateway: INetworkGateway }> => {
	// tslint:disable-next-line: no-any
	return async (dispatch: Dispatch<any>, _getState, { networkGateway }) => {
		dispatch({type: "NETWORK_RETRIEVING"})
		const network = await networkGateway.get()
		dispatch({type: "NETWORK_RETRIEVED", payload: network })
	}
}