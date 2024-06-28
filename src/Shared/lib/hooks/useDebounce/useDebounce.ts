import { MutableRefObject, useCallback, useRef } from "react";
/**
 * Хук, который позволяет отменять предыдущий вызов функции пока не истечет delay
 * @param callback
 * @param delay - задержка в мс
 * @returns
 */
// optimize often call events
export function useDebounce(callback: (...args: any[]) => void, delay: number) {
  // call or not
  const timer = useRef() as MutableRefObject<any>;
  return useCallback(
    (...args: any[]) => {
      // while timer is  clearing function not calling
      if (timer.current) {
        clearTimeout(timer.current);
      }
      timer.current = setTimeout(() => {
          callback(...args);
      }, delay);
    },
    [callback, delay],
  );
}
