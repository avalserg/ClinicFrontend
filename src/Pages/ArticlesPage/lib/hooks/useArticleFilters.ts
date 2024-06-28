import { useCallback } from "react";
import { useSelector } from "react-redux";
import { ArticleView, ArticleSortField, ArticleType } from "@/Entities/Article";
import { SortOrder } from "@/Shared/Types/sort";
import { useAppDispatch } from "@/Shared/lib/hooks/useAppDispatch/useAppDispatch";
import {
  getArticlesPageView,
  getArticlesPageSort,
  getArticlesPageOrder,
  getArticlesPageSerach,
  getArticlesPageType,
} from "../../Model/selectors/articlesPageSelectors";
import { articlesPageActions } from "../../Model/slices/articlesPageSlice";
import { useDebounce } from "@/Shared/lib/hooks/useDebounce/useDebounce";
import { fetchArticlesList } from "../../Model/services/fetchArticlesList/fetchArticlesList";

export function useArticleFilters() {
  const view = useSelector(getArticlesPageView);
  const dispatch = useAppDispatch();
  const sort = useSelector(getArticlesPageSort);
  const order = useSelector(getArticlesPageOrder);
  const search = useSelector(getArticlesPageSerach);
  const type = useSelector(getArticlesPageType);

  const fetchData = useCallback(() => {
    void dispatch(fetchArticlesList({ replace: true }));
  }, [dispatch]);
  // after stop enter in Input
  const debouncedFetchData = useDebounce(fetchData, 500);
  const onChangeView = useCallback(
    (view: ArticleView) => {
      dispatch(articlesPageActions.setView(view));
    },
    [dispatch],
  );
  const onChangeSort = useCallback(
    (newSort: ArticleSortField) => {
      dispatch(articlesPageActions.setSort(newSort));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );
  const onChangeOrder = useCallback(
    (order: SortOrder) => {
      dispatch(articlesPageActions.setOrder(order));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );
  const onChangeSearch = useCallback(
    (search: string) => {
      dispatch(articlesPageActions.setSearch(search));
      dispatch(articlesPageActions.setPage(1));
      debouncedFetchData();
    },
    [dispatch, debouncedFetchData],
  );
  const onChangeType = useCallback(
    (value: ArticleType) => {
      dispatch(articlesPageActions.setType(value));
      dispatch(articlesPageActions.setPage(1));
      fetchData();
    },
    [dispatch, fetchData],
  );
  return {
    view,
    sort,
    order,
    search,
    type,
    onChangeView,
    onChangeSort,
    onChangeOrder,
    onChangeSearch,
    onChangeType,
  };
}
