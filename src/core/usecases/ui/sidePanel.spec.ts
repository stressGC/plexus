import { InMemoryNetworkGateway } from "../../../adapters/secondaries/InMemoryNetworkGateway"
import { Store } from "redux"
import { IAppState } from "../../../store/appState"
import { configureStore } from "../../../store"
import { listenToChangedState } from "../../../test.utils"
import { toggleSidePanel } from "./sidePanel"

describe("Network retrieval", () => {

	let store: Store<IAppState>
	let networkGateway: InMemoryNetworkGateway

	beforeEach(() => {
		networkGateway = new InMemoryNetworkGateway()
		store = configureStore({ networkGateway })
	})

	it("should toggle the side panel", (done) => {
		listenToChangedState(
			store,
			[{
				index: 1,
				rules: [{
					expect: "ui.sidePanel.toggled",
					toBe: true,
				}],
			}, {
				index: 2,
				rules: [{
					expect: "ui.sidePanel.toggled",
					toBe: false,
				}],
			}],
			done,
		)
		// tslint:disable-next-line: no-any
		store.dispatch<any>(toggleSidePanel())
		// tslint:disable-next-line: no-any
		store.dispatch<any>(toggleSidePanel())
		// tslint:disable-next-line: no-any
		store.dispatch<any>(toggleSidePanel())
	})

})