
import { Component, OnInit,Input } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
@Component({
  selector: 'app-sa-dashboard',
  templateUrl: './sa-dashboard.component.html',
  styleUrls: ['./sa-dashboard.component.css']
})
export class SADashboardComponent implements OnInit {

  constructor(
    private authService:AuthenticationService
  ) { }

  ngOnInit() {
  }

  logout(){
    this.authService.logout();
  }

}
