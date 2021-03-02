// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:5000/",
  socketUrl: "ws://localhost:5000/webSocket",
  firebase : {
    apiKey: "AIzaSyBSIidfml1DDlKHCUIKoy34-JSDIUiVdro",
    authDomain: "hireseatdemo.firebaseapp.com",
    projectId: "hireseatdemo",
    storageBucket: "hireseatdemo.appspot.com",
    messagingSenderId: "914575571896",
    appId: "1:914575571896:web:940857cb8ac62a336d2d4d",
    measurementId: "G-2QQFR06MEP"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
