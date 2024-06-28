import { useEffect } from "react";
// отрабатывает 1 раз при монтировании поэтому []
export function useInitialEffect(callback: () => void) {
  useEffect(() => {
    // for testing and storybook
    if (__PROJECT__ !== "storybook" && __PROJECT__ !== "jest") {
      callback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
