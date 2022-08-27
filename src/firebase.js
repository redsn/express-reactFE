// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCU0F57ob9Jemkj6dKVTfeMFHcIZkOT-OE",
//   authDomain: "people-app-lab.firebaseapp.com",
//   projectId: "people-app-lab",
//   storageBucket: "people-app-lab.appspot.com",
//   messagingSenderId: "1012938012144",
//   appId: "1:1012938012144:web:d92d0a8afcef050d345935"
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Provider
const provider = new GoogleAuthProvider();

function login() {
    return signInWithPopup(auth, provider);
}

function logout() {
    return  signOut(auth);
}

export { auth, login, logout, onAuthStateChanged }