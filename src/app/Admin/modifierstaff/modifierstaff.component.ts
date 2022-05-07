import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from '../session/_services/token-storage.service';
import { HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modifierstaff',
  templateUrl: './modifierstaff.component.html',
  styleUrls: ['./modifierstaff.component.css']
})
export class ModifierstaffComponent implements OnInit {
   
  user;
  Id;
  registerForm: FormGroup;
submitted = false;
 compte;
color = 'primary';
checked = true;

adresseNull=true;
adresse={
  id: Number,
  lib_adresse: String,
  city: String,
  state: String
}

city = [];

countries = [
];

 stateCount;
 cityCount;

  constructor(private route: ActivatedRoute ,private formBuilder: FormBuilder,private router: Router,private http: HttpClient,private tokenStorageService: TokenStorageService) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    } 
    this.http.post('http://localhost:8080/state/all'
    
    ,JSON.stringify('')).subscribe((response: any) => {
      this.countries=response; 
      console.log(this.countries);
   });
  }

  ngOnInit() {
  
    this.Id = this.route.snapshot.paramMap.get("id");
     this.http.post('http://localhost:8080/user/get?id='+this.route.snapshot.paramMap.get("id"),JSON.stringify('')).subscribe((response: any) => {
      this.user=response;
      this.checked=this.user['compte'].active;
  
      for(var i=0;i<this.countries.length;i++){
        if(this.countries[i]['lib_state'] === this.user.adresse.city.state){
          console.log(this.countries[i]['lib_state']+'='+this.user.adresse.city.state)
    
          this.stateCount=this.countries[i]['id_state'];
          console.log(this.stateCount)
          this.city = this.countries.filter(x => x.id_state == this.stateCount)[0].city;
    
         
          for(var j=0;j<this.countries[i]['city'].length;j++){
    
            if(this.countries[i]['city'][j].id_city === this.user.adresse.city.id_city){
              this.cityCount=this.countries[i]['city'][j].id_city;
            }
          }
        }
      
      }
 
     });

  }
   
   onFormSubmit(event){

    
    
    
  
    this.http.post('http://localhost:8080/adresse/update?id_adresse='+this.user.adresse.id_adresse
    +'&lib_adresse='+this.user.adresse.lib_adresse

     +'&city='+event.target.city.value

    ,JSON.stringify('')).subscribe((response: any) => {
     this.adresse=response['id_adresse'];
     console.log(this.adresse);
    /////////////////////////////////
    this.http.post('http://localhost:8080/compte/update?id_compte='+this.user['compte']['id_compte']
    
    +'&login='+this.user.compte.login
    +'&password='+this.user.compte.password
    +'&active='+this.checked
   ,JSON.stringify('')).subscribe((response: any) => {
    this.compte=response['id_compte'];
    this.router.navigate(['/espace_admin/staff/lister']);

   });


    });
   
   
  }
  onChangeState(deviceValue) {
    this.city = this.countries.filter(x => x.id_state == deviceValue)[0].city;
    console.log(this.city)
  }
  
  

  changed(){
    console.log(this.checked)
  }
}

