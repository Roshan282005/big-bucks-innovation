import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, type Auth } from "firebase/auth";

const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;

let app: FirebaseApp | null = null;
let _auth: Auth | null = null;
let _googleProvider: GoogleAuthProvider | null = null;

if (apiKey) {
  const firebaseConfig = {
    apiKey,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  };

  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  _auth = getAuth(app);
  _googleProvider = new GoogleAuthProvider();
  _googleProvider.addScope("email");
  _googleProvider.setCustomParameters({ prompt: "select_account" });
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const auth: Auth = _auth as any;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const googleProvider: GoogleAuthProvider = _googleProvider as any;
