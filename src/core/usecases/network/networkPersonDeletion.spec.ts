import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"
import { retrieveNetwork } from "./networkRetrieval"
import { deletePerson } from "./networkPersonDeletion"
import { persons, relationships } from "../../../data.json"

describe("Network person deletion", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => {
		networkGateway = new InMemoryNetworkGateway()
		networkGateway.feedWith({ persons, relationships })
		store = configureStore({ networkGateway })
		// tslint:disable-next-line: no-any
		store.dispatch<any>(retrieveNetwork())
	})

	it("should delete a person", (done) => {
		const personId = "3"
		expectPersonToBeDeleted(personId, done)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(deletePerson(personId))
	})

	// it("should track the saving state", (done) => {
	// 	const person = {
	// 		name: "Georges Cosson",
	// 		job: "Web Dev",
	// 	}
	// 	listenToChangedState(
	// 		store,
	// 		[{
	// 			index: 1,
	// 			rules: [{
	// 				expect: "ui.sidePanel.isLoading",
	// 				toBe: true,
	// 			}]
	// 		}, {
	// 			index: 3,
	// 			rules: [{
	// 				expect: "ui.sidePanel.isLoading",
	// 				toBe: false,
	// 			}]
	// 		}],
	// 		done,
	// 	)
	// 	// tslint:disable-next-line: no-any
	// 	store.dispatch<any>(submitAddPersonForm(person))
	// })

	const expectPersonToBeDeleted = (personId: string, done: () => void) => {
		store.subscribe(() => {
			const state = store.getState()
			expect(state.network.data?.persons).toHaveLength(2)
			expect(state.network.data?.relationships).toHaveLength(1)
			expect(state.network.data?.relationships.find((relation) => relation.source === personId || relation.target === personId)).toBeFalsy()
			expect(state.network.data?.persons.find((person) => person.id === personId)).toBeFalsy()
			done()
		})
	}
})