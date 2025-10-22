import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: `${process.env.REACT_APP_FIREBASE_API}`,
  authDomain: `${process.env.REACT_APP_FIREBASE_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_FIREBASE_DB}`,
  projectId: `${process.env.REACT_APP_FIREBASE_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_FIREBASE_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_FIREBASE_APP_ID}`,
  measurementId: `${process.env.REACT_APP_FIREBASE_MEASUREMENT_ID}`,
};

const SoilFirebaseConfig = {
  apiKey: `${process.env.REACT_APP_SOIL_API}`,
  authDomain: `${process.env.REACT_APP_SOIL_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_SOIL_DB}`,
  projectId: `${process.env.REACT_APP_SOIL_PROJECT_ID}`,
  storageBucket: `${process.env.REACT_APP_SOIL_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_SOIL_MESSAGING_SENDER_ID}`,
  appId: `${process.env.REACT_APP_SOIL_APP_ID}`,
  measurementId: `${process.env.REACT_APP_SOIL_MEASUREMENT_ID}`,
};

// Default App
export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Named App for Soil
export const SoilApp =
  getApps().find((app) => app.name === "SoilApp") ||
  initializeApp(SoilFirebaseConfig, "SoilApp");
