/* eslint-disable react/display-name */
import { memo } from "react";
import cls from "./NotificationItem.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { Notification } from "../../Model/types/notification";
import { Text } from "@/Shared/UI/Text";
import { Card } from "@/Shared/UI/Card";

interface NotificationItemProps {
  className?: string;
  item: Notification;
}

export const NotificationItem = memo((props: NotificationItemProps) => {
  const { className, item } = props;
  const content = (
    <Card
      // variant="outlined"
      className={classNames(cls.NotificationItem, {}, [className])}
    >
      <Text title={item.title} text={item.description} />
    </Card>
  );
  if (item.href) {
    return (
      <a
        className={cls.link}
        target={"_blank"}
        rel="noreferrer"
        href={item.href}
      >
        {content}
      </a>
    );
  }
  return content;
});
