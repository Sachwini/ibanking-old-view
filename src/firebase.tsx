import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
messaging
  .requestPermission()
  .then(function () {
    console.log("Have Permission");
    return messaging.getToken();
  })
  .then(function (token: any) {
    console.log(token);
  })
  .catch(function (err: any) {
    console.log("Permission Denied");
  });

messaging.onMessage(function (payload: any) {
  console.log("onMessage:", payload);
});
