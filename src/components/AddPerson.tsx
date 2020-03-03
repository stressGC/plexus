import * as React from "react"
import IPerson, { isPersonWithoutId } from "../models/Person"
import { connect } from "react-redux"
import { actionNetworkAddPerson } from "../actions"

interface IInputFieldProps {
	name: string,
	value?: string | number,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const InputField = ({ name, value, onChange }: IInputFieldProps) => (
	<div className="form-group row">
		<label htmlFor={name} className="col-sm-3 col-form-label">{name}</label>
		<div className="col-sm-9">
			<input
				type="text"
				className="form-control"
				name={name}
				value={value || ""}
				onChange={onChange}
			/>
		</div>
	</div>
)

interface IAddPersonState {
	person: Partial<IPerson>,
}

class AddPerson extends React.Component<ReturnType<typeof mapDispatchToProps>, IAddPersonState> {
	constructor(props: ReturnType<typeof mapDispatchToProps>) {
		super(props)
		this.state = {
			person: {},
		}
	}

	public render = () => {
		return (
			<form className="py-2">
				<h2>Add a new relation</h2>
				<InputField name="name" onChange={this._onInputChange} value={this.state.person.name || ""} />
				<InputField name="job" onChange={this._onInputChange} value={this.state.person.job} />
				<InputField name="company" onChange={this._onInputChange} value={this.state.person.company} />
				<InputField name="age" onChange={this._onInputChange} value={this.state.person.age} />
				<InputField name="notes" onChange={this._onInputChange} value={this.state.person.notes} />
				<button
					type="button"
					disabled={!this._isSubmitable()}
					className="btn btn-primary"
					onClick={this._onFormSubmit}
				>Submit</button>
			</form>
		)
	}

	private _isSubmitable = () => !!(this.state.person.name)

	private _onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.persist()
		this.setState((prevState) => ({
			person: {
				...prevState.person,
				[event.target.name]: event.target.value,
			},
		}))
	}

	private _onFormSubmit = () => {
		console.log(this.state)
		if (this.state.person && isPersonWithoutId(this.state.person)) {
			this.props.addPersonToNetwork(this.state.person)
		}
		// 	this.props.onPersonChange({...this.state.person})
		// } else if (isPersonWithoutId(this.state.person)) {
		// 	this.props.onPersonAdd({...this.state.person})
		// }
	}
}

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
	return {
		addPersonToNetwork: (person:  Omit<IPerson, "id">) => dispatch(actionNetworkAddPerson(person))
	}
}

export default connect(null, mapDispatchToProps)(AddPerson)
