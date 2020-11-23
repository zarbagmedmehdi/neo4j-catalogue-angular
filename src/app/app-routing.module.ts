import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AjoutComponent} from './magasin/ajout/ajout.component';
import {AjoutProduitComponent} from './produit/ajout-produit/ajout-produit.component';
import {ContentComponent} from './search/content/content.component';

const routes: Routes = [
  { path: 'magasin', component: AjoutComponent },
  { path: 'produit', component: AjoutProduitComponent },
  { path: 'search', component: ContentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
