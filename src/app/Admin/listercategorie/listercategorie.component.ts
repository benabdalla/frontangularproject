import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../session/_services/token-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listercategorie',
  templateUrl: './listercategorie.component.html',
  styleUrls: ['./listercategorie.component.css']
})
export class ListercategorieComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private tokenStorageService: TokenStorageService) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    }
  }
  categories = [];
  ELEMENT_DATA;
  newsletters=[];
  displayedColumns: string[] = [
    'id_categorie',
     'categorie_lib',
    
    'gender',
    'Action'
    ];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.http.post('http://localhost:8080/categorie/all',JSON.stringify('')).subscribe((response: any) => {

      this.categories.push(response);
      this.categories=this.categories['0'];

      this.dataSource = new MatTableDataSource(this.categories);
      this.dataSource.paginator = this.paginator;
      console.log(this.categories);
  });
  this.dataSource.filterPredicate = (data: Element, filter: string) => {
    return data['categorie_lib'] == filter;
   };
}
supprimer(id:number){
  this.http.post('http://localhost:8080/categorie/delete?id='+id,JSON.stringify('')).subscribe((response: any) => {
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
