importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCv0FeWpM2qiRy_SaYtLdZmoGQNwSpm_5I",
    authDomain: "bluerecruting.firebaseapp.com",
    databaseURL: "https://bluerecruting.firebaseio.com",
    projectId: "bluerecruting",
    storageBucket: "bluerecruting.appspot.com",
    messagingSenderId: "861355719085",
    appId: "1:861355719085:web:d7d0b93cfe920c68944924"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload);
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});