importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

import firebase from "firebase";

export const firebaseConfig = {
  apiKey: "AIzaSyDbg3seplUur4O_33iD-OG_rIQPj6gftLc",
  authDomain: "mbank-ibanking.firebaseapp.com",
  projectId: "mbank-ibanking",
  storageBucket: "mbank-ibanking.appspot.com",
  messagingSenderId: "10095689204",
  appId: "1:10095689204:web:bf1c04c06052aa36bd4da1",
  measurementId: "G-5XTYCPFEKC",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/firebase-logo.png",
  };

  // self.registration.showNotification(notificationTitle, notificationOptions);
});
