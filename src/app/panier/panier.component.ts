import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {

  constructor( private http:HttpClient,private route: ActivatedRoute,
               private router: Router  ) {}
  commandesItems:any=[];
  products:any=[];
  sommeTotal=0;
  ngOnInit(): void {
    this.commandesItems =JSON.parse(this.route.snapshot.paramMap.get('commandesItems'));
    console.log(this.commandesItems)
    console.log(localStorage.getItem('id'));

    for (let index in this.commandesItems) {
      let id=this.commandesItems[index].produit.id;
      this.http.get<any>('http://localhost:8090/produit/'+id).subscribe(data => {
        this.products.push(data);
        this.sommeTotal+=this.commandesItems[index].qte*data.prix;
        console.log(this.products);
    });
  }  }


  valider() {

    let commande={
      client:{id:localStorage.getItem('id')},
      commandeItems: this.commandesItems
    }
    console.log(commande);

    this.http.post<any>('http://localhost:8090/commande/',commande).subscribe(data => {
      if(data==1){
        alert("Commande enregistrée")
        this.router.navigate(['search'])
      }
    });
  }
}
