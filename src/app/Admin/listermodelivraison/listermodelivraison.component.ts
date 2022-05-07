import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../session/_services/token-storage.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listermodelivraison',
  templateUrl: './listermodelivraison.component.html',
  styleUrls: ['./listermodelivraison.component.css']
})
export class ListermodelivraisonComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private tokenStorageService: TokenStorageService) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    } }
  modes = [];
  ELEMENT_DATA;
  newsletters=[];
  displayedColumns: string[] = [
    'id_modeliv',
     'lib_mod_liv',
      
    
     'Action'
    ];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.http.post('http://localhost:8080/modelivraison/all',JSON.stringify('')).subscribe((response: any) => {

      this.modes.push(response);
      this.modes=this.modes['0'];
      this.dataSource = new MatTableDataSource(this.modes);
      this.dataSource.paginator = this.paginator;
      console.log(this.modes);
  });
  this.dataSource.filterPredicate = (data: Element, filter: string) => {
    return data['id_modeliv'] == filter || data['lib_mod_liv']== filter    ;
   };
  
}
supprimer(id:number){
  this.http.post('http://localhost:8080/modelivraison/delete?id='+id,JSON.stringify('')).subscribe((response: any) => {
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
