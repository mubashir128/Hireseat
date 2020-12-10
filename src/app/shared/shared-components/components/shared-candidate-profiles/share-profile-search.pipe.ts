import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "shareProfileSearch",
})
export class ShareProfileSearchPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    console.log(value, "\n", args);

    if (value === undefined) return null;
    if (args[0] === undefined) return value;

    return value.filter((resume) => {
      if (
        resume.candidateName.toLowerCase().includes(args[0].toLowerCase()) ||
        resume.candidate_id.fullName
          .toLowerCase()
          .includes(args[0].toLowerCase())
      ) {
        console.log("matched", resume);

        return resume;
      }
    });
  }
}
// ||
//         resume.candidate_id.fullName
//           .toLowerCase()
//           .includes(args[0].toLowerCase())
