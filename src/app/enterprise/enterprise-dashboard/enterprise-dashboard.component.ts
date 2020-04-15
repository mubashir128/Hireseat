import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_services/authentication.service";
@Component({
  selector: "app-enterprise-dashboard",
  templateUrl: "./enterprise-dashboard.component.html",
  styleUrls: ["./enterprise-dashboard.component.css"]
})
export class EnterpriseDashboardComponent implements OnInit {
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
  }
}
