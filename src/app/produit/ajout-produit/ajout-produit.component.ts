import { Component, OnInit } from '@angular/core';
import {Mag, Produit} from "../../models/Produit";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {FindService} from "../../services/find.service";
import {AjoutService} from "../../services/ajout.service";
import {Magasin} from "../../models/Magasin";
import {Categorie} from "../../models/Categorie";

@Component({
  selector: 'app-ajout-produit',
  templateUrl: './ajout-produit.component.html',
  styleUrls: ['./ajout-produit.component.css']
})
export class AjoutProduitComponent implements OnInit {
  produit: Produit;
  magasins:Magasin[]=[];
  selectedmagasins:Magasin[]=[];
  magasinStock: number[]=[];
  produitForm:FormGroup;
  initialcategories: String[]=[];
  caracteristiques:string[]=[];
  valeurs:string[]=[];


  nombreCaractere: number;

  constructor(private formbuilder: FormBuilder,private findService:FindService,private  ajoutServie:AjoutService) { }

  ngOnInit(): void {
    this.initialcategories=['Petit elecromenager','gros electromenager','entretien de la maison','santé beauté','tv','photo vidéo',
      'informatique','pc','smartphone','tablette','jeux',];
    this.produit={description:"",reference:"", libelle:"", prix:null, marque:"",magasins:[],categories:[],caracteristiques:new Map()};
    let patterns3={
      reference:['', Validators.compose([Validators.required, ])],
      libelle:['', Validators.compose([Validators.required, ])],
      prix:['', Validators.compose([Validators.required, ])],
      marque:['', Validators.compose([Validators.required, ])],
      stock:['', Validators.compose([Validators.required, ])],
      description:['', Validators.compose([Validators.required, ])],
      nombreCaractere:['', Validators.compose([Validators.required, ])],
      magasinsNames:['', Validators.compose([Validators.required, ])],
      categories:['', Validators.compose([Validators.required, ])],

    };
    this.produitForm=this.formbuilder.group(patterns3);
    this.findService.getAllMagasin((don) => {
      this.magasins=don

    });
  }
  persistProduit() {
    let map;


    let incorrect = false;
    if (this.selectedmagasins.length > 0) {
      for (var _i = 0; _i < this.caracteristiques.length; _i++) {
        let key=this.caracteristiques[_i];
        console.log(key+this.valeurs[_i])
        this.produit.caracteristiques[key]=this.valeurs[_i];
        console.log(_i)
      }
      console.log(JSON.stringify(this.produit.caracteristiques))
      for (var index in this.selectedmagasins) {
        if (this.magasinStock[index] == null) {
          alert('Remplir les stock de tous les magasins');
          incorrect = true;
          break;
        } else {
          let mag: Mag = {magasinId: this.selectedmagasins[index].id, stock: this.magasinStock[index]};
          this.produit.magasins.push(mag);
        }
      }


      if (incorrect == false) {
        this.ajoutServie.persistProduit(this.produit, (data) => {
          if (data == 1) {
            alert("Produit enregistré");
            console.log(JSON.stringify(this.produit))

            this.produitForm.reset();
            this.selectedmagasins=[];
            this.magasinStock=[];
          } else {
            alert("Produit  non enregistré");
            this.produitForm.reset();
            this.selectedmagasins=[];
            this.magasinStock=[];
          }
        });
      } }



  }

  see(){
    console.log(JSON.stringify(this.produit.caracteristiques))

  }

  clean() {
    this.magasinStock=[];
  }
  changeListener($event) : void {
    this.readThis($event.target);
  }

  readThis(inputValue: any): void {

    var file:File = inputValue.files[0];
    var myReader:FileReader = new FileReader();

    myReader.onloadend = (e) => {
      this.produit.image = myReader.result.toString();
    }
    myReader.readAsDataURL(file);
  }

  fakeArray(length: number): Array<any> {
    if (length >= 0) {
      return new Array(length);
    }
  }

  cleanCaracters(nombre: any) {


  }


}

