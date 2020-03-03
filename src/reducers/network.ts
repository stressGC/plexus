import { AppActions } from "../actions"
import INetwork from "../models/Network"

export interface INetworkState {
	state: "INIT" | "LOADING" | "LOADED" | "ERROR",
	network: INetwork | null,
	errorMessage?: string
}

export const defaultNetworkState = (): INetworkState => {
	return {
		state: "INIT",
		network: null,
	}
}

export const networkReducer = (state: INetworkState, action: AppActions): INetworkState => {
	switch (action.type) {
		case "NETWORK_FETCH":
			return {
				...state,
				state: "LOADING",
			}
		case "NETWORK_FETCH_ERROR":
			return {
				...state,
				state: "ERROR",
				errorMessage: action.errorMessage,
			}
		case "NETWORK_FETCH_SUCCESS":
			return {
				...state,
				state: "LOADED",
				network: action.network,
			}
		case "NETWORK_ADD_PERSON_SUCCESS":
			return {
				...state,
				network: {
					persons: (state.network) ? [...state.network.persons, action.person] : [action.person],
					relationships: (state.network) ? [...state.network.relationships, action.relation] : [action.relation],
				}
			}
	}
	return state
}