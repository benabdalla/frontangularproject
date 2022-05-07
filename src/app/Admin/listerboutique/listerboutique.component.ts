import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../session/_services/token-storage.service';
import { Router } from '@angular/router';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
@Component({
  selector: 'app-listerboutique',
  templateUrl: './listerboutique.component.html',
  styleUrls: ['./listerboutique.component.css']
})
export class ListerboutiqueComponent implements OnInit {
  boutiques = [];
  ELEMENT_DATA;
  newsletters=[];
  displayedColumns: string[] = [
    'id_boutique',
     'libelé_boutique',
    'description',
    'mail_boutique',
    'tel_boutique',
    'adresse',
    'Action'
    ];
    dataSource = new MatTableDataSource(this.ELEMENT_DATA);
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private http: HttpClient,private tokenStorageService: TokenStorageService,private router: Router) { 
    if(!this.tokenStorageService.getToken()){
      this.router.navigate(['/login'])
    }
  }

  ngOnInit() {
    this.http.post('http://localhost:8080/boutique/all',JSON.stringify('')).subscribe((response: any) => {

      this.boutiques.push(response);
      this.boutiques=this.boutiques['0'];

      console.log(this.boutiques);
      this.dataSource = new MatTableDataSource(this.boutiques);
      this.dataSource.paginator = this.paginator;
  });
  this.dataSource.filterPredicate = (data: Element, filter: string) => {
    return data['lib_boutique'] == filter || data['mail_boutique']== filter || data['tel_boutique'] == filter ;
   };
}
supprimer(id:number){
  this.http.post('http://localhost:8080/boutique/delete?id='+id,JSON.stringify('')).subscribe((response: any) => {
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
