import * as React from "react"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { submitAddPersonForm } from "../../../../core/usecases/network/networkPersonForm"
import { addPersonGetAllContactsSelector, getAddPersonFormMutualRelationIdSelector } from "./add-person-form.selector"

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

export const useTextInput = () => {
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

const useSelectInput = (mutualRelationId: string | undefined) => {
	const [value, setValue] = useState<string | undefined>(mutualRelationId)
	return {
		value,
		setValue,
		bind: {
			value,
			onChange: (event: React.ChangeEvent<HTMLSelectElement>) => setValue(event.target.value),
		}
	}
}

const AddPersonForm = () => {
	const contacts = useSelector(addPersonGetAllContactsSelector)
	const mutualRelationId = useSelector(getAddPersonFormMutualRelationIdSelector)
	const dispatch = useDispatch()
	const { value: name, bind: bindName } = useTextInput()
	const { value: job, bind: bindJob } = useTextInput()
	const { value: company, bind: bindCompany } = useTextInput()
	const { value: age, bind: bindAge } = useTextInput()
	const { value: notes, bind: bindNotes } = useTextInput()
	const { value: relation, bind: bindRelation } = useSelectInput(mutualRelationId)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const person = {
			name,
			job,
			company,
			age: +age,
			notes,
		}
		// tslint:disable-next-line: no-any
		dispatch<any>(submitAddPersonForm(person, relation))
	}
	// TODO: replace this by the real value
	const currentUserId = "1"
	return (
		<form className="py-2" onSubmit={handleSubmit}>
			<h2>Add a new relation</h2>
			{
				(contacts) && (
					<div className="form-group row">
						<label htmlFor="relation" className="col-sm-3 col-form-label">Mutual Relation</label>
						<div className="col-sm-9">
							<select name="relation" className="form-control" value={relation || currentUserId} {...bindRelation}>
								<option value={currentUserId}> - </option>
								{
									contacts
										.filter((contact) => contact.id !== "1")
										.map((contact) => <option key={contact.id} value={contact.id}>{contact.name}</option>)
								}
							</select>
						</div>
					</div>
				)
			}
			<InputField name="name" {...bindName} />
			<InputField name="job" {...bindJob} />
			<InputField name="company" {...bindCompany} />
			<InputField name="age" {...bindAge} />
			<InputField name="notes" {...bindNotes} />
			<button
				type="submit"
				className="btn btn-primary"
			>Submit</button>
		</form>
	)
}

export default AddPersonForm
