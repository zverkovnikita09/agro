import { setDocTitle } from "@shared/lib/setDocTitile"
import { useEffect } from "react"

export const useSetDocumentTitle = (title: string) => {
  useEffect(() => {
    if (title) {
      setDocTitle(title)
    }
  }, [title])
}