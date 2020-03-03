import React, { ReactNode } from "react"
import { AppState } from "../reducers"
import { connect } from "react-redux"
import AddPerson from "./AddPerson"

interface ISidePanelOwnProps {
	children?: ReactNode,
}
type ISidePanelProps = ISidePanelOwnProps & ReturnType<typeof mapStateToProps>

class SidePanel extends React.Component<ISidePanelProps> {
	constructor(props: ISidePanelProps) {
		super(props)
	}

	public render = () => {
		console.log(this.props)
		if (!this.props.toggled) {
			return null
		}

		if (this.props.content === "PERSON_FORM") {
			return (
				<AddPerson />
			)
		}

		return null
	}
}

const mapStateToProps = (state: AppState, ownProps: ISidePanelOwnProps) => ({
	...ownProps,
	toggled: state.ui.sidePanel.content,
	content: state.ui.sidePanel.content,
})

export default connect(mapStateToProps)(SidePanel)
