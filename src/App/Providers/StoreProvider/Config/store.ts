/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import {
  type ReducersMapObject,
  configureStore,
  CombinedState,
  Reducer,
} from "@reduxjs/toolkit";
import { ThunkExtraArg, type StateSchema } from "./StateSchema";
import { createReducerManager } from "./reducerManager";
import { $api } from "@/Shared/API/api";
import { uiReducer } from "@/Features/UI";
import { rtkApi } from "@/Shared/API/rtkApi";
import { applicationUserReducer } from "@/Entities/ApplicationUser";


export function createReduxStore(
  initialState?: StateSchema,
  asyncReducers?: ReducersMapObject<StateSchema>,
) {
  // только обязательные редюсеры
  const rootReducers: ReducersMapObject<StateSchema> = {
    ...asyncReducers,
    applicationUser: applicationUserReducer,
    ui: uiReducer,
    [rtkApi.reducerPath]: rtkApi.reducer,
  };
  const reducerManager = createReducerManager(rootReducers);

  const extraArg: ThunkExtraArg = {
    api: $api,
  };
  const store = configureStore({
    // very important call reduce
    reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
    // reducer: reducerManager.reduce as unknown as ReducersMapObject<StateSchema>,
    devTools: __IS_DEV__,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: extraArg,
        },
      }).concat(rtkApi.middleware),
  });

  // connect reducers to store
  // @ts-ignore
  store.reducerManager = reducerManager;
  return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>["dispatch"];
