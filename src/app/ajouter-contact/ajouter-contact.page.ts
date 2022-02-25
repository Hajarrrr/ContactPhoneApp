import { Component, OnInit } from '@angular/core';

import { AngularFireDatabase } from '@angular/fire/compat/database';
import {ContactAuthService } from '../services/contact-auth.service';
import { ContactAcessService } from '../services/contact-acess.service';


import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

import { Contact } from '../Contact';


@Component({
  selector: 'app-ajouter-contact',
  templateUrl: './ajouter-contact.page.html',
  styleUrls: ['./ajouter-contact.page.scss'],
})
export class AjouterContactPage implements OnInit {

  ajouterContactForm : FormGroup;
  private contact: Contact;
  static ajouterContactForm: any;
  
  constructor(private navCtrl: NavController,
    private fireauth :ContactAuthService,
    private formBuilder: FormBuilder,
    private firestore: ContactAcessService) { 
      
      this.ajouterContactForm = this.formBuilder.group({
        nom: [''],
        prenom: [''],
        email: [''],
        tel: [''],
        adresse: [''],
        ville: [''],
        service: [''],
      });
    
    }

  ngOnInit() {
  }

  //new added function supposed to be in list-contacts
  
  ajouterContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
  }

  nouveauContact(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.firestore.newPersonalContact(res.email,this.ajouterContactForm.value)
    this.navCtrl.navigateForward('/liste-contacts');
    } else {
    this.navCtrl.navigateForward('/athentification'); 
    }
    }, err => {
    console.log('err', err);
    })
    }
    
    
}
