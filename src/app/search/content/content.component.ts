import {Component, OnInit} from '@angular/core';
import {$} from 'protractor';
import {SearchService} from '../../services/search.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Search} from '../../model/search.model';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  magasins: any;
  categories: string[];
  marques: string[];
  produits: any;
  selectedMagasinId: string;
  selectedCategorie: string;
  selectedMarques: string[];
  selectedPriceMin: any;
  selectedPriceMax: any;
  searchText: any;
  criteria:Search;

  selectedProduct:any;
  showCatalogue:boolean=true;
  selectedProductCaracteristiques: any;

  constructor(private http: HttpClient, private searchService: SearchService) {
  }

  ngOnInit(): void {
    this.selectedProductCaracteristiques={};
    this.produits=new Array();
    this.getMagasins();
    this.getCategories();
    this.getMarques();

  }

  initSelectedFields(){
    this.selectedMagasinId=null;
    this.selectedCategorie=null;
    this.selectedMarques=null;
    this.selectedPriceMin=null;
    this.selectedPriceMax=null;
  }

  setText(): any {
    console.log(this.searchText);
    this.searchService.searchText = this.searchText;
  }

  updateProductList(): any {

  }


  // tslint:disable-next-line:no-output-rename


  // constructor(private http:HttpClient,private searchService: SearchService) {
  //   this.selectedMarques = new Array();
  //   this.marques = ['a', 'b', 'c'];
  // }




  public getMagasins() {
    this.http.get<any>('http://localhost:8080/magasin/').subscribe(data => {
      this.magasins = data;
    });
  }
  public getMarques() {
    this.http.get<any>('http://localhost:8080/produit/marques').subscribe(data => {
      this.marques = data;
    });
  }
  // public getCategories() {
  //   let httpParams = new HttpParams();
  //   this.http.get<any>('http://localhost:8092/magasin/categories').subscribe(data => {
  //     this.categories = data;
  //   });
  // }

  findProductByMagasin(magasinId: any) {
    console.log(magasinId);
    let httpParams = new HttpParams();
    httpParams = httpParams.append('magasinId', magasinId);
    this.http.get<any>('http://localhost:8080/produit/magasin', {params: httpParams}).subscribe(data => {
      console.log(data);
      this.produits=data;
      //this.categories=this.getCategoriesFromMagasin(data[0]);
    });
  }

  getProduitFromMagasin(magasin){
  let produits=new Array();
    if (magasin.categorie!=null)
    for (let i=0;i<magasin.categorie.length;i++){
      if (magasin.categorie[i].produit!=null)
        for (let j=0;j<magasin.categorie[i].produit.length;j++){
        produits.push(magasin.categorie[i].produit[j]);
      }
    }
    return produits;
  }

   getCategories() {
     this.http.get<any>('http://localhost:8080/produit/categories').subscribe(data => {
       this.categories = data;
     });
  }

  test(id: any) {
    console.log(id)
  }



  findProductsByCriteria(){
    // let httpParams = new HttpParams();

    // httpParams.append('magasinId', this.selectedMagasinId);
    // httpParams.append('categorie', this.selectedCategorie);
    // // @ts-ignore
    // httpParams.append('marques', this.selectedMarques);
    // httpParams.append('priceMin', this.selectedPriceMin);
    //  httpParams.append('priceMax', this.selectedPriceMax);



    this.http.post<any>(
      'http://localhost:8080/produit/criteria',
      {
        magasinId:this.selectedMagasinId,
        categorie:this.selectedCategorie,
        marques:this.selectedMarques,
        priceMin:this.selectedPriceMin,
        priceMax:this.selectedPriceMax
      }
      ).subscribe(data => {
      this.produits=data;

      for (var k in data[0]){
          console.log(k+'=>'+data[0][k]);
      }

      console.log(data);
      console.log("++++");
    });
  }

  setSelectedMagasinId(id: string) {
    this.selectedMagasinId=id;
    this.findProductsByCriteria();
  }
  setSelectedCategorie(categorie: any): any {
    this.selectedCategorie = categorie;
    this.findProductsByCriteria();
  }

  changeSelectedMarques(value: string) {
    this.findProductsByCriteria();
  }

  setSelectedPriceRange(min:any,max:any){
    this.selectedPriceMax=max;
    this.selectedPriceMin=min;
    this.findProductsByCriteria();
  }

  showDetails(product: any) {
    this.selectedProduct=product;
    this.setSelectedproductCaracteristiques(product);
    this.showCatalogue=false;
  }

  setSelectedproductCaracteristiques(product:any){
    for (var k in product){
      if (k=='id' ||k=='libelle' ||k=='prix' ||k=='marque' ||k=='image' ||k=='description' ||k=='categories' ||k=='magasins'||k=='commentaires'){
        continue;
      }else {
        this.selectedProductCaracteristiques[k]=product[k];
        console.log(k+'=>'+product[k]);
      }
    }
    console.log("----------");
    console.log(this.selectedProductCaracteristiques);
  }
}