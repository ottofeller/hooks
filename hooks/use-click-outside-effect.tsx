import {RefObject, useCallback, useEffect} from 'react'

// Run a callback if a click happens outside of the desired area
export const useClickOutsideEffect = (params: {
  callback: () => any
  nodeRef: RefObject<HTMLElement>
  toggleNodeRef: RefObject<HTMLElement>
}) => {
  const handleClickOutsideDatesPopup = useCallback(event => {
    if(
      params.toggleNodeRef.current &&
      params.nodeRef.current &&
      !params.toggleNodeRef.current.contains(event.target) &&
      !params.nodeRef.current.contains(event.target)
    ) {
      params.callback()
    }
  }, [params])

  useEffect(() => {
    if(typeof document === 'undefined') {
      return
    }

    document.addEventListener('click', handleClickOutsideDatesPopup, true)

    return () => {
      document.removeEventListener('click', handleClickOutsideDatesPopup, true)
    }
  }, [handleClickOutsideDatesPopup])
}
