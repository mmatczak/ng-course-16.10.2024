import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideRouter,
  Routes,
  withComponentInputBinding,
  withDebugTracing,
} from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUriToken } from './base-uri.token';
import { jwtTokenInterceptor } from './jwt-token.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,  withComponentInputBinding()),
    provideHttpClient(withInterceptors([jwtTokenInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    {provide: baseUriToken, useValue: "http://localhost:3000"}
  ],
};
