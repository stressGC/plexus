import { createStore, applyMiddleware, AnyAction, combineReducers } from "redux"
import network from "./reducers/network.reducer"
import ui from "./reducers/ui.reducer"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk, { ThunkMiddleware } from "redux-thunk"
import { IAppState } from "./appState"


export const configureStore = (dependencies: unknown) => createStore(
	combineReducers({
		network,
		ui,
	}),
	composeWithDevTools(
		applyMiddleware(thunk.withExtraArgument(dependencies as ThunkMiddleware<IAppState, AnyAction>)),
	),
)
