// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:5000/",
  socketUrl: "ws://localhost:5000/webSocket",
  firebase : {
    apiKey: "AIzaSyA8WU60YYXggSTkgHyP4nXPoh-V4iEC-Fg",
    authDomain: "hireseat.firebaseapp.com",
    projectId: "hireseat",
    storageBucket: "hireseat.appspot.com",
    messagingSenderId: "287936048712",
    appId: "1:287936048712:web:3c1cb0e3e16fdbc240f27d",
    measurementId: "G-PPRDY5Q0Q8"
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
