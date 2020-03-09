import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"
import { openAddPersonForm, submitAddPersonForm } from "./networkPersonForm"
import IPerson from "../../models/Person"
import { listenToChangedState } from "../../../test.utils"
import INetwork from "../../models/Network"
import { retrieveNetwork } from "./networkRetrieval"

describe("Network person adding", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => {
		networkGateway = new InMemoryNetworkGateway()
		const smallNetwork: INetwork = {
			persons: [
				{ id: "1", name: "Caroline" },
				{ id: "2", name: "Jordan" },
			],
			relationships: [
				{ id: "1", source: "1", target: "2" },
			],
		}
		networkGateway.feedWith(smallNetwork)
		store = configureStore({ networkGateway })
		// tslint:disable-next-line: no-any
		store.dispatch<any>(retrieveNetwork())
	})

	it("should open the sidepanel with the person form", (done) => {
		listenToChangedState(
			store,
			[{
				index: 1,
				rules: [{
					expect: "ui.sidePanel.toggled",
					toBe: true,
				}, {
					expect: "ui.sidePanel.isLoading",
					toBe: false,
				}, {
					expect: "ui.sidePanel.content",
					toBe: { type: "ADD_PERSON_FORM" },
				}],
			}],
			done,
		)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(openAddPersonForm())
	})

	it("should open the sidepanel's person form with the 'from' relation prefilled", (done) => {
		done()
		// listenToChangedState(
		// 	store,
		// 	[{
		// 		index: 1,
		// 		rules: [{
		// 			expect: "ui.sidePanel.toggled",
		// 			toBe: true,
		// 		}, {
		// 			expect: "ui.sidePanel.isLoading",
		// 			toBe: false,
		// 		}, {
		// 			expect: "ui.sidePanel.content",
		// 			toBe: { type: "ADD_PERSON_FORM" },
		// 		}],
		// 	}],
		// 	done,
		// )
		// tslint:disable-next-line: no-any
		// store.dispatch<any>(openAddPersonForm())
	})

	it("should add a person to the network when form is submitted without 'mutualRelation' field", (done) => {
		const person = {
			name: "Georges Cosson",
			job: "Web Dev",
		}
		expectPersonToBeAdded(person, undefined, done)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(submitAddPersonForm(person, undefined))
	})

	it("should add a person to the network when form is submitted with 'mutualRelation' field", (done) => {
		const mutualRelation: IPerson = { id: "1", name: "Caroline" }
		const newPerson = { name: "Georges" }
		expectPersonToBeAdded(newPerson, mutualRelation.id, done)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(submitAddPersonForm(newPerson, mutualRelation.id))
	})

	it("should track the saving state", (done) => {
		const person = {
			name: "Georges Cosson",
			job: "Web Dev",
		}
		listenToChangedState(
			store,
			[{
				index: 1,
				rules: [{
					expect: "ui.sidePanel.isLoading",
					toBe: true,
				}]
			}, {
				index: 3,
				rules: [{
					expect: "ui.sidePanel.isLoading",
					toBe: false,
				}]
			}],
			done,
		)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(submitAddPersonForm(person))
	})

	// it("should close the side panel on successful save")

	const expectPersonToBeAdded = (person: Partial<IPerson>, mutualRelationId: string | undefined, done: () => void) => {
		let counter = 1
		store.subscribe(() => {
			if (counter === 2) {
				const state = store.getState()
				expect(state.network.data?.persons).toHaveLength(3)
				expect(state.network.data?.persons[state.network.data?.persons.length - 1].name).toEqual(person.name)
				expect(state.network.data?.relationships).toHaveLength(2)
				if (mutualRelationId) {
					expect(state.network.data?.relationships[state.network.data?.relationships.length - 1].source).toBe(mutualRelationId)
				}
				done()
			}
			counter++
		})
	}
})