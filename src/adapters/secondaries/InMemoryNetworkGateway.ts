import { INetworkGateway } from "../../core/gateways/network.gateway"
import INetwork from "../../core/models/Network"
// import { relationships, persons } from "../../services/data/data.json"

export class InMemoryNetworkGateway implements INetworkGateway {
	private network: INetwork | null = null

	public get = async () => {
		return Promise.resolve({
			relationships: this.network?.relationships || [],
			persons: this.network?.persons || [],
		})
	}

	public feedWith(network: INetwork) {
		this.network = network
	}
}

// 	static addPerson = (person: Omit<IPerson, "id">): Promise<{ person: IPerson, relation: IRelationship }> => {
// 		return new Promise((resolve) => {
// 			setTimeout(() => {
// 				const newPersonId = uuid()
// 				resolve({
// 					person: {
// 						...person,
// 						id: newPersonId,
// 					},
// 					relation: {
// 						id: uuid(),
// 						source: "1",
// 						target: newPersonId,
// 					}
// 				})
// 			}, 200)
// 		})
// 	}

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