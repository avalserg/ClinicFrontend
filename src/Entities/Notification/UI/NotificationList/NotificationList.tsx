/* eslint-disable react/display-name */
import { memo } from "react";
import { Skeleton as SkeletonRedesigned } from "@/Shared/UI/Skeleton";
import { VStack } from "@/Shared/UI/Stack";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { useNotifications } from "../../api/notificationApi";
import { NotificationItem } from "../NotificationItem/NotificationItem";
import cls from "./NotificationList.module.scss";

interface NotificationListProps {
  className?: string;
}

export const NotificationList = memo((props: NotificationListProps) => {
  const { className } = props;
  const { data, isLoading } = useNotifications(null, {
    // pollingInterval: 10000,
  });
  const Skeleton = SkeletonRedesigned;
  if (isLoading) {
    return (
      <VStack
        gap={"16"}
        className={classNames(cls.NotificationList, {}, [className])}
      >
        <Skeleton width={"100%"} border={"8px"} height={"80px"} />
        <Skeleton width={"100%"} border={"8px"} height={"80px"} />
        <Skeleton width={"100%"} border={"8px"} height={"80px"} />
      </VStack>
    );
  }
  return (
    <VStack
      gap={"16"}
      className={classNames(cls.NotificationList, {}, [className])}
    >
      {data?.map((item) => <NotificationItem key={item.id} item={item} />)}
    </VStack>
  );
});
