import {useState} from 'react'

export const useLocalStorage = <S>(key: string, initialValue?: S): [S, React.Dispatch<React.SetStateAction<S>>] => {
  const [storedValue, setStoredValue] = useState<S>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch(error) {
      return initialValue
    }
  })

  const setValue = (value: React.SetStateAction<S>) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch(error) {}
  }

  return [storedValue, setValue]
}
