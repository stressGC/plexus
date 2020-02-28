import * as React from "react"
import { hot } from "react-hot-loader"
import Network from "./components/Network"
import SidePanel from "./components/SidePanel"

import "bootstrap/dist/css/bootstrap.min.css"
import { IPerson, IRelationship, isPersonWithoutId } from "./types/plexus"
import data from "./data.json"
import NavBar from "./components/NavBar"
import AdminFooter from "./components/AdminFooter"
import "./styles/index.sass"
import AddPerson from "./components/AddPerson"
import { v4 as uuidv4 } from "uuid"

// const fakePersons = new Array(5).fill(data.persons).flat().map((person) => { return {  ...person, id: uuidv4() }})
// console.log(fakePersons)

// const fakeRelations =

interface IAppState {
	toggled: boolean,
	persons: IPerson[],
	relationships: IRelationship[],
	personHighlight: IPerson | null,
	isPersonFormOpen: boolean,
	currentUserId: string,
}

class App extends React.Component<{}, IAppState> {
	public constructor(props: {}) {
		super(props)
		this.state = {
			toggled: false,
			personHighlight: null,
			relationships: data.relationships,
			persons: data.persons,
			isPersonFormOpen: false,
			currentUserId: "1",
		}
	}

	public render = () => {
		return (
			<div id="app">
				<NavBar onAddPersonClick={this._onAddPersonClick} />
				<main className="container-fluid">
					<div className="row" style={{ minHeight: "100vh" }}>
						<div className="col-md-8" style={{ height: "100%" }}>
							<Network
								onPersonClick={this._onPersonClick}
								// onPersonRightClick={this._onPersonRightClick}
								relationships={this.state.relationships}
								persons={this.state.persons}
							/>
						</div>
						<div className="col-md-4">
							<SidePanel toggled={this.state.toggled}>
								{
									(this.state.isPersonFormOpen) && (
										<AddPerson
											key={`addPerson-${this.state.personHighlight ? this.state.personHighlight.id : ""}`}
											onPersonAdd={this._addPersonAndRelation}
											onPersonChange={this._changePerson}
											person={this.state.personHighlight}
										/>
									)
								}
								{/* {
									(this.state.isRelationFormOpen) && (
										<RelationForm

										/>
									)
								} */}
							</SidePanel>
						</div>
					</div>
				</main>
				<AdminFooter
					onPersonAdd={this._addPersonAndRelation}
				/>
			</div>
		)
	}

	private _onAddPersonClick = () => {
		this.setState({
			isPersonFormOpen: true,
			personHighlight: null,
		})
	}

	private _onChangePersonFinished = () => {
		this.setState({
			isPersonFormOpen: false,
			personHighlight: null,
		})
	}

	private _addPersonAndRelation = (person: Partial<IPerson>) => {
		if (isPersonWithoutId(person)) {
			const completePerson = this._withUuid(person)
			const relation: IRelationship = {
				id: uuidv4(),
				source: this.state.currentUserId,
				target: completePerson.id,
			}
			this.setState((prevState) => ({
				persons: [...prevState.persons, completePerson],
				relationships: [...prevState.relationships, relation],
				isPersonFormOpen: false
			}))
		}
	}

	private _changePerson = (person: IPerson) => {
		this.setState((prevState) => ({
			persons: prevState.persons.map((pers) => (pers.id === person.id) ? person : pers)
		}))
		this._onChangePersonFinished()
	}

	private _withUuid = (person: Omit<IPerson, "id">): IPerson => ({
		id: uuidv4(),
		...person,
	})

	private _onPersonClick = (personId: string) => {
		const person = this.state.persons.find((pers) => pers.id === personId)
		if (!person) {
			return
		}
		this.setState({
			personHighlight: person,
			isPersonFormOpen: true,
		})
	}
}

// TODO: remove when parcel hot module reloading handle this without "module"
declare var module: any // tslint:disable-line
export default hot(module)(App)
