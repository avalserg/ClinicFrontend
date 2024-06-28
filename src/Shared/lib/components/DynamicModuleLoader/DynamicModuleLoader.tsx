import { Reducer } from "@reduxjs/toolkit";
import React, { useEffect, ReactNode } from "react";
import { useDispatch, useStore } from "react-redux";
import {
  ReduxStoreWithManager,
  StateSchema,
  StateSchemaKey,
} from "@/App/Providers/StoreProvider";

export type ReducersList = {
  // Array reducers
  [name in StateSchemaKey]?: Reducer<NonNullable<StateSchema[name]>>;
};

interface DynamicModuleProps {
  children: ReactNode;
  reducers: ReducersList;
  // Remove reducer after unmount sometimes there is no need
  removeAfterUnmount?: boolean;
}

const DynamicModuleLoader = (props: DynamicModuleProps) => {
  const { children, reducers, removeAfterUnmount = true } = props;
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();
  // в момент монтирования добавляем редюсер
  useEffect(() => {
    const mountedReducers = store.reducerManager.getMountedReducers();
    // Object.entries work with type string
    Object.entries(reducers).forEach(([name, reducer]) => {
      const mounted = mountedReducers[name as StateSchemaKey];
      // add new reducer if not mounted
      if (!mounted) {
        store.reducerManager.add(name as StateSchemaKey, reducer);
        dispatch({ type: `@INIT ${name} reducer` });
      }
    });
    // в момент демонтирования удаляем из дом
    return () => {
      if (removeAfterUnmount) {
        Object.entries(reducers).forEach(([name, reducer]) => {
          store.reducerManager.remove(name as StateSchemaKey);
          dispatch({ type: `@DESTROY ${name} reducer` });
        });
      }
    };
    // eslint-disable-next-line
  }, []);
  return <>{children}</>;
};

export default DynamicModuleLoader;
