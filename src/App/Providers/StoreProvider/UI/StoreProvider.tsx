import { type ReactNode } from "react";
import { Provider } from "react-redux";
import { ReducersMapObject } from "@reduxjs/toolkit";
import { createReduxStore } from "../Config/store";
import { type StateSchema } from "../Config/StateSchema";

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}
// provider to connect React and Redux
export const StoreProvider = (props: StoreProviderProps) => {
  const { children, initialState, asyncReducers } = props;
  // const navigate = useNavigate();
  const store = createReduxStore(
    initialState as StateSchema,
    asyncReducers as ReducersMapObject<StateSchema>,
    // navigate
  );
  
  return <Provider store={store}>{children}</Provider>;
};
