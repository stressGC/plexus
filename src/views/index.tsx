import React from "react"
import { Switch, Route } from "react-router-dom"
import HomeView from "./home"
import Network from "./network"
import Navbar from "../components/NavBar"

import "bootstrap/dist/css/bootstrap.min.css"
import "../styles/index.sass"
import AdminFooter from "../components/AdminFooter"
import SidePanel from "../components/SidePanel"

const RootView: React.StatelessComponent<{}> = () => (
	<div id="app">
		<Navbar />
		<main className="container-fluid">
			<div className="row" style={{ minHeight: "100vh" }}>
				<div className="col-md-8" style={{ height: "100%" }}>
				<Switch>
					<Route exact={true} path="/" component={Network}/>
					<Route path="/network" component={HomeView}/>
				</Switch>
				</div>
				<div className="col-md-4">
					<SidePanel>
						<h1>SOME SIDE PANEL</h1>
						{
							// (this.state.isPersonFormOpen) && (
							// 	<AddPerson
							// 		key={`addPerson-${this.state.personHighlight ? this.state.personHighlight.id : ""}`}
							// 		onPersonAdd={this._addPersonAndRelation}
							// 		onPersonChange={this._changePerson}
							// 		person={this.state.personHighlight}
							// 	/>
							// )
						}
					</SidePanel>
				</div>
			</div>
		</main>
		<AdminFooter />
	</div>
)

export default RootView
