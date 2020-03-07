import { combineReducers, AnyAction } from "redux"
import { IAppState } from "../appState"
import { IAllActions } from "../actions"


const data = (networkData: IAppState["network"]["data"] = null, action: IAllActions) => {
	if (action.type === "NETWORK_RETRIEVED") {
		return action.payload
	}
	if (action.type === "NETWORK_ADD_PERSON_SUCCESS") {
		return {
			persons: (networkData) ? [...networkData.persons, action.payload.createdPerson] : [action.payload.createdPerson],
			relationships: (networkData) ? [...networkData.relationships, action.payload.createdRelation] : [action.payload.createdRelation],
		}
	}
	return networkData
}

const fetching = (_fetchingState: IAppState["network"]["fetching"] = false, action: AnyAction) => (action.type === "NETWORK_RETRIEVING")

export default combineReducers({
	data,
	fetching,
})
