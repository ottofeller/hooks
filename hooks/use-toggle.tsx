import {Dispatch, SetStateAction, useCallback, useState} from 'react'

const useAction = (
  fn: Dispatch<SetStateAction<boolean>>,
  args: SetStateAction<boolean>,
) => useCallback(() => fn(args), [fn, args])

/**
 * A simple hook for toggling boolean state.
 *
 * @returns
 * A state in `isOn` and methods for updating it.
 */
export function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(initial)

  return {
    isOn     : isOn,
    toggle   : useAction(setIsOn, !isOn),
    toggleOff: useAction(setIsOn, false),
    toggleOn : useAction(setIsOn, true),
  }
}
