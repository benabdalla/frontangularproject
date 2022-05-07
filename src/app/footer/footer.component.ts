import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
boutiques= [];
  constructor(private http: HttpClient,private router: Router) {}

  ngOnInit() {

    this.http.post('http://localhost:8080/boutique/all',JSON.stringify('')).subscribe((response: any) => {

      this.boutiques.push(response[0]);
      this.boutiques.push(response[1]);
      this.boutiques.push(response[2]);
 
  
  });
  }
  ajouternews(event: any) {
    
    this.http.post('http://localhost:8080/newsletter/save?email='+event.target.news.value ,JSON.stringify('')).subscribe((response: any) => {
      console.log(response);
      this.router.navigate(['/']);
  
    });
  

    
}
public onSubmit(event: any): void {
  let email=event.target.news.value;
    let regexpEmail = 
    new RegExp('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$');
  this.stopSynchronousPostRequest(event);
  if (regexpEmail.test(email)) {
    alert('You are now subscribed');
    this.ajouternews(event);
  } else {
    alert('You need to enter a correct email address.')
  }
}

private isValid(form: HTMLFormElement): boolean {
 
  return form.checkValidity();
}

private stopSynchronousPostRequest(event: Event): void {
  event.preventDefault();
}
}
