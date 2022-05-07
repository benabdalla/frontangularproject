import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import * as CryptoJS from 'crypto-js';  
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { FavorieComponent } from '../favorie/favorie.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  public nbrArticles:number;
  user;
  prenom;
  constructor(private http: HttpClient,public dialog: MatDialog,public DialogCRegistre: MatDialog) { 
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


    deconnexion(){
      sessionStorage.removeItem('user');
    location.reload();
    }
    
    ////////////////////Dialogue//////////////////
 
openDialog() {
  const dialogRef = this.dialog.open(DialogContentExampleDialog);

  dialogRef.afterClosed().subscribe(result => {
    
  });
}
openDialogRegistre() {
  const dialogRef = this.DialogCRegistre.open(DialogCRegistre);

  dialogRef.afterClosed().subscribe(result => {
    
  });
}
openDialogFavoris(){
  const dialogRef = this.dialog.open(FavorieComponent);

  dialogRef.afterClosed().subscribe(result => {
    
  });
}

}

/////////////////////////////////Register////////////////////////////////////


@Component({
  selector: 'DialogCRegistre',
  templateUrl: 'DialogCRegistre.html',
  })
  export class DialogCRegistre {
    registerForm: FormGroup;
    submitted = false;
    Id;
  hashedpassword;
  conversionDecryptOutput;
  incorrecte=false;
  Mail_exist=false;
  id_user;
  constructor(private route: ActivatedRoute ,private http: HttpClient,private router: Router,private formBuilder: FormBuilder,public dialogRef: MatDialogRef<DialogContentExampleDialog>,public dialog: MatDialog) 
    { 
      
    this.registerForm = this.formBuilder.group({
        nom: ['', Validators.required],
        prenom: ['', Validators.required],
        tel: ['', Validators.required],
        email: ['', [Validators.required, Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
        password: ['', [
          Validators.required, 
          Validators.pattern('(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,30}')
   ]]
  });
 
    }
    get f() { return this.registerForm.controls; }


    onFormSubmit(event: any) {
      
          this.submitted = true;
      
          // stop here if form is invalid
          if (this.registerForm.invalid) {
              return;
          }
      
           
          this.hashedpassword = CryptoJS.AES.encrypt(event.target.password2.value.trim(),event.target.login2.value.trim()).toString();
          var hashedpassword2='';
          for(var i=0;i<this.hashedpassword.length;i++){
            if(this.hashedpassword[i]=='  '){
              hashedpassword2=hashedpassword2+'+';
            }
            else{
              hashedpassword2=hashedpassword2+this.hashedpassword[i];
            }
          }
          this.http.post('http://localhost:8080/compte/save?login='+event.target.login2.value 
          +'&password='+hashedpassword2,
          JSON.stringify('')).subscribe((response: any) => {
            console.log(response);
            if(response!=null){
            this.Id=response.id_compte;
            this.AjouterUser(event);
            }
            else{
              this.Mail_exist=true;
            }
          });
          
        }
        AjouterUser(event){
          
      
          console.log(event.target.nom.value);
          this.http.post('http://localhost:8080/user/save?compte='+this.Id
            +'&nom='+event.target.nom.value
            +'&prenom='+event.target.prenom.value
            +'&tel='+event.target.tel.value
            +'&privilege=2',
            JSON.stringify('')).subscribe((response: any) => {
             if(event.target.news.checked)
              this.http.post('http://localhost:8080/newsletter/save?email='+event.target.login2.value  ,JSON.stringify('')).subscribe((response: any) => {
                console.log(response);      
              });
              console.log(response);
              this.id_user=response['id_user'];
              this.Connexion();
      
           }); 
          
          }
          Connexion(){
    
            sessionStorage.setItem('user', JSON.stringify(this.id_user));
            window.location.reload();    
            this.dialogRef.close();
        
          }
        
    openDialog() {
      this.dialogRef.close();

      const dialogRef = this.dialog.open(DialogContentExampleDialog);
    
      dialogRef.afterClosed().subscribe(result => {
        
      });
    }
    

  }


/////////////////////////////////Connexion////////////////////////////////////
@Component({
selector: 'dialog-content-example-dialog',
templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {

  invalide=false;

  constructor( public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    

    private route: ActivatedRoute ,private http: HttpClient,private router: Router,private formBuilder: FormBuilder,public dialog: MatDialog) {
    
   }
  registerForm: FormGroup;
  submitted = false;

  Id;
hashedpassword;
conversionDecryptOutput;
incorrecte=false;
Mail_exist=false;
id_user;
  
  onAuthentifier(event){
    this.conversionDecryptOutput='false';
    this.http.post('http://localhost:8080/user/getlogin?login='+event.target.login1.value,
    JSON.stringify('')).subscribe((response: any) => {
      if(response){
        if(response.active){
    console.log(response['password'].trim());
      this.conversionDecryptOutput = CryptoJS.AES.decrypt(response['password'],response['login']).toString(CryptoJS.enc.Utf8);  
      console.log(this.conversionDecryptOutput);
      if(this.conversionDecryptOutput){
      if(this.conversionDecryptOutput===event.target.password1.value){
        console.log(this.conversionDecryptOutput+'='+event.target.password1.value);
        this.http.post('http://localhost:8080/user_Compte?id='+response['id_compte']
        ,JSON.stringify('')).subscribe((response: any) => {
          this.id_user=response['id_user'];
           this.Connexion();
        }); 
      }
       else{
        this.incorrecte=true;
       }
      }
      else{
        this.incorrecte=true;
       }
        }
        else{
          this.invalide=true;
         }
      }
      else{
        this.incorrecte=true;
       }
   });
  }

  
  Connexion(){
    
    sessionStorage.setItem('user', JSON.stringify(this.id_user));
    window.location.reload();    
    this.dialogRef.close();

  }

  openDialog() {
    this.dialogRef.close();

    const dialogRef = this.dialog.open(DialogCRegistre);
  
    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
}

/////////////////////////////////
