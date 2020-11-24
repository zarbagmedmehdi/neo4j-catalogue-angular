import { Component, OnInit } from '@angular/core';
import {Magasin} from "../../models/Magasin";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AjoutService} from "../../services/ajout.service";
import {Categorie} from "../../models/Categorie";
import {FindService} from "../../services/find.service";
import {catchError, retry} from "rxjs/operators";
import {Produit} from "../../models/Produit";

@Component({
  selector: 'app-ajout',
  templateUrl: './ajout.component.html',
  styleUrls: ['./ajout.component.css']
})
export class AjoutComponent implements OnInit {
  name:string;
  showm:boolean;
  showp:boolean;
  showc:boolean;
  magasin:Magasin;
  magasinForm: FormGroup;
  categorie:string;
  categorieForm: FormGroup;
  magasins: Magasin[]=[];
  selectedMagasins: string[];
  op: String="Ajout";

  constructor(private formbuilder: FormBuilder,private findService:FindService,private  ajoutServie:AjoutService) { }

  ngOnInit(): void {
    this.findService.getAllMagasin((data) => {
      this.magasins=data
    });
    this.magasin= {nom:"",adresse:"",ville:"", };
    this.showHide(true,false,false);
    let patterns={
      nom:['', Validators.compose([Validators.required, ])],
      adresse:['', Validators.compose([Validators.required, ])],
      ville:['', Validators.compose([Validators.required, ])],
    };
    this.magasinForm=this.formbuilder.group(patterns);



  }
  magasinShow() {
    this.op="Ajout";
    this.magasin= {nom:"",adresse:"",ville:"", };
    this.showHide(true,false,false);}
  produitShow() {this.showHide(false,true,false);}
  showHide(a,b,c) {
    this.findService.getAllMagasin((data) => {
      this.magasins=data
    });
    this.showm=a;this.showp=b;this.showc=c;}
  persistMagasin() {
    if (this.op === "Ajout")
      this.saveMagasin();
    else
      this.updateMagasin()
  }

  saveMagasin() {

    this.ajoutServie.persistMagasin(this.magasin,(data) => {
      if(data==1)
      {

        alert("Magasin enregistré");

        this.findService.getAllMagasin((data) => {
          console.log(data)
          this.magasins=data
        });
        this.magasinForm.reset();
      }
      else {
        alert("Magasin non enregistré");

      }
    });
  }
  deleteMagasin(id) {
    this.ajoutServie.deleteMagasin(id,(data) => {
      alert(data)

      this.findService.getAllMagasin((don) => {
        this.magasins=don
      });


    });
  }


  updateMagasin() {
    this.ajoutServie.updateMagasin(this.magasin,(data) => {
      if(data==1)
      {

        alert("Magasin enregistré");

        this.findService.getAllMagasin((data) => {
          console.log(data)
          this.magasins=data
        });
        this.magasinForm.reset();
      }
      else {
        alert("Magasin non enregistré");

      }

    });

  }

  chargerMagasin(magasin: Magasin) {
    this.magasin=magasin;
    this.op="Modification";
  }
}


