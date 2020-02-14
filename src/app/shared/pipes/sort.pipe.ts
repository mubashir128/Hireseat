import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "sort"
  // pure: false
})
export class SortPipe implements PipeTransform {
  eachBlog = [];
  transform(value: any, args?: any): any {
    let search;
    console.log(args);

    if (args) {
      // applied a filter which will check entered letter in a whole string

      // if we need to search from the begining of the string we should use indexOf(args) === 0

      const filtered = value.map(
        blog =>
          blog.categories.filter(category =>
            category.categoryName.toLowerCase().includes(args.toLowerCase())
          )
        // console.log(filteredCatagories);
        // return filteredCatagories;
      );
      // search = filtered.map(blog => blog);
      console.log(filtered);
    }
    if (!args) return value;
    // return search;
  }
}
