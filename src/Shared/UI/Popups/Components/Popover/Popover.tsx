/* eslint-disable react/display-name */
// H- headless
import { ReactNode, memo } from "react";
import { Popover as HPopover } from "@headlessui/react";
import cls from "./Popover.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { DropdownDirection } from "@/Shared/Types/ui";
import { mapDirectionClass } from "../../styles/consts";
import popupCls from "../../styles/popup.module.scss";

interface PopoverProps {
  className?: string;
  trigger: ReactNode;
  direction?: DropdownDirection;
  // content
  children: ReactNode;
}

export const Popover = memo((props: PopoverProps) => {
  const { className, trigger, direction = "bottom right", children } = props;
  const menuClasses = [mapDirectionClass[direction], popupCls.menu];

  return (
    <HPopover
      className={classNames(cls.Popover, {}, [className, popupCls.popup])}
    >
      <HPopover.Button as={"div"} className={popupCls.trigger}>
        {trigger}
      </HPopover.Button>
      <HPopover.Panel className={classNames(cls.panel, {}, menuClasses)}>
        {children}
      </HPopover.Panel>
    </HPopover>
  );
});
