import { Action } from "redux"
import { notesListReducer, NotesListState, defaultNoteListState } from "./noteList"
import { networkReducer, INetworkState, defaultNetworkState } from "./network"
import { defaultUiState, IUIState, uiReducer } from "./uiReducer"

export interface AppState {
	list: NotesListState,
	network: INetworkState,
	ui: IUIState,
}

export const defaultState = (): AppState => {
	return {
		list: defaultNoteListState(),
		network: defaultNetworkState(),
		ui: defaultUiState(),
	}
}

export const mainReducer = (state: AppState = defaultState(), action: Action) => ({
	list: notesListReducer(state.list, action),
	network: networkReducer(state.network, action),
	ui: uiReducer(state.ui, action),
})