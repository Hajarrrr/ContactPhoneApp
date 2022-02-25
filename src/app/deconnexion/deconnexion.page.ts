import { Component, OnInit } from '@angular/core';


import {ContactAuthService } from '../services/contact-auth.service';
import {  NavController } from '@ionic/angular';

@Component({
  selector: 'app-deconnexion',
  templateUrl: './deconnexion.page.html',
  styleUrls: ['./deconnexion.page.scss'],
})
export class DeconnexionPage implements OnInit {

  constructor(private fireauth :ContactAuthService,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  signOut(){
    this.fireauth.signOut()
    .then(res =>{
      console.log("resresresres");
      this.navCtrl.navigateRoot('athentification');
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
}
