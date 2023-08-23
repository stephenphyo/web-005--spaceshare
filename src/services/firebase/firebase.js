import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
  authDomain: 'space-share-iss-nus.firebaseapp.com',
  projectId: 'space-share-iss-nus',
  storageBucket: 'space-share-iss-nus.appspot.com',
  messagingSenderId: '669862774931',
  appId: '1:669862774931:web:eb25ee6fcd27c21ffe6566',
};

const app = initializeApp(firebaseConfig);
export default app;

export const analytics = getAnalytics(app);