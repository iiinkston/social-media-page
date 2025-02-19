import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBgj4s183WMwPfzgQU8ro-BDU58aXk8CUY",
    authDomain: "dietapp-ed5e5.firebaseapp.com",
    projectId: "dietapp-ed5e5",
    storageBucket: "dietapp-ed5e5.firebasestorage.app",
    messagingSenderId: "761307949826",
    appId: "1:761307949826:web:04d45ef1419829ba63f01b",
    measurementId: "G-DSET4W8086"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const storage = getStorage(app); 

export { db, storage };
