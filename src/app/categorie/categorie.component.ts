import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Options, LabelType } from 'ng5-slider';
 

@Component({
  selector: 'app-categorie',
  templateUrl: './categorie.component.html',
  styleUrls: ['./categorie.component.scss']
})
export class CategorieComponent implements OnInit {
  Articles = [];
  //myForm: FormGroup;
  categories = [];
  mode;
  cat;
  Dispo=true;
  tout=true;
  order: string = '';
  reverse: boolean = false;
  filteredProducts ;
  minValue: number = 0;
  maxValue: number ;
   options: Options ={
    floor: 0,
    ceil: 0,
  }
  
  filteredProductsReserve: any[][];
  prix_bas: boolean=false;
  prix_plus: boolean=false;

  constructor(private fb: FormBuilder,private http: HttpClient,private route: ActivatedRoute) {
    
    this.mode=this.route.snapshot.paramMap.get("mode");

  
  }

  ngOnInit() {

    this.http.post('http://localhost:8080/categorie/all',JSON.stringify('')).subscribe((response: any) => {

    for(let i=0; i<response.length;i++){
      for(let j=0;j<response[i].gender.length;j++){
        if(response[i].gender[j].gender_lib==this.route.snapshot.paramMap.get("mode")){
        this.categories.push(response[i]);
        console.log(response[i]);
        }
      }
    }

      //this.categories=this.categories['0'];


      console.log(this.categories);
  });

    this.http.post('http://localhost:8080/article/all',JSON.stringify('')).subscribe((response: any) => {

      this.Articles.push(response);
      this.Articles=this.Articles[0];
      this.Articles = this.Articles.sort((low, high) => low.prix - high.prix);

      this.filteredProducts=[this.Articles];
      this.filteredProducts = [this.Articles.filter(x => x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
      this.maxValue=this.filteredProducts[0][this.filteredProducts[0].length-1].prix;
   this.options = {
    floor: 0,
    ceil: this.filteredProducts[0][this.filteredProducts[0].length-1].prix,
    translate: (value: number, label: LabelType): string => {
     
      switch (label) {
        case LabelType.Low:{
          this.minValue=value;
          if(!this.cat){
        this.filteredProducts = [this.Articles.filter(x =>  x.prix >= this.minValue && x.prix <= this.maxValue && x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
          }
          else
          {
            this.filteredProducts = [this.Articles.filter(x => x.categorie.categorie_lib == this.cat && x.prix >= this.minValue && x.prix <= this.maxValue && x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
          }
         return  value+' TND' ;
        }
        case LabelType.High:{
          this.maxValue=value;
          if(!this.cat){
         this.filteredProducts = [this.Articles.filter(x => x.prix >= this.minValue && x.prix <= this.maxValue &&  x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
          }
          else
          {
            this.filteredProducts = [this.Articles.filter(x => x.categorie.categorie_lib == this.cat && x.prix >= this.minValue && x.prix <= this.maxValue &&  x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]

          }
          console.log(value);

          return  value+' TND' ;

        }
        default:
          return ' TND ' + value;
      }
      
    }
    
  };
  
       console.log(this.filteredProducts[0]);
});


  }
 
  trier(value: string,value2: string) {
 

  if ('bas' === value2) {
    this.prix_plus = false ;
    this.prix_bas = true;

  }
  else
  if ('plus' === value2) {
    
    this.prix_bas =  false;
    this.prix_plus = true;
  }
  else
  if ('id' === value2) {
    this.prix_plus = false;
    this.prix_bas = false;
  }
  if (this.order === value) {
    this.reverse = !this.reverse;
  }
  this.order = value;

}


changeCategorie(ev){
  
this.cat=ev;
console.log(this.cat);
this.filteredProducts = [this.Articles.filter(x => x.categorie.categorie_lib == ev && x.prix >= this.minValue && x.prix <= this.maxValue && x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
console.log(this.filteredProducts);
this.tout=false;
}
Tous(){
  this.cat=null;
  this.filteredProducts = [this.Articles.filter(x => x.prix >= this.minValue && x.prix <= this.maxValue && x.gender.gender_lib==this.route.snapshot.paramMap.get("mode"))]
  this.tout=true;
}
}
