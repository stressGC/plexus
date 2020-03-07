import IPerson, { PersonModel } from "./Person"
import IRelationship, { RelationModel } from "./Relationship"
import { IAppState } from "../../store/appState"
import { v4 as uuid } from "uuid"

export default interface INetwork {
	persons: IPerson[],
	relationships: IRelationship[],
}

export class NetworkModel {
	public static addPersonToNetwork = (network: IAppState["network"]["data"], person: unknown) => {
		if (PersonModel.isPersonWithoutId(person)) {
			console.log(uuid)
			const personWithId: IPerson = { ...person, id: uuid() }
			console.log("id", personWithId.id)
			const relation = RelationModel.getRelationFromPerson(personWithId)
			console.log(relation)
			return {
				persons: (network) ? [...network.persons, personWithId] : [personWithId],
				relationships: (network) ? [...network.relationships, relation] : [relation],
			}
		} else {
			return network
		}
	}
}
