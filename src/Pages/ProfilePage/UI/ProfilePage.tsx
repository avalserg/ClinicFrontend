import { useParams } from "react-router-dom";
import { classNames } from "@/Shared/lib/classNames/classNames";

import { EditableProfileCard } from "@/Features/editableProfileCard";
import { VStack } from "@/Shared/UI/Stack";
import { Page } from "@/Widgets/Page";

interface ProfilePageProps {
  className?: string;
}

const ProfilePage = ({ className }: ProfilePageProps) => {
  const { id } = useParams<{ id: string }>();

  // if (!id) {
  //   return <Text text={t("Профиль не найден")} />;
  // }
  return (
    <Page
      data-testid={"ProfilePage"}
      className={classNames("", {}, [className])}
    >
      <VStack max gap={"16"}>
        <EditableProfileCard id={id} />
      </VStack>
    </Page>
  );
};

export default ProfilePage;
