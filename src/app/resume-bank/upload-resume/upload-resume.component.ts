import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ResumeService } from "src/app/_services/resume.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ResumeBank } from "src/app/models/resumebank";
import * as lib from "../../lib-functions";
declare var jQuery: any;
declare var Materialize: any;
@Component({
  selector: "app-upload-resume",
  templateUrl: "./upload-resume.component.html",
  styleUrls: ["./upload-resume.component.css"]
})
export class UploadResumeComponent implements OnInit {
  public newResumeFrm: FormGroup;
  downloadURL: string = "";
  fileUploaded: number = 0;
  resume: ResumeBank;
  tags: any;
  public skillSets = [];
  constructor(
    private formBuilder: FormBuilder,
    private resumeService: ResumeService,
    private spinner: NgxSpinnerService
  ) {
    this.resume = new ResumeBank();
  }

  ngOnInit() {
    this.getSkillset();
    this.newResumeFrm = this.formBuilder.group({
      firstName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ],
      lastName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern(/^[a-zA-Z ]*$/)
        ])
      ],
      tags: ["", Validators.required],
      experience: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[0-9]+"),
          Validators.maxLength(2)
        ])
      ]
    });
  }

  getSkillset() {
    this.resumeService.getSkillSets().subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.skillSets = data;
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  get f() {
    return this.newResumeFrm.controls;
  }

  fileChange(event) {
    this.spinner.show();
    if (event.target.files[0]) {
      var fdata = new FormData();
      fdata.append("file", event.target.files[0]);
      // fdata.append('jobPostProfieId','All');
      this.resumeService.uploadResumeInBank(fdata).subscribe(
        (data: any) => {
          if (data.result) {
            this.downloadURL = data.result;
            this.resume.fileURL = data.result;
            this.fileUploaded = 2;
            this.spinner.hide();
            Materialize.toast("Resume Uploaded Successfully !", 1000);
          } else {
            this.spinner.hide();
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        error => {
          this.spinner.hide();
          console.log(error);
          if (error) {
            Materialize.toast("Something Went Wrong !", 1000);
          }
        }
      );
    }
  }

  submit() {
    this.spinner.show();
    if (this.newResumeFrm.valid && this.resume.fileURL != "") {
      this.resumeService.addToResumeBank(this.resume).subscribe(
        (data: any) => {
          if (data.res == "success") {
            this.spinner.hide();
            Materialize.toast("Resume added to bank successfully !", 5000);
            this.newResumeFrm.reset();
            this.resume.fileURL = "";
            this.fileUploaded = 0;
          } else {
            this.spinner.hide();
            Materialize.toast("Something Went Wrong !", 1000);
          }
        },
        error => {
          console.log(error);
          Materialize.toast("Something Went Wrong !", 1000);
          this.spinner.hide();
        }
      );
    } else {
      Materialize.toast("Please Fill the form fields !", 1000);
      this.spinner.hide();
      return;
    }
  }

  scrollToResumeForm() {
    let scrollTo: any = jQuery("#ResuemFrm");
    jQuery("html,body").animate({ scrollTop: scrollTo.offset().top });
  }

  addTag(tag) {
    tag.display = lib.trimSpaces(tag.display);
    tag.display = lib.titleCase(tag.display);
    if (lib.searchObjectArray(tag.value, this.skillSets)) {
      return;
    }
    this.resumeService.addNewTag(tag).subscribe(
      response => {
        if (response.result == "success") {
          Materialize.toast("New tag added successfully !", 1000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  removeTag(tag) {
    if (lib.searchObjectArray(tag.value, this.skillSets)) {
      return;
    }
    this.resumeService.removeNewTag(tag).subscribe(
      response => {
        if (response.result == "success") {
          Materialize.toast("New tag removed successfully !", 1000);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
