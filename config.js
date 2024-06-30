import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBTaWVB64KHx8K-pVfhxOUjG1lTuhAAxXk",
  authDomain: "todo-170624.firebaseapp.com",
  projectId: "todo-170624",
  storageBucket: "todo-170624.appspot.com",
  messagingSenderId: "1098449642712",
  appId: "1:1098449642712:web:b267e187326d132a77e3ad",
  measurementId: "G-4JPQ4L3TBS"
};

const app = initializeApp(firebaseConfig);

export default app;