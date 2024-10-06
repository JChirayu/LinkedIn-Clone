// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyANkgcPzkQ7-Q2Cu3fqSn4Zq8E7QUyucFw",
    authDomain: "linkedin-c7fee.firebaseapp.com",
    projectId: "linkedin-c7fee",
    storageBucket: "linkedin-c7fee.appspot.com",
    messagingSenderId: "987149857887",
    appId: "1:987149857887:web:f5d850a8be28b9d58a97ea",
    measurementId: "G-CC8N8VQWXJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth()
const firestore = getFirestore(app)
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { auth, app, firestore, storage, analytics }