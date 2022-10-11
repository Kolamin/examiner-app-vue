import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyqiQEj73cKPOvP9yW4wQJ9zagHsVX6iw",
  authDomain: "examiner-app-vue3.firebaseapp.com",
  projectId: "examiner-app-vue3",
  storageBucket: "examiner-app-vue3.appspot.com",
  messagingSenderId: "75003896353",
  appId: "1:75003896353:web:9dfebf270fc527836ff960",
};

//init firebase
initializeApp(firebaseConfig);

//init firebase auth
const auth = getAuth();

export { auth };
