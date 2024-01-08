// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDUo68px7kOuKFb3GyRhMjf7e4A1F1L9AY",
	authDomain: "netflixgpt-2906.firebaseapp.com",
	projectId: "netflixgpt-2906",
	storageBucket: "netflixgpt-2906.appspot.com",
	messagingSenderId: "233332157780",
	appId: "1:233332157780:web:e51a9106ae5568b043ecc1",
	measurementId: "G-F9GL6FDT4K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
