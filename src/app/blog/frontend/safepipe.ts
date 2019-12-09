import { Pipe, PipeTransform } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  safeUrl:SafeResourceUrl
  short: any;
  constructor(private sanitizer: DomSanitizer) { }
  transform(url) {
      // console.log(url);
    if(url.match(/(\.be\/)+([^\/]+)/)){
      url = url.replace('youtu.be\/','www.youtube.com/embed/');
      // console.log(url)
    }else{
      url = url.replace('watch?v=','embed/');
      // console.log(url)
    }
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    
    return this.safeUrl 
  }
}