import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DialogContentExampleDialog, DialogCRegistre } from '../navbar/navbar.component';
import { FavorieComponent } from '../favorie/favorie.component';

@Component({
  selector: 'app-navbar2',
  templateUrl: './navbar2.component.html',
  styleUrls: ['./navbar2.component.scss']
})
export class Navbar2Component  implements OnInit {
  public nbrArticles:number;
  user;
  prenom;
  constructor(private route: ActivatedRoute ,private http: HttpClient,private router: Router,public dialog: MatDialog,) { 
    this.user= sessionStorage.getItem("user");
    this.http.post('http://localhost:8080/user/get?id='+sessionStorage.getItem("user"),JSON.stringify('')).subscribe((response: any) => {
 this.prenom=response ['prenom'];
    console.log(this.prenom);
   });
  
  }

  ngOnInit() {
   
    var keys = Object.keys(localStorage);
    if(keys.length>0)
    this.nbrArticles = keys.length;
  }
   getnbrArticles(){
    location.reload();}

    deconnexion(){
      sessionStorage.removeItem('user');
    location.reload();
    }
    recherche(event:any){
 
    this.router.navigate(['/recherche',event.target.des.value]);
    
    }

    openDialog() {
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
    
      dialogRef.afterClosed().subscribe(result => { 
      });
    }
    openDialogRegistre() {
      const dialogRef = this.dialog.open(DialogCRegistre);
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
    openDialogFavoris(){
      const dialogRef = this.dialog.open(FavorieComponent);
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
}
