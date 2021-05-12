import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employerchat',
  templateUrl: './employerchat.component.html',
  styleUrls: ['./employerchat.component.css']
})
export class EmployerchatComponent implements OnInit {

  users = [{
    fullName : 'a121',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  },
  {
    fullName : 'a1s1',
    profileimage : ''
  }];

  public auctionFrm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.auctionFrm = this.formBuilder.group({
      searchTermByNameIs : []
    });
  }

  showUserData(){
    console.log("--- showUserData : ");
  }

  setting(){
    console.log("--- setting : ");
  }

}
