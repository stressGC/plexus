import { Action, Dispatch } from "redux"
import NetworkService from "../services/network"
import INetwork from "../models/Network"
import IPerson from "../models/Person"
import IRelationship from "../models/Relationship"
import { dispatchUiTogglePersonCreationForm } from "./ui"

export const ACTION_NETWORK_FETCH = "NETWORK_FETCH"
export const ACTION_NETWORK_FETCH_SUCCESS = "NETWORK_FETCH_SUCCESS"
export const ACTION_NETWORK_FETCH_ERROR = "NETWORK_FETCH_ERROR"
export const ACTION_NETWORK_ADD_PERSON_REQUEST = "NETWORK_ADD_PERSON_REQUEST"
export const ACTION_NETWORK_ADD_PERSON_SUCCESS = "NETWORK_ADD_PERSON_SUCCESS"

export interface IActionNetworkFetch extends Action {
	type: "NETWORK_FETCH",
}

export interface IActionNetworkFetchSuccess extends Action {
	type: "NETWORK_FETCH_SUCCESS",
	network: INetwork,
}

export interface IActionNetworkFetchError extends Action {
	type: "NETWORK_FETCH_ERROR",
	errorMessage: string,
}

export interface IActionNetworkAddPerson extends Action {
	type: "NETWORK_ADD_PERSON_REQUEST",
	person: IPerson,
}

export interface IActionNetworkAddPersonSuccess extends Action {
	type: "NETWORK_ADD_PERSON_SUCCESS",
	person: IPerson,
	relation: IRelationship,
}

export type INetworkActions = IActionNetworkFetch | IActionNetworkFetchSuccess | IActionNetworkFetchError | IActionNetworkAddPersonSuccess

const dispatchFetchNetworkProgress = (): IActionNetworkFetch => ({
	type: ACTION_NETWORK_FETCH,
})

const dispatchFetchNetworkSuccess = (network: INetwork): IActionNetworkFetchSuccess => ({
	type: ACTION_NETWORK_FETCH_SUCCESS,
	network,
})

const dispatchFetchNetworkError = (e: Error): IActionNetworkFetchError => ({
	type: ACTION_NETWORK_FETCH_ERROR,
	errorMessage: e.message,
})

export const dispatchNetworkAddPersonSuccess = (person: IPerson, relation: IRelationship): IActionNetworkAddPersonSuccess => ({
	type: ACTION_NETWORK_ADD_PERSON_SUCCESS,
	person,
	relation,
})

export const actionFetchNetwork = () => async (dispatch: Dispatch) => {
	dispatch(dispatchFetchNetworkProgress())
	try {
		const network = await NetworkService.get()
		return dispatch(dispatchFetchNetworkSuccess(network))
	}
	catch (e) {
		return dispatch(dispatchFetchNetworkError(e))
	}
}

export const actionNetworkAddPerson = (personWithoutId: Omit<IPerson, "id">) => async (dispatch: Dispatch) => {
	try {
		const { person, relation } = await NetworkService.addPerson(personWithoutId)
		dispatch(dispatchNetworkAddPersonSuccess(person, relation))
		return dispatch(dispatchUiTogglePersonCreationForm())
	}
	catch (e) {
		console.log(e)
	}
	return null
}
