import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeContactsRecPageRoutingModule } from './liste-contacts-rec-routing.module';

import { ListeContactsRecPage } from './liste-contacts-rec.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeContactsRecPageRoutingModule
  ],
  declarations: [ListeContactsRecPage]
})
export class ListeContactsRecPageModule {}
