import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
 

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
   Taille_Selected=false;  
  /////////////////////////////
  
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  input=false;
  public toggleSelected() {
    if(this.selected){
    this.http.post('http://localhost:8080/favoris/delete?user='+this.user
    +'&article='+this.Id,JSON.stringify('')).subscribe((response: any) => {});
    }
    else{

      this.http.post('http://localhost:8080/favoris/save?user='+this.user
      +'&article='+this.Id,JSON.stringify('')).subscribe((response: any) => {});

    }
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
  
  
  /////////////////////
  form: FormGroup;
  Paniertems = [];
  quantiteSelected;
   Id;
   user;
   Products=[];
   Article=[];
   tailles=[];
   tailleSelected;
   quantite=0;
  constructor(private route: ActivatedRoute ,private http: HttpClient,private formBuilder: FormBuilder) { 
    this.form = new FormGroup({
      type: new FormControl()
   });

  }
  get f() { return this.form.controls; }

  ngOnInit() {
 
    this.Id = this.route.snapshot.paramMap.get("id");
    this.getName() ;
    //////////Favoris
    this.user= sessionStorage.getItem("user");
    this.http.post('http://localhost:8080/favoris/get?user='+this.user
    +'&article='+this.Id,JSON.stringify('')).subscribe((response: any) => {
    console.log(response);
     if(response)  {   
      this.selected = true;
    this.selectedChange.emit(this.selected);
     }
});

  }


  getName() {

    const data = {

       param1: 0,

       param2: 5,

    };

    this.http.post('http://localhost:8080/article/get?id='+this.Id,JSON.stringify(data)).subscribe((response: any) => {

          this.Article.push(response);
          this.Article=this.Article['0'];
          this.tailles=this.Article["taille_prod"];

          this.tailles = [this.tailles.filter(x => x.quantite>0)][0]

          console.log(this.tailles);
          let formBuilder = new FormBuilder();
          this.form = formBuilder.group({
            'type': this.somme(this.Article),
           });
           this.quantiteSelected=this.somme(this.Article);
           
           this.http.post('http://localhost:8080/article/all',JSON.stringify('')).subscribe((response: any) => {
           let j=0; 
            for(let i=0;j<4;i++){
              if(response[i].gender.gender_lib==this.Article['gender'].gender_lib){
                this.Products.push(response[i]);
                j++;
                console.log(response[i]) 
              }
             }
            });
    });

}


somme(article){
  var s=0;
for(let i=0;i<article.taille_prod.length;i++){
  s=s+article.taille_prod[i].quantite;
}
return s;
}

ajouterpanier(event){
 
  if(event.target.quantites.value>0 && this.Taille_Selected){
    for(let i=0;i<this.Article['taille_prod'].length;i++){
      if (this.Article['taille_prod'][i].taille['lib_taille']==this.form.value.type 
      && this.Article['taille_prod'][i].quantite>=event.target.quantites.value)
      this.input=true;
           
     }
 try{

   if(this.input){
var newItem = 
{
 id_article: this.Id,
 quantite: event.target.quantites.value,
 taille: this.form.value.type,
 image: this.Article['img_article'] ,
 designation:this.Article['designation'],
 prix:this.Article['prix']-(this.Article['prix']*this.Article['taux_remise']/100)
 };
 localStorage.setItem(this.Id+this.form.value.type, JSON.stringify(newItem));
 
 location.reload();
}
else{
  alert('Unités disponibles moins que votre selection');

}
}
 catch(e) {
  console.log(e); 
}
  }
  else if (!this.Taille_Selected){
    alert('Selectionné votre taille');
  }
  else{
    alert('Quantité desiré');

  }
}
 change(event){
   
  for(let i=0;i<this.Article['taille_prod'].length;i++){
   if (this.Article['taille_prod'][i].taille['lib_taille']==this.form.value.type)
   this.quantiteSelected=this.Article['taille_prod'][i].quantite;
   this.Taille_Selected=true;
  }
}

}
