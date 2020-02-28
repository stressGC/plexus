import * as React from "react"
import { isPerson, isPersonWithoutId, IPerson } from "../types/plexus"

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

interface IAddPersonProps {
	person: IPerson | null,
	onPersonAdd: (person: Partial<IPerson>) => void,
	onPersonChange: (person: IPerson) => void,
}

interface IAddPersonState {
	person: Partial<IPerson>,
}

class AddPerson extends React.Component<IAddPersonProps, IAddPersonState> {
	constructor(props: IAddPersonProps) {
		super(props)
		this.state = {
			person: props.person || {},
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
		if (this.props.person && isPerson(this.state.person)) {
			this.props.onPersonChange({...this.state.person})
		} else if (isPersonWithoutId(this.state.person)) {
			this.props.onPersonAdd({...this.state.person})
		}
	}
}

export default AddPerson
