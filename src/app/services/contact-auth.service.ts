import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root'
})
export class ContactAuthService {
  
  constructor(private fireauth: AngularFireAuth) { }

  signUp(value){
    return new Promise<any>((resolve, reject) => {
      this.fireauth.createUserWithEmailAndPassword(value.email,value.password).then(
      res => resolve(res),
      err => reject(err))
    })
  }

  userDetails() {
    return this.fireauth.user
  }

  signIn(value){
    return new Promise<any>((resolve, reject) => {
      this.fireauth.signInWithEmailAndPassword(value.email, value.password)
      .then(
      res => resolve(res),
      err => reject(err))
    })
  }

  signOut(){
    return new Promise((resolve, reject) => {
      if (this.fireauth.currentUser) {
      this.fireauth.signOut()
      .then(
      res => resolve(res),
      err => reject(err))
      }
      })
  }
}
