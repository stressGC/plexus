import React from "react"
import { getSidePanelToggleSelector, getSidePanelContentSelector, getSidePanelIsLoadingSelector } from "./side-panel.selector"
import { useSelector } from "react-redux"
import AddPersonForm from "../add-person-form/add-person-form.component"

export const SidePanel = () => {
	const toggled = useSelector(getSidePanelToggleSelector)
	const content = useSelector(getSidePanelContentSelector)
	const isLoading = useSelector(getSidePanelIsLoadingSelector)

	if (!toggled) {
		return null
	}

	if (isLoading) {
		return (
			<p>Loading...</p>
		)
	}


	return (
		<div style={{ backgroundColor: "grey" }}>
			{
				(content?.type === "ADD_PERSON_FORM") && (
					<AddPersonForm key={content.mutualRelationId} />
				)
			}
		</div>
	)
}
