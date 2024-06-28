/* eslint-disable react/display-name */
import { memo, useMemo, useState } from "react";
import { LangSwitcher } from "@/Features/LangSwitcher";
import { ThemeSwitcher } from "@/Features/ThemeSwitcher";
import ArrowIcon from "@/Shared/Assets/Icons/arrow-bottom.svg";
import { AppLogo } from "@/Shared/UI/AppLogo";
import { Icon } from "@/Shared/UI/Icon";
import { VStack } from "@/Shared/UI/Stack";
import { classNames } from "@/Shared/lib/classNames/classNames";
import { useSideBarItems } from "../../Model/selectors/getSideBarItems";
import SidebarItem from "../SidebarItem/SidebarItem";
import cls from "./SideBar.module.scss";


interface SideBarProps {
  className?: string;
}

export const SideBar = memo(({ className }: SideBarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const sideBarItemsList = useSideBarItems();
  const onToggle = () => {
    setCollapsed((prev) => !prev);
  };
  // after rerender parent SidebarItem not rerendering or wrap SidebarItem in memo
  const itemsList = useMemo(() => {
    return sideBarItemsList.map((item) => (
      <SidebarItem item={item} collapsed={collapsed} key={item.path} />
    ));
  }, [collapsed, sideBarItemsList]);

  return (
    <aside
      data-testid="sidebar"
      className={classNames(
        cls.SideBarRedesigned,
        { [cls.collapsedRedesigned]: collapsed },
        [className],
      )}
      // eslint-disable-next-line i18next/no-literal-string
    >
      <AppLogo size={collapsed ? 30 : 50} className={cls.appLogo} />
      <VStack role="navigation" gap={"8"} className={cls.items}>
        {itemsList}
      </VStack>
      <Icon
        data-testid="sidebar-toggle"
        className={cls.collapseBtn}
        onClick={onToggle}
        Svg={ArrowIcon}
        clickable
      />
      <div className={cls.switchers}>
        <ThemeSwitcher />
                <LangSwitcher short={collapsed} className={cls.lang} />
      </div>
    </aside>
  );
});
