import { useCallback, useState } from "react"

export const useToggleDropdown = (defaultValue?: boolean) => {
  const [isOpen, setIsOpen] = useState(defaultValue ?? false);

  const onToggle = useCallback(() => {
    setIsOpen(pr => !pr)
  }, [])

  return [isOpen, onToggle] as const;
}