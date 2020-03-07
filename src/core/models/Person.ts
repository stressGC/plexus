import { v4 as uuid } from "uuid"

export default interface IPerson {
	id: string,
	name: string,
	job?: string,
	company?: string,
	svg?: string,
	age?: number,
	tags?: string,
	notes?: string,
}

export class PersonModel {
	public static isPerson = (person: Partial<IPerson> | null | undefined): person is IPerson => (
		Boolean(person && person.id && person.name)
	)

	public static isPersonWithoutId = (person: unknown): person is Omit<IPerson, "id"> => (
		(typeof person === "object" && person !== null && "name" in person)
	)

	public static withGeneratedId = (personWithoutId: Omit<IPerson, "id">) => ({
		...personWithoutId,
		id: uuid(),
	})
}
