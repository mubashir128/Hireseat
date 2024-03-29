import { Component, Input, OnInit } from "@angular/core";
import {
  DomSanitizer,
  SafeHtml,
  SafeStyle,
  SafeScript,
  SafeUrl,
  SafeResourceUrl
} from "@angular/platform-browser";

@Component({
  selector: "app-pdf-viewer",
  templateUrl: "./pdf-viewer.component.html",
  styleUrls: ["./pdf-viewer.component.css"]
})
export class PdfViewerComponent implements OnInit {
  @Input() public url: string;
  extension: number = 0;
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {
    let extStr: string = this.url.substring(
      this.url.lastIndexOf(".") + 1,
      this.url.length
    );
    if (extStr.indexOf("?") >= 0) {
      extStr = extStr.substr(0, extStr.indexOf("?"));
    }
    if (extStr === "doc" || extStr === "docx" || extStr === "pdf") {
      this.extension = 1;
      this.url =
        "https://docs.google.com/viewer?url=" +
        encodeURI(this.url) +
        "&embedded=true";
    }
  }

  transformOne(url): SafeResourceUrl {
    // debugger;
    console.log("transformation called", url);

    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
