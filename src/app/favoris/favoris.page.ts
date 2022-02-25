import { Component, OnInit } from '@angular/core';
import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx';
import { ContactAcessService } from '../services/contact-acess.service';
import { Contact } from '../Contact';
import { transitionEndAsync } from '@ionic/core/dist/types/utils/helpers';
import { NavigationExtras,Router } from '@angular/router';
import { MenuController,NavController} from '@ionic/angular';

@Component({
  selector: 'app-favoris',
  templateUrl: './favoris.page.html',
  styleUrls: ['./favoris.page.scss'],
})
export class FavorisPage implements OnInit {

  db: SQLiteObject = null;
  contacts : Contact[] ;
  //public contacts: Array<Contact>;

  constructor(private sqlite:SQLite,
    private contactService:ContactAcessService,
    private navCtrl: NavController ) { }

  ngOnInit() {
    this.ShowFavori();
   /* this.contactService.getAllContact()
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
    */
  }

  ShowFavori(){
    /*
    this.sqlite.create({
      name:'data.db',
      location:'default'
    })
    .then((db: SQLiteObject) =>{
      this.db=db;
      this.db.executeSql('select * from contact ',[])
      .then((data)=> {this.contacts = data.map(e => {
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
      console.log(this.contacts);})
      .catch(e => console.log(e));
    });
    */
    this.sqlite.create({
      name:'data.db',
      location:'default'
    })
    .then((db: SQLiteObject) =>{
      //this.db=db;
      //let x=this.db.executeSql('select * from contact ',[]);
      
        db.executeSql('select * from contact ',[])
        .then((res) => {
          let todos = [];
          this.contacts = [];
          
          let adresse , email , nom, prenom, service, tel,ville = [];

          if(res.rows.length > 0 ) {
            for(let i = 0; i < res.rows.length; i++ ){
              /*
              todos.push({
                    "adresse": res.rows.item(i).adresse,
                    "email": res.rows.item(i).email,
                    "nom": res.rows.item(i).nom,
                    "prenom": res.rows.item(i).prenom,
                    "service": res.rows.item(i).service,
                    "tel": res.rows.item(i).tel,
                    "ville": res.rows.item(i).ville,
              });
              */
              //todos.push(res.rows.item(i));
              this.contacts.push({
                "adresse": res.rows.item(i).adresse,
                "email": res.rows.item(i).email,
                "nom": res.rows.item(i).nom,
                "prenom": res.rows.item(i).prenom,
                "service": res.rows.item(i).service,
                "tel": res.rows.item(i).tel,
                "ville": res.rows.item(i).ville,
          });

              
                /*
              var data = Array.from(res.rows.item(0));
              this.contacts = data.map(e => {
                return {
                  adresse: data['adresse'],
                  email: data['email'],
                  nom: data['nom'],
                  prenom: data['prenom'],
                  service: data['service'],
                  tel: data['tel'],
                  ville: data['ville'],
                
                }});
                */

                /*
               let data= todos[i];
                this.contacts = todos.map(e => {
                  return {
                    adresse: data['adresse'],
                    email: data['email'],
                    nom: data['nom'],
                    prenom: data['prenom'],
                    service: data['service'],
                    tel: data['tel'],
                    ville: data['ville'],
                  
                  }});
                  console.log(data);
                  */

                  
                    
                 
              }
              /*
              this.contacts = todos.map(e => {
                return {
                  adresse: adresse.item,
                  email: email.item,
                  nom: nom.item,
                  prenom: prenom.item,
                  service: service.item,
                  tel: tel.item,
                  ville: ville.item,
                
                }});
                */
                
                /*change here
                this.contacts = todos.map(e => {
                  return {
                    adresse: todos["adresse"].item,
                    email: todos["email"].item,
                    nom: todos["nom"].item,
                    prenom: todos["prenom"].item,
                    service: todos["service"].item,
                    tel: todos["tel"].item,
                    ville: todos["ville"].item,
                  
                  }});*/
                  
                  
              

                 // console.log("todos[adresse]",todos["adresse"].item);
            console.log("todos",todos);
            
            //console.log(data);
          }
          
          
        },(error) => {
          console.log(error);
        });
      
      /*
      .then((data)=> {this.contacts = data.map(e => {
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
      console.log(this.contacts);})
      .catch(e => console.log(e));
      */
      console.log('exit');
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
