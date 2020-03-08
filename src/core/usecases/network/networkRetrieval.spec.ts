import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { retrieveNetwork } from "./networkRetrieval"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"
import { persons, relationships } from "../../../data.json"
import { listenToChangedState } from "../../../test.utils"

describe("Network retrieval", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => { 
		networkGateway = new InMemoryNetworkGateway()
		store = configureStore({ networkGateway })
	})

	it("should retrieve network without persons and relationships", (done) => {
		listenToChangedState(
			store,
			[{
				index: 2,
				rules: [{
					expect: "network.fetching",
					toBe: false,
				}, {
					expect: "network.data",
					toBe: { persons: [], relationships: [] },
				}]
			}],
			done,
		)
		retrieve()
	})

	it("should retrieve a network with persons and relationships", done => {
		const network = { persons, relationships }
		networkGateway.feedWith(network)
		listenToChangedState(
			store,
			[{
				index: 2,
				rules: [{
					expect: "network.fetching",
					toBe: false,
				}, {
					expect: "network.data",
					toBe: network,
				}]
			}],
			done,
		)
		retrieve()
	})

	it("should track the network retrieval", done => {
		listenToChangedState(
			store,
			[{
				index: 1,
				rules: [{
					expect: "network.fetching",
					toBe: true,
				}]
			},
			{
				index: 2,
				rules: [{
					expect: "network.fetching",
					toBe: false,
				}]
			}],
			done,
		)
		retrieve()
	})

	it("should track the network retrieval", done => {
		listenToChangedState(
			store,
			[{
				index: 1,
				rules: [{
					expect: "network.fetching",
					toBe: true,
				}, {
					expect: "network.data",
					toBe: null,
				}]
			}],
			done
		)
		retrieve()
	})


	const retrieve = () => {
		// tslint:disable-next-line: no-any
		store.dispatch<any>(retrieveNetwork())
	}
})