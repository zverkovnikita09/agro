import { useEffect } from "react";
import { useEvent } from "./useEvent"

export const useDocumentEvent = (event: string, cb: (e: any) => void, condition?: boolean) => {
  const eventCb = useEvent(cb);

  useEffect(() => {
    if (condition === undefined) {
      document.addEventListener(event, eventCb);
    }

    if (condition) {
      document.addEventListener(event, eventCb);
    }

    return () => document.removeEventListener(event, eventCb);
  }, [condition])
}