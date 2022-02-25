import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeContactsPageRoutingModule } from './liste-contacts-routing.module';

import { ListeContactsPage } from './liste-contacts.page';

import { NavigationExtras,Router } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeContactsPageRoutingModule,

    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [ListeContactsPage]
})
export class ListeContactsPageModule {}
