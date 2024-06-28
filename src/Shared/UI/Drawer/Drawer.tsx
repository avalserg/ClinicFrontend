/* eslint-disable react/display-name */
import { ReactNode, memo, useCallback, useEffect } from "react";
import { classNames } from "@/Shared/lib/classNames/classNames";
import {
  AnimationProvider,
  useAnimationsLibs,
} from "@/Shared/lib/components/AnimationProvider";
import Portal from "../Portal/Portal";
import cls from "./Drawer.module.scss";
import { useTheme } from "@/Shared/lib/hooks/useTheme/useTheme";
import { Overlay } from "../Overlay";

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}
const height = window.innerHeight - 100;
// шторка
/**
 * Устарел используем новые компоненты из папки redesigned
 * @deprecated
 */
export const DrawerContent = memo((props: DrawerProps) => {
  // получаем библиотеки здесь а не через импорты
  const { Spring, Gesture } = useAnimationsLibs();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { className, children, isOpen, onClose, lazy } = props;
  const { theme } = useTheme();
  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));
  // start animation
  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [api, isOpen, openDrawer]);
  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };
  const bind = Gesture.useDrag(
    ({ last, velocity: [, vy], direction: [, dy], offset: [, my], cancel }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else api.start({ y: my, immediate: true });
    },
    {
      from: () => [0, y.get()],
      filterTaps: true,
      bounds: { top: 0 },
      rubberband: true,
    },
  );
  //   const { close, isClosing, isMounted } = useModal({
  //     animationDelay: 300,
  //     onClose,
  //     isOpen,
  //   });
  //   const mods: Mods = {
  //     [cls.opened]: isOpen,
  //     [cls.isClosing]: isClosing,
  //   };
  //   if (lazy && !isMounted) {
  //     return null;
  //   }
  if (!isOpen) {
    return null;
  }
  const display = y.to((py) => (py < height ? "block" : "none"));
  return (
    // телепортируем элемент
    <Portal element={document.getElementById("app") ?? document.body}>
      <div
        className={classNames(cls.Drawer, {}, [
          className,
          theme,
          "app_drawer",
          cls.drawerNew,
        ])}
      >
        <Overlay onClick={close} />
        <Spring.a.div
          className={cls.sheet}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});

const DrawerAsync = (props: DrawerProps) => {
  const { isLoaded } = useAnimationsLibs();
  if (!isLoaded) {
    // or Skeleton spinner
    return null;
  }
  return <DrawerContent {...props} />;
};

export const Drawer = (props: DrawerProps) => {
  return (
    <AnimationProvider>
      <DrawerAsync {...props} />;
    </AnimationProvider>
  );
};
