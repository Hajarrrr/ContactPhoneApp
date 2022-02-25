import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

//firebase modules importations
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import {CallNumber } from '@ionic-native/call-number/ngx';
import {EmailComposer } from '@ionic-native/email-composer/ngx';
import {Geolocation } from '@ionic-native/geolocation/ngx';
import {SMS } from '@ionic-native/sms/ngx';
import {SocialSharing } from '@ionic-native/social-sharing/ngx';

import { SQLite} from '@ionic-native/sqlite/ngx';

export const firebaseConfig = {
  apiKey: 'AIzaSyDGC9Ov-d4Zg3dMHyiqzDirZRLc5wu9sV4',
  authDomain: 'contactapp-f0e69.firebaseapp.com',
  projectId: 'contactapp-f0e69',
  storageBucket: 'contactapp-f0e69.appspot.com',
  messagingSenderId: '1038357742747',
  appId: '1:1038357742747:web:22f742fa5918068798323e',
  measurementId: 'G-W5FJ4GLNPW'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            //new imports firebase
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireDatabaseModule,
            AngularFireAuthModule,
            AngularFireStorageModule,

            FormsModule, 
            ReactiveFormsModule

            ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
              //StatusBar,
              //SplashScreen,
              CallNumber,
              EmailComposer,
              Geolocation,
              SMS,
              SocialSharing,
              SQLite
              ],
  bootstrap: [AppComponent],
})
export class AppModule {}

//export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk;
