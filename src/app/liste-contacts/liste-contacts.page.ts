import { Component, OnInit } from '@angular/core';

import { MenuController,NavController} from '@ionic/angular';
import {ContactAuthService } from '../services/contact-auth.service';
import { ContactAcessService } from '../services/contact-acess.service';


import { NavigationExtras,Router } from '@angular/router';
import { Contact } from '../Contact';



@Component({
  selector: 'app-liste-contacts',
  templateUrl: './liste-contacts.page.html',
  styleUrls: ['./liste-contacts.page.scss'],
})
export class ListeContactsPage implements OnInit {

  
  contacts : Contact[] ;
  email:string;

  constructor(private menuCtrl: MenuController,
    private fireauth :ContactAuthService,
    private firestore: ContactAcessService,
    private contactService:ContactAcessService,
    private navCtrl: NavController, 
    private router: Router) {
      
    this.menuCtrl.enable(true)
   }

ngOnInit() {    
  this.fireauth.userDetails().subscribe(res => {
    if (res !== null){
      this.email = res.email;
      //valueChanges().
      this.contactService.getAllPersonalContact(res.email)
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
        })
        console.log(this.contacts);
      });
      
    } else {
      this.navCtrl.navigateForward('/authentification');
    }
  }, err => {
    console.log('erreur = ', err);
  })
}


  ajouterContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
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

  
    


