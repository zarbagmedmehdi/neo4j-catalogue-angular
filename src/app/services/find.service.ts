import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {throwError} from "rxjs";
import {Magasin} from "../models/Magasin";
import {catchError, retry} from "rxjs/operators";
import {Categorie} from '../models/Categorie';
import {Produit} from '../models/Produit';

@Injectable({
  providedIn: 'root'
})
export class FindService {

h = new HttpHeaders().append('Content-Type', 'application/json')
  .append('Accept','application/json');
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
getAllMagasin(callback) {
  return this.http.get<Magasin>(this.url+'magasin/')
    .pipe(retry(1), catchError(this.handleError)).subscribe(
      data =>{
        callback(data);
      }
    )
}

  getAllCategories(callback) {
    return this.http.get<Categorie>(this.url+'categorie/')
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data);
        }
      )
  }

  getAllProduit(callback) {
    return this.http.get<Produit>(this.url+'produit/')
      .pipe(retry(1), catchError(this.handleError)).subscribe(
        data =>{
          callback(data);
        }
      )
  }
}
