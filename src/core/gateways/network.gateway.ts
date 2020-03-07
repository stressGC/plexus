import INetwork from "../models/Network"
// import IPerson from "../models/Person"
// import IRelationship from "../models/Relationship"

export interface INetworkGateway {
	get(): Promise<INetwork>
	// addPerson(person: Omit<IPerson, "id">): Promise<{ person: IPerson, relation: IRelationship }>
	// adminAddRandomPerson(): Promise<{ person: IPerson, relation: IRelationship }>
}
