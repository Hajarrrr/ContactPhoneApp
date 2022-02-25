import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DeconnexionPageRoutingModule } from './deconnexion-routing.module';

import { DeconnexionPage } from './deconnexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DeconnexionPageRoutingModule,

    FormsModule, 
    ReactiveFormsModule
  ],
  declarations: [DeconnexionPage]
})
export class DeconnexionPageModule {}
