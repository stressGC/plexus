import * as React from "react"
import IPerson from "../../../../core/models/Person"
import Tippy from "@tippy.js/react"

const PersonNodeManagementDropdown = ({ id, hide }: { id: IPerson["id"], hide: () => void }) => {
	const onDeleteThisContactClick = () => {
		console.log("onDeleteThisContactClick")
		hide()
	}
	const onEditThisContactClick = () => {
		console.log("onEditThisContactClick")
		hide()
	}
	const onCreateRelationFromThisContactClick = () => {
		console.log("onCreateRelationFromThisContactClick")
		hide()
	}
	return (
		<div className="p-0">
			<button
				onClick={onEditThisContactClick}
				className="dropdown-item cursor-pointer text-white"
			>
				Edit contact [INCOMING]
			</button>
			<button
			onClick={onCreateRelationFromThisContactClick}
				className="dropdown-item cursor-pointer text-white"
			>
				Create relation from this contact [INCOMING]
			</button>
			<button
				onClick={onDeleteThisContactClick}
				className="dropdown-item cursor-pointer text-white"
			>
				Delete [INCOMING]
			</button>
		</div>
	)
}

interface IPersonNodeProps {
	person: IPerson
}

const PersonNode = ({ person }: IPersonNodeProps) => {
	const [personNodeManagementDropdownToggle, setPersonNodeManagementDropdownToggle] = React.useState(false)

	if (!person) {
		return null
	}

	// https://stackoverflow.com/questions/31110184/react-synthetic-event-distinguish-left-and-right-click-events

	const handlePersonNodeClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (event.type === "click") {
			console.log("click")
		} else if (event.type === "contextmenu") {
			event.preventDefault()
			console.log("Right click")
			setPersonNodeManagementDropdownToggle(true)
		}
	}

	const hidePersonNodeManagementDropdown = () => setPersonNodeManagementDropdownToggle(false)

	return (
		<Tippy
			visible={personNodeManagementDropdownToggle}
			content={<PersonNodeManagementDropdown id={person.id} hide={hidePersonNodeManagementDropdown} />}
			placement="right-start"
			appendTo={document.body}
			distance={2}
			onHidden={hidePersonNodeManagementDropdown}
			interactive={true}
			hideOnClick={true}
			arrow={false}
			theme="p-0"
			className="p-0"
		>
				<div
					className="person-node d-flex w-100 h-100 rounded-circle bg-dark"
					onClick={handlePersonNodeClick}
					onContextMenu={handlePersonNodeClick}
				>
					<span className="align-self-center mx-auto font-weight-bold">{person.name}</span>
				</div>
		</Tippy>
	)
}

export default PersonNode
