// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_API_KEY}`,
  authDomain: `${process.env.REACT_APP_AUTH_DOMAIN}`,
  projectId: "storelify-database",
  storageBucket: "storelify-database.appspot.com",
  messagingSenderId: "86807473324",
  appId: "1:86807473324:web:9073c849d639367b508309",
  measurementId: "G-VLLWHT67PZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
