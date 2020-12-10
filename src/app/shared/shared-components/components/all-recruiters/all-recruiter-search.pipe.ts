import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "allRecruiterSearch",
})
export class AllRecruiterSearchPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log(value, "\n", args);

    if (value === undefined) return null;
    if (args[0] === undefined) return value;

    return value.filter((recruiter) =>
      recruiter.refUserId.fullName.toLowerCase().includes(args[0].toLowerCase())
    );
  }
}
