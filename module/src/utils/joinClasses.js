/**
  * ORIGINAL: Copyright (c) Meta Platforms, Inc. and affiliates.
 * Modified by PragmaFlow, Inc for use in Noodl
 *
 */

export default function joinClasses(
  ...args
) {
  return args.filter(Boolean).join(' ')
}
