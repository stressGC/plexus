import * as React from "react"

const NavBar = () => (
	<nav className="navbar navbar-expand-md navbar-dark bg-dark">
		<a className="navbar-brand" href="#">Plexus</a>
		<div className="collapse navbar-collaps">
			<ul className="navbar-nav mr-auto">
				<li className="nav-item active">
						<a className="nav-link" href="#">Network <span className="sr-only">(current)</span></a>
				</li>
				<li className="nav-item">
					<a className="nav-link" href="#">Settings <span className="sr-only">(current)</span></a>
				</li>
			</ul>
		</div>
	</nav>
)

export default NavBar
