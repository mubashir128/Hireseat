!function(){function n(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function e(n,e){for(var i=0;i<e.length;i++){var t=e[i];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[34],{Geer:function(i,t,c){"use strict";c.r(t),c.d(t,"EmailVerificationModule",function(){return w});var o=c("ofXK"),r=c("tyNb"),s=c("VITL"),a=c("fXoL");function u(n,e){1&n&&(a.fc(0,"div",5),a.cd(1," The link has been Used or Invalid Link "),a.ec())}function f(n,e){1&n&&(a.fc(0,"div",5),a.cd(1," Email Verified Successfully"),a.ec())}function d(n,e){1&n&&(a.fc(0,"div",5),a.cd(1," Something went wrong! "),a.ec())}var l,p,h,g=function(){return["/"]},b=function(){return[""]},v=[{path:"",component:(l=function(){function i(e,t){n(this,i),this.route=e,this.userService=t,this.isExpired=!1,this.isSuccess=!1,this.isErr=!1}var t,c,o;return t=i,(c=[{key:"ngOnInit",value:function(){var n=this;this.route.params.subscribe(function(e){n.handleRequest(e.key)})}},{key:"handleRequest",value:function(n){var e=this;this.userService.emailVerification({key:n}).subscribe(function(n){"not found"==n.res?e.isExpired=!0:"success"==n.res?e.isSuccess=!0:e.isErr=!0},function(n){console.log(n)})}}])&&e(t.prototype,c),o&&e(t,o),i}(),l.\u0275fac=function(n){return new(n||l)(a.ac(r.a),a.ac(s.a))},l.\u0275cmp=a.Ub({type:l,selectors:[["app-email-verification"]],decls:10,vars:7,consts:[[1,"center-align",2,"width","100%","min-height","100vh","padding","50px 0px 50px 0px","background","#E9F4FF"],["src","assets/img/identity1.png",2,"margin-top","calc(6vh + 50px)"],[1,"slide-heading",2,"margin-top","10px"],[3,"routerLink"],["class","slide-sub-heading",4,"ngIf"],[1,"slide-sub-heading"]],template:function(n,e){1&n&&(a.fc(0,"div",0),a.bc(1,"img",1),a.fc(2,"div",2),a.fc(3,"a",3),a.cd(4,"HIRE SEAT "),a.ec(),a.ec(),a.ad(5,u,2,0,"div",4),a.ad(6,f,2,0,"div",4),a.ad(7,d,2,0,"div",4),a.fc(8,"a",3),a.cd(9,"Go To Home"),a.ec(),a.ec()),2&n&&(a.Nb(3),a.Ac("routerLink",a.Ec(5,g)),a.Nb(2),a.Ac("ngIf",e.isExpired),a.Nb(1),a.Ac("ngIf",e.isSuccess),a.Nb(1),a.Ac("ngIf",e.isErr),a.Nb(1),a.Ac("routerLink",a.Ec(6,b)))},directives:[r.f,o.o],styles:["#container-parent[_ngcontent-%COMP%]{width:100%;min-height:100%}.page-title[_ngcontent-%COMP%]{font-size:24px;color:#148;font-weight:700}.slide-heading[_ngcontent-%COMP%]{font-size:32px;color:#148;font-weight:700;margin:0 0 10px}"]}),l)}],m=((h=function e(){n(this,e)}).\u0275mod=a.Yb({type:h}),h.\u0275inj=a.Xb({factory:function(n){return new(n||h)},imports:[[r.g.forChild(v)],r.g]}),h),w=((p=function e(){n(this,e)}).\u0275mod=a.Yb({type:p}),p.\u0275inj=a.Xb({factory:function(n){return new(n||p)},imports:[[o.c,m]]}),p)}}])}();