importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyCEx3UAFAVQIFgPyOXfTJz5eOG5xixcqN4",
    authDomain: "fir-hireseat.firebaseapp.com",
    projectId: "fir-hireseat",
    storageBucket: "fir-hireseat.appspot.com",
    messagingSenderId: "256108345803",
    appId: "1:256108345803:web:0d5258ebc68385f8f5de4e",
    measurementId: "G-NSEGDPRKXP"
});
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
    console.log("[firebase-messaging-sw.js] Received background message ", payload,
    );
    // Customize notification here
    const notificationTitle = "Background Message Title";
    const notificationOptions = {
        body: "Background Message body.",
        icon: "/itwonders-web-logo.png",
    };

    return self.registration.showNotification(notificationTitle, notificationOptions);
});