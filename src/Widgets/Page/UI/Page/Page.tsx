/* eslint-disable react/display-name */
import { MutableRefObject, ReactNode, memo, useRef, UIEvent } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import cls from "./Page.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { useInfiniteScroll } from "@/Shared/lib/hooks/useInfiniteScroll/useInfiniteScroll";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUIScrollByPath, uiActions } from "@/Features/UI";
import { useInitialEffect } from "@/Shared/lib/hooks/useInitialEffect/useInitialEffect";
import { StateSchema } from "@/App/Providers/StoreProvider";
import { useThrottle } from "@/Shared/lib/hooks/useThrottle/useThrottle";
import { TestProps } from "@/Shared/Types/tests";

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}
export const PAGE_ID = "PAGE_ID";
// problem loading next part data if 9 blocks visible at start
export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  // get url current page  place before scrollPosition
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getUIScrollByPath(state, pathname),
  );
  useInfiniteScroll({
    triggerRef,
    wrapperRef: undefined,
    callback: onScrollEnd,
  });
  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      // save scroll position
      uiActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 500);

  // меняем не компонент а класс toggleFeatures

  return (
    <main
      ref={wrapperRef}
      className={classNames(cls.PageRedesigned, {}, [className])}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props["data-testid"] || "Page"}
    >
      {children}
      {onScrollEnd ? <div className={cls.trigger} ref={triggerRef} /> : null}
    </main>
  );
});
