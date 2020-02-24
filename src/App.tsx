import * as React from "react"
import { hot } from "react-hot-loader"
import Network from "./components/Network"
import SidePanel from "./components/SidePanel"

import "bootstrap/dist/css/bootstrap.min.css"
import Person from "./components/Person"
import { IPerson, IRelationship } from "./types/plexus"
import data from "./data.json"

interface IAppState {
	toggled: boolean,
	persons: IPerson[],
	relationships: IRelationship[],
	personHighlight: IPerson | null,
}

class App extends React.Component<{}, IAppState> {
	public constructor(props: {}) {
		super(props)
		this.state = {
			toggled: false,
			personHighlight: null,
			relationships: data.relationships,
			persons: data.persons,
		}
	}

	public render = () => {
		console.log(this.state)
		return (
			<div className="container-fluid">
				<div className="row" style={{ minHeight: "100vh" }}>
					<div className="col-md-8" style={{ height: "100%" }}>
						<Network
							onPersonClick={this._onPersonClick}
							relationships={this.state.relationships}
							persons={this.state.persons}
						/>
					</div>
					<div className="col-md-4">
						<SidePanel toggled={this.state.toggled}>
							{
								this.state.personHighlight &&
									<Person person={this.state.personHighlight} />
							}
						</SidePanel>
					</div>
				</div>
			</div>
		)
	}

	private _onPersonClick = (personId: string) => {
		console.log(`Clicked person ${personId}`)
		const person = this.state.persons.find((pers) => pers.id.toString() === personId)
		if (!person) {
			return
		}
		this.setState({
			personHighlight: person,
		})
	}
}

// TODO: remove when parcel hot module reloading handle this without "module"
declare var module: any // tslint:disable-line
export default hot(module)(App)
