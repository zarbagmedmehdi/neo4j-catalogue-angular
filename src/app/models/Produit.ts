export interface Mag {
  magasinId:string;
  stock:number;
}

export interface Produit {
  productId?:string;
  image?:string;
  reference:string;
  libelle:string;
  prix:number;
  description:string;
  marque:string;
  categories :string[];
  magasins:Mag[];
  caracteristiques?:Map<string, string>;
}
