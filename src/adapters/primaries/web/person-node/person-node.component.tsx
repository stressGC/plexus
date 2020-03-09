import * as React from "react"
import IPerson from "../../../../core/models/Person"

interface IPersonNodeProps {
	person: IPerson
}

const PersonNode = ({ person }: IPersonNodeProps) => {
	if (!person) {
		return null
	}

	return (
		<div className="d-flex w-100 h-100 rounded-circle" style={{backgroundColor: "pink" }}>
			<span className="align-self-center mx-auto">{person.name}</span>
		</div>
	)
}

export default PersonNode
