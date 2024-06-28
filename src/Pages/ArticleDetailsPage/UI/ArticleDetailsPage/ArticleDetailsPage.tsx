import { memo } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import DynamicModuleLoader, {
  ReducersList,
} from "@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { classNames } from "@/Shared/lib/classNames/classNames";
import cls from "./ArticleDetailsPage.module.scss";
import { ArticleRecommendationList } from "@/Features/articleRecommendationList";
import { VStack } from "@/Shared/UI/Stack";
import { Page } from "@/Widgets/Page";
import { articleDetailsPageReducer } from "../../Model/slices";
import { ArticleDetailsComments } from "../ArticleDetailsComments/ArticleDetailsComments";
import { ArticleRating } from "@/Features/articleRating";
import { StickyContentLayout } from "@/Shared/Layouts/StickyContentLayout";
import { DetailsContainer } from "../DetailsContainer/DetailsContainer";
import { AdditionalInfoContainer } from "../AdditionalInfoContainer/AdditionalInfoContainer";

export interface ArticleDetailsPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};
const ArticleDetailsPage = (props: ArticleDetailsPageProps) => {
  const { className } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t } = useTranslation();

  // if (!id) {
  //   return (
  //     <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
  //       {t("Статья не найдена")}
  //     </Page>
  //   );
  // }

  const { id } = useParams<{ id: string }>();
  if (!id) {
    return null;
  }
  return (
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount>
      <StickyContentLayout
        content={
          <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
            <VStack gap={"16"} max>
              <DetailsContainer />
              <ArticleRating articleId={id} />
              <ArticleRecommendationList />
              <ArticleDetailsComments id={id} />
            </VStack>
          </Page>
        }
        right={<AdditionalInfoContainer />}
      />
    </DynamicModuleLoader>
  );
};
export default memo(ArticleDetailsPage);
