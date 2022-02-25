import { Component, OnInit } from '@angular/core';



import { AngularFireDatabase } from '@angular/fire/compat/database';

import {ContactAuthService } from '../services/contact-auth.service';
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { MenuController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-athentification',
  templateUrl: './athentification.page.html',
  styleUrls: ['./athentification.page.scss'],
})
export class AthentificationPage implements OnInit {
  private authForm : FormGroup;

  constructor(private fireauth :ContactAuthService,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private menuCtrl: MenuController) { 
      this.menuCtrl.enable(false);
    }

  ngOnInit() {
    this.authForm =this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }

  signIn(){
    this.fireauth.signIn(this.authForm.value)
    .then(res =>{
      console.log(res);
      this.navCtrl.navigateForward('/liste-contacts');
    }, err => {
      console.log(err);
    })
  }

  signUp(){
    this.navCtrl.navigateForward('/inscription');
  }

  
}

/*
export class AthentificationPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
*/