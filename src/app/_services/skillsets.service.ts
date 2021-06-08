import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SkillsetsService {

  constructor() { }

  getSkillSets(){
    return [{
      _id : 1,
      display : "Java",
      value : "java"
    },{
      _id : 2,
      display : "Php",
      value : "php"
    },{
      _id : 3,
      display : "MongoDb",
      value : "mongodb"
    },{
      _id : 4,
      display : ".Net",
      value : ".net"
    },{
      _id : 5,
      display : "Angular",
      value : "angular"
    },
    {
      _id : 6,
      display : "AngularJs",
      value : "angularjs"
    },{
      _id : 7,
      display : "Javascript",
      value : "javascript"
    },{
      _id : 8,
      display : "Springboot",
      value : "springboot"
    },{
      _id : 9,
      display : "Hibernate",
      value : "hibernate"
    },{
      _id : 10,
      display : "Sql",
      value : "sql"
    }];
  }

}
