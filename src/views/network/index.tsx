import React from "react"
import { Graph } from "react-d3-graph"
import { connect } from "react-redux"
import { AppState } from "../../reducers"
import { actionFetchNetwork } from "../../actions/network"
import { INetworkState } from "../../reducers/network"

// the graph configuration, you only need to pass down properties
// that you want to override, otherwise default ones will be used
const myConfig = {
	nodeHighlightBehavior: true,
	linkHighlightBehavior: true,
	highlightDegree: 2,
	highlightOpacity: 0.2,
	node: {
		labelProperty: "name",
		color: "#d3d3d3",
		fontColor: "black",
		fontSize: 14,
		fontWeight: "normal",
		highlightColor: "red",
		highlightFontSize: 14,
		highlightStrokeColor: "red",
		highlightStrokeWidth: 1.5,
		mouseCursor: "pointer",
		opacity: 0.9,
		size: 200,
		strokeColor: "none",
		strokeWidth: 1.5,
		symbolType: "circle",
		renderLabel: false,
	},
	link: {
		highlightColor: "red",
	},
}

interface INetworkProps extends INetworkState{
	loadData: () => () => void,
}

class Network extends React.Component<INetworkProps> {
	constructor(props: INetworkProps) {
		super(props)
	}

	componentDidMount() {
		if (this.props.state === "INIT") {
			this.props.loadData()
		}
	}

	public render = () => {
		if (this.props.state === "ERROR") {
			return <p>Error: {this.props.errorMessage}</p>
		}
		if (this.props.state === "LOADING" || !this.props.network) {
			return <p>GRAPH LOADING...</p>
		}
		if (this.props.state === "LOADED") {
			return (
				<div style={{ backgroundColor: "grey" }}>
					<Graph
						id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
						data={{
							nodes: this.props.network.persons,
							links: this.props.network.relationships,
						}}
						config={myConfig}
					/>
				</div>
			)
		}
		return null
	}
}

const mapStateToProps = (state: AppState, _ownProps: INetworkProps) => {
	// TODO: Use state to fill the props of the component
	return {
		...state.network
	}
}

const mapDispatchToProps = (dispatch: any) => { // tslint:disable-line
	return {
		loadData: () => dispatch(actionFetchNetwork())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Network)
