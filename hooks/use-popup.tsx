import {ReactElement, useCallback, useState} from 'react'
const useAction = (fn, args) => useCallback(() => fn(args), [fn, args])

export function usePopup(initial = false) {
  const [isShown, setIsShown] = useState(initial)
  const Popup = useCallback((props: {children: ReactElement}) => isShown ? props.children : null, [isShown])

  return {
    hide  : useAction(setIsShown, false),
    isShown,
    Popup,
    show  : useAction(setIsShown, true),
    toggle: useAction(setIsShown, !isShown),
  }
}
