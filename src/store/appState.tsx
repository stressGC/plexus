import INetwork from "../core/models/Network"

export interface IAppState {
	network: INetworkState
	ui: IUIState
}

interface INetworkState {
	fetching: boolean
	data: INetwork | null
	errorMessage?: string
}

interface IUIState {
	sidePanel: {
		toggled: boolean,
		isLoading: boolean,
		content: IAddPersonFormContent | null
	}
}

interface IAddPersonFormContent {
	type: "ADD_PERSON_FORM",
	mutualRelationId: string | undefined
}
