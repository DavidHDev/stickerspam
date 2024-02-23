/* eslint-disable @typescript-eslint/no-explicit-any */

import { initializeApp } from 'firebase/app';
import { getDatabase, push, ref, set } from 'firebase/database';
import { getRandomPosition } from '../utils';

const config = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
};

initializeApp(config);

const database = getDatabase();
const stickersRef = ref(database, 'stickers');
const winnerRef = ref(database, 'winner');

export const addSticker = (type: string) => {
  const newStickerRef = push(stickersRef);
  set(newStickerRef, {
    position: getRandomPosition(),
    type
  });
}

export const setLatestWinner = () => {
  set(winnerRef, (localStorage.getItem('stickerspam-name') || 'Anonymous'));
}

export const clearStickersOnLimitReached = () => {
  set(stickersRef, null);
}