import * as React from "react"
import { IPerson } from "../types/plexus"
import { v4 as uuidv4 } from "uuid"

interface IAdminFooterProps {
	onPersonAdd: (person: Partial<IPerson>) => void,
}

class AdminFooter extends React.Component<IAdminFooterProps> {
	public render() {
		return (
			<footer className="footer">
				<div className="container">
					<span className="text-muted">Admin Footer</span>
					<span
						onClick={this._fakeAPersonCreation}
						className="ml-3 btn btn-secondary"
					>
						add user
					</span>
				</div>
			</footer>
		)
	}

	private _fakeAPersonCreation = () => this.props.onPersonAdd({ name: uuidv4() })
}

export default AdminFooter
