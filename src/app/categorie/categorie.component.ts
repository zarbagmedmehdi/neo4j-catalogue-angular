import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AjoutService} from '../services/ajout.service';
import {FindService} from '../services/find.service';
import {Categorie} from '../models/Categorie';

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.css']
})
export class CategorieComponent implements OnInit {
  categorie: any;
  categorieForm: FormGroup;
categories:Categorie[]=[];
  constructor(private formbuilder:FormBuilder,private ajoutService:AjoutService,private findService :FindService) { }

  ngOnInit(): void {
    this.findService.getAllCategories((data) => {
      console.log(data)
      this.categories=data
    });
    this.categorie={libelle:""};
    let patterns={
      libelle:['', Validators.compose([Validators.required, ])],

    };
    this.categorieForm=this.formbuilder.group(patterns);
  }

  persistCategorie() {
    this.ajoutService.persistCategorie(this.categorie,(data) => {
      if(data==1)
      {

        alert("Categorie enregistré");

        this.findService.getAllCategories((data) => {
          console.log(data)
          this.categories=data
        });
        this.categorieForm.reset();
      }
      else {
        alert("Categorie non enregistré");

      }
  });}

}
