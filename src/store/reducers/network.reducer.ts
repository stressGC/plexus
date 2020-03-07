import { combineReducers, AnyAction } from "redux"
import { IAppState } from "../appState"
import { NetworkModel } from "../../core/models/Network"



const data = (networkData: IAppState["network"]["data"] = null, action: AnyAction) => {
	if (action.type === "NETWORK_RETRIEVED") {
		return action.payload
	}
	if (action.type === "NETWORK_ADD_PERSON_SUBMITTED") {
		return NetworkModel.addPersonToNetwork(networkData, action.payload)
	}
	return networkData
}

const fetching = (_fetchingState: IAppState["network"]["fetching"] = false, action: AnyAction) => (action.type === "NETWORK_RETRIEVING")

export default combineReducers({
	data,
	fetching,
})
