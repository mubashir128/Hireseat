import { Component, OnInit } from '@angular/core';
import { SubscriberslistService } from 'src/app/_services/subscriberslist.service';
declare var $: any;
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
        this.show();
        $(".eleSearchPosition").css("margin-top", "675px");
        break;
      case "0" : 
        this.hide();
        break;
      case "11" : 
        this.show();
        $(".eleSearchPosition").css("margin-top", "225px");
        break;
      case "00" : 
        $(".eleSearchPosition").css("margin-top", "675px");
        this.hide();
        break;
      case "222" : 
        this.show();
        $(".eleSearchPosition").css("margin-top", "0px");
        break;
      case "000" : 
        $(".eleSearchPosition").css("margin-top", "0px");
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
