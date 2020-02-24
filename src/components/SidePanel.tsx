import React, { ReactNode } from "react"

interface ISidePanelProps {
	toggled: boolean,
	children?: ReactNode,
}

class SidePanel extends React.Component<ISidePanelProps> {
	constructor(props: ISidePanelProps) {
		super(props)
	}

	public render = () => {
		return (
			<>
				{this.props.children}
			</>
		)
	}
}

export default SidePanel
