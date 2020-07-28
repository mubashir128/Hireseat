import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/_services/authentication.service";
import { SuperAdminService } from "src/app/_services/super-admin.service";
@Component({
  selector: "app-enterprise-dashboard",
  templateUrl: "./enterprise-dashboard.component.html",
  styleUrls: ["./enterprise-dashboard.component.css"]
})
export class EnterpriseDashboardComponent implements OnInit {
  constructor(private authService: AuthenticationService, public supperAdmin: SuperAdminService) {}

  ngOnInit() {}
  logout() {
    this.authService.logout();
  }
}
