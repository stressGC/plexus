import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { getNetworkSelector } from "./network.selector"
import { retrieveNetwork } from "../../../../core/usecases/network/networkRetrieval"
import { Graph } from "react-d3-graph"
import PersonNode from "../person-node/person-node.component"
import IPerson from "../../../../core/models/Person"

const networkConfig = {
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
		size: 700,
		strokeColor: "none",
		strokeWidth: 1.5,
		symbolType: "circle",
		renderLabel: false,
		viewGenerator: (person: IPerson) => <PersonNode person={person} />,
	},
	link: {
		highlightColor: "red",
	},
}

export const Network = () => {
	const dispatch = useDispatch()
	const network = useSelector(getNetworkSelector)
	// tslint:disable-next-line: no-any
	useEffect(() => dispatch<any>(retrieveNetwork()), [])
	if (network.errorMessage|| !network.data) {
		return (<h1>{network.errorMessage}</h1>)
	}

	if (network.fetching) {
		return (<h1>LOADING...</h1>)
	}

	return (
		<div style={{ backgroundColor: "grey" }}>
			<Graph
				id="graph-id" // id is mandatory, if no id is defined rd3g will throw an error
				data={{
					nodes: network.data.persons,
					links: network.data.relationships,
				}}
				config={networkConfig}
			/>
		</div>
	)
}
