import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { retrieveNetwork } from "./networkRetrieval"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"

const initialState: IAppState = {
	network: {
		fetching: false,
		data: null,
	},
	ui: {
		sidePanel: {
			toggled: false,
			isLoading: false,
			content: null,
		},
	}
}

describe("Restaurants retrieval", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => {
		networkGateway = new InMemoryNetworkGateway()
		store = configureStore({ networkGateway })
	})

	it("should retrieve network without persons and relationships", (done) => {
		listenToChangedState({
			...initialState,
			network: {
				fetching: false,
				data: {
					persons: [],
					relationships: [],
				},
			}
		}, done, 2)
		retrieve()
	})

	// it("should retrieve some restaurants", done => {
	// 	restaurantGateway.feedWith([{name: "The Shine"}])
	// 	listenToChangedState(({
	// 			restaurants: {
	// 				data: [{name: "The Shine"}],
	// 				fetching: false
	// 			}
	// 		}), done, 2
	// 	)
	// 	retrieve()
	// })

	// it("should track the restaurants retrieval", done => {
	// 	listenToChangedState(({
	// 			restaurants: {
	// 				data: [],
	// 				fetching: true
	// 			}
	// 		}), done, 1
	// 	)
	// 	retrieve()
	// })

	const retrieve = () => {
		// tslint:disable-next-line: no-any
		store.dispatch<any>(retrieveNetwork())
	}

	const listenToChangedState = (expectedState: IAppState, done: () => void, actionPosition: number) => {
		let counter = 1
		store.subscribe(() => {
			if (counter === actionPosition) {
				expect(store.getState()).toEqual(expectedState)
				done()
			}
			counter++
		})
	}

})