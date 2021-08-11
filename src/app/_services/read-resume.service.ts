import { Injectable } from '@angular/core';
import { CandidateCarrerService } from './candidate-carrer.service';

@Injectable({
  providedIn: 'root'
})
export class ReadResumeService {

  loopSkills;
  loopIndustries;
  loopAchivments;

  loopExcludeWord;

  constructor(private _candidateCarrer : CandidateCarrerService) {
    this.loopSkills = this._candidateCarrer.getLoopSkills();
    this.loopIndustries = this._candidateCarrer.getLoopIndustries();
    this.loopAchivments = this._candidateCarrer.getLoopAchievement();
    this.loopExcludeWord = this._candidateCarrer.getExcludeWords();
  }

  async readResume(resume){
    let resumeData = resume.resumeDataIs.toLowerCase();
    let firstArray = [];
    Object.entries(this.loopSkills).forEach((values)=>{
      let globalString = "";

      let sIndex = 0;
      let i = 0;
      while((sIndex = resumeData.indexOf(values[0].toLowerCase(), i + sIndex)) !== -1){
        i = 1;
        let startString = "";
        for(let i = sIndex; i >= 0 && sIndex !== -1; i--){
          if(resumeData.charAt(i) == '\n'){
            startString = startString.substring(0, startString.length - 1)
            break ;
          }else{
            startString = resumeData.charAt(i) + startString;
          }
        }
        
        let endString = "";
        for(let i = sIndex; i <= resumeData.length - 1 && sIndex !== -1; i++){
          if(resumeData.charAt(i) == '\n'){
            break ;
          }else{
            endString = endString + resumeData.charAt(i);
          }
        }

        globalString = startString +""+ endString;

        if(globalString !== ""){
          let obj = {
            stm : globalString,
            value : this.loopSkills[values[0].toLowerCase()] == undefined ? 0 : this.loopSkills[values[0].toLowerCase()]
          };
          
          Object.entries(this.loopSkills).forEach((key) => {
            if((globalString.indexOf(key[0].toLowerCase()) !== -1) && (key[0].toLowerCase() !== values[0].toLowerCase())){
              obj.value = obj.value + this.loopSkills[key[0]];
            }
          });

          Object.entries(this.loopIndustries).forEach((key) => {
            if(globalString.indexOf(key[0].toLowerCase()) !== -1){
              obj.value = obj.value + this.loopIndustries[key[0]];
            }
          });

          Object.entries(this.loopAchivments).forEach((key) => {
            if(globalString.indexOf(key[0].toLowerCase()) !== -1){
              obj.value = obj.value + this.loopAchivments[key[0]];
            }
          });

          //don't push same statements
          let temp = true;
          firstArray.forEach((item, index)=>{
            if(obj.stm == item.stm){
              if(obj.value > item.value){
                item.value = obj.value;
              }
              temp = false;
            }
          });

          if(temp){
            firstArray.push(obj);
          }
        }
      }
    });

    // console.log("----------------------------------------- 1) firstArray : ",firstArray);

    let secondArray = [];
    Object.entries(this.loopIndustries).forEach((values)=>{
      let globalString = "";

      let sIndex = 0;
      let i = 0;
      while((sIndex = resumeData.indexOf(values[0].toLowerCase(), i + sIndex)) !== -1){
        i = 1;
        let startString = "";
        for(let i = sIndex; i >= 0 && sIndex !== -1; i--){
          if(resumeData.charAt(i) == '\n'){
            startString = startString.substring(0, startString.length - 1)
            break ;
          }else{
            startString = resumeData.charAt(i) + startString;
          }
        }
        
        let endString = "";
        for(let i = sIndex; i <= resumeData.length - 1 && sIndex !== -1; i++){
          if(resumeData.charAt(i) == '\n'){
            break ;
          }else{
            endString = endString + resumeData.charAt(i);
          }
        }

        globalString = startString +""+ endString;

        if(globalString !== ""){
          let obj = {
            stm : globalString,
            value : this.loopSkills[values[0].toLowerCase()] == undefined ? 0 : this.loopSkills[values[0].toLowerCase()]
          };
          
          Object.entries(this.loopIndustries).forEach((key) => {
            if((globalString.indexOf(key[0].toLowerCase()) !== -1) && (key[0].toLowerCase() !== values[0].toLowerCase())){
              obj.value = obj.value + this.loopIndustries[key[0]];
            }
          });

          Object.entries(this.loopAchivments).forEach((key) => {
            if(globalString.indexOf(key[0].toLowerCase()) !== -1){
              obj.value = obj.value + this.loopAchivments[key[0]];
            }
          });

          //don't push same statements
          let temp = true;
          secondArray.forEach((item, index)=>{
            if(obj.stm == item.stm){
              if(obj.value > item.value){
                item.value = obj.value;
              }
              temp = false;
            }
          });

          if(temp){
            secondArray.push(obj);
          }
        }
      }
    });

    // console.log("---------------------------------------------- 2) secondArray : ",secondArray);

    let thirdArray = [];
    Object.entries(this.loopAchivments).forEach((values)=>{
      let globalString = "";

      let sIndex = 0;
      let i = 0;
      while((sIndex = resumeData.indexOf(values[0].toLowerCase(), i + sIndex)) !== -1){
        i = 1;
        let startString = "";
        for(let i = sIndex; i >= 0 && sIndex !== -1; i--){
          if(resumeData.charAt(i) == '\n'){
            startString = startString.substring(0, startString.length - 1)
            break ;
          }else{
            startString = resumeData.charAt(i) + startString;
          }
        }
        
        let endString = "";
        for(let i = sIndex; i <= resumeData.length - 1 && sIndex !== -1; i++){
          if(resumeData.charAt(i) == '\n'){
            break ;
          }else{
            endString = endString + resumeData.charAt(i);
          }
        }

        globalString = startString +""+ endString;

        if(globalString !== ""){
          let obj = {
            stm : globalString,
            value : this.loopAchivments[values[0].toLowerCase()] == undefined ? 0 : this.loopAchivments[values[0].toLowerCase()]
          };

          Object.entries(this.loopAchivments).forEach((key) => {
            if((globalString.indexOf(key[0].toLowerCase()) !== -1) && (key[0].toLowerCase() !== values[0].toLowerCase())){
              obj.value = obj.value + this.loopAchivments[key[0]];
            }
          });

          //don't push same statements
          let temp = true;
          thirdArray.forEach((item, index)=>{
            if(obj.stm == item.stm){
              if(obj.value > item.value){
                item.value = obj.value;
              }
              temp = false;
            }
          });

          if(temp){
            thirdArray.push(obj);
          }
        }
      }
    });

    // console.log("---------------------------------------------- 3) thirdArray : ",thirdArray);

    //sort array in descending order
    firstArray.forEach((item, index)=>{
      for(let i = index + 1; i < firstArray.length; i++){
        if(firstArray[i].value > firstArray[index].value){
          let temp = firstArray[index];
          firstArray[index] = firstArray[i];
          firstArray[i] = temp;
        }
      }
    });

    let finalStatementsArr = [];

    //
    //remove a sentences from array that contains a above words
    firstArray.forEach((item, index)=>{
      let arr = item.stm.split(" ");
      let temp = true;
      this.loopExcludeWord.forEach((val, index1)=>{
        if(arr.includes(val.toLowerCase())){
          temp = false;
          return ;
        }
      });

      if(temp){
        //if we delete element then index position creating a issue.
        // firstArray.splice(index, 1);
      }else{
        //just push to new array.
        finalStatementsArr.push(item);
      }
    });
    // console.log("--- firstArray : ",firstArray);
    // console.log("--- finalStatementsArr : ",finalStatementsArr);

    return finalStatementsArr;
  }

  async readResume2(resume, skillText){
    let firstArray = [];
    let resumeData = resume.resumeDataIs.toLowerCase();

    skillText.split(",").forEach((values, index1)=>{
      let globalString = "";
      values = values.trim();
      if(values === ""){
        return ;
      }

      let sIndex = 0;
      let i = 0;
      while((sIndex = resumeData.indexOf(values.toLowerCase(), i + sIndex)) !== -1){
        i = 1;
        let startString = "";
        for(let i = sIndex; i >= 0 && sIndex !== -1; i--){
          if(resumeData.charAt(i) == '\n'){
            startString = startString.substring(0, startString.length - 1)
            break ;
          }else{
            startString = resumeData.charAt(i) + startString;
          }
        }
        
        let endString = "";
        for(let i = sIndex; i <= resumeData.length - 1 && sIndex !== -1; i++){
          if(resumeData.charAt(i) == '\n'){
            break ;
          }else{
            endString = endString + resumeData.charAt(i);
          }
        }

        globalString = startString +""+ endString;
        if(globalString !== ""){
          let obj = {
            stm : globalString,
            value : this.loopSkills[values.toLowerCase()] == undefined ? 0 : this.loopSkills[values.toLowerCase()]
          };

          skillText.split(",").forEach((key) => {
            key = key.trim();
            if((globalString.indexOf(key.toLowerCase()) !== -1) && (key.toLowerCase() !== values.toLowerCase()) && (key !== "")){
              obj.value = obj.value + 15;
            }
          });

          //don't push same statements
          let temp = true;
          firstArray.forEach((item, index)=>{
            if(obj.stm == item.stm){
              if(obj.value > item.value){
                item.value = obj.value;
              }
              temp = false;
            }
          });

          if(temp){
            firstArray.push(obj);
          }
        }
      }
    });

    //sort array in descending order
    firstArray.forEach((item, index)=>{
      for(let i = index + 1; i < firstArray.length; i++){
        if(firstArray[i].value > firstArray[index].value){
          let temp = firstArray[index];
          firstArray[index] = firstArray[i];
          firstArray[i] = temp;
        }
      }
    });

    let finalStatementsArr = [];

    //remove a sentences from array that contains a above words
    firstArray.forEach((item, index)=>{
      let arr = item.stm.split(" ");
      let temp = true;
      this.loopExcludeWord.forEach((val, index1)=>{
        if(arr.includes(val.toLowerCase())){
          temp = false;
          return ;
        }
      });

      if(temp){
        //if we delete element then index position creating a issue.
        // firstArray.splice(index, 1);
      }else{
        //just push to new array.
        finalStatementsArr.push(item);
      }
    });
    // console.log("--- firstArray : ",firstArray);
    // console.log("--- finalStatementsArr : ",finalStatementsArr);

    return finalStatementsArr;
  }

}
