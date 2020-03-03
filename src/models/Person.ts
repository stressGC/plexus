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

export const isPerson = (person: Partial<IPerson> | null | undefined): person is IPerson => Boolean(person && person.id && person.name)
export const isPersonWithoutId = (person: Partial<IPerson>): person is Omit<IPerson, "id"> => !!(person.name)
