import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NavbarComponent, DialogCRegistre, DialogContentExampleDialog } from '../navbar/navbar.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
 
@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.css']
})
export class PanierComponent implements OnInit {
 panier;
 total=0;
 text = 'Produit a été retiré';
   constructor(private http: HttpClient,private router: Router,public dialog: MatDialog) { 
    this.panier=this.allStorage();
    for(var i=0;i<this.panier.length;i++){
    this.total+=this.panier[i].prix*this.panier[i].quantite
    }
  }

  ngOnInit() {
    console.log(this.panier)  
  if(this.panier.length==0){
    this.router.navigate(['']);
  }
  
}

 public allStorage() {
       var values=[];
       var keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
      values.push(JSON.parse(localStorage.getItem(keys[i])));

    }
    return values;
}
article(id){
  this.http.post('http://localhost:8080/article/get?id='+id,JSON.stringify('')).subscribe((response: any) => {
    console.log(response);
  });
return 'false';
}
remove(id){
localStorage.removeItem(id);
this.panier=this.allStorage();
for(var i=0;i<this.panier.length;i++){
this.total+=this.panier[i].prix*this.panier[i].quantite
}
if(this.panier.length==0){
  this.router.navigate(['']);
}
//location.reload();

}

livraison(){
  
  if(!sessionStorage.getItem("user"))
  {
    NavbarComponent['openDialog()'];
  
   
      const dialogRef = this.dialog.open(DialogContentExampleDialog);
    
      dialogRef.afterClosed().subscribe(result => {

  });
}
else{
  this.router.navigate(['/livraison']);
}
  
}

}
