import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import 'hammerjs';
// import { FlatpickrModule, FLATPICKR } from 'angularx-flatpickr';
// import flatpickr from 'flatpickr';
// import { english } from 'flatpickr/dist/l10n/default';
// export function flatpickrFactory() {
//   flatpickr.localize(english);
//   return flatpickr;
// }
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
