/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useTranslation } from "react-i18next";
import { memo, useState } from "react";
import { useSelector } from "react-redux";
import { Listbox as ListBoxRedesigned } from "@/Shared/UI/Popups";
import { getFeatureFlag, updateFeatureFlag } from "@/Shared/lib/features";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import { getUserAuthData } from "@/Entities/ApplicationUser";
import { HStack } from "@/Shared/UI/Stack";
import { Text } from "@/Shared/UI/Text";
import { Skeleton as SkeletonRedesigned } from "@/Shared/UI/Skeleton";
import { useForceUpdate } from "@/Shared/lib/render/forceUpdate";

interface UiDesignSwitcherProps {
  className?: string;
}

export const UiDesignSwitcher = memo((props: UiDesignSwitcherProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const isAppRedesigned = getFeatureFlag("isAppRedesigned");
  const dispatch = useAppDispatch();
  const authData = useSelector(getUserAuthData);
  const [isLoading, setIsLoading] = useState(false);
  const forceUpdate = useForceUpdate();
  const Skeleton = SkeletonRedesigned;
  const Listbox = ListBoxRedesigned;
  const items = [
    {
      content: t("Новый"),
      value: "new",
    },
    {
      content: t("Старый"),
      value: "old",
    },
  ];

  const onChange = async (value: string) => {
    if (authData) {
      setIsLoading(true);
      await dispatch(
        updateFeatureFlag({
          userId: authData.applicationUserId,
          newFeatures: {
            isAppRedesigned: value === "new",
          },
        }),
      ).unwrap();
      setIsLoading(false);
      forceUpdate();
    }
  };
  return (
    <HStack gap={"8"}>
      <Text text={t("Вариант интерфейса")} />
      {isLoading ? (
        <Skeleton width={100} height={40} />
      ) : (
        <Listbox
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onChange={onChange}
          items={items}
          value={isAppRedesigned ? "new" : "old"}
          className={className}
        />
      )}
    </HStack>
  );
});
