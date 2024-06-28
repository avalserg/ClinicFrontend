import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import { type LoginSchema } from "../types/loginSchema";
import { loginByUsername } from "../services/loginByUserName/loginByUsername";


const initialState: LoginSchema = {
  isLoading: false,
  login: "",
  password: "",
  
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    // PayloadAction<string> данные из поля input
    setUserName: (state, action: PayloadAction<string>) => {
      state.login = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
 
  },
  // to change State for async three states pending fulfilled  rejected
  extraReducers: (builder) => {
    builder
      .addCase(loginByUsername.pending, (state) => {
        state.error = undefined;
        state.isLoading = true;
      })
      .addCase(loginByUsername.fulfilled, (state,action) => {
        state.isLoading = false;
       
      })
      .addCase(loginByUsername.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

// Action creators are generated for each case reducer function
export const { actions: loginActions } = loginSlice;
export const { reducer: loginReducer } = loginSlice;
