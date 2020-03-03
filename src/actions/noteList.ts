import NoteModel from "../models/Note"
import { Action, Dispatch } from "redux"
import NotesService from "../services/notes"

export const ACTION_NOTES_FETCH = "NOTES_FETCH"
export const ACTION_NOTES_FETCH_SUCCESS = "NOTES_FETCH_SUCCESS"
export const ACTION_NOTES_FETCH_ERROR = "NOTES_FETCH_ERROR"

export interface IActionNotesFetch extends Action {
	type: "NOTES_FETCH"
}

export interface IActionNotesFetchSuccess extends Action {
	type: "NOTES_FETCH_SUCCESS",
	notes: NoteModel[]
}

export interface IActionNotesFetchError extends Action {
	type: "NOTES_FETCH_ERROR",
	errorMessage: string
}

export type IActionNotes = IActionNotesFetch | IActionNotesFetchSuccess | IActionNotesFetchError

const dispatchFetchNotesProgress = (): IActionNotesFetch => {
	return {
		type: ACTION_NOTES_FETCH
	}
}

const dispatchFetchNotesSuccess = (notes: NoteModel[]): IActionNotesFetchSuccess => {
	console.log("dispatching", notes)
	return {
		type: ACTION_NOTES_FETCH_SUCCESS,
		notes
	}
}

const dispatchFetchNotesError = (e: Error): IActionNotesFetchError => {
	return {
		type: ACTION_NOTES_FETCH_ERROR,
		errorMessage: e.message
	}
}

export const actionFetchNotes = () => {
	return (dispatch: Dispatch) => {
		dispatch(dispatchFetchNotesProgress())
		return NotesService.getAll()
			.then((notes) => {
				return dispatch(dispatchFetchNotesSuccess(notes))
			})
			.catch((e: Error) => {
				return dispatch(dispatchFetchNotesError(e))
			})
	}
}
