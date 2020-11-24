import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  selectedCategorie: any;
  test = 'searchservice';
  searchText: string;
  selectedMagasin: any;

  constructor(private http: HttpClient) {
  }


}
