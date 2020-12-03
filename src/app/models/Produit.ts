import {Categorie} from './Categorie';

export interface Mag {
  magasinId:string;
  stock:number;
}

export interface Produit {
  id?:number;
  image?:string;
  reference:string;
  libelle:string;
  prix:number;
  description:string;
  marque:string;
  categories :Categorie[];
  magasins?:Mag[];
  caracteristiques?:Map<string, string>;

}
