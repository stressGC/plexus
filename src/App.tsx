import * as React from "react"
import { hot } from "react-hot-loader"


class App extends React.Component<{}> {
	public constructor(props: {}) {
		super(props)

	}

	public render = () => {
		return (
			<h1>HELLO</h1>
		)
	}
}

// TODO: remove when parcel hot module reloading handle this without "module"
declare var module: any // tslint:disable-line
export default hot(module)(App)
