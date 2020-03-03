import React from "react"
import Note from "../Note"
import NoteModel from "../../models/Note"

export interface NotesListProps {
	notes: NoteModel[]
}

export interface NotesListState {
	notes: number[]
}

export default class NotesList extends React.Component<NotesListProps, NotesListState> {
	render() {
		return (
			<ul>
				{this.props.notes.map((note: NoteModel) => <li key={note.id}><Note note={note} /></li>)}
			</ul>
		)
	}
}