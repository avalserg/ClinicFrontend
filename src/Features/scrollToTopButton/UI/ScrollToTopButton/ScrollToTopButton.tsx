/* eslint-disable react/display-name */
import { memo } from "react";
import { Icon } from "@/Shared/UI/Icon";
import CircleIcon from "@/Shared/Assets/Icons/circle-up.svg";

interface ScrollToTopButtonProps {
  className?: string;
}

export const ScrollToTopButton = memo((props: ScrollToTopButtonProps) => {
  const { className } = props;
  const onClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Icon
      Svg={CircleIcon}
      clickable
      onClick={onClick}
      width={32}
      height={32}
      className={className}
    />
  );
});
