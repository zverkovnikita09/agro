import { useLayoutEffect, useRef } from "react";

export const useLatest = (value: any) => {
  const latestValue = useRef(value);

  useLayoutEffect(() => {
    latestValue.current = value;
  });

  return latestValue;
}