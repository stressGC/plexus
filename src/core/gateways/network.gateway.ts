import INetwork from "../models/Network"
import IPerson from "../models/Person"
import IRelationship from "../models/Relationship"

export interface INetworkGateway {
	get(): Promise<INetwork>
	addPersonToNetwork(person: unknown, mutualRelationId?: string): Promise<{ person: IPerson, relation: IRelationship }>
	deletePersonFromNetwork(personId: string): Promise<void>
	// adminAddRandomPerson(): Promise<{ person: IPerson, relation: IRelationship }>
}
