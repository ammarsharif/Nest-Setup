import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
// import { getStorage, ref } from 'firebase/storage';
// import { getMessaging, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDcocgJbwVeX1gtw5BQFuKI5fvlNVvmSBA',
  authDomain: 'nest-auth-38003.firebaseapp.com',
  projectId: 'nest-auth-38003',
  storageBucket: 'nest-auth-38003.firebasestorage.app',
  messagingSenderId: '1009771485288',
  appId: '1:1009771485288:web:2781866498d273c2d7c3dd',
  measurementId: 'G-TE1ZMMYW6X',
};

const firebaseApp = initializeApp(firebaseConfig);
// export const messaging = getMessaging(firebaseApp);

// const storage = getStorage(firebaseApp);
// export const storageRef = ref(storage, 'images/');
export const auth = getAuth(firebaseApp);

// export const onMessageListener = () => {
//   return new Promise((resolve) => {
//     onMessage(messaging, (payload: any) => {
//       resolve(payload);
//     });
//   });
// };
