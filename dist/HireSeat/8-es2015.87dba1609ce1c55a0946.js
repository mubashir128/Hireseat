(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{HbsC:function(t,n,e){"use strict";e.d(n,"a",function(){return c});var i=e("XNiG"),o=e("fXoL");let c=(()=>{class t{constructor(){this.interact=new i.a,this.interact$=this.interact.asObservable()}loadData(t){this.interact.next(t)}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Wb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},ScWD:function(t,n,e){"use strict";e.d(n,"a",function(){return a});var i=e("fXoL"),o=e("tyNb"),c=e("ofXK");function r(t,n){if(1&t){const t=i.gc();i.fc(0,"div",4),i.fc(1,"h4",5),i.pc("click",function(){i.Rc(t);const e=n.$implicit;return i.tc().sendDetails(e._id)}),i.bc(2,"i",6),i.fc(3,"a"),i.cd(4),i.ec(),i.ec(),i.ec()}if(2&t){const t=n.$implicit;i.Nb(1),i.Ac("id",t._id),i.Nb(3),i.dd(t.question)}}let a=(()=>{class t{constructor(t,n){this.router=t,this.route=n,this.questData=[]}ngOnInit(){this.route.params.subscribe(t=>{this.id=t})}ngAfterViewInit(){jQuery("#"+this.id.id).addClass("activeClass")}sendDetails(t){this.router.navigate(["/question-details/",t])}addActiveClass(t){console.log(t)}}return t.\u0275fac=function(n){return new(n||t)(i.ac(o.c),i.ac(o.a))},t.\u0275cmp=i.Ub({type:t,selectors:[["app-questions"]],inputs:{questData:"questData"},decls:6,vars:1,consts:[[1,"forumPageInner"],[1,"forumQustionBlock","forumQustionCommonBlock"],[1,"headDiv"],["class","questionDivText",4,"ngFor","ngForOf"],[1,"questionDivText"],["id","p",1,"tempClass",3,"id","click"],["aria-hidden","true",1,"fa","fa-angle-right"]],template:function(t,n){1&t&&(i.fc(0,"div",0),i.fc(1,"div",1),i.fc(2,"div",2),i.fc(3,"h4"),i.cd(4,"recent questions"),i.ec(),i.ec(),i.ad(5,r,5,2,"div",3),i.ec(),i.ec()),2&t&&(i.Nb(5),i.Ac("ngForOf",n.questData))},directives:[c.n],styles:[".questionDivText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:16px!important;font-weight:500!important;color:#000!important;text-align:left!important;cursor:pointer}.questionDivText[_ngcontent-%COMP%]{padding:10px!important;margin-bottom:0!important;border-bottom:1px solid #ddd!important}.headDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{text-align:center!important}.questionDivText[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{color:#3af;margin:0 5px}.activeClass[_ngcontent-%COMP%]{color:orange}.activeClass[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%], .activeClass[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:orange!important}",".forumPageMain[_ngcontent-%COMP%]{padding:20px 0;width:calc(100% - 340px)!important;float:left}.forumMainSection[_ngcontent-%COMP%]{padding:0 35px;width:100%;float:left}.mainDivForums[_ngcontent-%COMP%]{background-color:#fff;width:100%;float:left}.inputDivMain[_ngcontent-%COMP%]{position:sticky;top:0;width:100%;background-color:#34aafd;z-index:999;text-align:center}.inputDivMain[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:10px auto;max-width:600px;background-color:#fff;border:1px solid #ddd;border-radius:5px}.stickyDiv[_ngcontent-%COMP%]{position:sticky;top:-10px;width:300px;float:right;padding:20px 0;z-index:99999}.forumQustionCommonBlock[_ngcontent-%COMP%]{border:1px solid #ddd;margin:20px 0;background-color:#fff;box-shadow:0 0 10px #cacaca;border-radius:5px}.headDiv[_ngcontent-%COMP%]{padding:10px;border-bottom:1px solid #ddd;position:relative}.headDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:25px;font-weight:700;color:#3af}.byAnnomus[_ngcontent-%COMP%]{padding:0 15px;font-size:16px;color:#333;margin:10px 0}.questionDivText[_ngcontent-%COMP%]{padding:10px 15px;margin-bottom:10px}.questionDivText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:20px;font-weight:700;color:#000}.answerHead[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;margin:20px 0 0}.questionDivText[_ngcontent-%COMP%]   .answerHead[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#aaa;font-size:14px;margin:0}.profileImg[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-color:#ddd;margin-right:20px}.answerHead[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:15px;font-weight:700;color:#666}.questionDivText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000;font-size:15px;margin:10px 0}.forumAnswersBlock[_ngcontent-%COMP%]   .questionDivText[_ngcontent-%COMP%]{padding:15px}.questionDivTextReply[_ngcontent-%COMP%]{display:none;margin:20px 0;text-align:right}.questionDivTextReply[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:10px;min-height:70px;border-radius:5px;border:1px solid #ddd}.forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-size:20px;font-weight:700;color:#101010}.forumMsgPopup.forumPopMain[_ngcontent-%COMP%]{max-width:380px;position:fixed}.yellowStar[_ngcontent-%COMP%]{color:#ff8d00;position:absolute;top:15px;right:20px;font-size:20px}.inputDivMainN[_ngcontent-%COMP%]{position:sticky;top:10px;z-index:999;padding:5px;text-align:center;border-radius:5px}.inputDivMainN[_ngcontent-%COMP%], .inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#fff;box-sizing:border-box}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0;color:#000;font-weight:700;border:1px solid #ddd;border-radius:5px;width:100%;text-align:left;padding:0 70px 0 10px}button.serchBtn[_ngcontent-%COMP%]{position:absolute;right:0;height:100%;border:none;width:60px;color:#fff!important;background-color:#34aafd;border-radius:0 5px 5px 0}button.serchBtn[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{color:#fff}.inputDivMainNInner[_ngcontent-%COMP%]{position:relative}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#000;opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#000;opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{color:#000}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder{color:#000}.answer[_ngcontent-%COMP%]{color:#3af;font-weight:700;font-size:14px;border:1px solid #34aafd;background-color:transparent;border-radius:30px;padding:5px 30px;margin-top:20px}.newPopZindex[_ngcontent-%COMP%]{z-index:99999!important}.newPopZindex[_ngcontent-%COMP%]   .slide-heading.text-center[_ngcontent-%COMP%]{text-align:center;padding:5px 0;border-bottom:1px solid #666;color:#0a9be5;font-size:25px;font-weight:700}.newPopZindex[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding:0}.newPopZindex[_ngcontent-%COMP%]   a.videoCloseBtn[_ngcontent-%COMP%]{float:right;margin:5px}.contai[_ngcontent-%COMP%]{font-size:16px;line-height:16px;height:32px;overflow:hidden}.show[_ngcontent-%COMP%]{overflow:visible;height:auto}.questionDivText[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.pageHeading[_ngcontent-%COMP%]{font-size:50px;font-weight:700;margin:0;color:#fff}.headerDiv[_ngcontent-%COMP%]{background-color:#6bf}.headerDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#fff}.headerDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#fff}@media only screen and (min-device-width:320px) and (max-device-width:667px){.stickyDiv[_ngcontent-%COMP%]{top:0;padding:0;width:100%;float:none}.askBtnText[_ngcontent-%COMP%]{font-size:15px;text-align:justify}.recentQuestionsDivMain[_ngcontent-%COMP%]{display:none}.forumMainSection[_ngcontent-%COMP%]{padding:0}.inputDivMainN[_ngcontent-%COMP%]{top:170px}.AksQutionN[_ngcontent-%COMP%]{position:absolute;top:0;background-color:#fff;width:100%;height:185px}.forumPageInner[_ngcontent-%COMP%]{padding:0 10px}.forumPageMain[_ngcontent-%COMP%]{padding:200px 0;width:100%!important;float:left}.pageHeading[_ngcontent-%COMP%]{font-size:35px!important}}@media only screen and (min-device-width:768px) and (max-device-width:1024px) and (-webkit-min-device-pixel-ratio:1){.forumMainSection[_ngcontent-%COMP%]{padding:0}.mainDivForums[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.headerDiv[_ngcontent-%COMP%]{padding:30px 0!important}.pageHeading[_ngcontent-%COMP%]{font-size:42px!important}}"]}),t})()},fp1T:function(t,n,e){"use strict";e.d(n,"a",function(){return m});var i=e("VITL"),o=e("3Pt+"),c=e("fXoL"),r=e("tyNb"),a=e("ofXK");const s=function(){return["/login"]};function d(t,n){1&t&&(c.fc(0,"li"),c.fc(1,"a",5),c.cd(2,"Login"),c.ec(),c.ec()),2&t&&(c.Nb(1),c.Ac("routerLink",c.Ec(1,s)))}function p(t,n){1&t&&(c.fc(0,"li"),c.fc(1,"a",5),c.cd(2,"Sign Up"),c.ec(),c.ec()),2&t&&(c.Nb(1),c.Ac("routerLink",c.Ec(1,s)))}function l(t,n){1&t&&(c.fc(0,"div",22),c.cd(1,"Please Enter Valid Email"),c.ec())}const g=function(){return["/blog"]},f=function(){return["/forum"]},u=function(){return["/contact-us"]};let m=(()=>{class t{constructor(t,n){this.userService=t,this.formBuilder=n}ngOnInit(){jQuery(".modal").modal(),jQuery("select").material_select(),this.Email=this.formBuilder.group({email:["",[o.y.required,o.y.email]]}),this.loggedInUser=this.userService.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole&&(this.isSuperAdmin=!0))}formSubmit(){this.Email.invalid||this.userService.subscribeNewsLetter(this.Email.value).subscribe(t=>{console.log(t),"already in db"==t.result?alert("you are already subscribe"):jQuery("#registerMsg").modal("open")})}goHome(){jQuery("#registerMsg").modal("close")}}return t.\u0275fac=function(n){return new(n||t)(c.ac(i.a),c.ac(o.f))},t.\u0275cmp=c.Ub({type:t,selectors:[["app-footer"]],decls:57,vars:10,consts:[[1,"footerSection"],[1,"row"],[1,"col","s6","l4","MailUs","paddxDiv"],[1,"marB30"],[1,"col","s6","l3","LinksDiv","paddxDiv"],[1,"grey-text","text-lighten-3",3,"routerLink"],[4,"ngIf"],[1,"col","s12","l3","Subscribe"],[1,"Emailtext"],["src","assets/img/email.png",1,"emailF"],["novalidate","","role","form",3,"formGroup","ngSubmit"],["type","text","placeholder","Email Address","formControlName","email"],["class","error",4,"ngIf"],["type","submit",1,"SearchBtn"],[1,"FooterBottom"],["id","registerMsg",1,"modal","modal-fixed-footer","custFooterModal","msgBox"],[1,"msgHead"],[1,"modal-content","terms","msgContain"],[1,"regMSG"],[1,"modal-footer"],[1,"col","s6","m6","l6","text-center"],[1,"modal-close","waves-effect","waves-light","btn",3,"click"],[1,"error"]],template:function(t,n){1&t&&(c.fc(0,"div",0),c.fc(1,"div",1),c.fc(2,"div",2),c.fc(3,"h4"),c.cd(4,"Mail Us:"),c.ec(),c.fc(5,"p",3),c.cd(6,"HireSeat Agency Pvt. Ltd. 48 Harding Pl"),c.bc(7,"br"),c.cd(8," Freeport, New York, 11520"),c.ec(),c.fc(9,"p"),c.cd(10,"Phone number:"),c.fc(11,"span"),c.cd(12,"516 729 0271"),c.ec(),c.ec(),c.fc(13,"p"),c.cd(14,"Email address:"),c.fc(15,"span"),c.cd(16,"contact@hireseat.com"),c.ec(),c.ec(),c.ec(),c.fc(17,"div",4),c.fc(18,"h4"),c.cd(19,"Links:"),c.ec(),c.fc(20,"ul"),c.fc(21,"li"),c.fc(22,"a",5),c.cd(23,"Blog"),c.ec(),c.ec(),c.ad(24,d,3,2,"li",6),c.ad(25,p,3,2,"li",6),c.fc(26,"li"),c.fc(27,"a",5),c.cd(28,"Ask a Recruiter "),c.ec(),c.ec(),c.fc(29,"li"),c.fc(30,"a",5),c.cd(31,"Contact Us"),c.ec(),c.ec(),c.ec(),c.ec(),c.fc(32,"div",7),c.fc(33,"h4"),c.cd(34,"Subscribe our Newsletter:"),c.ec(),c.fc(35,"div",8),c.bc(36,"img",9),c.fc(37,"form",10),c.pc("ngSubmit",function(){return n.formSubmit()}),c.bc(38,"input",11),c.ad(39,l,2,0,"div",12),c.fc(40,"button",13),c.cd(41,"Subscribe"),c.ec(),c.ec(),c.ec(),c.ec(),c.ec(),c.fc(42,"div",14),c.fc(43,"a"),c.cd(44,"\xa9 2017 HireSeat, Inc. All rights reserved. Made In NYC"),c.ec(),c.fc(45,"a"),c.cd(46,"Terms and Conditions | Privacy Policy"),c.ec(),c.ec(),c.ec(),c.fc(47,"div",15),c.fc(48,"h4",16),c.cd(49,"Subscription"),c.ec(),c.fc(50,"div",17),c.fc(51,"h4",18),c.cd(52,"Thank you for Subscribing!"),c.ec(),c.ec(),c.fc(53,"div",19),c.fc(54,"div",20),c.fc(55,"button",21),c.pc("click",function(){return n.goHome()}),c.cd(56," Ok "),c.ec(),c.ec(),c.ec(),c.ec()),2&t&&(c.Nb(22),c.Ac("routerLink",c.Ec(7,g)),c.Nb(2),c.Ac("ngIf",!n.isLoggedIn),c.Nb(1),c.Ac("ngIf",!n.isLoggedIn),c.Nb(2),c.Ac("routerLink",c.Ec(8,f)),c.Nb(3),c.Ac("routerLink",c.Ec(9,u)),c.Nb(7),c.Ac("formGroup",n.Email),c.Nb(2),c.Ac("ngIf",n.Email.controls.email.hasError("email")))},directives:[r.f,a.o,o.z,o.q,o.j,o.c,o.p,o.h],styles:["footer.page-footer[_ngcontent-%COMP%]{margin-top:0}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}@media only screen and (min-width:768px) and (max-width:1024px){.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:75%!important;margin-right:10px}}@media only screen and (min-width:320px) and (max-width:667px){.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:70px}.msgBox[_ngcontent-%COMP%]{max-height:unset!important;height:auto}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{position:unset;max-height:100%;width:100%}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{position:unset;margin:20px 0 0}.terms[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:10px 0 0!important}.center-align[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0 18px;height:30px!important;line-height:unset}.row[_ngcontent-%COMP%]   .col.paddxDiv[_ngcontent-%COMP%]{padding:0 .75rem!important}.center-align[_ngcontent-%COMP%]{float:unset;padding-top:5px;padding-right:0;margin-right:0!important}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]{padding:0;height:auto}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:0}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{height:40px!important}.SearchBtn[_ngcontent-%COMP%]{height:40px}}.msgBox[_ngcontent-%COMP%]{max-height:30%;width:30%;top:30%;overflow:hidden}.regMSG[_ngcontent-%COMP%]{font-size:20px!important;font-weight:bolder;overflow:hidden}.msgHead[_ngcontent-%COMP%], .regMSG[_ngcontent-%COMP%]{text-align:center}.msgHead[_ngcontent-%COMP%]{margin-top:20px;color:#3af;font-weight:700}.text-center[_ngcontent-%COMP%]{text-align:center}.choseLabel[_ngcontent-%COMP%]{position:static;width:100%;float:left;transform:unset}"]}),t})()},zIDM:function(t,n,e){"use strict";e.d(n,"a",function(){return x});var i=e("3Pt+"),o=e("VITL"),c=e("HbsC"),r=e("fXoL"),a=e("tyNb"),s=e("ofXK");function d(t,n){1&t&&(r.fc(0,"div",17),r.fc(1,"div",18),r.fc(2,"h4"),r.cd(3,"Please verify your email to ensure that you are a real person. You will be given a one time password"),r.ec(),r.ec(),r.ec())}function p(t,n){1&t&&(r.fc(0,"div"),r.cd(1," Email is required*"),r.ec())}function l(t,n){1&t&&(r.fc(0,"div"),r.cd(1,"Email must be a valid email address"),r.ec())}function g(t,n){if(1&t&&(r.fc(0,"div",25),r.ad(1,p,2,0,"div",26),r.ad(2,l,2,0,"div",26),r.ec()),2&t){const t=r.tc(2);r.Nb(1),r.Ac("ngIf",t.f.emailVerify.errors.required),r.Nb(1),r.Ac("ngIf",t.f.emailVerify.errors.email)}}function f(t,n){1&t&&(r.fc(0,"div"),r.cd(1," Otp is required*"),r.ec())}function u(t,n){if(1&t&&(r.fc(0,"div",25),r.ad(1,f,2,0,"div",26),r.ec()),2&t){const t=r.tc(3);r.Nb(1),r.Ac("ngIf",t.otpVali.otpVerify.errors.required)}}function m(t,n){if(1&t){const t=r.gc();r.fc(0,"div",20),r.bc(1,"input",27),r.ad(2,u,2,1,"div",22),r.fc(3,"button",23),r.pc("click",function(){return r.Rc(t),r.tc(2).checkOtp()}),r.cd(4," Verify "),r.ec(),r.ec()}if(2&t){const t=r.tc(2);r.Nb(2),r.Ac("ngIf",t.otpSubmitted&&t.otpVali.otpVerify.errors)}}function h(t,n){if(1&t){const t=r.gc();r.fc(0,"div",19),r.fc(1,"form",11),r.fc(2,"div",20),r.bc(3,"input",21),r.ad(4,g,3,2,"div",22),r.fc(5,"button",23),r.pc("click",function(){return r.Rc(t),r.tc().onSubmit()}),r.cd(6," Verify Email "),r.ec(),r.ec(),r.ec(),r.fc(7,"form",11),r.ad(8,m,5,1,"div",24),r.ec(),r.ec()}if(2&t){const t=r.tc();r.Nb(1),r.Ac("formGroup",t.verifyEmail),r.Nb(3),r.Ac("ngIf",t.emailSubmitted&&t.f.emailVerify.errors),r.Nb(3),r.Ac("formGroup",t.verifyOtp),r.Nb(1),r.Ac("ngIf",!t.verfStatus)}}let x=(()=>{class t{constructor(t,n,e,i,o){this.formBuilder=t,this.router=n,this._Userservice=e,this.route=i,this._interactComp=o,this.verfStatus=!1,this.msgForPopup="",this.submitted=!1,this.emailSubmitted=!1,this.otpSubmitted=!1,this.isLoggedIn=!1,this.isEmployer=!1,this.isRecruiter=!1,this.isAdmin=!1,this.isSuperAdmin=!1,this.isEnterprise=!1,this.isCandidate=!1,this.loggedInUser=this._Userservice.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole?this.isSuperAdmin=!0:"enterprise"==this.loggedInUser.userRole?this.isEnterprise=!0:"candidate"==this.loggedInUser.userRole&&(this.isCandidate=!0))}ngOnInit(){this.verifyEmail=this.formBuilder.group({emailVerify:["",[i.y.required,i.y.email]]}),this.verifyOtp=this.formBuilder.group({otpVerify:["",[i.y.required]]}),this.askQues=this.formBuilder.group({addQuestions:["",[i.y.required]]}),this.askusersData=this._Userservice.getaskQuesUserId(),jQuery(".modal").modal()}showforumPopup1(){jQuery("#forumsPop1").modal("open")}emailConfirmPopup(){jQuery("#emailConfirmPop").modal("open")}closeEmailConfirmpopup(){jQuery("#emailConfirmPop").modal("close")}closeForumModel(){jQuery("#forumsPop1").modal("close")}get f(){return this.verifyEmail.controls}get otpVali(){return this.verifyOtp.controls}verifyUser(){this.submitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.userverification(this.verifyEmailData).subscribe(t=>{},t=>{console.log(t)}))}onSubmit(){this.emailSubmitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.sendEmail(this.verifyEmailData).subscribe(t=>{(t.status="success")&&(this.msgForPopup=t.message,t.data&&(this.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data))),this.emailConfirmPopup(),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3))},t=>console.log(t)))}checkOtp(){this.otpSubmitted=!0,this.verifyOtp.invalid||(this.verifyEmailData=this.verifyEmail.value,this.verifyOtp.value.email=this.verifyEmailData.emailVerify,this.verifyOtpData=this.verifyOtp.value,this._Userservice.checkOtpEm(this.verifyOtpData).subscribe(t=>{this.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data)),((t.status="success")||(t.status="failed"))&&(this.msgForPopup=t.message,this.emailConfirmPopup()),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3)},t=>{this.msgForPopup=t,this.emailConfirmPopup()}))}addQuest(){this.askusersData=this._Userservice.getaskQuesUserId();let t=JSON.parse(this.askusersData);if(this.isCandidate){this.askQuesData=this.askQues.value;const t=this.askQuesData;t.email=this.loggedInUser.email,this._Userservice.addCandidateQuestion(t).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}else if(null==t)this.msgForPopup="Please Verfiy with Email  then ask Questions",this.emailConfirmPopup();else if(1==t.isVerified||1==this.verfStatus){this.submitted=!0,this.askQuesData=this.askQues.value;const n=this.askQuesData;n.otp=t.Otp,n.email=t.email,this._Userservice.addQuestion(n).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}else{this.askQuesData=this.askQues.value;const n=this.askQuesData;n.otp=t.Otp,n.email=t.email,this._Userservice.addQuestion(n).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}}loadData(t){this.closeForumModel(),this.msgForPopup=t.message,this.emailConfirmPopup(),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3),"no"===this._Userservice.getUser()&&this._interactComp.loadData(t.data)}}return t.\u0275fac=function(n){return new(n||t)(r.ac(i.f),r.ac(a.c),r.ac(o.a),r.ac(a.a),r.ac(c.a))},t.\u0275cmp=r.Ub({type:t,selectors:[["app-askbutton"]],decls:39,vars:6,consts:[[1,"askBtnText"],[1,"waves-effect","waves-light","btn","width100","AksQutionBtn",3,"click"],["id","forumsPop1",1,"modal","videoModalMain","forumPopMain"],[1,"videoCloseBtn",3,"click"],[1,"material-icons"],[1,"modal-content","videoModalContent"],[1,"slide-heading","text-center"],[1,"modalBodyPop"],[1,"questionDiv"],["class","questionHead",4,"ngIf"],["class","verifyDiv",4,"ngIf"],[3,"formGroup"],[3,"ngClass"],["placeholder","ask your question here...","formControlName","addQuestions"],[1,"text-right"],[1,"waves-effect","waves-light","btn","marT20",3,"disabled","click"],["id","emailConfirmPop",1,"modal","videoModalMain","forumPopMain","forumMsgPopup"],[1,"questionHead"],[1,"queHeadtext"],[1,"verifyDiv"],[1,"verifyDivInner"],["type","text","placeholder","Enter Email","formControlName","emailVerify"],["class","invalid-feedback",4,"ngIf"],["type","button",1,"waves-effect","waves-light","btn",3,"click"],["class","verifyDivInner",4,"ngIf"],[1,"invalid-feedback"],[4,"ngIf"],["type","text","placeholder","Enter One Time Password","formControlName","otpVerify","min","6","max","6"]],template:function(t,n){1&t&&(r.fc(0,"div"),r.fc(1,"p",0),r.cd(2,"Ask the best professional recruiters in NYC about how to find a job, interviewing tips, resume questions, how to use Linkedin\u2026etc"),r.ec(),r.fc(3,"a",1),r.pc("click",function(){return n.showforumPopup1()}),r.cd(4,"Ask Question"),r.ec(),r.ec(),r.fc(5,"div",2),r.fc(6,"a",3),r.pc("click",function(){return n.closeForumModel()}),r.fc(7,"i",4),r.cd(8,"close"),r.ec(),r.ec(),r.fc(9,"div",5),r.fc(10,"h4",6),r.cd(11,"Ask Questions Anonymously"),r.ec(),r.fc(12,"div",7),r.fc(13,"h5"),r.cd(14,"Tips on getting good answers quickly"),r.ec(),r.fc(15,"ul"),r.fc(16,"li"),r.cd(17,"Make sure your question hasn't been asked already"),r.ec(),r.fc(18,"li"),r.cd(19,"Keep your question short and to the point"),r.ec(),r.ec(),r.fc(20,"div",8),r.ad(21,d,4,0,"div",9),r.ad(22,h,9,4,"div",10),r.fc(23,"form",11),r.fc(24,"div",12),r.bc(25,"textarea",13),r.ec(),r.fc(26,"div",14),r.fc(27,"button",15),r.pc("click",function(){return n.addQuest()}),r.cd(28," post question "),r.ec(),r.ec(),r.ec(),r.ec(),r.ec(),r.ec(),r.ec(),r.fc(29,"div",16),r.fc(30,"a",3),r.pc("click",function(){return n.closeEmailConfirmpopup()}),r.fc(31,"i",4),r.cd(32,"close"),r.ec(),r.ec(),r.fc(33,"div",5),r.fc(34,"h4",6),r.cd(35," Message"),r.ec(),r.fc(36,"div",7),r.fc(37,"p"),r.cd(38),r.ec(),r.ec(),r.ec(),r.ec()),2&t&&(r.Nb(21),r.Ac("ngIf",!n.isCandidate),r.Nb(1),r.Ac("ngIf",!n.isCandidate),r.Nb(1),r.Ac("formGroup",n.askQues),r.Nb(1),r.Ac("ngClass",n.isCandidate?n.textFeildDivQNone:n.textFeildDivQ),r.Nb(3),r.Ac("disabled",!n.askQues.valid),r.Nb(11),r.dd(n.msgForPopup))},directives:[s.o,i.z,i.q,i.j,s.m,i.c,i.p,i.h],styles:[".modalBodyPop[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:circle!important;font-size:15px;color:#000}.modalBodyPop[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.modalBodyPop[_ngcontent-%COMP%]{border-top:1px solid #ddd;padding:0 30px;margin-bottom:30px}.questionDiv[_ngcontent-%COMP%]{box-shadow:0 0 5px #666;padding:20px;border-radius:5px}.verifyDiv[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:16px;font-weight:700;margin:0 0 15px}.questionHead[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start}.profileImg[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-color:#ddd}.queHeadtext[_ngcontent-%COMP%]{margin:0 0 0 20px}.queHeadtext[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:18px;font-weight:700}.textFeildDivQ[_ngcontent-%COMP%]{margin:20px 0 0;border-top:1px solid #ddd;padding:20px 0 0}.textFeildDivQNone[_ngcontent-%COMP%]{margin:20px 0 0;border-top:none;padding:20px 0 0}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid #ddd!important;height:40px!important;margin:0!important;box-shadow:0 0 10px #ddd!important;border-radius:5px!important;padding:0 10px!important;box-sizing:inherit!important}.verifyDiv[_ngcontent-%COMP%]{margin:20px 0 0;border-top:1px solid #ddd;padding:20px 0 0}.verifyDivInner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:10px;padding:0;min-width:150px}.verifyDivInner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:5px 0 25px;position:relative}.text-right[_ngcontent-%COMP%]{text-align:right}.marT20[_ngcontent-%COMP%]{margin-top:20px}.modal.forumPopMain[_ngcontent-%COMP%]{display:none;position:fixed;max-height:unset;width:100%;max-width:600px;overflow:unset}.textFeildDivQ[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{border:1px solid #ddd!important;height:auto!important;margin:0!important;box-shadow:0 0 10px #ddd!important;border-radius:5px!important;padding:10px!important;box-sizing:inherit!important;min-height:80px}.forumPopMain[_ngcontent-%COMP%]   .slide-heading[_ngcontent-%COMP%]{margin:0;padding:10px 30px}.askQ[_ngcontent-%COMP%], .forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center}.forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#101010}.forumMsgPopup.forumPopMain[_ngcontent-%COMP%]{max-width:380px;position:fixed}.invalid-feedback[_ngcontent-%COMP%]{color:red;position:absolute;left:5px;font-size:14px;bottom:-22px;font-weight:700}.slide-heading[_ngcontent-%COMP%]{font-size:32px;color:#148;font-weight:700;margin:0 0 10px}.videoModalMain[_ngcontent-%COMP%]   a.videoCloseBtn[_ngcontent-%COMP%]{position:absolute;top:-30px;color:#fff!important;z-index:99999999;right:0;font-size:20px!important;cursor:pointer}.width100[_ngcontent-%COMP%]{width:100%}.AksQutionBtn.btn[_ngcontent-%COMP%]{background-color:#fff;border:2px solid #34aafd;color:#34aafd;font-weight:700}.askBtnText[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#000}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{color:#666}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::-moz-placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:-ms-input-placeholder{color:#666}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::-ms-input-placeholder{color:#666}"]}),t})()}}]);