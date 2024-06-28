/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { memo, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useTranslation } from "react-i18next";
import { saveJsonSettings, useJsonSettings } from "@/Entities/ApplicationUser";
import { Drawer } from "@/Shared/UI/Drawer";
import { Modal } from "@/Shared/UI/Modal";
import { Text } from "@/Shared/UI/Text";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";

export const ArticlePageGreeting = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { isArtivlesPageWasOpened } = useJsonSettings();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (!isArtivlesPageWasOpened) {
      setIsOpen(true);
      // Чтобы при повторном захлде вприложение модалка не всплывала
      void dispatch(saveJsonSettings({ isArtivlesPageWasOpened: true }));
    }
  }, [dispatch, isArtivlesPageWasOpened]);
  const text = (
    <Text
      title={t("Добро пожаловать на страницу статей")}
      text={t("Здесь Вы можете просматривать статьи на разные темы")}
    />
  );
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  const onClose = () => setIsOpen(false);
  if (isMobile) {
    return (
      <Drawer lazy isOpen={isOpen} onClose={onClose}>
        {text}
      </Drawer>
    );
  }

  return (
    <Modal lazy isOpen={isOpen} onClose={onClose}>
      {text}
    </Modal>
  );
});
