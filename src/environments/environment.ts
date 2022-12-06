// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  baseUrl: "http://localhost:5000/",
  socketUrl: "ws://localhost:5000/webSocket",
  chatRedirectUrl : "http://localhost:4200/",
  redirecUrl : "http://localhost:4200/",
  redirectAppleUrl : "https://bluerecruting.firebaseapp.com/__/auth/handler",
  serverId : "861355719085-slte0lj3ge7riviat156g898463d6mp1.apps.googleusercontent.com",
  appleUrl: "com.hireseat.app",
  firebase : {
    apiKey: "AIzaSyCv0FeWpM2qiRy_SaYtLdZmoGQNwSpm_5I",
    authDomain: "bluerecruting.firebaseapp.com",
    databaseURL: "https://bluerecruting.firebaseio.com",
    projectId: "bluerecruting",
    storageBucket: "bluerecruting.appspot.com",
    messagingSenderId: "861355719085",
    appId: "1:861355719085:web:d7d0b93cfe920c68944924"
  },
  platformUrl : "localhost"
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
