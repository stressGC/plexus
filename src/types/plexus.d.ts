export interface IPerson {
	id: number,
	name: string,
	job?: string,
	company?: string,
	svg?: string,
	age?: number,
	tags?: string,
	notes?: string,
}

export interface IMeeting {
	id: number,
	timestamp: number,
	place?: string,
	duration?: number,
	notes?: string,
}

export interface IRelationship {
	id: number,
	source: number,
	target: number,
	proximity?: number,
	firstContact?: number,
	lastContactDate?: number,
	meetingHistory?: IMeeting[],
}