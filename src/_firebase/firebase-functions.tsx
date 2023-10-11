import { getFunctions, httpsCallable } from 'firebase/functions'
import { firebaseApp } from './firebase-app';

const firebaseFunctions = getFunctions(firebaseApp);

export const youtubeDownload = httpsCallable(firebaseFunctions, 'youtubeDownload');


