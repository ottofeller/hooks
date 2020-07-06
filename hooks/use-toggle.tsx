import {useCallback, useState} from 'react'

const useAction = (fn, args) => useCallback(() => fn(args), [fn, args])

export function useToggle(initial = false) {
  const [isOn, setIsOn] = useState(initial)

  return {
    isOn     : isOn,
    toggle   : useAction(setIsOn, !isOn),
    toggleOff: useAction(setIsOn, false),
    toggleOn : useAction(setIsOn, true),
  }
}
