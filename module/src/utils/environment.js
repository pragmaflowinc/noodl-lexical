/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */
export const CAN_USE_DOM =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined'

const documentMode =
  CAN_USE_DOM && 'documentMode' in document ? document.documentMode : null

export const IS_APPLE =
  CAN_USE_DOM && /Mac|iPod|iPhone|iPad/.test(navigator.platform)

export const IS_FIREFOX =
  CAN_USE_DOM && /^(?!.*Seamonkey)(?=.*Firefox).*/i.test(navigator.userAgent)

export const CAN_USE_BEFORE_INPUT =
  CAN_USE_DOM && 'InputEvent' in window && !documentMode
    ? 'getTargetRanges' in new window.InputEvent('input')
    : false

export const IS_SAFARI =
  CAN_USE_DOM && /Version\/[\d.]+.*Safari/.test(navigator.userAgent)

export const IS_IOS =
  CAN_USE_DOM &&
  /iPad|iPhone|iPod/.test(navigator.userAgent) &&
  !window.MSStream

// Keep these in case we need to use them in the future.
// export const IS_WINDOWS: boolean = CAN_USE_DOM && /Win/.test(navigator.platform);
export const IS_CHROME =
  CAN_USE_DOM && /^(?=.*Chrome).*/i.test(navigator.userAgent)
// export const canUseTextInputEvent: boolean = CAN_USE_DOM && 'TextEvent' in window && !documentMode;
