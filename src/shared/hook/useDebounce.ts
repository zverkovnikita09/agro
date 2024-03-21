import { useEffect, useMemo } from "react";
import { useLatest } from "./useLatest";
import { debounce } from 'lodash-es'

export const useDebounce = (cb: (...args: any[]) => any, ms: number) => {
  const latestCb = useLatest(cb);

  const debouncedFn = useMemo(
    () =>
      debounce((...args) => {
        latestCb.current(...args);
      }, ms),
    [ms, latestCb]
  );

  useEffect(() => () => debouncedFn.cancel(), [debouncedFn]);

  return debouncedFn;
}