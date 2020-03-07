import IMeeting from "./Meeting"
import { v4 as uuid } from "uuid"
import IPerson from "./Person"

export default interface IRelationship {
	id: string,
	source: string,
	target: string,
	proximity?: number,
	firstContact?: number,
	lastContactDate?: number,
	meetingHistory?: IMeeting[],
}

export class RelationModel {
	public static getRelationFromPerson = (person: IPerson) => ({
		id: uuid(),
		source: "1",
		target: person.id,
	})
}
