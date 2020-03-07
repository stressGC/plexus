import * as React from "react"
import { NavLink } from "react-router-dom"
import { useDispatch } from "react-redux"
import { toggleSidePanel } from "../../../../core/usecases/ui/sidePanel"
import { openAddPersonForm } from "../../../../core/usecases/network/networkPersonForm"

export const Navbar = () => {
	const dispatch = useDispatch()
	// tslint:disable-next-line: no-any
	const onSidePanelToggleClick = () => dispatch<any>(toggleSidePanel())
	// tslint:disable-next-line: no-any
	const onAddPersonFormOpenClick = () => dispatch<any>(openAddPersonForm())
	return (
		<nav className="navbar navbar-expand navbar-dark bg-dark">
			<NavLink
				className="navbar-brand"
				to="/"
			>Plexus</NavLink>
			<div className="collapse navbar-collapse">
				<ul className="navbar-nav mr-auto">
					<li className="nav-item active">
						<NavLink
							className="nav-link"
							to="/"
						>Network</NavLink>
					</li>
					<li className="nav-item">
						<NavLink
							className="nav-link"
							to="/settings"
						>Settings</NavLink>
					</li>
				</ul>
				<button
					type="button"
					className="btn btn-secondary"
					onClick={onSidePanelToggleClick}
				>
					Toggle side panel
				</button>
				<button
					type="button"
					className="btn btn-primary btn-circle btn-lg font-weight-bold ml-3"
					onClick={onAddPersonFormOpenClick}
				>
					+
				</button>
			</div>
		</nav>
	)
}
