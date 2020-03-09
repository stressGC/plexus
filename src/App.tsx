import React from "react"

import "bootstrap/dist/css/bootstrap.min.css"
import "./adapters/primaries/styles/index.sass"

import { Switch, Route, BrowserRouter } from "react-router-dom"
import { Network } from "./adapters/primaries/web/network/network.component"
import { Navbar } from "./adapters/primaries/web/navbar/navbar.component"
import { SidePanel } from "./adapters/primaries/web/side-panel/side-panel.component"
import PersonNode from "./adapters/primaries/web/person-node/person-node.component"

const Settings = () => <p>Coming soon...</p>

class ErrorBoundary extends React.Component<{}, { hasError: boolean }> {
	constructor(props: {}) {
		super(props)
		this.state = { hasError: false }
	}

	static getDerivedStateFromError() {
		return { hasError: true }
	}

	public render() {
		if (this.state.hasError) {
			return <h1>Something went wrong.</h1>
		}
		return this.props.children
	}
}

const App: React.FunctionComponent<{}> = () => (
	<ErrorBoundary>
		<BrowserRouter>
			<Navbar />
			<main className="container-fluid">
				<div className="row" style={{ minHeight: "100vh" }}>
					<div className="col-md-8" style={{ height: "100%" }}>
						<Switch>
							<Route exact={true} path="/" component={Network}/>
							<Route exact={true} path="/settings" component={Settings}/>
							<Route exact={true} path="/test" component={PersonNode}/>
						</Switch>
					</div>
					<div className="col-md-4">
						<SidePanel />
					</div>
				</div>
			</main>
		</BrowserRouter>
	</ErrorBoundary>
)

export default App
