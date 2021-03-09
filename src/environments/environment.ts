// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:5000/",
  socketUrl: "ws://localhost:5000/webSocket",
  firebase : {
    apiKey: "AIzaSyCEx3UAFAVQIFgPyOXfTJz5eOG5xixcqN4",
    authDomain: "fir-hireseat.firebaseapp.com",
    projectId: "fir-hireseat",
    storageBucket: "fir-hireseat.appspot.com",
    messagingSenderId: "256108345803",
    appId: "1:256108345803:web:0d5258ebc68385f8f5de4e",
    measurementId: "G-NSEGDPRKXP"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
