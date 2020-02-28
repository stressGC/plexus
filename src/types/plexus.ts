export interface IPerson {
	id: string,
	name: string,
	job?: string,
	company?: string,
	svg?: string,
	age?: number,
	tags?: string,
	notes?: string,
}

export interface IMeeting {
	id: string,
	timestamp: number,
	place?: string,
	duration?: number,
	notes?: string,
}

export interface IRelationship {
	id: string,
	source: string,
	target: string,
	proximity?: number,
	firstContact?: number,
	lastContactDate?: number,
	meetingHistory?: IMeeting[],
}

export const isPerson = (person: Partial<IPerson> | null | undefined): person is IPerson => Boolean(person && person.id && person.name)
export const isPersonWithoutId = (person: Partial<IPerson>): person is Omit<IPerson, "id"> => !!(person.name)
