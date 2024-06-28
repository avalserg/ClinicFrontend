import { StateSchema } from "@/App/Providers/StoreProvider";
// null or undefined
export const getAddCommentFormText = (state: StateSchema) =>
  state.addCommentForm?.text ?? "";
export const getAddCommentFormError = (state: StateSchema) =>
  state.addCommentForm?.error;
