/* eslint-disable react/display-name */
import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import cls from "./SidebarItem.module.scss";
import { SidebarItemType } from "../../Model/types/sidebar";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { getUserAuthData } from "@/Entities/ApplicationUser";
import { AppLink } from "@/Shared/UI/AppLink";
import { Icon } from "@/Shared/UI/Icon";

interface SidebarItemProps {
  item: SidebarItemType;
  collapsed: boolean;
}

const SidebarItem = memo(({ item, collapsed }: SidebarItemProps) => {
  const { t } = useTranslation();
  const isAuth = useSelector(getUserAuthData);
  if (item.authOnly && !isAuth) {
    return null;
  }
  return (
    <AppLink
      to={item.path}
      className={classNames(
        cls.itemRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [],
      )}
      activeClassName={cls.active}
    >
      <Icon Svg={item.Icon} />
      <span className={cls.link}>{t(item.text)}</span>
    </AppLink>
  );
});

export default SidebarItem;
