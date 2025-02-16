/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/prefer-ts-expect-error */
import { bindActionCreators, createSlice } from "@reduxjs/toolkit";
import { SliceCaseReducers, CreateSliceOptions } from "@reduxjs/toolkit/dist";
import { useMemo } from "react";
import { useDispatch } from "react-redux";

export function buildSlice<
  State,
  CaseReducers extends SliceCaseReducers<State>,
  Name extends string = string,
>(options: CreateSliceOptions<State, CaseReducers, Name>) {
  const slice = createSlice(options);
  const useActions = (): typeof slice.actions => {
    const dispatch = useDispatch();
    // @ts-ignore
    return useMemo(
      // @ts-ignore
      () => bindActionCreators(slice.actions, dispatch),
      [dispatch],
    );
  };
  return {
    ...slice,
    useActions,
  };
}
