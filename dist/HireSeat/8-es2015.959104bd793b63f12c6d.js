(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{HbsC:function(t,n,e){"use strict";e.d(n,"a",function(){return r});var i=e("XNiG"),o=e("fXoL");let r=(()=>{class t{constructor(){this.interact=new i.a,this.interact$=this.interact.asObservable()}loadData(t){this.interact.next(t)}}return t.\u0275fac=function(n){return new(n||t)},t.\u0275prov=o.Xb({token:t,factory:t.\u0275fac,providedIn:"root"}),t})()},ScWD:function(t,n,e){"use strict";e.d(n,"a",function(){return a});var i=e("fXoL"),o=e("tyNb"),r=e("ofXK");function c(t,n){if(1&t){const t=i.hc();i.gc(0,"div",4),i.gc(1,"h4",5),i.qc("click",function(){i.Sc(t);const e=n.$implicit;return i.uc().sendDetails(e._id)}),i.cc(2,"i",6),i.gc(3,"a"),i.dd(4),i.fc(),i.fc(),i.fc()}if(2&t){const t=n.$implicit;i.Ob(1),i.Bc("id",t._id),i.Ob(3),i.ed(t.question)}}let a=(()=>{class t{constructor(t,n){this.router=t,this.route=n,this.questData=[]}ngOnInit(){this.route.params.subscribe(t=>{this.id=t})}ngAfterViewInit(){jQuery("#"+this.id.id).addClass("activeClass")}sendDetails(t){this.router.navigate(["/question-details/",t])}addActiveClass(t){console.log(t)}}return t.\u0275fac=function(n){return new(n||t)(i.bc(o.c),i.bc(o.a))},t.\u0275cmp=i.Vb({type:t,selectors:[["app-questions"]],inputs:{questData:"questData"},decls:6,vars:1,consts:[[1,"forumPageInner"],[1,"forumQustionBlock","forumQustionCommonBlock"],[1,"headDiv"],["class","questionDivText",4,"ngFor","ngForOf"],[1,"questionDivText"],["id","p",1,"tempClass",3,"id","click"],["aria-hidden","true",1,"fa","fa-angle-right"]],template:function(t,n){1&t&&(i.gc(0,"div",0),i.gc(1,"div",1),i.gc(2,"div",2),i.gc(3,"h4"),i.dd(4,"recent questions"),i.fc(),i.fc(),i.bd(5,c,5,2,"div",3),i.fc(),i.fc()),2&t&&(i.Ob(5),i.Bc("ngForOf",n.questData))},directives:[r.n],styles:[".questionDivText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:16px!important;font-weight:500!important;color:#000!important;text-align:left!important;cursor:pointer}.questionDivText[_ngcontent-%COMP%]{padding:10px!important;margin-bottom:0!important;border-bottom:1px solid #ddd!important}.headDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{text-align:center!important}.questionDivText[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{color:#3af;margin:0 5px}.activeClass[_ngcontent-%COMP%]{color:orange}.activeClass[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%], .activeClass[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:orange!important}",".forumPageMain[_ngcontent-%COMP%]{padding:20px 0;width:calc(100% - 340px)!important;float:left}.forumMainSection[_ngcontent-%COMP%]{padding:0 35px;width:100%;float:left}.mainDivForums[_ngcontent-%COMP%]{background-color:#fff;width:100%;float:left}.inputDivMain[_ngcontent-%COMP%]{position:sticky;top:0;width:100%;background-color:#34aafd;z-index:999;text-align:center}.inputDivMain[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:10px auto;max-width:600px;background-color:#fff;border:1px solid #ddd;border-radius:5px}.stickyDiv[_ngcontent-%COMP%]{position:sticky;top:-10px;width:300px;float:right;padding:20px 0;z-index:99999}.forumQustionCommonBlock[_ngcontent-%COMP%]{border:1px solid #ddd;margin:20px 0;background-color:#fff;box-shadow:0 0 10px #cacaca;border-radius:5px}.headDiv[_ngcontent-%COMP%]{padding:10px;border-bottom:1px solid #ddd;position:relative}.headDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:25px;font-weight:700;color:#3af}.byAnnomus[_ngcontent-%COMP%]{padding:0 15px;font-size:16px;color:#333;margin:10px 0}.questionDivText[_ngcontent-%COMP%]{padding:10px 15px;margin-bottom:10px}.questionDivText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:20px;font-weight:700;color:#000}.answerHead[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;align-items:center;margin:20px 0 0}.questionDivText[_ngcontent-%COMP%]   .answerHead[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#aaa;font-size:14px;margin:0}.profileImg[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-color:#ddd;margin-right:20px}.answerHead[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:15px;font-weight:700;color:#666}.questionDivText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#000;font-size:15px;margin:10px 0}.forumAnswersBlock[_ngcontent-%COMP%]   .questionDivText[_ngcontent-%COMP%]{padding:15px}.questionDivTextReply[_ngcontent-%COMP%]{display:none;margin:20px 0;text-align:right}.questionDivTextReply[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{padding:10px;min-height:70px;border-radius:5px;border:1px solid #ddd}.forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center;font-size:20px;font-weight:700;color:#101010}.forumMsgPopup.forumPopMain[_ngcontent-%COMP%]{max-width:380px;position:fixed}.yellowStar[_ngcontent-%COMP%]{color:#ff8d00;position:absolute;top:15px;right:20px;font-size:20px}.inputDivMainN[_ngcontent-%COMP%]{position:sticky;top:10px;z-index:999;padding:5px;text-align:center;border-radius:5px}.inputDivMainN[_ngcontent-%COMP%], .inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{background-color:#fff;box-sizing:border-box}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{margin:0;color:#000;font-weight:700;border:1px solid #ddd;border-radius:5px;width:100%;text-align:left;padding:0 70px 0 10px}button.serchBtn[_ngcontent-%COMP%]{position:absolute;right:0;height:100%;border:none;width:60px;color:#fff!important;background-color:#34aafd;border-radius:0 5px 5px 0}button.serchBtn[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{color:#fff}.inputDivMainNInner[_ngcontent-%COMP%]{position:relative}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#000;opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#000;opacity:1}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{color:#000}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-ms-input-placeholder{color:#000}.answer[_ngcontent-%COMP%]{color:#3af;font-weight:700;font-size:14px;border:1px solid #34aafd;background-color:transparent;border-radius:30px;padding:5px 30px;margin-top:20px}.newPopZindex[_ngcontent-%COMP%]{z-index:99999!important}.newPopZindex[_ngcontent-%COMP%]   .slide-heading.text-center[_ngcontent-%COMP%]{text-align:center;padding:5px 0;border-bottom:1px solid #666;color:#0a9be5;font-size:25px;font-weight:700}.newPopZindex[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding:0}.newPopZindex[_ngcontent-%COMP%]   a.videoCloseBtn[_ngcontent-%COMP%]{float:right;margin:5px}.contai[_ngcontent-%COMP%]{font-size:16px;line-height:16px;height:32px;overflow:hidden}.show[_ngcontent-%COMP%]{overflow:visible;height:auto}.questionDivText[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover{text-decoration:underline}.pageHeading[_ngcontent-%COMP%]{font-size:50px;font-weight:700;margin:0;color:#fff}.headerDiv[_ngcontent-%COMP%]{background-color:#6bf}.headerDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;color:#fff}.headerDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#fff}@media only screen and (min-device-width:320px) and (max-device-width:667px){.stickyDiv[_ngcontent-%COMP%]{top:0;padding:0;width:100%;float:none}.askBtnText[_ngcontent-%COMP%]{font-size:15px;text-align:justify}.recentQuestionsDivMain[_ngcontent-%COMP%]{display:none}.forumMainSection[_ngcontent-%COMP%]{padding:0}.inputDivMainN[_ngcontent-%COMP%]{top:170px}.AksQutionN[_ngcontent-%COMP%]{position:absolute;top:0;background-color:#fff;width:100%;height:185px}.forumPageInner[_ngcontent-%COMP%]{padding:0 10px}.forumPageMain[_ngcontent-%COMP%]{padding:200px 0;width:100%!important;float:left}.pageHeading[_ngcontent-%COMP%]{font-size:35px!important}}@media only screen and (min-device-width:768px) and (max-device-width:1024px) and (-webkit-min-device-pixel-ratio:1){.forumMainSection[_ngcontent-%COMP%]{padding:0}.mainDivForums[_ngcontent-%COMP%]   .container[_ngcontent-%COMP%]{width:90%}.headerDiv[_ngcontent-%COMP%]{padding:30px 0!important}.pageHeading[_ngcontent-%COMP%]{font-size:42px!important}}"]}),t})()},fp1T:function(t,n,e){"use strict";e.d(n,"a",function(){return m});var i=e("VITL"),o=e("3Pt+"),r=e("fXoL"),c=e("tyNb"),a=e("ofXK");const s=function(){return["/login"]};function d(t,n){1&t&&(r.gc(0,"li"),r.gc(1,"a",5),r.dd(2,"Login"),r.fc(),r.fc()),2&t&&(r.Ob(1),r.Bc("routerLink",r.Fc(1,s)))}function g(t,n){1&t&&(r.gc(0,"li"),r.gc(1,"a",5),r.dd(2,"Sign Up"),r.fc(),r.fc()),2&t&&(r.Ob(1),r.Bc("routerLink",r.Fc(1,s)))}function p(t,n){1&t&&(r.gc(0,"div",22),r.dd(1,"Please Enter Valid Email"),r.fc())}const l=function(){return["/blog"]},f=function(){return["/forum"]},u=function(){return["/contact-us"]};let m=(()=>{class t{constructor(t,n){this.userService=t,this.formBuilder=n}ngOnInit(){jQuery(".modal").modal(),jQuery("select").material_select(),this.Email=this.formBuilder.group({email:["",[o.y.required,o.y.email]]}),this.loggedInUser=this.userService.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole&&(this.isSuperAdmin=!0))}formSubmit(){this.Email.invalid||this.userService.subscribeNewsLetter(this.Email.value).subscribe(t=>{console.log(t),"already in db"==t.result?alert("you are already subscribe"):jQuery("#registerMsg").modal("open")})}goHome(){jQuery("#registerMsg").modal("close")}}return t.\u0275fac=function(n){return new(n||t)(r.bc(i.a),r.bc(o.f))},t.\u0275cmp=r.Vb({type:t,selectors:[["app-footer"]],decls:57,vars:10,consts:[[1,"footerSection"],[1,"row"],[1,"col","s6","l4","MailUs","paddxDiv"],[1,"marB30"],[1,"col","s6","l3","LinksDiv","paddxDiv"],[1,"grey-text","text-lighten-3",3,"routerLink"],[4,"ngIf"],[1,"col","s12","l3","Subscribe"],[1,"Emailtext"],["src","assets/img/email.png",1,"emailF"],["novalidate","","role","form",3,"formGroup","ngSubmit"],["type","text","placeholder","Email Address","formControlName","email"],["class","error",4,"ngIf"],["type","submit",1,"SearchBtn"],[1,"FooterBottom"],["id","registerMsg",1,"modal","modal-fixed-footer","custFooterModal","msgBox"],[1,"msgHead"],[1,"modal-content","terms","msgContain"],[1,"regMSG"],[1,"modal-footer"],[1,"col","s6","m6","l6","text-center"],[1,"modal-close","waves-effect","waves-light","btn",3,"click"],[1,"error"]],template:function(t,n){1&t&&(r.gc(0,"div",0),r.gc(1,"div",1),r.gc(2,"div",2),r.gc(3,"h4"),r.dd(4,"Mail Us:"),r.fc(),r.gc(5,"p",3),r.dd(6,"HireSeat Agency Pvt. Ltd. 48 Harding Pl"),r.cc(7,"br"),r.dd(8," Freeport, New York, 11520"),r.fc(),r.gc(9,"p"),r.dd(10,"Phone number:"),r.gc(11,"span"),r.dd(12,"516 729 0271"),r.fc(),r.fc(),r.gc(13,"p"),r.dd(14,"Email address:"),r.gc(15,"span"),r.dd(16,"contact@hireseat.com"),r.fc(),r.fc(),r.fc(),r.gc(17,"div",4),r.gc(18,"h4"),r.dd(19,"Links:"),r.fc(),r.gc(20,"ul"),r.gc(21,"li"),r.gc(22,"a",5),r.dd(23,"Blog"),r.fc(),r.fc(),r.bd(24,d,3,2,"li",6),r.bd(25,g,3,2,"li",6),r.gc(26,"li"),r.gc(27,"a",5),r.dd(28,"Ask a Recruiter "),r.fc(),r.fc(),r.gc(29,"li"),r.gc(30,"a",5),r.dd(31,"Contact Us"),r.fc(),r.fc(),r.fc(),r.fc(),r.gc(32,"div",7),r.gc(33,"h4"),r.dd(34,"Subscribe our Newsletter:"),r.fc(),r.gc(35,"div",8),r.cc(36,"img",9),r.gc(37,"form",10),r.qc("ngSubmit",function(){return n.formSubmit()}),r.cc(38,"input",11),r.bd(39,p,2,0,"div",12),r.gc(40,"button",13),r.dd(41,"Subscribe"),r.fc(),r.fc(),r.fc(),r.fc(),r.fc(),r.gc(42,"div",14),r.gc(43,"a"),r.dd(44,"\xa9 2017 HireSeat, Inc. All rights reserved. Made In NYC"),r.fc(),r.gc(45,"a"),r.dd(46,"Terms and Conditions | Privacy Policy"),r.fc(),r.fc(),r.fc(),r.gc(47,"div",15),r.gc(48,"h4",16),r.dd(49,"Subscription"),r.fc(),r.gc(50,"div",17),r.gc(51,"h4",18),r.dd(52,"Thank you for Subscribing!"),r.fc(),r.fc(),r.gc(53,"div",19),r.gc(54,"div",20),r.gc(55,"button",21),r.qc("click",function(){return n.goHome()}),r.dd(56," Ok "),r.fc(),r.fc(),r.fc(),r.fc()),2&t&&(r.Ob(22),r.Bc("routerLink",r.Fc(7,l)),r.Ob(2),r.Bc("ngIf",!n.isLoggedIn),r.Ob(1),r.Bc("ngIf",!n.isLoggedIn),r.Ob(2),r.Bc("routerLink",r.Fc(8,f)),r.Ob(3),r.Bc("routerLink",r.Fc(9,u)),r.Ob(7),r.Bc("formGroup",n.Email),r.Ob(2),r.Bc("ngIf",n.Email.controls.email.hasError("email")))},directives:[c.f,a.o,o.z,o.q,o.j,o.c,o.p,o.h],styles:["footer.page-footer[_ngcontent-%COMP%]{margin-top:0}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}@media only screen and (min-width:768px) and (max-width:1024px){.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:75%!important;margin-right:10px}}@media only screen and (min-width:320px) and (max-width:667px){.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:70px}.msgBox[_ngcontent-%COMP%]{max-height:unset!important;height:auto}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{position:unset;max-height:100%;width:100%}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{position:unset;margin:20px 0 0}.terms[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:10px 0 0!important}.center-align[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0 18px;height:30px!important;line-height:unset}.row[_ngcontent-%COMP%]   .col.paddxDiv[_ngcontent-%COMP%]{padding:0 .75rem!important}.center-align[_ngcontent-%COMP%]{float:unset;padding-top:5px;padding-right:0;margin-right:0!important}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]{padding:0;height:auto}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:0}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{height:40px!important}.SearchBtn[_ngcontent-%COMP%]{height:40px}}.msgBox[_ngcontent-%COMP%]{max-height:30%;width:30%;top:30%;overflow:hidden}.regMSG[_ngcontent-%COMP%]{font-size:20px!important;font-weight:bolder;overflow:hidden}.msgHead[_ngcontent-%COMP%], .regMSG[_ngcontent-%COMP%]{text-align:center}.msgHead[_ngcontent-%COMP%]{margin-top:20px;color:#3af;font-weight:700}.text-center[_ngcontent-%COMP%]{text-align:center}.choseLabel[_ngcontent-%COMP%]{position:static;width:100%;float:left;transform:unset}"]}),t})()},zIDM:function(t,n,e){"use strict";e.d(n,"a",function(){return x});var i=e("3Pt+"),o=e("VITL"),r=e("HbsC"),c=e("fXoL"),a=e("tyNb"),s=e("ofXK");function d(t,n){1&t&&(c.gc(0,"div",17),c.gc(1,"div",18),c.gc(2,"h4"),c.dd(3,"Please verify your email to ensure that you are a real person. You will be given a one time password"),c.fc(),c.fc(),c.fc())}function g(t,n){1&t&&(c.gc(0,"div"),c.dd(1," Email is required*"),c.fc())}function p(t,n){1&t&&(c.gc(0,"div"),c.dd(1,"Email must be a valid email address"),c.fc())}function l(t,n){if(1&t&&(c.gc(0,"div",25),c.bd(1,g,2,0,"div",26),c.bd(2,p,2,0,"div",26),c.fc()),2&t){const t=c.uc(2);c.Ob(1),c.Bc("ngIf",t.f.emailVerify.errors.required),c.Ob(1),c.Bc("ngIf",t.f.emailVerify.errors.email)}}function f(t,n){1&t&&(c.gc(0,"div"),c.dd(1," Otp is required*"),c.fc())}function u(t,n){if(1&t&&(c.gc(0,"div",25),c.bd(1,f,2,0,"div",26),c.fc()),2&t){const t=c.uc(3);c.Ob(1),c.Bc("ngIf",t.otpVali.otpVerify.errors.required)}}function m(t,n){if(1&t){const t=c.hc();c.gc(0,"div",20),c.cc(1,"input",27),c.bd(2,u,2,1,"div",22),c.gc(3,"button",23),c.qc("click",function(){return c.Sc(t),c.uc(2).checkOtp()}),c.dd(4," Verify "),c.fc(),c.fc()}if(2&t){const t=c.uc(2);c.Ob(2),c.Bc("ngIf",t.otpSubmitted&&t.otpVali.otpVerify.errors)}}function h(t,n){if(1&t){const t=c.hc();c.gc(0,"div",19),c.gc(1,"form",11),c.gc(2,"div",20),c.cc(3,"input",21),c.bd(4,l,3,2,"div",22),c.gc(5,"button",23),c.qc("click",function(){return c.Sc(t),c.uc().onSubmit()}),c.dd(6," Verify Email "),c.fc(),c.fc(),c.fc(),c.gc(7,"form",11),c.bd(8,m,5,1,"div",24),c.fc(),c.fc()}if(2&t){const t=c.uc();c.Ob(1),c.Bc("formGroup",t.verifyEmail),c.Ob(3),c.Bc("ngIf",t.emailSubmitted&&t.f.emailVerify.errors),c.Ob(3),c.Bc("formGroup",t.verifyOtp),c.Ob(1),c.Bc("ngIf",!t.verfStatus)}}let x=(()=>{class t{constructor(t,n,e,i,o){this.formBuilder=t,this.router=n,this._Userservice=e,this.route=i,this._interactComp=o,this.verfStatus=!1,this.msgForPopup="",this.submitted=!1,this.emailSubmitted=!1,this.otpSubmitted=!1,this.isLoggedIn=!1,this.isEmployer=!1,this.isRecruiter=!1,this.isAdmin=!1,this.isSuperAdmin=!1,this.isEnterprise=!1,this.isCandidate=!1,this.loggedInUser=this._Userservice.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole?this.isSuperAdmin=!0:"enterprise"==this.loggedInUser.userRole?this.isEnterprise=!0:"candidate"==this.loggedInUser.userRole&&(this.isCandidate=!0))}ngOnInit(){this.verifyEmail=this.formBuilder.group({emailVerify:["",[i.y.required,i.y.email]]}),this.verifyOtp=this.formBuilder.group({otpVerify:["",[i.y.required]]}),this.askQues=this.formBuilder.group({addQuestions:["",[i.y.required]]}),this.askusersData=this._Userservice.getaskQuesUserId(),jQuery(".modal").modal()}showforumPopup1(){jQuery("#forumsPop1").modal("open")}emailConfirmPopup(){jQuery("#emailConfirmPop").modal("open")}closeEmailConfirmpopup(){jQuery("#emailConfirmPop").modal("close")}closeForumModel(){jQuery("#forumsPop1").modal("close")}get f(){return this.verifyEmail.controls}get otpVali(){return this.verifyOtp.controls}verifyUser(){this.submitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.userverification(this.verifyEmailData).subscribe(t=>{},t=>{console.log(t)}))}onSubmit(){this.emailSubmitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.sendEmail(this.verifyEmailData).subscribe(t=>{(t.status="success")&&(this.msgForPopup=t.message,t.data&&(this.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data))),this.emailConfirmPopup(),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3))},t=>console.log(t)))}checkOtp(){this.otpSubmitted=!0,this.verifyOtp.invalid||(this.verifyEmailData=this.verifyEmail.value,this.verifyOtp.value.email=this.verifyEmailData.emailVerify,this.verifyOtpData=this.verifyOtp.value,this._Userservice.checkOtpEm(this.verifyOtpData).subscribe(t=>{this.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data)),((t.status="success")||(t.status="failed"))&&(this.msgForPopup=t.message,this.emailConfirmPopup()),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3)},t=>{this.msgForPopup=t,this.emailConfirmPopup()}))}addQuest(){this.askusersData=this._Userservice.getaskQuesUserId();let t=JSON.parse(this.askusersData);if(this.isCandidate){this.askQuesData=this.askQues.value;const t=this.askQuesData;t.email=this.loggedInUser.email,this._Userservice.addCandidateQuestion(t).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}else if(null==t)this.msgForPopup="Please Verfiy with Email  then ask Questions",this.emailConfirmPopup();else if(1==t.isVerified||1==this.verfStatus){this.submitted=!0,this.askQuesData=this.askQues.value;const n=this.askQuesData;n.otp=t.Otp,n.email=t.email,this._Userservice.addQuestion(n).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}else{this.askQuesData=this.askQues.value;const n=this.askQuesData;n.otp=t.Otp,n.email=t.email,this._Userservice.addQuestion(n).subscribe(t=>{(t.status="success")&&this.loadData(t)},t=>{console.log(t)})}}loadData(t){this.closeForumModel(),this.msgForPopup=t.message,this.emailConfirmPopup(),setTimeout(()=>{this.closeEmailConfirmpopup()},2e3),"no"===this._Userservice.getUser()&&this._interactComp.loadData(t.data)}}return t.\u0275fac=function(n){return new(n||t)(c.bc(i.f),c.bc(a.c),c.bc(o.a),c.bc(a.a),c.bc(r.a))},t.\u0275cmp=c.Vb({type:t,selectors:[["app-askbutton"]],decls:39,vars:6,consts:[[1,"askBtnText"],[1,"waves-effect","waves-light","btn","width100","AksQutionBtn",3,"click"],["id","forumsPop1",1,"modal","videoModalMain","forumPopMain"],[1,"videoCloseBtn",3,"click"],[1,"material-icons"],[1,"modal-content","videoModalContent"],[1,"slide-heading","text-center"],[1,"modalBodyPop"],[1,"questionDiv"],["class","questionHead",4,"ngIf"],["class","verifyDiv",4,"ngIf"],[3,"formGroup"],[3,"ngClass"],["placeholder","ask your question here...","formControlName","addQuestions"],[1,"text-right"],[1,"waves-effect","waves-light","btn","marT20",3,"disabled","click"],["id","emailConfirmPop",1,"modal","videoModalMain","forumPopMain","forumMsgPopup"],[1,"questionHead"],[1,"queHeadtext"],[1,"verifyDiv"],[1,"verifyDivInner"],["type","text","placeholder","Enter Email","formControlName","emailVerify"],["class","invalid-feedback",4,"ngIf"],["type","button",1,"waves-effect","waves-light","btn",3,"click"],["class","verifyDivInner",4,"ngIf"],[1,"invalid-feedback"],[4,"ngIf"],["type","text","placeholder","Enter One Time Password","formControlName","otpVerify","min","6","max","6"]],template:function(t,n){1&t&&(c.gc(0,"div"),c.gc(1,"p",0),c.dd(2,"Ask the best professional recruiters in NYC about how to find a job, interviewing tips, resume questions, how to use Linkedin\u2026etc"),c.fc(),c.gc(3,"a",1),c.qc("click",function(){return n.showforumPopup1()}),c.dd(4,"Ask Question"),c.fc(),c.fc(),c.gc(5,"div",2),c.gc(6,"a",3),c.qc("click",function(){return n.closeForumModel()}),c.gc(7,"i",4),c.dd(8,"close"),c.fc(),c.fc(),c.gc(9,"div",5),c.gc(10,"h4",6),c.dd(11,"Ask Questions Anonymously"),c.fc(),c.gc(12,"div",7),c.gc(13,"h5"),c.dd(14,"Tips on getting good answers quickly"),c.fc(),c.gc(15,"ul"),c.gc(16,"li"),c.dd(17,"Make sure your question hasn't been asked already"),c.fc(),c.gc(18,"li"),c.dd(19,"Keep your question short and to the point"),c.fc(),c.fc(),c.gc(20,"div",8),c.bd(21,d,4,0,"div",9),c.bd(22,h,9,4,"div",10),c.gc(23,"form",11),c.gc(24,"div",12),c.cc(25,"textarea",13),c.fc(),c.gc(26,"div",14),c.gc(27,"button",15),c.qc("click",function(){return n.addQuest()}),c.dd(28," post question "),c.fc(),c.fc(),c.fc(),c.fc(),c.fc(),c.fc(),c.fc(),c.gc(29,"div",16),c.gc(30,"a",3),c.qc("click",function(){return n.closeEmailConfirmpopup()}),c.gc(31,"i",4),c.dd(32,"close"),c.fc(),c.fc(),c.gc(33,"div",5),c.gc(34,"h4",6),c.dd(35," Message"),c.fc(),c.gc(36,"div",7),c.gc(37,"p"),c.dd(38),c.fc(),c.fc(),c.fc(),c.fc()),2&t&&(c.Ob(21),c.Bc("ngIf",!n.isCandidate),c.Ob(1),c.Bc("ngIf",!n.isCandidate),c.Ob(1),c.Bc("formGroup",n.askQues),c.Ob(1),c.Bc("ngClass",n.isCandidate?n.textFeildDivQNone:n.textFeildDivQ),c.Ob(3),c.Bc("disabled",!n.askQues.valid),c.Ob(11),c.ed(n.msgForPopup))},directives:[s.o,i.z,i.q,i.j,s.m,i.c,i.p,i.h],styles:[".modalBodyPop[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{list-style:circle!important;font-size:15px;color:#000}.modalBodyPop[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.modalBodyPop[_ngcontent-%COMP%]{border-top:1px solid #ddd;padding:0 30px;margin-bottom:30px}.questionDiv[_ngcontent-%COMP%]{box-shadow:0 0 5px #666;padding:20px;border-radius:5px}.verifyDiv[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:16px;font-weight:700;margin:0 0 15px}.questionHead[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-start}.profileImg[_ngcontent-%COMP%]{width:40px;height:40px;border-radius:50%;background-color:#ddd}.queHeadtext[_ngcontent-%COMP%]{margin:0 0 0 20px}.queHeadtext[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:18px;font-weight:700}.textFeildDivQ[_ngcontent-%COMP%]{margin:20px 0 0;border-top:1px solid #ddd;padding:20px 0 0}.textFeildDivQNone[_ngcontent-%COMP%]{margin:20px 0 0;border-top:none;padding:20px 0 0}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid #ddd!important;height:40px!important;margin:0!important;box-shadow:0 0 10px #ddd!important;border-radius:5px!important;padding:0 10px!important;box-sizing:inherit!important}.verifyDiv[_ngcontent-%COMP%]{margin:20px 0 0;border-top:1px solid #ddd;padding:20px 0 0}.verifyDivInner[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{margin-left:10px;padding:0;min-width:150px}.verifyDivInner[_ngcontent-%COMP%]{display:flex;justify-content:center;align-items:center;margin:5px 0 25px;position:relative}.text-right[_ngcontent-%COMP%]{text-align:right}.marT20[_ngcontent-%COMP%]{margin-top:20px}.modal.forumPopMain[_ngcontent-%COMP%]{display:none;position:fixed;max-height:unset;width:100%;max-width:600px;overflow:unset}.textFeildDivQ[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{border:1px solid #ddd!important;height:auto!important;margin:0!important;box-shadow:0 0 10px #ddd!important;border-radius:5px!important;padding:10px!important;box-sizing:inherit!important;min-height:80px}.forumPopMain[_ngcontent-%COMP%]   .slide-heading[_ngcontent-%COMP%]{margin:0;padding:10px 30px}.askQ[_ngcontent-%COMP%], .forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:center}.forumMsgPopup[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px;font-weight:700;color:#101010}.forumMsgPopup.forumPopMain[_ngcontent-%COMP%]{max-width:380px;position:fixed}.invalid-feedback[_ngcontent-%COMP%]{color:red;position:absolute;left:5px;font-size:14px;bottom:-22px;font-weight:700}.slide-heading[_ngcontent-%COMP%]{font-size:32px;color:#148;font-weight:700;margin:0 0 10px}.videoModalMain[_ngcontent-%COMP%]   a.videoCloseBtn[_ngcontent-%COMP%]{position:absolute;top:-30px;color:#fff!important;z-index:99999999;right:0;font-size:20px!important;cursor:pointer}.width100[_ngcontent-%COMP%]{width:100%}.AksQutionBtn.btn[_ngcontent-%COMP%]{background-color:#fff;border:2px solid #34aafd;color:#34aafd;font-weight:700}.askBtnText[_ngcontent-%COMP%]{font-size:18px;font-weight:700;color:#000}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::-moz-placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:-ms-input-placeholder{color:#666}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::-moz-placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:-ms-input-placeholder{opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::placeholder{color:#666;opacity:1}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]:-ms-input-placeholder{color:#666}.questionDiv[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]::-ms-input-placeholder{color:#666}"]}),t})()}}]);