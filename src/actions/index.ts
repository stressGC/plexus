import { Action } from "redux"
import { INetworkActions } from "./network"
import { IActionNotes } from "./noteList"
import { IUiActions } from "./ui"
export * from "./network"
export * from "./noteList"
export * from "./admin"
export * from "./ui"

export const isAction = <A extends Action>(action: Action, type: string): action is A => (action.type === type)

export type AppActions = IActionNotes | INetworkActions | IUiActions
