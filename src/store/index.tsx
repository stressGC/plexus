import { createStore, applyMiddleware, combineReducers } from "redux"
import network from "./reducers/network.reducer"
import ui from "./reducers/ui.reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk, { ThunkMiddleware } from "redux-thunk"
import { INetworkGateway } from "../core/gateways/network.gateway"
import { IAppState } from "./appState"
import { IAllActions } from "./actions"

export interface IAppDependencies {
	networkGateway: INetworkGateway,
}

export const configureStore = (dependencies: IAppDependencies) => createStore(
	combineReducers({
		network,
		ui,
	}),
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument<IAppDependencies>(dependencies) as ThunkMiddleware<IAppState, IAllActions, IAppDependencies>),
	),
)
