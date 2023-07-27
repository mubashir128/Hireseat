import { Component, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { App, AppState, URLOpenListenerEvent } from '@capacitor/app';
import { BackgroundMode } from '@anuradev/capacitor-background-mode'
import { Subscription } from "rxjs";

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


    // Listen for app state changes
    App.addListener('appStateChange', async (state: AppState) => {
      if (state.isActive) {
        // App is brought back to the foreground
        BackgroundMode.moveToForeground();
        BackgroundMode.wakeUp();
        BackgroundMode.disable();
        console.log('App resumed');
        // Perform actions or resume tasks as needed.
      } else {
        // App is sent to the background
        console.log('App paused');
        BackgroundMode.enable();
        // const res = await BackgroundMode.checkBatteryOptimizations();
        // if (res.disabled) {
        //    await BackgroundMode.requestDisableBatteryOptimizations();
        // }
        BackgroundMode.moveToBackground();
        // Perform actions or save state before the app goes into the background.
      }
    });


  }

}
