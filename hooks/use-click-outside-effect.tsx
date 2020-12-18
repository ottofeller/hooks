import {RefObject, useCallback, useEffect} from 'react'

/**
 * Runs a callback if a click happens outside of the desired area
 *
 * @param nodeRef - a ref to the node clicking outside which is considered as an outside click
 * @param toggleNodeRef - a ref to the node which toggles visibility of the node (above). Clicking toggleNode will not trigger a callback call.
 */
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
