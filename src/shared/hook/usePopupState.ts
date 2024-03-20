import { useCallback, useState } from "react"

export const usePopupState = (defaultValue: boolean = false) => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const openPopup = useCallback(() => {
    setIsOpen(true)
  }, [])

  const closePopup = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, openPopup, closePopup }
}