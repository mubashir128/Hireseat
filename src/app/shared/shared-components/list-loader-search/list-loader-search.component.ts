import { Component, OnInit } from '@angular/core';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';

@Component({
  selector: 'app-list-loader-search',
  templateUrl: './list-loader-search.component.html',
  styleUrls: ['./list-loader-search.component.css']
})
export class ListLoaderSearchComponent implements OnInit {

  loaderArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(private _subList : SubscriberslistService) {
    this._subList.loaderListAfterSearch$.subscribe(res=>{
      this.handleList(res);
    });
  }

  ngOnInit(): void {
  }

  handleList(res){
    switch(res.type){
      case "1" : 
        console.log("ListLoaderSearchComponent : show");
        this.show();
        break;
      case "0" : 
        console.log("ListLoaderSearchComponent : hide");
        this.hide();
        break;
    }
  }

  show(){
    jQuery(".eleSearchPosition").css("display", "block");
  }

  hide(){
    jQuery(".eleSearchPosition").css("display", "none");
  }

  ngOnDestroy(){
    
  }

}
