import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IntroduceService } from 'src/app/_services/introduce.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

declare var jQuery;
declare var Materialize;

@Component({
  selector: 'app-intros-tab',
  templateUrl: './intros-tab.component.html',
  styleUrls: ['./intros-tab.component.css']
})
export class IntrosTabComponent implements OnInit {
  @Input() eachEntry: any;
  @Input() searchLabel: any;
  searchTerm: String = "";

  Search: FormGroup;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  constructor(
    protected _introduceService: IntroduceService,
    protected _formBuilder: FormBuilder
  ) {
    this.Search = this._formBuilder.group({
      searchTerm: [""],
    });
  }

  ngOnInit(): void {
    this.debounceSearch();
  }

  debounceSearch(){
    this.Search.valueChanges.pipe(debounceTime(1200), distinctUntilChanged()).subscribe((value) => {
      this.searchTerm = value.searchTerm;
    });
  }

  changeLogo(notify) {
    notify.showCreatedLogo = true;
  }

  introduce(entry){
    let payload = {
      toId: entry?.introUser?._id,
      introduceId: entry?.desiredUser?._id,
      comapnyName:  entry?.company
    };

    this._introduceService.introduce(payload).subscribe((res) => {
      Materialize.toast("Introduced successfully", 1000, "green");
    }, (err) => {
      console.log(err);
      Materialize.toast("Already introduced", 1000, "red");
    });
  }

}
