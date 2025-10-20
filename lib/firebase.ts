// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPt8vX9HzrP4jU9PazQn3mhbaSoFnT-gc",
  authDomain: "gelnd-f1b26.firebaseapp.com",
  projectId: "gelnd-f1b26",
  storageBucket: "gelnd-f1b26.firebasestorage.app",
  messagingSenderId: "629983075951",
  appId: "1:629983075951:web:acd074d117ee9027e7379a",
};

// Initialize Firebase
// if (process.env.NODE_ENV == "development") {
//   firebaseConfig = {
//     projectId: "gelnd-test",
//     apiKey: "fake-api-key",
//     authDomain: "localhost",
//   };
// }
const app = getApps.length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
console.log(auth);
// window.auth = auth;
// connectAuthEmulator(auth, "http://127.0.0.1:9099");
export { auth };
