(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{Geer:function(i,e,n){"use strict";n.r(e),n.d(e,"EmailVerificationModule",function(){return h});var t=n("ofXK"),c=n("tyNb"),s=n("VITL"),r=n("fXoL");function o(i,e){1&i&&(r.gc(0,"div",5),r.dd(1," The link has been Used or Invalid Link "),r.fc())}function d(i,e){1&i&&(r.gc(0,"div",5),r.dd(1," Email Verified Successfully"),r.fc())}function a(i,e){1&i&&(r.gc(0,"div",5),r.dd(1," Something went wrong! "),r.fc())}const u=function(){return["/"]},f=function(){return[""]},g=[{path:"",component:(()=>{class i{constructor(i,e){this.route=i,this.userService=e,this.isExpired=!1,this.isSuccess=!1,this.isErr=!1}ngOnInit(){this.route.params.subscribe(i=>{this.handleRequest(i.key)})}handleRequest(i){this.userService.emailVerification({key:i}).subscribe(i=>{"not found"==i.res?this.isExpired=!0:"success"==i.res?this.isSuccess=!0:this.isErr=!0},i=>{console.log(i)})}}return i.\u0275fac=function(e){return new(e||i)(r.bc(c.a),r.bc(s.a))},i.\u0275cmp=r.Vb({type:i,selectors:[["app-email-verification"]],decls:10,vars:7,consts:[[1,"center-align",2,"width","100%","min-height","100vh","padding","50px 0px 50px 0px","background","#E9F4FF"],["src","assets/img/profile.png",2,"margin-top","calc(6vh + 50px)"],[1,"slide-heading"],[3,"routerLink"],["class","slide-sub-heading",4,"ngIf"],[1,"slide-sub-heading"]],template:function(i,e){1&i&&(r.gc(0,"div",0),r.cc(1,"img",1),r.gc(2,"div",2),r.gc(3,"a",3),r.dd(4,"HIRE SEAT "),r.fc(),r.fc(),r.bd(5,o,2,0,"div",4),r.bd(6,d,2,0,"div",4),r.bd(7,a,2,0,"div",4),r.gc(8,"a",3),r.dd(9,"Go To Home"),r.fc(),r.fc()),2&i&&(r.Ob(3),r.Bc("routerLink",r.Fc(5,u)),r.Ob(2),r.Bc("ngIf",e.isExpired),r.Ob(1),r.Bc("ngIf",e.isSuccess),r.Ob(1),r.Bc("ngIf",e.isErr),r.Ob(1),r.Bc("routerLink",r.Fc(6,f)))},directives:[c.f,t.o],styles:["#container-parent[_ngcontent-%COMP%]{width:100%;min-height:100%}.page-title[_ngcontent-%COMP%]{font-size:24px;color:#148;font-weight:700}.slide-heading[_ngcontent-%COMP%]{font-size:32px;color:#148;font-weight:700;margin:0 0 10px}"]}),i})()}];let p=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=r.Zb({type:i}),i.\u0275inj=r.Yb({imports:[[c.g.forChild(g)],c.g]}),i})(),h=(()=>{class i{}return i.\u0275fac=function(e){return new(e||i)},i.\u0275mod=r.Zb({type:i}),i.\u0275inj=r.Yb({imports:[[t.c,p]]}),i})()}}]);