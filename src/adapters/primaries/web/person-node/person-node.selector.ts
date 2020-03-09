import { IAppState } from "../../../../store/appState"

export const getPersonByIdSelector = (state: IAppState, id: string) => {
	console.log(state)
	return state.network.data?.persons.find((person) => person.id === id)
}
