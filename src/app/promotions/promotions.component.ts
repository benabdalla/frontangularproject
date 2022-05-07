import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-promotions',
  templateUrl: './promotions.component.html',
  styleUrls: ['../recherche/recherche.component.scss']
})
export class PromotionsComponent implements OnInit {
  filteredProducts;
   prix_bas: boolean=false;
  prix_plus: boolean=false;
  order: string = '';
  reverse: boolean = false;
  
  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) { 
   }

  ngOnInit() {
    this.http.post('http://localhost:8080/article/all' ,
    JSON.stringify('')).subscribe((response: any) => {
      this.filteredProducts=response
      console.log(this.filteredProducts);
      this.filteredProducts = this.filteredProducts.filter(x => x.taux_remise > 0)
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
}
