/* eslint-disable react/display-name */
import { memo, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { BrowserView, MobileView } from "react-device-detect";
import { HStack, VStack } from "@/Shared/UI/Stack";
import { StarRating } from "@/Shared/UIDeprecated/deprecated/StarRating";
import { Modal } from "@/Shared/UI/Modal";

import { Drawer } from "@/Shared/UI/Drawer";
import { Input } from "@/Shared/UI/Input";
import { Text } from "@/Shared/UI/Text";
import { Button } from "@/Shared/UI/Button";
import { Card } from "@/Shared/UI/Card";

interface RatingCardProps {
  className?: string;
  title?: string;
  feedBAckTitle?: string;
  hasFeedBack?: boolean;
  onCancel?: (starsCount: number) => void;
  // отпр отзыв
  onAccept?: (starsCount: number, feedback?: string) => void;
  rate?: number;
}

export const RatingCard = memo((props: RatingCardProps) => {
  const {
    className,
    feedBAckTitle,
    rate = 0,
    hasFeedBack,
    onAccept,
    onCancel,
    title,
  } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [starsCount, setStarsCount] = useState(rate);
  const [feedback, setFeedback] = useState("");

  const { t } = useTranslation("");
  const onSelectStars = useCallback(
    (selectedStarsCount: number) => {
      setStarsCount(selectedStarsCount);
      if (hasFeedBack) {
        setIsModalOpen(true);
      } else {
        onAccept?.(selectedStarsCount);
      }
    },
    [hasFeedBack, onAccept],
  );
  const acceptHandle = useCallback(() => {
    setIsModalOpen(false);
    onAccept?.(starsCount, feedback);
  }, [feedback, onAccept, starsCount]);
  const cancelHandle = useCallback(() => {
    setIsModalOpen(false);
    onCancel?.(starsCount);
  }, [onCancel, starsCount]);
  const modalContent = (
    <>
        <Text title={feedBAckTitle} />
        <Input
          data-testid={"RatingCard.Input"}
          value={feedback}
          onChange={setFeedback}
          placeholder={t("Ваш отзыв")}
        />
      </>
  );
  const content = (
    <>
      <VStack align={"center"} gap={"8"} max>
        <Text title={starsCount ? t("Спасибо за оценку") : title} />
        <StarRating
          selectedStars={starsCount}
          size={40}
          onSelect={onSelectStars}
        />
      </VStack>
      <BrowserView>
        <Modal isOpen={isModalOpen} lazy>
          <VStack gap={"32"} max>
            {modalContent}
            <HStack max gap={"16"} justify={"end"}>
              <Button
                data-testid={"RatingCard.Close"}
                onClick={cancelHandle}
                // variant={ButtonTheme.OUTLINE_RED}
              >
                {t("Закрыть")}
              </Button>
              <Button data-testid={"RatingCard.Send"} onClick={acceptHandle}>
                {t("Отправить")}
              </Button>
            </HStack>
          </VStack>
        </Modal>
      </BrowserView>
      <MobileView>
        <Drawer isOpen={isModalOpen} lazy onClose={cancelHandle}>
          <VStack gap={"32"}>
            {modalContent}
            <Button fullWidth onClick={acceptHandle} size={"l"}>
              {t("Отправить")}
            </Button>
          </VStack>
        </Drawer>
      </MobileView>
    </>
  );
  return (
    <Card
      data-testid={"RatingCard"}
      padding={"24"}
      className={className}
      max
      border={"partialRound"}
    >
      {content}
    </Card>
  );
});
