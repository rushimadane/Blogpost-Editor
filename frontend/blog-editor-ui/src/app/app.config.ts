import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Enable Routing
    provideRouter(routes),
    
    // Enable HTTP Client (for API requests)
    provideHttpClient(withFetch()),
    
    // Enable Animations (required for Material SnackBar)
    provideAnimationsAsync()
  ]
};