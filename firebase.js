// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7ENt5_pKk8Ax4aZPoAqu5W0UGid7MITg",
  authDomain: "fibr-2f951.firebaseapp.com",
  databaseURL: "https://fibr-2f951-default-rtdb.firebaseio.com",
  projectId: "fibr-2f951",
  storageBucket: "fibr-2f951.appspot.com",
  messagingSenderId: "97034375622",
  appId: "1:97034375622:web:3fee67ad08c07beac662c7",
  measurementId: "G-TB3FW04XY3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);