import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import '../node_modules/bootstrap-italia/dist/css/bootstrap-italia.min.css';
import '../node_modules/bootstrap-italia/dist/js/bootstrap-italia.bundle.min.js';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
