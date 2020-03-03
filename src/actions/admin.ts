import { Dispatch } from "redux"
import NetworkService from "../services/network"
import { dispatchNetworkAddPersonSuccess } from "."

export const ACTION_ADMIN_CREATE_RANDOM_PERSON = "ACTION_ADMIN_CREATE_RANDOM_PERSON"

// export interface IActionAdminCreateRandomPerson extends Action {
// 	type: "ACTION_ADMIN_CREATE_RANDOM_PERSON",
// }

// export type IAdminActions = IActionAdminCreateRandomPerson

export const actionAdminCreateRandomPerson = () => async (dispatch: Dispatch) => {
	try {
		const { person, relation } = await NetworkService.adminAddRandomPerson()
		return dispatch(dispatchNetworkAddPersonSuccess(person, relation))
	}
	catch (e) {
		console.log(e)
	}
	return null
}
