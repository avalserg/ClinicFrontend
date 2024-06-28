import { EntityState } from "@reduxjs/toolkit";
import {
  Article,
  ArticleView,
  ArticleSortField,
  ArticleType,
} from "@/Entities/Article";

import { SortOrder } from "@/Shared/Types/sort";

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading?: boolean;
  error?: string;

  // pagination
  page: number;
  limit: number;
  hasMore: boolean;

  // filters
  view: ArticleView;
  order: SortOrder;
  sort: ArticleSortField;
  search: string;
  type: ArticleType;
  // init state or not
  _inited: boolean;
}
