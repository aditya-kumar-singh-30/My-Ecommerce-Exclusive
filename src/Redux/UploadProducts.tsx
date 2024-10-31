import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../app/config";
import Product from "@/app/Products/Product";

const db = getFirestore(app);

const products: Product[] = [
  {
    id: 1,
    name: "ASUS FHD Gaming Laptop",
    price: 700,
    rating: 5,
    image: "/Product-images/laptop.png",
    quantity: 1,
    subtotal: 700,
  },
  {
    id: 2,
    name: "Quilted Satin Jacket",
    price: 660,
    rating: 5,
    image: "/Product-images/jacket.png",
    quantity: 1,
    subtotal: 660,
  },
  {
    id: 3,
    name: "GP11 USB Gamepad",
    price: 660,
    rating: 5,
    image: "/Product-images/gamepad.png",
    quantity: 1,
    subtotal: 660,
  },
  {
    id: 4,
    name: "Breed Dry Dog Food",
    price: 100,
    rating: 5,
    image: "/Product-images/dog food.jpeg",
    quantity: 1,
    subtotal: 100,
  },
  {
    id: 5,
    name: "Curology Product Set",
    price: 500,
    rating: 4,
    image: "/Product-images/curology.png",
    quantity: 1,
    subtotal: 500,
  },
  {
    id: 6,
    name: "Kids Electric Car",
    price: 120,
    rating: 5,
    image: "/Product-images/car.png",
    quantity: 1,
    subtotal: 120,
  },
  {
    id: 7,
    name: "Canon DSLR Camera",
    price: 360,
    rating: 5,
    image: "/Product-images/camera.png",
    quantity: 1,
    subtotal: 360,
  },
  {
    id: 8,
    name: "Jr. Zoom Soccer Cleats",
    price: 120,
    rating: 5,
    image: "/Product-images/boots.png",
    quantity: 1,
    subtotal: 120,
  },
];

const uploadProducts = async () => {
  try {
    const productCollection = collection(db, "products");
    for (const product of products) {
      await addDoc(productCollection, product);
    }
    console.log("Products uploaded successfully!");
  } catch (error) {
    console.error("Error uploading products: ", error);
  }
};

uploadProducts();
