import { Component, OnInit } from '@angular/core';
import { Compte } from '../Compte';
import { ContactAcessService } from '../services/contact-acess.service';
import {ContactAuthService } from '../services/contact-auth.service';
import { NavController } from '@ionic/angular';
import { FormGroup } from '@angular/forms';

import { AjouterContactPage } from '../ajouter-contact/ajouter-contact.page';

//AjouterContactPage;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  image: String; 
  compte: Compte;
  //any={};
  email: string;

  ajouterContactForm:FormGroup;

  constructor(private contactservice:ContactAcessService,
    private fireauth :ContactAuthService,
    private navCtrl: NavController ) { 
      this.fireauth.userDetails().subscribe( res=>{
        console.log('res',res);
        if(res !== null){
          this.email=res.email;
          console.log(  this.contactservice.getCompte(this.email).subscribe(res => {
            this.compte=<Compte>res ;
            console.log(this.compte);
            }))
        }else{
          this.navCtrl.navigateForward('/athentification');
        }
        }, err =>{
          console.log('err',err);
        })
    }
  

  ngOnInit() { 
   
      //'06XXXX'
    
  }

  modifierContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
    //AjouterContactPage.ajouterContactForm.controls['email'].setValue(this.email);
  }
}
