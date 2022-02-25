import { Component, OnInit } from '@angular/core';

import { MenuController,NavController} from '@ionic/angular';
import {ContactAuthService } from '../services/contact-auth.service';
import { ContactAcessService } from '../services/contact-acess.service';


import { NavigationExtras,Router } from '@angular/router';
import { Contact } from '../Contact';


@Component({
  selector: 'app-liste-contacts-rec',
  templateUrl: './liste-contacts-rec.page.html',
  styleUrls: ['./liste-contacts-rec.page.scss'],
})
export class ListeContactsRecPage implements OnInit {

  contacts : Contact[] ;
  email:string;

  constructor(private menuCtrl: MenuController,
    private fireauth :ContactAuthService,
    private firestore: ContactAcessService,
    private contactService:ContactAcessService,
    private navCtrl: NavController, 
    private router: Router) { }

  ngOnInit() {
    

        this.contactService.getAllContact()
        .subscribe( data => {
          this.contacts = data.map(e => {
            return {
              adresse: e.payload.doc.data()['adresse'],
              email: e.payload.doc.data()['email'],
              nom: e.payload.doc.data()['nom'],
              prenom: e.payload.doc.data()['prenom'],
              service: e.payload.doc.data()['service'],
              tel: e.payload.doc.data()['tel'],
              ville: e.payload.doc.data()['ville'],
            
            };
            console.log(e.payload.doc.data()['adresse']);
          })
          
          console.log(this.contacts);
        });
  }



  detailsContact(email){
    let navigationExtras: NavigationExtras = {
      queryParams: {
      emailContact: email,
      from:"liste-contacts"
      }
    };
    this.navCtrl.navigateForward('/detail-contact', navigationExtras);
  }

}
