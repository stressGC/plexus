import { AppActions } from "../actions"

import NoteModel from "../models/Note"

export interface NotesListState {
	state: "INIT" | "LOADING" | "LOADED" | "ERROR",
	notes: NoteModel[],
	errorMessage?: string
}

export const defaultNoteListState = (): NotesListState => {
	return {
		state: "INIT",
		notes: []
	}
}

export const notesListReducer = (state: NotesListState, action: AppActions): NotesListState => {
	// TODO: Write reducers here.
	switch (action.type) {
		case "NOTES_FETCH":
			return {
				...state,
				state: "LOADING",
			}
		case "NOTES_FETCH_ERROR":
			return {
				...state,
				state: "ERROR",
				errorMessage: action.errorMessage,
			}
		case "NOTES_FETCH_SUCCESS":
			return {
				...state,
				state: "LOADED",
				notes: action.notes,
			}
	}
	return state
}