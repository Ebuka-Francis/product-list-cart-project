import { initializeApp, getApps } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// experimentalAutoDetectLongPolling: falls back to long-polling when the
// browser/network can't sustain Firestore's default streaming connection
// (common on mobile carriers like MTN LTE that proxy/throttle streaming
// connections). This is what was causing onSnapshot to hang forever on
// mobile without ever calling back or erroring out.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

export default app;