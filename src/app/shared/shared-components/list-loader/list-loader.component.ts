import { Component, OnDestroy, OnInit } from '@angular/core';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
declare var jQuery: any;

@Component({
  selector: 'app-list-loader',
  templateUrl: './list-loader.component.html',
  styleUrls: ['./list-loader.component.css']
})
export class ListLoaderComponent implements OnInit, OnDestroy {

  loaderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private _subList : SubscriberslistService) {
    this._subList.loaderList$.subscribe(res=>{
      this.handleList(res);
    });
  }

  ngOnInit(): void {
  }

  handleList(res){
    switch(res.type){
      case "1" : 
        this.show();
        break;
      case "0" : 
        this.hide();
        break;
    }
  }

  show(){
    jQuery(".linear-background").css("display", "block");
  }

  hide(){
    jQuery(".linear-background").css("display", "none");
  }

  ngOnDestroy(){
    
  }

}
