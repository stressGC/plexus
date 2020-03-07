export default interface IMeeting {
	id: string,
	timestamp: number,
	place?: string,
	duration?: number,
	notes?: string,
}