import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD-Xu0O1HvxYGwyqJNMPtakrpDxgu1Dbxs",
  authDomain: "finalprojectwebprogram.firebaseapp.com",
  projectId: "finalprojectwebprogram",
  storageBucket: "finalprojectwebprogram.firebasestorage.app",
  messagingSenderId: "267261871061",
  appId: "1:267261871061:web:5f4fcec33250088b81335c"
};

// 1. ÖNCE uygulamayı başlatın
const app = initializeApp(firebaseConfig);

// 2. SONRA auth nesnesini oluşturun ve export edin
export const auth = getAuth(app); 

export default app;