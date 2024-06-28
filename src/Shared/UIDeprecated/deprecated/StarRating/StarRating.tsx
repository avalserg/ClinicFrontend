/* eslint-disable react/display-name */
import { memo, useState } from "react";
import cls from "./StarRating.module.scss";
import { classNames } from "@/Shared/lib/classNames/classNames";

import StarIcon from "@/Shared/Assets/Icons/star.svg";
import { Icon } from "@/Shared/UI/Icon";


interface StarRatingProps {
  className?: string;
  onSelect?: (starsCount: number) => void;
  size?: number;
  selectedStars?: number;
}
const stars = [1, 2, 3, 4, 5];
/**
 * Устарел используем новые компоненты из папки redesigned
 * @deprecated
 */
export const StarRating = memo((props: StarRatingProps) => {
  const { className, size = 30, selectedStars = 0, onSelect } = props;
  const [currentStarsCount, setCurrentStarsCount] = useState(selectedStars);
  // if 0 - false? other values true
  const [isSelected, setisSelected] = useState(Boolean(selectedStars));
  // closure
  const onHover = (starsCount: number) => () => {
    if (!isSelected) {
      setCurrentStarsCount(starsCount);
    }
  };
  const onLeave = () => {
    if (!isSelected) {
      setCurrentStarsCount(0);
    }
  };
  const onclick = (starsCount: number) => () => {
    if (!isSelected) {
      onSelect?.(starsCount);
      setCurrentStarsCount(starsCount);
      setisSelected(true);
    }
  };
  return (
    <div
      className={classNames(
        // чтобы менять стили
        cls.StarRatingRedesigned,
        {},
        [className],
      )}
    >
      {stars.map((starNumber) => {
        const commonProps = {
          className: classNames(cls.starIcon, { [cls.selected]: isSelected }, [
            currentStarsCount >= starNumber ? cls.hovered : cls.normal,
          ]),
          Svg: StarIcon,
          key: starNumber,
          width: size,
          height: size,
          onMouseLeave: onLeave,
          onMouseEnter: onHover(starNumber),
          onClick: onclick(starNumber),
          "data-testid": `StarRating.${starNumber}`,
          "data-selected": currentStarsCount >= starNumber,
        };
        return (
          // eslint-disable-next-line react/jsx-key
          <Icon clickable={!isSelected} {...commonProps} />
        );
      })}
    </div>
  );
});
