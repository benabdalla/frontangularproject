import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TokenStorageService } from '../session/_services/token-storage.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listerprivilege',
  templateUrl: './listerprivilege.component.html',
  styleUrls: ['./listerprivilege.component.css']
})
export class ListerprivilegeComponent implements OnInit {

  constructor(private http: HttpClient,private router: Router,private tokenStorageService: TokenStorageService) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    } }
  privileges = [];
  ELEMENT_DATA;
  newsletters=[];
  displayedColumns: string[] = [
    'id_privilege',
     'lib_privilege',
      
    
     'Action'
    ];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.http.post('http://localhost:8080/privilege/all',JSON.stringify('')).subscribe((response: any) => {

      this.privileges.push(response);
      this.privileges=this.privileges['0'];
      this.dataSource = new MatTableDataSource(this.privileges);
      this.dataSource.paginator = this.paginator;
      console.log(this.privileges);
  });
  this.dataSource.filterPredicate = (data: Element, filter: string) => {
    return data['id_privilege'] == filter || data['lib_privilege']== filter    ;
   };
  
}
supprimer(id:number){
  this.http.post('http://localhost:8080/privilege/delete?id='+id,JSON.stringify('')).subscribe((response: any) => {
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
