import {useEffect, useState} from 'react'

/**
 * Detects a client side render.
 *
 * @remarks
 * The useEffect(() => ..., []) will be called right after hydration and after React renders the client side and compares it to the server side rendered tree. Thus there will be not warning messages from React.
 */
export function useIsClientSide(): {isClientSide: boolean} {
  const [isClientSide, setIsClientSide] = useState(false)

  useEffect(() => {
    setIsClientSide(true)
  }, [])

  return {isClientSide}
}
