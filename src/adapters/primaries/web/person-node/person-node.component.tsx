import * as React from "react"
import IPerson from "../../../../core/models/Person"

interface IPersonNodeProps {
	person: IPerson
}

const PersonNode = ({ person }: IPersonNodeProps) => {
	if (!person) {
		return null
	}

	// https://stackoverflow.com/questions/31110184/react-synthetic-event-distinguish-left-and-right-click-events

	return (
		<div className="person-node d-flex w-100 h-100 rounded-circle bg-dark">
			<span className="align-self-center mx-auto font-weight-bold">{person.name}</span>
		</div>
	)
}

export default PersonNode
