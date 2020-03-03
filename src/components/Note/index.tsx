import React from "react"
import NoteModel from "../../models/Note"


export interface NoteProps {
	note: NoteModel
}

// tslint:disable-next-line: no-empty-interface
export interface NoteState {}

export default class Note extends React.Component<NoteProps, NoteState> {

	contentWithBreaks() {
		const x = this.props.note.content.replace(/\n/g, "<br/>")
		return { __html: x }
	}

	render() {
		return (
		<div>
			<div>{this.props.note.title}</div>
			<p dangerouslySetInnerHTML={this.contentWithBreaks()} />
			<div>{this.props.note.creationDate}</div>
		</div>
		)
	}
}