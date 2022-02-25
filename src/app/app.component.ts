import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [

    { title: 'Profile', url: '/profile' },
    { title: 'Mes contacts', url: '/liste-contacts' },
    { title: 'Recommandations', url: '/liste-contacts-rec' },
    { title: 'Favoris', url: './favoris'},
    { title: 'ajouter contact', url: '/ajouter-contact' },
    
    { title: 'Déconnection', url: '/deconnexion' },
    { title: 'Authentification', url: '/athentification' },
    { title: 'Inscription', url: '/inscription' },
   // { title: 'Detail contact', url: '/detail-contact' },
    
  ];
  //public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor() {}
}
