import firebase from "firebase/app";
import "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDLX9aNXJBJgm-hp6r1fmQba0JeFBfhpGM",
  authDomain: "ibanking-a77e5.firebaseapp.com",
  projectId: "ibanking-a77e5",
  storageBucket: "ibanking-a77e5.appspot.com",
  messagingSenderId: "429415985201",
  appId: "1:429415985201:web:8ad82e57908fdbf3fda510",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey(
  "BHWEcSaYUEGr25lLl31Oie-K7N6hpcQIkum03TE8cjATZzgeiJaovkWtK5PiX1sbnm_j0a_6tOfQl1C-nJJpskk"
);

export { messaging };
export default firebase;
