(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{fp1T:function(t,e,n){"use strict";n.d(e,"a",function(){return u});var o=n("VITL"),c=n("3Pt+"),i=n("fXoL"),r=n("tyNb"),a=n("ofXK");const d=function(){return["/login"]};function s(t,e){1&t&&(i.fc(0,"li"),i.fc(1,"a",5),i.cd(2,"Login"),i.ec(),i.ec()),2&t&&(i.Nb(1),i.Ac("routerLink",i.Ec(1,d)))}function l(t,e){1&t&&(i.fc(0,"li"),i.fc(1,"a",5),i.cd(2,"Sign Up"),i.ec(),i.ec()),2&t&&(i.Nb(1),i.Ac("routerLink",i.Ec(1,d)))}function f(t,e){1&t&&(i.fc(0,"div",22),i.cd(1,"Please Enter Valid Email"),i.ec())}const g=function(){return["/blog"]},m=function(){return["/forum"]},p=function(){return["/contact-us"]};let u=(()=>{class t{constructor(t,e){this.userService=t,this.formBuilder=e}ngOnInit(){jQuery(".modal").modal(),jQuery("select").material_select(),this.Email=this.formBuilder.group({email:["",[c.y.required,c.y.email]]}),this.loggedInUser=this.userService.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole&&(this.isSuperAdmin=!0))}formSubmit(){this.Email.invalid||this.userService.subscribeNewsLetter(this.Email.value).subscribe(t=>{console.log(t),"already in db"==t.result?alert("you are already subscribe"):jQuery("#registerMsg").modal("open")})}goHome(){jQuery("#registerMsg").modal("close")}}return t.\u0275fac=function(e){return new(e||t)(i.ac(o.a),i.ac(c.f))},t.\u0275cmp=i.Ub({type:t,selectors:[["app-footer"]],decls:57,vars:10,consts:[[1,"footerSection"],[1,"row"],[1,"col","s6","l4","MailUs","paddxDiv"],[1,"marB30"],[1,"col","s6","l3","LinksDiv","paddxDiv"],[1,"grey-text","text-lighten-3",3,"routerLink"],[4,"ngIf"],[1,"col","s12","l3","Subscribe"],[1,"Emailtext"],["src","assets/img/email.png",1,"emailF"],["novalidate","","role","form",3,"formGroup","ngSubmit"],["type","text","placeholder","Email Address","formControlName","email"],["class","error",4,"ngIf"],["type","submit",1,"SearchBtn"],[1,"FooterBottom"],["id","registerMsg",1,"modal","modal-fixed-footer","custFooterModal","msgBox"],[1,"msgHead"],[1,"modal-content","terms","msgContain"],[1,"regMSG"],[1,"modal-footer"],[1,"col","s6","m6","l6","text-center"],[1,"modal-close","waves-effect","waves-light","btn",3,"click"],[1,"error"]],template:function(t,e){1&t&&(i.fc(0,"div",0),i.fc(1,"div",1),i.fc(2,"div",2),i.fc(3,"h4"),i.cd(4,"Mail Us:"),i.ec(),i.fc(5,"p",3),i.cd(6,"HireSeat Agency Pvt. Ltd. 48 Harding Pl"),i.bc(7,"br"),i.cd(8," Freeport, New York, 11520"),i.ec(),i.fc(9,"p"),i.cd(10,"Phone number:"),i.fc(11,"span"),i.cd(12,"516 729 0271"),i.ec(),i.ec(),i.fc(13,"p"),i.cd(14,"Email address:"),i.fc(15,"span"),i.cd(16,"contact@hireseat.com"),i.ec(),i.ec(),i.ec(),i.fc(17,"div",4),i.fc(18,"h4"),i.cd(19,"Links:"),i.ec(),i.fc(20,"ul"),i.fc(21,"li"),i.fc(22,"a",5),i.cd(23,"Blog"),i.ec(),i.ec(),i.ad(24,s,3,2,"li",6),i.ad(25,l,3,2,"li",6),i.fc(26,"li"),i.fc(27,"a",5),i.cd(28,"Ask a Recruiter "),i.ec(),i.ec(),i.fc(29,"li"),i.fc(30,"a",5),i.cd(31,"Contact Us"),i.ec(),i.ec(),i.ec(),i.ec(),i.fc(32,"div",7),i.fc(33,"h4"),i.cd(34,"Subscribe our Newsletter:"),i.ec(),i.fc(35,"div",8),i.bc(36,"img",9),i.fc(37,"form",10),i.pc("ngSubmit",function(){return e.formSubmit()}),i.bc(38,"input",11),i.ad(39,f,2,0,"div",12),i.fc(40,"button",13),i.cd(41,"Subscribe"),i.ec(),i.ec(),i.ec(),i.ec(),i.ec(),i.fc(42,"div",14),i.fc(43,"a"),i.cd(44,"\xa9 2017 HireSeat, Inc. All rights reserved. Made In NYC"),i.ec(),i.fc(45,"a"),i.cd(46,"Terms and Conditions | Privacy Policy"),i.ec(),i.ec(),i.ec(),i.fc(47,"div",15),i.fc(48,"h4",16),i.cd(49,"Subscription"),i.ec(),i.fc(50,"div",17),i.fc(51,"h4",18),i.cd(52,"Thank you for Subscribing!"),i.ec(),i.ec(),i.fc(53,"div",19),i.fc(54,"div",20),i.fc(55,"button",21),i.pc("click",function(){return e.goHome()}),i.cd(56," Ok "),i.ec(),i.ec(),i.ec(),i.ec()),2&t&&(i.Nb(22),i.Ac("routerLink",i.Ec(7,g)),i.Nb(2),i.Ac("ngIf",!e.isLoggedIn),i.Nb(1),i.Ac("ngIf",!e.isLoggedIn),i.Nb(2),i.Ac("routerLink",i.Ec(8,m)),i.Nb(3),i.Ac("routerLink",i.Ec(9,p)),i.Nb(7),i.Ac("formGroup",e.Email),i.Nb(2),i.Ac("ngIf",e.Email.controls.email.hasError("email")))},directives:[r.f,a.o,c.A,c.q,c.j,c.c,c.p,c.h],styles:["footer.page-footer[_ngcontent-%COMP%]{margin-top:0}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}@media only screen and (min-width:768px) and (max-width:1024px){.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:75%!important;margin-right:10px}}@media only screen and (min-width:320px) and (max-width:667px){.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:70px}.msgBox[_ngcontent-%COMP%]{max-height:unset!important;height:auto}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{position:unset;max-height:100%;width:100%}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{position:unset;margin:20px 0 0}.terms[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:10px 0 0!important}.center-align[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0 18px;height:30px!important;line-height:unset}.row[_ngcontent-%COMP%]   .col.paddxDiv[_ngcontent-%COMP%]{padding:0 .75rem!important}.center-align[_ngcontent-%COMP%]{float:unset;padding-top:5px;padding-right:0;margin-right:0!important}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]{padding:0;height:auto}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:0}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{height:40px!important}.SearchBtn[_ngcontent-%COMP%]{height:40px}}.msgBox[_ngcontent-%COMP%]{max-height:30%;width:30%;top:30%;overflow:hidden}.regMSG[_ngcontent-%COMP%]{font-size:20px!important;font-weight:bolder;overflow:hidden}.msgHead[_ngcontent-%COMP%], .regMSG[_ngcontent-%COMP%]{text-align:center}.msgHead[_ngcontent-%COMP%]{margin-top:20px;color:#3af;font-weight:700}.text-center[_ngcontent-%COMP%]{text-align:center}.choseLabel[_ngcontent-%COMP%]{position:static;width:100%;float:left;transform:unset}"]}),t})()},lhKH:function(t,e,n){"use strict";n.r(e),n.d(e,"ContactUsModule",function(){return f});var o=n("ofXK"),c=n("tyNb"),i=n("fXoL"),r=n("kWWo"),a=n("fp1T");const d=[{path:"",component:(()=>{class t{constructor(){}ngOnInit(){}}return t.\u0275fac=function(e){return new(e||t)},t.\u0275cmp=i.Ub({type:t,selectors:[["app-contact-us"]],decls:29,vars:0,consts:[[2,"background","#f5f5f5","min-height","100vh","height","100%","width","100%","float","left"],[1,"page-title","text-center","headerDiv","contactHeader"],[1,"container"],[1,"row","shadowCommon"],[1,"width50"],["id","map-iframe","src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3026.629035178716!2d-73.5848681844461!3d40.66010707933748!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c27c0ad3eb84b5%3A0xf9c44955bd2d708b!2s48+Harding+Pl%2C+Freeport%2C+NY+11520%2C+USA!5e0!3m2!1sen!2sin!4v1507986854270","height","450","frameborder","0","allowfullscreen","",2,"border","0"]],template:function(t,e){1&t&&(i.bc(0,"app-navbar"),i.fc(1,"div",0),i.fc(2,"div",1),i.cd(3," Contact Us "),i.ec(),i.fc(4,"div",2),i.fc(5,"div",3),i.fc(6,"div",4),i.bc(7,"iframe",5),i.ec(),i.fc(8,"div",4),i.fc(9,"h5"),i.cd(10," Company Address "),i.ec(),i.fc(11,"p"),i.cd(12," HireSeat Agency Pvt. Ltd. "),i.bc(13,"br"),i.cd(14," 48 Harding Pl "),i.bc(15,"br"),i.cd(16," Freeport, New York, 11520 "),i.bc(17,"br"),i.ec(),i.bc(18,"br"),i.fc(19,"h5"),i.cd(20," Phone number "),i.ec(),i.fc(21,"p"),i.cd(22," 516 729 0271 "),i.ec(),i.bc(23,"br"),i.fc(24,"h5"),i.cd(25," Email Address"),i.ec(),i.fc(26,"p"),i.cd(27," contact@hireseat.com"),i.ec(),i.ec(),i.ec(),i.ec(),i.ec(),i.bc(28,"app-footer"))},directives:[r.a,a.a],styles:[".page-title[_ngcontent-%COMP%]{font-size:30px;color:#148;font-weight:700}#map-iframe[_ngcontent-%COMP%]{width:100%}p[_ngcontent-%COMP%]{color:#333;font-size:16px}h5[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.width50[_ngcontent-%COMP%]{width:50%;float:left;padding:15px}.page-title.text-center.headerDiv.contactHeader[_ngcontent-%COMP%]{color:#fff;font-size:35px;border:none;padding:20px 0!important;margin-bottom:30px}@media only screen and (min-width:320px) and (max-width:767px){.width50[_ngcontent-%COMP%]{width:100%;float:left;padding:15px}}"]}),t})()}];let s=(()=>{class t{}return t.\u0275mod=i.Yb({type:t}),t.\u0275inj=i.Xb({factory:function(e){return new(e||t)},imports:[[c.g.forChild(d)],c.g]}),t})();var l=n("evil");let f=(()=>{class t{}return t.\u0275mod=i.Yb({type:t}),t.\u0275inj=i.Xb({factory:function(e){return new(e||t)},imports:[[o.c,s,l.a]]}),t})()}}]);