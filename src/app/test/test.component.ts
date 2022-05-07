import { Component, ViewChild, ChangeDetectorRef, NgZone
} from '@angular/core';
import { of, from } from 'rxjs';
import { takeWhile, map, filter } from 'rxjs/operators'
import { CdkVirtualScrollViewport, ScrollDispatcher } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
 
})
export class TestComponent  {
  name = 'Angular';
  @ViewChild (CdkVirtualScrollViewport,{static: true}) virtualScroll: CdkVirtualScrollViewport;
  searchPageNumber: number;
  searchResults: Array<any>;
  pagesize = 50;
  constructor(private scrollDispatcher: ScrollDispatcher, private cd: ChangeDetectorRef, private zone:NgZone) {
    this.searchPageNumber = 0;
    this.searchResults = [];
  }

  ngOnInit(): void {
    this.nextSearchPage(this.searchPageNumber);
  }

 
  trackByFn(index,item){
    return item;
  } 
  scrollToMiddle(){
    this.virtualScroll.scrollToIndex(this.searchResults.length/2, "smooth");
  }
   


  ////////////////////////////////////////////
  ngAfterViewInit(): void {
    this.scrollDispatcher.scrolled().pipe(
      filter(event => this.virtualScroll.getRenderedRange().end === this.virtualScroll.getDataLength())
    ).subscribe(event => {
      console.log('new result append');
      this.searchPageNumber++;
      this.nextSearchPage(this.searchPageNumber);
      //this.cd.detectChanges();
    })
    //this.scrollDispatcher.register(this.scrollable);
    //this.scrollDispatcher.scrolled(1000)
    //    .subscribe((viewport: CdkVirtualScrollViewport) => {
    //        console.log('scroll triggered', viewport);
    //    });

    // this.virtualScroll.renderedRangeStream.subscribe(range => {
    //  console.log('range', range);
    //   console.log('range2', this.virtualScroll.getRenderedRange());
    //   if (this.virtualScroll.getRenderedRange().end % 10 === 0) {
    //     this.nextSearchPage(++this.searchPageNumber);
    //   }
    // });
  }


  getResults(pageNumber) {
    
    let result = [];
    for (let i = 0; i < this.pagesize; i++) result.push(pageNumber * this.pagesize + i);
    return of(result);
  }
  nextSearchPage(pageNumber: number): void {
    this.getResults(pageNumber).subscribe((pagedResults) => {
    this.zone.run( ()=>{
        setTimeout( ()=>{
        this.searchResults = this.searchResults.concat(pagedResults);
          
        },     1);  //mimic API time delay

        });
    
      //console.log(this.searchResults);
    });
  }
 
}