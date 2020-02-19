import {useCallback, useState} from 'react'

const useAction = (fn, args) => useCallback(() => fn(args), [fn, args])

export function usePopup(initial = false) {
  const [isShown, setIsShown] = useState(initial)

  return {
    hide   : useAction(setIsShown, false),
    isShown: isShown,
    show   : useAction(setIsShown, true),
    toggle : useAction(setIsShown, !isShown),
  }
}
