/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

import * as React from 'react'

export function DialogButtonsList({ children }) {
  return <div className="DialogButtonsList">{children}</div>
}

export function DialogActions({
  'data-test-id': dataTestId,
  children
}) {
  return (
    <div className="DialogActions" data-test-id={dataTestId}>
      {children}
    </div>
  )
}
