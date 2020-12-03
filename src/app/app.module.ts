import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { ContentComponent } from './search/content/content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SearchService} from './services/search.service';
import {HttpClientModule} from '@angular/common/http';
import { AjoutComponent } from './magasin/ajout/ajout.component';
import { AjoutProduitComponent } from './produit/ajout-produit/ajout-produit.component';
import { CategorieComponent } from './categorie/categorie.component';
import { LoginComponent } from './login/login.component';
import { PanierComponent } from './panier/panier.component';
import { MesCommandesComponent } from './mes-commandes/mes-commandes.component';

@NgModule({
  declarations: [
    AppComponent,

    ContentComponent,

    AjoutComponent,

    AjoutProduitComponent,

    CategorieComponent,

    LoginComponent,

    PanierComponent,

    MesCommandesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [SearchService],
  bootstrap: [AppComponent]
})
export class AppModule { }
