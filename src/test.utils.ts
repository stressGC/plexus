import { IAppState } from "./store/appState"
import { Store } from "redux"
import get from "lodash/get"

interface IExpectation {
	index: number,
	rules: IRule[],
}

interface IRule {
	expect: string,
	toBe: unknown
}

export const listenToChangedState = (
	store: Store<IAppState>,
	expectations: IExpectation[],
	done: () => void,
) => {
	let counter = 1
	const maxIndex = expectations.reduce((max, { index }) => Math.max(max, index), 0)

	store.subscribe(() => {
		const expectation = expectations.find(({ index }) => index === counter)
		if (expectation) {
			const state = store.getState()
			expectation.rules.forEach((exp) => {
				expect(get(state, exp.expect)).toEqual(exp.toBe)
			})
		}
		if (counter >= maxIndex) {
			done()
		}
		counter++
	})
}
