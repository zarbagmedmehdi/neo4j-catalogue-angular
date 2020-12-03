import { Component, OnInit } from '@angular/core';
import {Client} from '../models/Client';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  user: Client;

  constructor(private router:Router,private formbuilder:FormBuilder,private http: HttpClient,) { }

  ngOnInit(): void {
    this.user={password:"",email:"",}
    let patterns={
      login:['', Validators.compose([Validators.required, ])],
      password:['', Validators.compose([Validators.required, ])],
    };
    this.loginForm=this.formbuilder.group(patterns);
  }

  login() {
    this.http.post<any>('http://localhost:8090/client/login/',this.user).subscribe(data => {
     console.log(data);
      if(data.id==-1) {
        alert("Utilisateur n'exsite pas");
        this.loginForm.reset();
      } else {
        console.log(data.id)
        localStorage.setItem("id",data.id);
        localStorage.setItem("nom",data.nom);

        if(data.admin==true)
        this.router.navigate(['magasin'])
        else
          this.router.navigate(['search'])

      }

    });
  }
}
