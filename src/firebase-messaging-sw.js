importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.9/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyBSIidfml1DDlKHCUIKoy34-JSDIUiVdro",
    authDomain: "hireseatdemo.firebaseapp.com",
    projectId: "hireseatdemo",
    storageBucket: "hireseatdemo.appspot.com",
    messagingSenderId: "914575571896",
    appId: "1:914575571896:web:940857cb8ac62a336d2d4d",
    measurementId: "G-2QQFR06MEP"
});
const messaging = firebase.messaging();