import { Component, OnInit } from '@angular/core';

import { FormsModule, ReactiveFormsModule,Validators, FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import {ContactAuthService } from '../services/contact-auth.service';
import { ContactAcessService } from '../services/contact-acess.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../Contact';


//new added native phone features
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SMS } from '@ionic-native/sms/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

import {SQLite,SQLiteObject} from '@ionic-native/sqlite/ngx';
//import { File } from '@ionic-native/file';

@Component({
  selector: 'app-detail-contact',
  templateUrl: './detail-contact.page.html',
  styleUrls: ['./detail-contact.page.scss'],
})
export class DetailContactPage implements OnInit {

  emailContact:string;
  from:string;
  contact: Contact;
  private isButtonsVisible=false;
  start_icon_type:string="star-outline";
  //private db:SQLiteObject;
  db: SQLiteObject = null;

  constructor(private contactservice:ContactAcessService, 
    private fireauth :ContactAuthService, 
    private firestore: ContactAcessService,
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private router: Router,
    //phone new added features
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    private geolocation: Geolocation,
    private sms: SMS,
    private socialSharing:SocialSharing,
    
    private sqlite:SQLite 
    //private file: File
    ) { 
      this.route.queryParams.subscribe(params => {
        this.emailContact = params["emailContact"];
        this.from=params["from"];
        if (this.from==="liste-contacts-rec")
        this.isButtonsVisible = false;
        else if (this.from==="liste-contacts")
        this.isButtonsVisible = true;
        else if (this.from==="favoris")
        this.isButtonsVisible = false;
        //else
        //this.isButtonsVisible = true; 


        /*before
        this.emailContact = params["emailContact"];
        this.from=params["from"];
        if (this.from==="liste-contacts-rec")
        this.isButtonsVisible = false;
        else
        this.isButtonsVisible = true; 
        */
        });
    }

  ngOnInit() {
    if (this.from==="liste-contacts-rec")
      this.recommande();
    else if (this.from==="liste-contacts")
      this.personel();
    else if(this.from==="favoris")
      this.favori();

    /*before
    if (this.from==="liste-contacts-rec")
      this.recommande();
    else
      this.personel();
    */
  }

  personel(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
      this.contactservice.getPersonalContact(res.email,this.emailContact)
      .subscribe(res => {
      this.contact=<Contact>res ;
      /*
      console.log(res);
      })
      } else {
      this.navCtrl.navigateForward('/athentification'); 
      }*/
      this.sqlite.create({
        name:'data.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('select * from contact where email="'+this.emailContact+'"',[])
          .then((data)=>{if (data.rows.length>0) this.start_icon_type="star"; else this.start_icon_type="star-outline";})
          .catch(e => console.log(e));
      }).catch(e => console.log(e));
        console.log(res);})
    }
    else {
      this.navCtrl.navigateForward('/athentification');
    }

    }, err => {
    console.log('err', err);
    })
    
  
  }




  recommande(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.contactservice.getContact(this.emailContact)
    .subscribe(res => {
    this.contact=<Contact>res ;
    //vérifier si le contact est favoris
    /*
    console.log(res);
    })
    } else {
    this.navCtrl.navigateForward('/athentification'); 
    }*/
    this.sqlite.create({
      name:'data.db',
      location:'default'
    }).then((db:SQLiteObject)=>{
      db.executeSql('select * from contact where email="'+this.emailContact+'"',[])
        .then((data)=>{if (data.rows.length>0) this.start_icon_type="star"; else this.start_icon_type="star-outline";})
        .catch(e => console.log(e));
    }).catch(e => console.log(e));
      console.log(res);})
  }
  else {
    this.navCtrl.navigateForward('/athentification');
  }
    }, err => {
    console.log('err', err);
    })
  }


  
  Supprimer(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.contactservice.delateContactPersonel(res.email,this.contact.email);
    this.navCtrl.navigateForward('/liste-contacts'); 
    } else {
    this.navCtrl.navigateForward('/athentification'); 
    }
    }, err => {
    console.log('err', err);
    })
  }

  Partager(){
    this.fireauth.userDetails().subscribe(res => {
    console.log('res', res);
    if (res !== null) {
    this.firestore.newContact(this.contact);
    this.navCtrl.navigateForward('/liste-contacts-rec');
    } else {
    this.navCtrl.navigateForward('/athentification'); 
    }
    }, err => {
    console.log('err', err);
    })
  }

  ajouterContact(){
    this.navCtrl.navigateRoot('/ajouter-contact');
  }



  //phone native functions

  Appel(){
    this.callNumber.callNumber(this.contact.tel, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
    
  Email(){
    let email = {to: this.contact.email, subject: '[Rediger votre objet]', body: '[Rediger votre message]', 
    isHtml: true
    };
    this.emailComposer.open(email);
  }
    

  GPS(): string{
    this.geolocation.getCurrentPosition().then((resp) => {
    return
    "("+resp.coords.latitude+","+resp.coords.longitude+")"
    }).catch((error) => {
    console.log('Error getting location', error);
    return " ";
    });
    return "";
  }
    
  SMS(){
    this.sms.send(this.contact.tel, '[Votre message ici!!!]');
  }
    
  Sharing(){
    this.socialSharing.shareViaWhatsAppToPhone(this.contact.tel, 
    this.GPS(),null).then(() => {
    // Success!
    }).catch(() => {
    // Error!
    });
  }

  favori(){
    this.sqlite.create({
      name:'data.db',
      location:'default'
    })
    .then((db: SQLiteObject) =>{
      this.db=db;
      this.db.executeSql('select * from contact where email="'+this.emailContact+'"',[])
      .then((data)=> {this.contact=data.rows.item(0)})
      .catch(e => console.log(e));
    });
    this.start_icon_type="star";
  }

  ajouterFavori(){
    if(this.start_icon_type=="star"){
      this.start_icon_type="star-outline"
      this.sqlite.create({
        name:'data.db',
        location:'default'
      }).then((db:SQLiteObject) => {
        db.executeSql('delete from contact where tel="'+this.contact.tel+'"',[])
          .then(()=> console.log('Executed SQL delete'))
          .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }
    else{
      this.start_icon_type="star"
      this.sqlite.create({
        name:'data.db',
        location:'default'
      }).then((db:SQLiteObject)=>{
        db.executeSql('insert into contact(nom,prenom,tel,email,adresse,ville,service) values("'
        +this.contact.nom+'","'
         +this.contact.prenom+'","'
        +this.contact.tel+'","'
        +this.contact.email+'","'
        +this.contact.adresse+'","'
        +this.contact.ville+'","'
        +this.contact.service+'")',[])
          .then(()=> console.log('Executed sql insert'))
          .catch(e => console.log(e));
      }).catch(e => console.log(e));
    }
  }
    
  
}
