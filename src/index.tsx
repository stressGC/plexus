import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { configureStore } from "./store"
import { InMemoryNetworkGateway } from "./adapters/secondaries/InMemoryNetworkGateway"
import { relationships, persons } from "./data.json"
import App from "./App"

const networkGateway = new InMemoryNetworkGateway()
networkGateway.feedWith({ relationships, persons })

const store = configureStore({ networkGateway })

ReactDOM.render(
	(
		<Provider store={store}>
			<App />
		</Provider>
	),
	document.getElementById("root"),
)
