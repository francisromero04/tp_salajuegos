import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

import {AngularFireModule} from '@angular/fire/compat';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    importProvidersFrom(
      provideFirebaseApp(() => 
        initializeApp({          
          "projectId": "salajuegos-b2660",
          "appId": "1:208930793616:web:33137f936d62166fbbd015",
          "storageBucket": "salajuegos-b2660.appspot.com",
          "apiKey": "AIzaSyAZRKPLRyCCUPlVmpHwaASg-xVy9hhlHIE",
          "authDomain": "salajuegos-b2660.firebaseapp.com",
          "messagingSenderId": "208930793616",
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())), 
    importProvidersFrom(provideStorage(() => getStorage())),
    importProvidersFrom(AngularFireModule.initializeApp({
      projectId: "salajuegos-b2660",
      appId: "1:208930793616:web:33137f936d62166fbbd015",
      storageBucket: "salajuegos-b2660.appspot.com",
      apiKey: "AIzaSyAZRKPLRyCCUPlVmpHwaASg-xVy9hhlHIE",
      authDomain: "salajuegos-b2660.firebaseapp.com",
      messagingSenderId: "208930793616",
  }))]
};
