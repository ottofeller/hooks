import {createElement, ReactElement, useCallback, useState} from 'react'
import usePortal from 'react-useportal'
const useAction = (fn, args) => useCallback(() => fn(args), [fn, args])

export function usePopup(initial = false) {
  const [isShown, setIsShown] = useState(initial)
  const {Portal} = usePortal()

  const Popup = useCallback(
    (props: {children: ReactElement}) => isShown ? createElement(Portal, null, props.children) : null,
    [Portal, isShown],
  )

  return {
    hide  : useAction(setIsShown, false),
    isShown,
    Popup,
    show  : useAction(setIsShown, true),
    toggle: useAction(setIsShown, !isShown),
  }
}
