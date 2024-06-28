import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AddCommentFormSchema } from "../types/addCommentForm";

const initialState: AddCommentFormSchema = {
  text: "",
  error: "",
};

export const addCommentFormSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
  },
  // to change State for async three states pending fulfilled  rejected
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(loginByUsername.pending, (state) => {
  //         state.error = undefined;
  //         state.isLoading = true;
  //       })
  //       .addCase(loginByUsername.fulfilled, (state) => {
  //         state.isLoading = false;
  //       })
  //       .addCase(loginByUsername.rejected, (state, action) => {
  //         state.isLoading = false;
  //         state.error = action.payload;
  //       });
  //   },
});

// Action creators are generated for each case reducer function
export const { actions: addCommentFormActions } = addCommentFormSlice;
export const { reducer: addCommentFormReducer } = addCommentFormSlice;
