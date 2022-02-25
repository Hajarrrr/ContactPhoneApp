import { Injectable } from '@angular/core';

import { Compte } from '../Compte';
import { AngularFirestore } from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root'
})
export class ContactAcessService {

  constructor( private firestore: AngularFirestore) { }

  compteRef:AngularFirestore;

  // Récuperer les infos sur le compte identifié par l email
  getCompte(id: string) {
    return this.firestore.doc('/Comptes/'+id).valueChanges();
  }

  //Récuperer les infos sur le contact partagé identifié par l email 
  getContact(id: string) {
    return this.firestore.doc('/Contacts/'+id).valueChanges();
  }

  //Récuperer tous les comptes
  getAllCompte() {
    return this.firestore.collection('/Comptes/').snapshotChanges();
  }

  //Récuperer tous les contacts
  getAllContact() {
    return this.firestore.collection('/Contacts/').snapshotChanges();
  }

  //Récuperer le contact personnel id2 du compte id1
  getPersonalContact(id1:string, id2:string,){
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).valueChanges();
  }

  //Récuperer tous les contacts personnels du compte identifiés par l'email
  getAllPersonalContact(id){
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts').snapshotChanges();
  }

  //ajouter un nouveau compte
  newCompte(compte:Compte){
    return this.firestore.collection('/Comptes/').doc(compte.email).set(compte);
  }
  //ajouter un nouveau contact partagé
  newContact(contact){
    return this.firestore.collection('/Contacts/').doc(contact.tel).set(contact);
  }

  
  //ajouter un nouveau contact personel dans un compte identifié par un email
 /* newPersonalContact(id,contact){
    return this.firestore.collection('/Comptes/'+id).doc(contact.email).set(contact);
  }
*/


  newPersonalContact(id, contact) {
    return this.firestore.doc('/Comptes/'+id).collection('/Contacts/').doc(contact.email).set(contact);
  }

  delateContactPersonel(id1: string, id2: string ){
    return this.firestore.doc('/Comptes/'+id1).collection('/Contacts').doc(id2).delete();
  }

  
    
}
