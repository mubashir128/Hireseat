import { Component, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { BackgroundMode } from '@anuradev/capacitor-background-mode'
import { Subscription } from "rxjs";
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  private resumeSubscription: Subscription;
  private pauseSubscription: Subscription;
  constructor(private _router: Router, private zone: NgZone) {



    this.initializeApp();
    this.startChecks();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split("hireseat.com").pop();
        if (slug) {
          this._router.navigateByUrl(slug);
        }
      });
    });
  }
  keepAwake = async () => {
    await KeepAwake.keepAwake();
  };
  startChecks() {
    // Listen for app state changes
    App.addListener('appStateChange', async (state: AppState) => {
      if (state.isActive) {
        console.log('App resumed : ', state);
        this.initializeApp();
      } else {
        // App is sent to the background
        console.log('App paused : ', state);
        this.keepAwake();
      }
    });

  }
  // startChecks() {
  //   // Listen for app state changes
  //   App.addListener('appStateChange', async (state: AppState) => {
  //     if (state.isActive) {
  //       // App is brought back to the foreground
  //       BackgroundMode.moveToForeground();
  //       BackgroundMode.wakeUp();
  //       BackgroundMode.disable().then((res: any) => {
  //         console.log("BackgroundMode disable : ", res)
  //         this.initializeApp();
  //       });
  //       console.log('App resumed : ',state);
  //       // Perform actions or resume tasks as needed.
  //     } else {
  //       // App is sent to the background
  //       console.log('App paused : ',state);
  //       BackgroundMode.enable();
  //       // const res = await BackgroundMode.checkBatteryOptimizations();
  //       // if (res.disabled) {
  //       //    await BackgroundMode.requestDisableBatteryOptimizations();
  //       // }
  //       BackgroundMode.moveToBackground();
  //       // Perform actions or save state before the app goes into the background.
  //     }
  //   });

  // }

}
