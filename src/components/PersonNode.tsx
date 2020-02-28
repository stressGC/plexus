import React from "react"
import { IPerson } from "../types/plexus"

interface IPersonNodeProps {
	person: IPerson,
}

class PersonNode extends React.Component<IPersonNodeProps> {
	public render = () => {
		const { person } = this.props

		return (
			<div>
				<img src={person.svg} />
				<p>{person.name}</p>
			</div>
		)
	}
}

export default PersonNode
