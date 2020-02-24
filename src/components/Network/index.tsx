import React from "react"
import { Graph } from "react-d3-graph"
import data from "./data.json"
import { IPerson, IRelationship } from "../../types/plexus.js"

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
		renderLabel: true,
		size: 200,
		strokeColor: "none",
		strokeWidth: 1.5,
		symbolType: "circle",
	},
	link: {
		highlightColor: "red",
	},
}

interface INetworkState {
	persons: IPerson[],
	relationships: IRelationship[],
	personHighlight: IPerson | null,
}

class Network extends React.Component<{}, INetworkState> {
	constructor(props: {}) {
		super(props)
		this.state = {
			...data,
			personHighlight: null,
		}
	}

	public render = () => {
		console.log(this.state)
		return (
			<div style={{ backgroundColor: "grey" }}>
				<Graph
					id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
					data={{
						nodes: this.state.persons,
						links: this.state.relationships,
					}}
					config={myConfig}
					onClickNode={this._onPersonClick}
					onClickGraph={this._onClickGraph}
					onClickLink={this._onClickLink}
					// onDoubleClickNode={this._onDoubleClickNode}
					// onRightClickNode={this._onRightClickNode}
					// onRightClickLink={this._onRightClickLink}
					// onMouseOverNode={this._onMouseOverNode}
					// onMouseOutNode={this._onMouseOutNode}
					// onMouseOverLink={this._onMouseOverLink}
					// onMouseOutLink={this._onMouseOutLink}
					// onNodePositionChange={this._onNodePositionChange}
				/>
			</div>
		)
	}

	private _onPersonClick = (personId: string) => {
		console.log(`Clicked person ${personId}`)
		const person = this.state.persons.find((pers) => pers.id.toString() === personId)
		if (!person) {
			return
		}
		this.setState({
			personHighlight: person,
		})
	}

	private _onClickLink = (source: string, target: string) => {
		console.log(`Clicked link between ${source} and ${target}`)
	}

	private _onClickGraph = () => {
		console.log("Clicked the graph background")
		this.setState({
			personHighlight: null,
		})
	}
	// graph event callbacks


	// private _onDoubleClickNode = (nodeId: string) => {
	// 	console.log(`Double clicked node ${nodeId}`)
	// }

	// private _onRightClickNode = (_event: string, nodeId: string) => {
	// 	console.log(`Right clicked node ${nodeId}`)
	// }

	// private _onMouseOverNode = (nodeId: string) => {
	// 	console.log(`Mouse over node ${nodeId}`)
	// }

	// private _onMouseOutNode = (nodeId: string) => {
	// 	console.log(`Mouse out node ${nodeId}`)
	// }


	// private _onRightClickLink = (_event: string, source: string, target: string) => {
	// 	console.log(`Right clicked link between ${source} and ${target}`)
	// }

	// private _onMouseOverLink = (source: string, target: string) => {
	// 	console.log(`Mouse over in link between ${source} and ${target}`)
	// }

	// private _onMouseOutLink = (source: string, target: string) => {
	// 	console.log(`Mouse out link between ${source} and ${target}`)
	// }

	// private _onNodePositionChange = (nodeId: string, x: number, y: number) => {
	// 	console.log(`Node ${nodeId} is moved to new position. New position is x= ${x} y= ${y}`)
	// }
}

export default Network
