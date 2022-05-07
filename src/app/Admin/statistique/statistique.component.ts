import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../session/_services/token-storage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {
etat=[];
nbrEtat=[];
  categories=[];
  nbrCategories=[];
  mois=[];
  nbrMois=[];
  nbcommande;
  nbusers;
  chifreaffaire;
  nbarticle;

  constructor(private router: Router,private tokenStorageService: TokenStorageService,private http: HttpClient) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    } 
    this.http.post('http://localhost:8080/chiffreaffaire',JSON.stringify('')).subscribe((response: any) => {
      this.chifreaffaire=response;
          console.log(this.chifreaffaire);
    });
    this.http.post('http://localhost:8080/sommecommande',JSON.stringify('')).subscribe((response: any) => {
      this.nbcommande=response;
          console.log(this.nbcommande);
    });
    this.http.post('http://localhost:8080/sommeusers',JSON.stringify('')).subscribe((response: any) => {
      this.nbusers=response;
          console.log(this.nbusers);
    });
    this.http.post('http://localhost:8080/sommearticle',JSON.stringify('')).subscribe((response: any) => {
      this.nbarticle=response;
          console.log(this.nbarticle);
    });





    this.http.post('http://localhost:8080/statetat'
    
    ,JSON.stringify('')).subscribe((response: any) => {
     for(let i=0;i<response.length;i++){
      this.etat.push(response[i][0]);
      this.nbrEtat.push(response[i][1]);
    }
    this.chartLabels=this.etat;
    this.chartDatasets= [
      { data: this.nbrEtat,  }
    ];
 
   });
   this.http.post('http://localhost:8080/statcategorie'
    
   ,JSON.stringify('')).subscribe((response: any) => {
    for(let i=0;i<response.length;i++){
     this.categories.push(response[i][0]);
     this.nbrCategories.push(response[i][1]);
   }
   console.log("categories: "+ this.categories)
   this.barChartLabels=this.categories;
   this.barChartData= [
     { data: this.nbrCategories, label: 'Categorie' }
   ];
 
  });
  
  this.http.post('http://localhost:8080/statdate'
    
  ,JSON.stringify('')).subscribe((response: any) => {
   for(let i=0;i<response.length;i++){
    this.mois.push(response[i][0]);
    this.nbrMois.push(response[i][1]);
  }
  console.log("mois: "+ this.mois)

  this.chartLabels3=this.mois;
  this.chartDatasets3 = [
    { data: this.nbrMois, label: 'Nombre des commandes' },
   ];
 });
  }

  ngOnInit() {
  }
 private barChartOptions: any = {
    scaleShowVerticalLines: true,
    responsive: true
  };
  private barChartLabels: string[] ;
  private barChartType: string = 'bar';
  private barChartLegend: boolean = true;

  private barChartData: any[] = [
    { data: [0],   },
   ];

  // events
  private chartClicked(e: any): void {
      console.log(e);
  }

  private chartHovered(e: any): void {
      console.log(e);
  }
//////////////////////////////////////////////////
public chartType: string = 'doughnut';
  public chartDatasets: Array<any> = [
    { data: [0 ],  }
  ];

  public chartLabels: Array<any> ;

  public chartColors: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#949FB1' ],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#A8B3C5'],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };
  public chartOptions3: any = {
    responsive: true
  };
  //////////////////////////////////////////////////////////
  public chartType3: string = 'line';

  public chartDatasets3: Array<any> = [
    { data: [0], label: '' },
   ];

  public chartLabels3: Array<any> ;

  public chartColors3: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
     
  ];

  
}
