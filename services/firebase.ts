
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// ⚠️ 重要提示：請將下方的 firebaseConfig 替換為您自己在 Firebase Console 建立專案後取得的設定
// 步驟：
// 1. 前往 https://console.firebase.google.com/
// 2. 新增專案 -> 建立 Realtime Database (設為測試模式 Test Mode 以便快速測試)
// 3. 進入專案設定 (Project Settings) -> 一般 (General) -> 下方的 "您的應用程式" -> 複製 SDK 設定
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
