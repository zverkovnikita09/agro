import { useEffect } from "react";
import { useEvent } from "./useEvent"

export const useDocumentEvent = (event: string, cb: (e: any) => void, condition: boolean = true) => {
  const eventCb = useEvent(cb);

  useEffect(() => {
    if (condition) {
      document.addEventListener(event, eventCb);
    }

    return () => document.removeEventListener(event, eventCb);
  }, [condition])
}