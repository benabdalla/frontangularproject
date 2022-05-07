import { Component, OnInit, HostListener, Output, Input,EventEmitter } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  /////////////////////////////////////
  
  
  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  tendances_1=[];
  tendances_2=[];
  tendances_3=[];
  public toggleSelected() {

    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
  }
//////////////////////
arrNumber = Array.from({length: 100000}).map((_, i) => `Item #${i}`);
/////////////////////////////////////////
  Articles = [];
  
  offset = 0; 
  limit = 5;
  
  ngOnInit() {this.getName(this.offset, this.limit) ;}

//////

///////





  getName(offset, limit) {

    const data = {

       param1: offset,

       param2: limit,

    };

    this.http.post('http://localhost:8080/article/all',JSON.stringify(data)).subscribe((response: any) => {

          this.Articles.push(response);
          this.Articles=this.Articles['0'];
          for(let i=0;i<9;i++){
            if(i<3)
            this.tendances_1.push(response[i])
            else
            if(i>2&&i<6)
            this.tendances_2.push(this.Articles[i])
            else 
            if(i<10)
            this.tendances_3.push(this.Articles[i])

          }

          console.log(this.tendances_1);
          console.log(this.tendances_2);
          console.log(this.tendances_3);

    });

}
loadData(event) {

  setTimeout(() => {

    console.log('Done');

    this.offset = this.offset + 5;

    this.getName(this.offset, this.limit);

    event.target.complete();

    // App logic to determine if all data is loaded

    // and disable the infinite scroll

    if (this.Articles.length === 20) {

      event.target.disabled = true;

    }

  }, 500);

}
constructor(private http: HttpClient) {
 


}
}
