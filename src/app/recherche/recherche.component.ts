import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recherche',
  templateUrl: './recherche.component.html',
  styleUrls: ['./recherche.component.scss']
})
export class RechercheComponent implements OnInit {
  filteredProducts;
  cle: string;
  prix_bas: boolean=false;
  prix_plus: boolean=false;
  order: string = '';
  reverse: boolean = false;
  
  constructor(private http: HttpClient,private router: Router,private route: ActivatedRoute) { 
    this.cle=this.route.snapshot.paramMap.get("cle")
  }

  ngOnInit() {
    this.route.params.subscribe(
      params => {
          const cle = +params['cle'];
          this.getarticles(params['cle']);
          console.log(params['cle'])
      }
  );
    
  
  
  
  }
  getarticles(cle) {
    this.http.post('http://localhost:8080/article/recherche?des='+cle,
    JSON.stringify('')).subscribe((response: any) => {
      this.filteredProducts=response
      console.log(this.filteredProducts);
      this.cle=cle;
     
     
    });  }

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
