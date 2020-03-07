import * as React from "react"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { submitAddPersonForm } from "../../../../core/usecases/network/networkPersonForm"

interface IInputFieldProps {
	name: string,
	value?: string | number,
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const InputField = ({ name, value, onChange }: IInputFieldProps) => (
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

export const useInput = () => {
	const [value, setValue] = useState("")
	return {
		value,
		setValue,
		bind: {
			value,
			onChange: (event: React.ChangeEvent<HTMLInputElement>) => setValue(event.target.value),
		}
	}
}

const AddPersonForm = () => {
	const dispatch = useDispatch()
	const { value: name, bind: bindName } = useInput()
	const { value: job, bind: bindJob } = useInput()
	const { value: company, bind: bindCompany } = useInput()
	const { value: age, bind: bindAge } = useInput()
	const { value: notes, bind: bindNotes } = useInput()

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		// console.log(name, job, company, age, notes)
		const person = {
			name,
			job,
			company,
			age: +age,
			notes
		}
		// tslint:disable-next-line: no-any
		dispatch<any>(submitAddPersonForm(person))
	}

	return (
		<form className="py-2" onSubmit={handleSubmit}>
			<h2>Add a new relation</h2>
			<InputField name="name" {...bindName} />
			<InputField name="job" {...bindJob} />
			<InputField name="company" {...bindCompany} />
			<InputField name="age" {...bindAge} />
			<InputField name="notes" {...bindNotes} />
			<button
				type="submit"
				// disabled={!this._isSubmitable()}
				className="btn btn-primary"
			>Submit</button>
		</form>
	)
}

export default AddPersonForm
