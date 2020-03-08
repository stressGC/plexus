import INetwork from "../../core/models/Network"
import IPerson from "../../core/models/Person"
import IRelationship from "../../core/models/Relationship"

interface INetworkRetrievingAction {
	type: "NETWORK_RETRIEVING"
}

interface INetworkRetrievedAction {
	type: "NETWORK_RETRIEVED"
	payload: INetwork
}

interface INetworkAddPersonSuccessAction {
	type: "NETWORK_ADD_PERSON_SUCCESS"
	payload: {
		createdPerson: IPerson
		createdRelation: IRelationship
	},
}

export type INetworkActions = INetworkRetrievingAction | INetworkRetrievedAction | INetworkAddPersonSuccessAction
