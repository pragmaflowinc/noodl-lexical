/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */


import * as React from 'react'

import joinClasses from '../utils/joinClasses'

export default function Button({
  'data-test-id': dataTestId,
  children,
  className,
  onClick,
  disabled,
  small,
  title
}) {
  return (
    <button
      disabled={disabled}
      className={joinClasses(
        'Button__root',
        disabled && 'Button__disabled',
        small && 'Button__small',
        className
      )}
      onClick={onClick}
      title={title}
      aria-label={title}
      {...(dataTestId && { 'data-test-id': dataTestId })}>
      {children}
    </button>
  )
}
