/* eslint-disable @typescript-eslint/indent */
import {
  useEffect,
  useCallback,
  MutableRefObject,
  useRef,
  useState,
} from "react";

interface UseModalProps {
  onClose?: () => void;
  isOpen?: boolean;
  animationDelay?: number;
}
/**
 * Переиспользуемый хук для модальных компонентов drawer/modal
 * @param param0
 * @returns
 */
export function useModal({ animationDelay, isOpen, onClose }: UseModalProps) {
  const [isClosing, setIsClosing] = useState(false);
  // вмонтирована модалка в DOM или нет
  const [isMounted, setIsMounted] = useState(false);
  // ReturnType construction
  const timeRef = useRef<ReturnType<typeof setTimeout>>() as MutableRefObject<
    ReturnType<typeof setTimeout>
  >;
  // bad
  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);
  const close = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timeRef.current = setTimeout(() => {
        onClose();
        // after closing return state to false
        setIsClosing(false);
      }, animationDelay);
    }
  }, [animationDelay, onClose]);
  // new references after next rerender
  // useCallback - memoization function if array not change
  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    },
    [close],
  );
  // timers intervals clear
  useEffect(() => {
    if (isOpen) {
      window.addEventListener("keydown", onKeyDown);
    }
    // functions for clear after destroyed
    return () => {
      clearTimeout(timeRef.current);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onKeyDown]);
  return {
    isClosing,
    isMounted,
    close,
  };
}
