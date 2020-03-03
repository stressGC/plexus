import IMeeting from "./Meeting"

export default interface IRelationship {
	id: string,
	source: string,
	target: string,
	proximity?: number,
	firstContact?: number,
	lastContactDate?: number,
	meetingHistory?: IMeeting[],
}