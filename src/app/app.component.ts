import { Component, NgZone } from "@angular/core";
import { Router } from '@angular/router';
import { App, URLOpenListenerEvent } from '@capacitor/app';
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "app";
  constructor(private _router: Router, private zone: NgZone) {
    this.initializeApp();
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        const slug = event.url.split(".com").pop();
        if (slug) {
          this._router.navigateByUrl(slug);
        }
      });
    });
  }

}
