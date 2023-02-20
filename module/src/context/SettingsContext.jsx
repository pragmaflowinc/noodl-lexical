/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import * as React from 'react'
import {
  createContext,
  useReducer,
  useContext
} from 'react'

const initialState = {}

const SettingsStateContext = createContext(initialState)
const SettingsDispatcherContext = createContext(() => null)

function settingsReducer(state, action) {
  switch (action.type) {
    case 'setEditableContentRef':
      return { ...state, editableContentRef: action.editableContentRef }
    default:
      return state
  }
}

export function SettingsProvider({ children }) {
  const [settingsState, settingsDispatcher] = useReducer(settingsReducer, initialState)

  return (
    <SettingsDispatcherContext.Provider value={settingsDispatcher}>
      <SettingsStateContext.Provider value={settingsState}>
        {children}
      </SettingsStateContext.Provider>
    </SettingsDispatcherContext.Provider>
  )
}

export function useSettings() {
  return [useContext(SettingsStateContext), useContext(SettingsDispatcherContext)]
}
