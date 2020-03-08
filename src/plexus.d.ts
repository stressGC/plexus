import { ActionCreator, Dispatch } from "redux"
import { ThunkAction } from "redux-thunk"
import { IAppState } from "./store/appState"
import { IAppDependencies } from "./store"
import { IAllActions } from "./store/actions"

export type IActionCreator = ActionCreator<ThunkAction<void, IAppState, IAppDependencies, IAllActions>>

export type IDispatch = Dispatch<IAllActions>
