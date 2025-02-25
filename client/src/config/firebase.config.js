import { getApp, getApps, initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";



const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const storage = getStorage(app);
export { app, storage };
