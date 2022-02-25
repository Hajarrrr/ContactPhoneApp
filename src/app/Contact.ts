export class Contact {
    nom: string;
    prenom: string;
    email: string;
    tel: string;
    ville: string;
    adresse: string;
    service: string;
    //compte_email:number;
    
    constructor(nom: string,prenom: string,email: string,tel: string,ville: string,adresse: string,service: string,compte_email:number){
        this.nom = nom;
        this.prenom= prenom;
        this.email= email;
        this.tel=tel;
        this.ville= ville;
        this.adresse= adresse;
        this.service= service;
        //this.compte_email=compte_email;
    }
}

//let contact = new Contact();