import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "firebase/auth";

interface AuthState {
  user: {
    uid: string;
    email?: string | null;
    displayName?: string | null;
    cart?: any[];
    wishlist?: any[];
  } | null;
  email: string;
  password: string;
  name: string;
  error: string | null;
  loading: boolean;
}

const initialState: AuthState = {
  user: null,
  email: "",
  password: "",
  name: "",
  error: "",
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setPassword(state, action: PayloadAction<string>) {
      state.password = action.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setUser(state, action: PayloadAction<any>) {
      state.user = action.payload;
    },
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(
      state,
      action: PayloadAction<{
        uid: string;
        email?: string | null;
        displayName?: string | null;
        cart?: any[];
        wishlist?: any[];
      }>
    ) {
      state.user = {
        uid: action.payload.uid,
        email: action.payload.email,
        displayName: action.payload.displayName || "",
        cart: action.payload.cart || [],
        wishlist: action.payload.wishlist || [],
      };
      state.loading = false;
    },

    loginFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const {
  setEmail,
  setPassword,
  setName,
  setError,
  setLoading,
  setUser,
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
