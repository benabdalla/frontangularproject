import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../session/_services/token-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique',
  templateUrl: './historique.component.html',
  styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

  livraison = [];
  ELEMENT_DATA;
  newsletters=[];
 
  displayedColumns: string[] = [
    'reference',
     'nom',
    'prenom',
    'date',
    'etat',
    'prix'
     
    ];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    constructor(private http: HttpClient,private tokenStorageService: TokenStorageService,private router: Router) { 

      if(!this.tokenStorageService.getToken()){
        this.router.navigate(['/login'])
      }
    }

  ngOnInit() {
   
    this.http.post('http://localhost:8080/livraison/all',JSON.stringify('')).subscribe((response: any) => {

      this.livraison.push(response);
      this.livraison=this.livraison['0'];

      this.dataSource = new MatTableDataSource(this.livraison);
      this.dataSource.paginator = this.paginator;
      console.log(this.livraison);

});
  }
  
 

}
