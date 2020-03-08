import { IActionCreator, IDispatch } from "../../../plexus"

export const retrieveNetwork: IActionCreator = () => {
	return async (dispatch: IDispatch, _getState, { networkGateway }) => {
		dispatch({ type: "NETWORK_RETRIEVING" })
		const network = await networkGateway.get()
		dispatch({ type: "NETWORK_RETRIEVED", payload: network })
	}
}