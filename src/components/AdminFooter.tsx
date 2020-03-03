import * as React from "react"
import { connect } from "react-redux"
import IPerson from "../models/Person"
import { actionAdminCreateRandomPerson } from "../actions"
import { v4 as uuidv4 } from "uuid"

interface IAdminFooterProps {
	onAdminPersonAdd: (person: Partial<IPerson>) => void,
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

	private _fakeAPersonCreation = () => this.props.onAdminPersonAdd({ name: uuidv4() })
}

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
	return {
		onAdminPersonAdd: () => dispatch(actionAdminCreateRandomPerson())
	}
}

export default connect(null, mapDispatchToProps)(AdminFooter)
