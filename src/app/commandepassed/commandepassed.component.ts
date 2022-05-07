import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { DetailcommandeComponent } from '../detailcommande/detailcommande.component';
@Component({
  selector: 'app-commandepassed',
  templateUrl: './commandepassed.component.html',
  styleUrls: ['./commandepassed.component.css']
})
export class CommandepassedComponent implements OnInit {
  commmandes ;
  etat_commande;
id= [];
  constructor(private http: HttpClient,private router: Router,public dialog: MatDialog) {
    if(!sessionStorage.getItem("user"))
    {
      this.router.navigate(['/compte/register/connexion']);

    }
   }

  ngOnInit() {
    this.http.post('http://localhost:8080/vos_commande/lister?id='+sessionStorage.getItem("user"),JSON.stringify('')).subscribe((response: any) => {
      console.log(this.commmandes);

      this.commmandes=response;
      console.log(this.commmandes);

    });

  }
 
    detailcommande(id) {
      this.dialog.open(DetailcommandeComponent, {
        data: {
          id: id
        },
        height: '1200px',
        width: '1000px'
      }
      );
    }
}
