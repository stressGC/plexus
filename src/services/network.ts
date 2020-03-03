import INetwork from "../models/Network"
import { relationships, persons } from "./data/data.json"
import IPerson from "../models/Person"
import { v4 as uuid } from "uuid"
import IRelationship from "../models/Relationship"

export default class NotesService {
	static get = (): Promise<INetwork> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve({
					relationships,
					persons,
				})
			}, 200)
		})
	}

	static addPerson = (person: Omit<IPerson, "id">): Promise<{ person: IPerson, relation: IRelationship }> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const newPersonId = uuid()
				resolve({
					person: {
						...person,
						id: newPersonId,
					},
					relation: {
						id: uuid(),
						source: "1",
						target: newPersonId,
					}
				})
			}, 200)
		})
	}

	static adminAddRandomPerson = (): Promise<{ person: IPerson, relation: IRelationship }> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				const newPerson: IPerson = {
					id: uuid(),
					name: uuid(),
				}
				resolve({
					person: newPerson,
					relation: {
						id: uuid(),
						source: "1",
						target: newPerson.id,
					}
				})
			}, 200)
		})
	}
}