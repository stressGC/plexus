import * as React from "react"
import { connect } from "react-redux"
import {  } from "../actions"
import { actionUiTogglePersonCreationForm } from "../actions/ui"

const Navbar = ({ onAddPersonClick }: ReturnType<typeof mapDispatchToProps>) => (
	<nav className="navbar navbar-expand navbar-dark bg-dark">
		<a className="navbar-brand" href="#">Plexus</a>
		<div className="collapse navbar-collapse">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
					<a className="nav-link" href="#">Network <span className="sr-only">(current)</span></a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">Settings</a>
				</li>
			</ul>
			<button
				type="button"
				onClick={onAddPersonClick}
				className="btn btn-primary btn-circle btn-lg font-weight-bold"
			>
				+
			</button>
		</div>
	</nav>
)

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
	return {
		onAddPersonClick: () => dispatch(actionUiTogglePersonCreationForm())
	}
}

export default connect(null, mapDispatchToProps)(Navbar)
