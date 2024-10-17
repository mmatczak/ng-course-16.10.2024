import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  Routes,
  withComponentInputBinding,
  withDebugTracing,
} from '@angular/router';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withDebugTracing(), withComponentInputBinding()),
    provideZoneChangeDetection({ eventCoalescing: true }),
  ],
};
