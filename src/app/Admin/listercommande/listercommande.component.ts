import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../session/_services/token-storage.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listercommande',
  templateUrl: './listercommande.component.html',
  styleUrls: ['./listercommande.component.css']
})
export class ListercommandeComponent implements OnInit {
commandesprod=[];
articles=[];
commandes=[];
ELEMENT_DATA;
  newsletters=[];
  displayedColumns: string[] = [
    'id_cmd',
    'Articles',
    'prix_total',
    'date_cmd',
    'etatcmd',
     
     'Action'
    ];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  constructor(private http: HttpClient,private router: Router,private tokenStorageService: TokenStorageService) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    } }

  ngOnInit() {
    this.http.post('http://localhost:8080/article/all',JSON.stringify('')).subscribe((response: any) => {
      this.articles.push(response);
      this.articles=this.articles['0'];

      console.log(this.articles);
    });
    this.http.post('http://localhost:8080/commande/all',JSON.stringify('')).subscribe((response: any) => {

      this.commandes.push(response);
      this.commandes=this.commandes['0'];
      this.commandes.sort((n1,n2) => n2.id_cmd - n1.id_cmd );
      this.dataSource = new MatTableDataSource(this.commandes);
      this.dataSource.paginator = this.paginator;
      console.log(this.commandes);
    });
    this.dataSource.filterPredicate = (data: Element, filter: string) => {
      return data['id_cmd'] == filter || data['date_cmd	']== filter || data['prix_total'] == filter ;
     };
    this.http.post('http://localhost:8080/commande_prod/all',JSON.stringify('')).subscribe((response: any) => {

      this.commandesprod.push(response);
      this.commandesprod=this.commandesprod['0'];

      console.log(this.commandesprod);
    });
    
  }
  supprimer(id:number){
    this.http.post('http://localhost:8080/commande/delete?id='+id,JSON.stringify('')).subscribe((response: any) => {
      location.reload();
      console.log(response);

});

  }
  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
