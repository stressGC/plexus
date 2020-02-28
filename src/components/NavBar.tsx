import * as React from "react"

interface INavBarProps {
	onAddPersonClick: () => void,
}


const NavBar = ({ onAddPersonClick }: INavBarProps) => (
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

export default NavBar
