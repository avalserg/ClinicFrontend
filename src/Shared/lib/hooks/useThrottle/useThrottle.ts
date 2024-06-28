import { useCallback, useRef } from "react";
// optimize often call events
export function useThrottle(callback: (...args: any[]) => void, delay: number) {
  // call or not
  const throttleRef = useRef(false);
  return useCallback(
    (...args: any[]) => {
      if (!throttleRef.current) {
        callback(...args);
        throttleRef.current = true;
        setTimeout(() => {
          throttleRef.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
}
