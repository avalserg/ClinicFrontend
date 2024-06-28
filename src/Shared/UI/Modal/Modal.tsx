import { type ReactNode } from "react";
import { Mods, classNames } from "@/Shared/lib/classNames/classNames";
import { useModal } from "@/Shared/lib/hooks/useModal/useModal";
import { Overlay } from "../Overlay/Overlay";
import Portal from "../Portal/Portal";
import cls from "./Modal.module.scss";
import { useTheme } from "@/Shared/lib/hooks/useTheme/useTheme";

interface ModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  lazy?: boolean;
}
const ANIMATION_DELAY = 300;

export const Modal = ({
  className,
  children,
  isOpen,
  onClose,
  lazy,
}: ModalProps) => {
  const { close, isClosing, isMounted } = useModal({
    animationDelay: ANIMATION_DELAY,
    onClose,
    isOpen,
  });
  const { theme } = useTheme();
  const mods: Mods = {
    [cls.opened]: isOpen,
    [cls.isClosing]: isClosing,
  };
  // проверяем открывалась ли модалка
  if (lazy && !isMounted) {
    // модалку не отрисовываем
    return null;
  }
  return (
    <Portal element={document.getElementById("app") ?? document.body}>
      <div
        className={classNames(cls.Modal, mods, [
          className,
          theme,
          "app_modal",
          cls.modalNew,
        ])}
      >
        <Overlay onClick={close} />
        <div className={cls.content}>{children}</div>
      </div>
    </Portal>
  );
};
