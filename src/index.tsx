import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { createStore, applyMiddleware } from "redux"
import { mainReducer, defaultState } from "./reducers"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

import Root from "./views"
import { Router } from "react-router-dom"
import history from "./utils/history"

const store = createStore(
	mainReducer,
	defaultState(),
	composeWithDevTools(
		applyMiddleware(thunk),
	),
)

ReactDOM.render(
	(
		<Provider store={store}>
			<Router history={history}>
				<Root />
			</Router>
		</Provider>
	),
	document.getElementById("root"),
)
