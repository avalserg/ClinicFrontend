import { createContext, ReactNode, useContext, useMemo, useState } from "react";

const ForceUpdateContext = createContext({
  value: true,
  forceUpdate: () => {},
});

export const useForceUpdate = () => {
  const { forceUpdate } = useContext(ForceUpdateContext);

  return forceUpdate;
};

export function ForceUpdateProvider({ children }: { children: ReactNode }) {
  const [value, setValue] = useState(true);
  // меняем state
  const forceUpdate = () => {
    setValue((prev) => !prev);
    setTimeout(() => {
      setValue((prev) => !prev);
    }, 0);
  };

  const valueContext = useMemo(() => {
    return { value, forceUpdate };
  }, [value]);
  // отрабатывает условие и через  120ms получаем обновленный интерфейс
  if (!value) {
    return null;
  }

  return (
    <ForceUpdateContext.Provider value={valueContext}>
      {children}
    </ForceUpdateContext.Provider>
  );
}
