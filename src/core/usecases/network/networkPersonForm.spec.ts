import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"
import { openAddPersonForm, submitAddPersonForm } from "./networkPersonForm"
import IPerson from "../../models/Person"
import { listenToChangedState } from "../../../test.utils"

describe("Network person adding", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => {
		networkGateway = new InMemoryNetworkGateway()
		store = configureStore({ networkGateway })
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

	it("should add a person to the network when form is submitted", (done) => {
		const person = {
			name: "Georges Cosson",
			job: "Web Dev",
		}
		expectPersonToBeAdded(person, done)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(submitAddPersonForm(person))
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

	const expectPersonToBeAdded = (person: Partial<IPerson>, done: () => void) => {
		let counter = 1
		store.subscribe(() => {
			if (counter === 2) {
				const state = store.getState()
				expect(state.network.data?.persons).toHaveLength(1)
				expect(state.network.data?.relationships).toHaveLength(1)
				expect(state.network.data?.persons[0].name).toEqual(person.name)
				done()
			}
			counter++
		})
	}
})