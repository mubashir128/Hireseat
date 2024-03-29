import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IntroduceService, tabTypes } from 'src/app/_services/introduce.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { SearchFilter } from '../user-list/user-list.component';
import { DialogInputTextMessageComponent } from '../dialog-input-text-message/dialog-input-text-message.component';
import { MatDialog } from '@angular/material/dialog';

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
  @Input() tabName: tabTypes = tabTypes.companiesTab;

  @Input() pageSize: number;
  @Input() pageLength: number;
  @Input() pageIndex: number;

  searchTerm: string = "";

  Search: FormGroup;
  @ViewChild("searchByName", { static: true }) searchByName: ElementRef;

  @Output() pageEM = new EventEmitter();
  @Output() companySearchEM = new EventEmitter();
  @Output() industriesSearchEM = new EventEmitter();
  @Output() desireRoleSearchEM = new EventEmitter();

  constructor(
    protected _introduceService: IntroduceService,
    protected _formBuilder: FormBuilder,
    public _dialog: MatDialog
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
      if(this.tabName == tabTypes.companiesTab){
        this.companySearchEM.emit(new SearchFilter("name", this.searchTerm));
      }else if(this.tabName == tabTypes.industriesTab){
        this.industriesSearchEM.emit(new SearchFilter("name", this.searchTerm));
      }else if(this.tabName == tabTypes.desireRolesTab){
        this.desireRoleSearchEM.emit(new SearchFilter("name", this.searchTerm));
      }
    });
  }

  changeLogo(notify) {
    notify.showCreatedLogo = true;
  }

  introduce(entry){
    const dialogTextInputRef = this._dialog.open(DialogInputTextMessageComponent,{
      data: {
        dialogType : "select-note",
        dialogTitle : "Provide a messge to tell about this user."
      }
    });

    dialogTextInputRef.afterClosed().subscribe(result => {
      if(result){
        let payload = {
          toId: entry?.introUser?._id,
          introduceId: entry?.desiredUser?._id,
          comapnyName:  entry?.company,
          message : result.message
        };
        this._introduceService.introduce(payload).subscribe((res) => {
          Materialize.toast("Introduced successfully", 1000, "green");
        }, (err) => {
          console.log(err);
          Materialize.toast("Already introduced", 1000, "red");
        });
      }
    });
  }

  handlePageEvent(event: PageEvent){
    this.pageEM.emit(event);
  }
}
