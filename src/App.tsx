import * as React from "react"
import { hot } from "react-hot-loader"
import Network from "./components/Network"


class App extends React.Component<{}> {
	public constructor(props: {}) {
		super(props)
	}

	public render = () => {
		return (
			<div className="container">
				<h1>Network test</h1>
				<Network />
			</div>
		)
	}
}

// TODO: remove when parcel hot module reloading handle this without "module"
declare var module: any // tslint:disable-line
export default hot(module)(App)
