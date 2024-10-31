import { AppDispatch } from "./Store";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { loginStart, loginSuccess, loginFailure } from "./SignupSlice";
import { app } from "../app/config";
import { getCookie, setCookie } from "cookies-next";
import toast, { Toaster } from "react-hot-toast";
import { fetchUserCartAndWishlist } from "./CreateSlice";

const persistedState = JSON.parse(localStorage.getItem("persist:root") || "{}");
const cartData = persistedState.cart;
const wishlist = persistedState.wishlist; // Access the cart state directly

const loginFailed = () => toast.error("Login failed");

export const loginWithEmailPassword =
  (email: string, password: string) => async (dispatch: AppDispatch) => {
    const auth = getAuth(app);
    dispatch(loginStart());
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid, email: userEmail } = userCredential.user;
      setCookie("token", uid);
      dispatch(fetchUserCartAndWishlist(uid));
      dispatch(loginSuccess({ uid, email: userEmail }));
    } catch (error: any) {
      dispatch(loginFailure(error.message));
    }
  };

export const loginWithGoogle = () => async (dispatch: AppDispatch) => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  dispatch(loginStart());
  try {
    console.log("Starting login");
    const result = await signInWithPopup(auth, provider);
    console.log("holololololololol", result);
    const { uid, email, displayName } = result.user;

    console.log("Successful login");

    setCookie("token", uid);
    dispatch(
      loginSuccess({
        uid,
        email,
        displayName,
        cart: cartData,
        wishlist: wishlist,
      })
    );
  } catch (error: any) {
    console.log("Login failed");
    dispatch(loginFailure(error.message));
    loginFailed();
  }
};
