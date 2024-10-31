'use client'
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/app/config"; // Adjust the path if needed

const page = () => {
  const createTestDocument = async () => {
    try {
      const userId = "testUserId";
      const cartRef = doc(db, "users", userId, "cart", "data");
      const wishlistRef = doc(db, "users", userId, "wishlist", "data");

      await setDoc(cartRef, { items: [{ name: "Product1", price: 100 }] });
      await setDoc(wishlistRef, { items: [{ name: "WishlistProduct", price: 150 }] });
      
      console.log("Documents created successfully.");
    } catch (error) {
      console.error("Error creating document:", error);
    }
  };

  return (
    <div>
      <button onClick={createTestDocument}>Create Test Document</button>
    </div>
  );
};

export default page;
