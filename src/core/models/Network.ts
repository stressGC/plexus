import IPerson from "./Person"
import IRelationship from "./Relationship"

export default interface INetwork {
	persons: IPerson[],
	relationships: IRelationship[],
}
