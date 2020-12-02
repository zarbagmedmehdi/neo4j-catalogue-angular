import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Magasin} from "../models/Magasin";
import {catchError, retry} from "rxjs/operators";
import {throwError} from "rxjs";
import {Produit} from "../models/Produit";
import {StockProduit} from '../models/StockProduit';

@Injectable({
  providedIn: 'root'
})
export class AjoutService {



  constructor(private http: HttpClient) { }
  url = 'http://localhost:8090/';
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
  persistMagasin(magasin:Magasin,callback) {
    return this.http.post<Magasin>(this.url+'magasin/', magasin)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{

        callback(data)
        }
      )
  }
  updateMagasin(magasin:Magasin,callback) {
    return this.http.put<Magasin>(this.url+'magasin/', magasin)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{

          callback(data)
        }
      )
  }
  persistProduit(produit:Produit,callback) {
    return this.http.post<Produit>(this.url+'produit/', produit)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{

          callback(data)
        }
      )
  }

  deleteMagasin(id,callback) {
    return this.http.delete(this.url+'magasin/delete/'+id,{responseType: 'text'} )
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data)
        }
      )
  }
  persistCategorie(array,callback) {
    return this.http.post(this.url+'categorie/save', array)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data)
        }
      )
  }

  //
  persistComment(array,callback) {
    return this.http.post(this.url+'produit/comment', array)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data)
        }
      )
  }

  persistAffectation(affectation:StockProduit,callback) {
    return this.http.get(this.url+'produit/'+affectation.productId+'/'+affectation.qte+'/magasin/'+affectation.magasinId)
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data)
        }
      )
  }


}
