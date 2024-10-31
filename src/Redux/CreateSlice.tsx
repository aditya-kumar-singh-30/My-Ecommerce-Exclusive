//@ts-nocheck
import { db } from "@/app/config";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCookie } from "cookies-next";
import { doc, getDoc, setDoc } from "firebase/firestore";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  quantity: number;
  subtotal: number;
}

interface CartState {
  cartData: Product[];
  wishListData: Product[];
  totalProductInCart: number;
  added: boolean;
  quantity: number;
  totalProductInWishlist: number;
  Transaction: Transactions[];
 
}

interface Transactions {
  payerName: string;
  status: string;
  transactionId: string;
  amount: string;
  time : string;
}

const initialState: CartState = {
  cartData: [],
  wishListData: [],
  totalProductInCart: 0,
  added: false,
  quantity: 1,
  totalProductInWishlist: 0,
  Transaction: [],
};

const cartSlice = createSlice({
  name: "cartItems",
  initialState,
  reducers: {
    setUserCartAndWishlist(
      state,
      action: PayloadAction<{ cartData: Product[]; wishListData: Product[] }>
    ) {
      state.cartData = action.payload.cartData;
      state.wishListData = action.payload.wishListData;
      state.totalProductInCart = action.payload.cartData.length;
      state.totalProductInWishlist = action.payload.wishListData.length;
    },

    addToCart(state, action: PayloadAction<Product>) {
      const item = action.payload;

      // Check if item is defined and has an id property
      if (!item || !item.id) {
        console.error("Invalid item:", item);
        return;
      }

      const isThere = state.cartData.find((itemm) => itemm.id === item.id);

      if (!isThere) {
        state.cartData.push(item);
        state.totalProductInCart += 1;

        const userId = getCookie("token");
        if (userId) {
          const cartRef = doc(db, "users", userId as string, "cart", "data");

          setDoc(cartRef, { items: state.cartData })
            .then(() => {
              console.log("Cart updated in Firebase");
            })
            .catch((error) => {
              console.error("Error updating cart in Firebase:", error);
            });
        }
      }

      state.added = !state.added;
      console.log("redux called", state.added);
    },

    addtocartData(state, action: PayloadAction<Product>) {
      const item = action.payload;

      // Ensure cartData is an array before using .find()
      if (Array.isArray(state.cartData)) {
        const isThere = state.cartData.find((itemm) => itemm.id === item.id);

        // If the item is not already in the cart, add it
        if (!isThere) {
          state.cartData = [...state.cartData, item];
        }
      } else {
        // If cartData is not an array, initialize it to an empty array and add the item
        console.error("cartData is not an array", state.cartData); // Debugging log
        state.cartData = [item]; // Initialize cartData and add the first item
      }
    },

    deleteFromCart(state, action: PayloadAction<Product>) {
      const item = action.payload;
      state.cartData = state.cartData.filter((itemm) => itemm.id !== item.id);
      state.totalProductInCart -= 1;

      const userId = getCookie("token");
      if (userId) {
        const cartRef = doc(db, "users", userId as string, "cart", "data");

        setDoc(cartRef, { items: state.cartData })
          .then(() => {
            console.log("Cart updated in Firebase after deletion");
          })
          .catch((error) => {
            console.error(
              "Error updating cart in Firebase after deletion:",
              error
            );
          });
      }
    },

    deleteFromWishlist(state, action: PayloadAction<Product>) {
      const item = action.payload;
      state.wishListData = state.wishListData.filter(
        (itemm) => itemm.id !== item.id
      );
      state.totalProductInWishlist -= 1;

      const userId = getCookie("token");
      const wishlistRef = doc(
        db,
        "users",
        userId as string,
        "wishlist",
        "data"
      );

      setDoc(wishlistRef, { items: state.wishListData })
        .then(() => {
          console.log("Wishlist updated in firebase after deletion");
        })
        .catch((error) => {
          console.log("Error in updating wishlist after deletion", error);
        });
    },

    addtoWishlistData(state, action: PayloadAction<Product>) {
      const item = action.payload;
      const inWish = state.wishListData.find((items) => items.id === item.id);
      if (!inWish) {
        state.wishListData.push(item);
        state.totalProductInWishlist += 1;

        const userId = getCookie("token");
        if (userId) {
          const wishlistRef = doc(
            db,
            "users",
            userId as string,
            "wishlist",
            "data"
          );

          setDoc(wishlistRef, { items: state.wishListData })
            .then(() => {
              console.log("Wishlist updated in firebase.");
            })
            .catch((error) => {
              console.log("Error in updating wishlist", error);
            });
        }
      }
    },

    moveToCart(state) {
      state.wishListData.forEach((wishlistItem) => {
        const itemInCart = state.cartData.find(
          (cartItem) => cartItem.id === wishlistItem.id
        );
        if (!itemInCart) {
          state.cartData.push(wishlistItem);
        }
      });
      state.wishListData = [];
      state.totalProductInWishlist = 0;

      const userId = getCookie("token");
      if (userId) {
        const cartRef = doc(db, "users", userId as string, "cart", "data");
        const wishlistRef = doc(
          db,
          "users",
          userId as string,
          "wishlist",
          "data"
        );

        setDoc(cartRef, { items: state.cartData })
          .then(() => {
            console.log("Cart updated in Firebase after moving items");
          })
          .catch((error) => {
            console.error(
              "Error updating cart in Firebase after moving items:",
              error
            );
          });

        setDoc(wishlistRef, { items: state.wishListData })
          .then(() => {
            console.log("Wishlist updated in Firebase after moving items");
          })
          .catch((error) => {
            console.error(
              "Error updating wishlist in Firebase after moving items:",
              error
            );
          });
      }
    },

    singlemovetocart(state, action: PayloadAction<Product>) {
      const item = action.payload;
      const cartItem = state.cartData.find((itemm) => item.id === itemm.id);
      if (!cartItem) {
        state.cartData.push(item);
      }
      state.wishListData = state.wishListData.filter(
        (itum) => itum.id !== item.id
      );
      state.totalProductInWishlist -= 1;

      const userId = getCookie("token");
      if (userId) {
        const cartRef = doc(db, "users", userId as string, "cart", "data");
        const wishlistRef = doc(
          db,
          "users",
          userId as string,
          "wishlist",
          "data"
        );

        setDoc(cartRef, { items: state.cartData })
          .then(() => {
            console.log("Cart updated in Firebase after moving single item");
          })
          .catch((error) => {
            console.error(
              "Error updating cart in Firebase after moving single item:",
              error
            );
          });

        setDoc(wishlistRef, { items: state.wishListData })
          .then(() => {
            console.log(
              "Wishlist updated in Firebase after moving single item"
            );
          })
          .catch((error) => {
            console.error(
              "Error updating wishlist in Firebase after moving single item:",
              error
            );
          });
      }
    },
     

    UPquantity(state, action: PayloadAction<Product>) {
      const item = action.payload;
      const existingItem = state.cartData.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem && existingItem.quantity < 10) {
        existingItem.quantity += 1;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
        console.log(existingItem.subtotal);

        const userId = getCookie("token");
        if (userId) {
          const cartRef = doc(db, "users", userId as string, "cart", "data");

          setDoc(cartRef, { items: state.cartData })
            .then(() => {
              console.log("Cart updated in Firebase after quantity change");
            })
            .catch((error) => {
              console.error(
                "Error updating cart in Firebase after quantity change:",
                error
              );
            });
        }
      }
    },

    Transactions(state, action: PayloadAction<Transactions>)  {
      console.log("inside transaction",action.payload);
      state.Transaction.push(action.payload);

    },
    setTransactions(state,action){
      state.Transaction = action.payload;
    },
    

    ClearTransaction(state){
      state.Transaction = [];
    },

    DownQuantity(state, action: PayloadAction<Product>) {
      const item = action.payload;
      const existingItem = state.cartData.find(
        (cartItem) => cartItem.id === item.id
      );
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.subtotal = existingItem.quantity * existingItem.price;
        console.log(existingItem.subtotal);

        const userId = getCookie("token");
        if (userId) {
          const cartRef = doc(db, "users", userId as string, "cart", "data");

          setDoc(cartRef, { items: state.cartData })
            .then(() => {
              console.log("Cart updated in Firebase after quantity change");
            })
            .catch((error) => {
              console.error(
                "Error updating cart in Firebase after quantity change:",
                error
              );
            });
        }
      }
    },

    info(state, action: PayloadAction<Product>) {
      const item = action.payload;
      console.log("HIIIIIIIIIIIIIII", item);
    },

    productInWishlist(state) {
      state.totalProductInWishlist = state.wishListData.length;
    },

    ProductInCart(state) {
      state.totalProductInCart = state.cartData.length;
      console.log("total product", state.totalProductInCart);
    },
  },
});

export const fetchUserCartAndWishlist =
  (userId: string) => async (dispatch: any) => {
    const cartRef = doc(db, "users", userId, "cart", "data");
    const wishlistRef = doc(db, "users", userId, "wishlist", "data");

    try {
      const cartSnap = await getDoc(cartRef);
      console.log("CartSnap :", cartSnap.data());
      const wishlistSnap = await getDoc(wishlistRef);
      console.log("WishlistSnap:", wishlistSnap.data());

      const cartData = cartSnap.exists() ? cartSnap.data().items : [];
      const wishListData = wishlistSnap.exists()
        ? wishlistSnap.data().items
        : [];

      console.log("Fetched Cart Data:", cartData);
      console.log("Fetched Wishlist Data:", wishListData);

      dispatch(setUserCartAndWishlist({ cartData, wishListData }));
    } catch (error) {
      console.log("Error fetching cart and wishlist data");
    }
  };

export const saveUserCartAndWishlist =
  (userId: string, cartData: Product[], wishListData: Product[]) =>
  async () => {
    try {
      const cartRef = doc(db, "users", userId, "cart", "data");
      const wishlistRef = doc(db, "users", userId, "wishlist", "data");
      // // if (cartData.length <= 0 || wishListData.length <= 0) {
      // //   console.log("great ====");
      // //   return;
      // // }
      // await setDoc(cartRef, { items: cartData });
     
      // await setDoc(wishlistRef, { items: wishListData });
      

      if (cartData.length > 0) {
        await setDoc(cartRef, { items: cartData });
      }

      if (wishListData.length > 0) {
        await setDoc(wishlistRef, { items: wishListData });
      }

      console.log("Documents created successfully.");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

export const {
  addToCart,
  addtocartData,
  ProductInCart,
  UPquantity,
  addtoWishlistData,
  productInWishlist,
  moveToCart,
  deleteFromCart,
  deleteFromWishlist,
  singlemovetocart,
  info,
  DownQuantity,
  setUserCartAndWishlist,
  Transactions,
  ClearTransaction,
  setTransactions
} = cartSlice.actions;

export default cartSlice.reducer;
