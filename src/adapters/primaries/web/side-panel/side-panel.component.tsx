import React from "react"
import { getSidePanelToggleSelector, getSidePanelContentSelector } from "./side-panel.selector"
import { useSelector } from "react-redux"
import AddPersonForm from "../add-person-form/add-person-form.component"

export const SidePanel = () => {
	const toggled = useSelector(getSidePanelToggleSelector)
	const content = useSelector(getSidePanelContentSelector)

	if (!toggled) {
		return null
	}


	return (
		<div style={{ backgroundColor: "grey" }}>
			{
				content?.type === "ADD_PERSON_FORM" && (
					<AddPersonForm />
				)
			}
		</div>
	)
}
