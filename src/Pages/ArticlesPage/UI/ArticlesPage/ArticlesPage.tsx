import { memo, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import cls from "./ArticlesPage.module.scss";

import { classNames } from "@/Shared/lib/classNames/classNames";
import DynamicModuleLoader, {
  ReducersList,
} from "@/Shared/lib/components/DynamicModuleLoader/DynamicModuleLoader";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useInitialEffect } from "@/Shared/lib/hooks/useInitialEffect/useInitialEffect";
import { Page } from "@/Widgets/Page";
import { fetchNextArticlePage } from "../../Model/services/fetchNextArticlePage/fetchNextArticlePage";
import { initArticlesPage } from "../../Model/services/initArticlesPage/initArticlesPage";
import { articlesPageReducer } from "../../Model/slices/articlesPageSlice";
import { ArticleInfiniteList } from "../ArticleInfiniteList/ArticleInfiniteList";
import { ArticlePageGreeting } from "@/Features/articlePageGreeting";
import { StickyContentLayout } from "@/Shared/Layouts/StickyContentLayout";
import { ViewSelectorContainer } from "../ViewSelectorContainer/ViewSelectorContainer";
import { FiltersContainer } from "../FiltersContainer/FiltersContainer";

interface ArticlesPageProps {
  className?: string;
}
const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};
export const ArticlesPage = (props: ArticlesPageProps) => {
  const { className } = props;
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const onLoadNextPart = useCallback(() => {
    void dispatch(fetchNextArticlePage());
  }, [dispatch]);
  useInitialEffect(() => {
    void dispatch(initArticlesPage(searchParams));
  });
  const content = (
    <StickyContentLayout
      left={<ViewSelectorContainer />}
      right={<FiltersContainer />}
      content={
        <Page
          data-testid={"ArticlesPage"}
          onScrollEnd={onLoadNextPart}
          className={classNames(cls.ArticlesPageRedesigned, {}, [className])}
        >
          <ArticleInfiniteList className={cls.list} />
          <ArticlePageGreeting />
        </Page>
      }
    />
  );
  return (
    // DynamicModuleLoader state and Page async
    <DynamicModuleLoader reducers={reducers} removeAfterUnmount={false}>
      {content}
    </DynamicModuleLoader>
  );
};
export default memo(ArticlesPage);
