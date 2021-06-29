importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.6.8/firebase-messaging.js");

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

// messaging.setBackgroundMessageHandler(function (payload) {
//   const promiseChain = clients
//     .matchAll({
//       type: "window",
//       includeUncontrolled: true,
//     })
//     .then((windowClients) => {
//       for (let i = 0; i < windowClients.length; i++) {
//         const windowClient = windowClients[i];
//         windowClient.postMessage(payload);
//       }
//     })
//     .then(() => {
//       return registration.showNotification("my notification title");
//     });
//   return promiseChain;
// });

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Background Message Title";
  const notificationOptions = {
    body: "Background Message body.",
    icon: "/logo.png",
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  // console.log("[Service Worker] Notification click Received.");
  // event.notification.close();
  // event.waitUntil(clients.openWindow(`${baseUrl}`));
});
