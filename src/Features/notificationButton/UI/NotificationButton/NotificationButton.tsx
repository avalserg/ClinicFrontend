/* eslint-disable react/display-name */
import { memo, useCallback, useState } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./NotificationButton.module.scss";
import { NotificationList } from "@/Entities/Notification";

import NotificationIcon from "@/Shared/Assets/Icons/notification.svg";
import { Drawer } from "@/Shared/UI/Drawer";
import { Icon } from "@/Shared/UI/Icon";
import { Popover } from "@/Shared/UI/Popups";

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo((props: NotificationButtonProps) => {
  const { className } = props;
  const [isOpen, setIsOpen] = useState(false);
  const onOpenDrawer = useCallback(() => {
    setIsOpen(true);
  }, []);
  const onCloseDrawer = useCallback(() => {
    setIsOpen(false);
  }, []);
  const trigger = (
    <Icon Svg={NotificationIcon} clickable onClick={onOpenDrawer} />
  );
  return (
    <div>
      <BrowserView>
        <Popover
          className={classNames(cls.NotificationButton, {}, [className])}
          direction={"bottom left"}
          trigger={trigger}
        >
          <NotificationList className={cls.notifications} />
        </Popover>
      </BrowserView>
      <MobileView>
        {trigger}
        <Drawer isOpen={isOpen} onClose={onCloseDrawer}>
          <NotificationList />
        </Drawer>
      </MobileView>
    </div>
  );
});
