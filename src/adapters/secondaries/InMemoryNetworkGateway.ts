import { INetworkGateway } from "../../core/gateways/network.gateway"
import INetwork from "../../core/models/Network"
import IPerson, { PersonModel } from "../../core/models/Person"
import IRelationship, { RelationModel } from "../../core/models/Relationship"

export class InMemoryNetworkGateway implements INetworkGateway {
	private network: INetwork | null = null

	public get = async () => Promise.resolve({
		relationships: this.network?.relationships || [],
		persons: this.network?.persons || [],
	})

	public addPersonToNetwork = (person: unknown, mutualRelationId: string): Promise<{ person: IPerson, relation: IRelationship }> => {
		if (PersonModel.isPersonWithoutId(person)) {
			const personWithId = PersonModel.withGeneratedId(person)
			const relation = RelationModel.getRelationFromPerson(personWithId, mutualRelationId)
			return Promise.resolve({
				person: personWithId,
				relation,
			})
		} else {
			throw new Error("LOL")
		}
	}

	public deletePersonFromNetwork= (_personId: string): Promise<void> => Promise.resolve()

	public feedWith(network: INetwork) {
		this.network = network
	}
}



// 	static adminAddRandomPerson = (): Promise<{ person: IPerson, relation: IRelationship }> => {
// 		return new Promise((resolve) => {
// 			setTimeout(() => {
// 				const newPerson: IPerson = {
// 					id: uuid(),
// 					name: uuid(),
// 				}
// 				resolve({
// 					person: newPerson,
// 					relation: {
// 						id: uuid(),
// 						source: "1",
// 						target: newPerson.id,
// 					}
// 				})
// 			}, 200)
// 		})
// 	}
// }