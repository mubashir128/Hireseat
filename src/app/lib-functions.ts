
// converting first char of each word in capital letter
export function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
    // You do not need to check if i is larger than splitStr length, as your for does that for you
    // Assign it back to the array
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
}


// treaming extra whitespaces
export function trimSpaces(s) {
  s = s;
  s = s.replace(/(^\s*)|(\s*$)/gi, "");
  s = s.replace(/[ ]{2,}/gi, " ");
  s = s.replace(/\n /, "\n");
  return s;
}

export function searchObjectArray(value, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].value === value) {
      return array[i];
    }
  }
}

export function searchObjectArrayWithCase(value, array) {
  for (var i = 0; i < array.length; i++) {
    if (array[i].value === value.toUpperCase()) {
      return array[i];
    }
  }
}

export function allLowerCase(str) {
  return str.toLowerCase();
}