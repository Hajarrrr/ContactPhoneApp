import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListeContactsRecPage } from './liste-contacts-rec.page';

const routes: Routes = [
  {
    path: '',
    component: ListeContactsRecPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeContactsRecPageRoutingModule {}
