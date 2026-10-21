import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {  
  initializeFirestore,  
  persistentLocalCache,  
  persistentMultipleTabManager  
} from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyD1d-zNY36klJJ1ZpoyRPtn44i_TMtbbgg",
  authDomain: "barangay-os-system.firebaseapp.com",
  projectId: "barangay-os-system",
  storageBucket: "barangay-os-system.firebasestorage.app",
  messagingSenderId: "341529783432",
  appId: "1:341529783432:web:65296afbe5f73c46df033d",
  measurementId: "G-55M2HQ7E9R"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const db = initializeFirestore(app, { 
  localCache: persistentLocalCache({ 
    tabManager: persistentMultipleTabManager() 
  }) 
});
