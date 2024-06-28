import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type SpringType = typeof import("@react-spring/web");
type GestureType = typeof import("@use-gesture/react");

interface AnimationContextPayload {
  Gesture?: GestureType;
  Spring?: SpringType;
  isLoaded?: boolean;
}

const AnimationContext = createContext<AnimationContextPayload>({});
// lazy imports this libraries depends each other
// параллельная загрузка Promise.all
const getAsyncAnimationModules = async () => {
  // eslint-disable-next-line no-return-await
  return await Promise.all([
    import("@react-spring/web"),
    import("@use-gesture/react"),
  ]);
};

export const useAnimationsLibs = () => {
  // as Required<AnimationContextPayload> чтобы не делать каждый раз проверку на unndeffined
  return useContext(AnimationContext) as Required<AnimationContextPayload>;
};
// оборачиваем им то, где используем эти библиотеки
export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  // доступ к значениям без лишних перерисовок
  const SpringRef = useRef<SpringType>();
  const GestureRef = useRef<GestureType>();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line no-void
    void getAsyncAnimationModules().then(([Spring, Gesture]) => {
      SpringRef.current = Spring;
      GestureRef.current = Gesture;
      setIsLoaded(true);
    });
  });
  // один и тот же объект
  const value = useMemo(
    () => ({
      Gesture: GestureRef.current,
      Spring: SpringRef.current,
      isLoaded,
    }),
    [isLoaded],
  );
  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
};
