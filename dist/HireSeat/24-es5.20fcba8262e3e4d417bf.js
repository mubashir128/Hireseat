!function(){function n(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function t(n,t){for(var e=0;e<t.length;e++){var o=t[e];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(n,o.key,o)}}function e(n,e,o){return e&&t(n.prototype,e),o&&t(n,o),n}(window.webpackJsonp=window.webpackJsonp||[]).push([[24],{fp1T:function(t,o,i){"use strict";i.d(o,"a",function(){return x});var c=i("VITL"),r=i("3Pt+"),a=i("fXoL"),g=i("tyNb"),d=i("ofXK"),l=function(){return["/login"]};function s(n,t){1&n&&(a.gc(0,"li"),a.gc(1,"a",5),a.dd(2,"Login"),a.fc(),a.fc()),2&n&&(a.Ob(1),a.Bc("routerLink",a.Fc(1,l)))}function f(n,t){1&n&&(a.gc(0,"li"),a.gc(1,"a",5),a.dd(2,"Sign Up"),a.fc(),a.fc()),2&n&&(a.Ob(1),a.Bc("routerLink",a.Fc(1,l)))}function p(n,t){1&n&&(a.gc(0,"div",22),a.dd(1,"Please Enter Valid Email"),a.fc())}var m=function(){return["/blog"]},u=function(){return["/forum"]},b=function(){return["/contact-us"]},x=function(){var t=function(){function t(e,o){n(this,t),this.userService=e,this.formBuilder=o}return e(t,[{key:"ngOnInit",value:function(){jQuery(".modal").modal(),jQuery("select").material_select(),this.Email=this.formBuilder.group({email:["",[r.y.required,r.y.email]]}),this.loggedInUser=this.userService.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole&&(this.isSuperAdmin=!0))}},{key:"formSubmit",value:function(){this.Email.invalid||this.userService.subscribeNewsLetter(this.Email.value).subscribe(function(n){console.log(n),"already in db"==n.result?alert("you are already subscribe"):jQuery("#registerMsg").modal("open")})}},{key:"goHome",value:function(){jQuery("#registerMsg").modal("close")}}]),t}();return t.\u0275fac=function(n){return new(n||t)(a.bc(c.a),a.bc(r.f))},t.\u0275cmp=a.Vb({type:t,selectors:[["app-footer"]],decls:57,vars:10,consts:[[1,"footerSection"],[1,"row"],[1,"col","s6","l4","MailUs","paddxDiv"],[1,"marB30"],[1,"col","s6","l3","LinksDiv","paddxDiv"],[1,"grey-text","text-lighten-3",3,"routerLink"],[4,"ngIf"],[1,"col","s12","l3","Subscribe"],[1,"Emailtext"],["src","assets/img/email.png",1,"emailF"],["novalidate","","role","form",3,"formGroup","ngSubmit"],["type","text","placeholder","Email Address","formControlName","email"],["class","error",4,"ngIf"],["type","submit",1,"SearchBtn"],[1,"FooterBottom"],["id","registerMsg",1,"modal","modal-fixed-footer","custFooterModal","msgBox"],[1,"msgHead"],[1,"modal-content","terms","msgContain"],[1,"regMSG"],[1,"modal-footer"],[1,"col","s6","m6","l6","text-center"],[1,"modal-close","waves-effect","waves-light","btn",3,"click"],[1,"error"]],template:function(n,t){1&n&&(a.gc(0,"div",0),a.gc(1,"div",1),a.gc(2,"div",2),a.gc(3,"h4"),a.dd(4,"Mail Us:"),a.fc(),a.gc(5,"p",3),a.dd(6,"HireSeat Agency Pvt. Ltd. 48 Harding Pl"),a.cc(7,"br"),a.dd(8," Freeport, New York, 11520"),a.fc(),a.gc(9,"p"),a.dd(10,"Phone number:"),a.gc(11,"span"),a.dd(12,"516 729 0271"),a.fc(),a.fc(),a.gc(13,"p"),a.dd(14,"Email address:"),a.gc(15,"span"),a.dd(16,"contact@hireseat.com"),a.fc(),a.fc(),a.fc(),a.gc(17,"div",4),a.gc(18,"h4"),a.dd(19,"Links:"),a.fc(),a.gc(20,"ul"),a.gc(21,"li"),a.gc(22,"a",5),a.dd(23,"Blog"),a.fc(),a.fc(),a.bd(24,s,3,2,"li",6),a.bd(25,f,3,2,"li",6),a.gc(26,"li"),a.gc(27,"a",5),a.dd(28,"Ask a Recruiter "),a.fc(),a.fc(),a.gc(29,"li"),a.gc(30,"a",5),a.dd(31,"Contact Us"),a.fc(),a.fc(),a.fc(),a.fc(),a.gc(32,"div",7),a.gc(33,"h4"),a.dd(34,"Subscribe our Newsletter:"),a.fc(),a.gc(35,"div",8),a.cc(36,"img",9),a.gc(37,"form",10),a.qc("ngSubmit",function(){return t.formSubmit()}),a.cc(38,"input",11),a.bd(39,p,2,0,"div",12),a.gc(40,"button",13),a.dd(41,"Subscribe"),a.fc(),a.fc(),a.fc(),a.fc(),a.fc(),a.gc(42,"div",14),a.gc(43,"a"),a.dd(44,"\xa9 2017 HireSeat, Inc. All rights reserved. Made In NYC"),a.fc(),a.gc(45,"a"),a.dd(46,"Terms and Conditions | Privacy Policy"),a.fc(),a.fc(),a.fc(),a.gc(47,"div",15),a.gc(48,"h4",16),a.dd(49,"Subscription"),a.fc(),a.gc(50,"div",17),a.gc(51,"h4",18),a.dd(52,"Thank you for Subscribing!"),a.fc(),a.fc(),a.gc(53,"div",19),a.gc(54,"div",20),a.gc(55,"button",21),a.qc("click",function(){return t.goHome()}),a.dd(56," Ok "),a.fc(),a.fc(),a.fc(),a.fc()),2&n&&(a.Ob(22),a.Bc("routerLink",a.Fc(7,m)),a.Ob(2),a.Bc("ngIf",!t.isLoggedIn),a.Ob(1),a.Bc("ngIf",!t.isLoggedIn),a.Ob(2),a.Bc("routerLink",a.Fc(8,u)),a.Ob(3),a.Bc("routerLink",a.Fc(9,b)),a.Ob(7),a.Bc("formGroup",t.Email),a.Ob(2),a.Bc("ngIf",t.Email.controls.email.hasError("email")))},directives:[g.f,d.o,r.z,r.q,r.j,r.c,r.p,r.h],styles:["footer.page-footer[_ngcontent-%COMP%]{margin-top:0}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}@media only screen and (min-width:768px) and (max-width:1024px){.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{width:75%!important;margin-right:10px}}@media only screen and (min-width:320px) and (max-width:667px){.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:70px}.msgBox[_ngcontent-%COMP%]{max-height:unset!important;height:auto}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{position:unset;max-height:100%;width:100%}.modal.modal-fixed-footer[_ngcontent-%COMP%]   .modal-footer[_ngcontent-%COMP%]{position:unset;margin:20px 0 0}.terms[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:10px 0 0!important}.center-align[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]{padding:0 18px;height:30px!important;line-height:unset}.row[_ngcontent-%COMP%]   .col.paddxDiv[_ngcontent-%COMP%]{padding:0 .75rem!important}.center-align[_ngcontent-%COMP%]{float:unset;padding-top:5px;padding-right:0;margin-right:0!important}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]{padding:0;height:auto}.modal.modal-fixed-footer.termAndCondition[_ngcontent-%COMP%]   .modal-content[_ngcontent-%COMP%]{padding-bottom:0}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{height:40px!important}.SearchBtn[_ngcontent-%COMP%]{height:40px}}.msgBox[_ngcontent-%COMP%]{max-height:30%;width:30%;top:30%;overflow:hidden}.regMSG[_ngcontent-%COMP%]{font-size:20px!important;font-weight:bolder;overflow:hidden}.msgHead[_ngcontent-%COMP%], .regMSG[_ngcontent-%COMP%]{text-align:center}.msgHead[_ngcontent-%COMP%]{margin-top:20px;color:#3af;font-weight:700}.text-center[_ngcontent-%COMP%]{text-align:center}.choseLabel[_ngcontent-%COMP%]{position:static;width:100%;float:left;transform:unset}"]}),t}()},heAl:function(t,o,i){"use strict";i.r(o),i.d(o,"AllPostModule",function(){return V});var c=i("ofXK"),r=i("tyNb"),a=i("2AXT"),g=i("VITL"),d=i("fXoL"),l=i("jhN1"),s=i("JqCM"),f=i("kWWo"),p=i("MkFp"),m=i("fp1T"),u=i("ZnKM"),b=i("lFQJ");function x(n,t){if(1&n&&(d.gc(0,"div",42),d.cc(1,"img",43),d.fc()),2&n){var e=d.uc().$implicit;d.Ob(1),d.Cc("src",e.featuredImage,d.Vc)}}function h(n,t){if(1&n&&(d.gc(0,"div",42),d.gc(1,"video",44),d.dd(2," Your browser does not support the video tag. "),d.fc(),d.fc()),2&n){var e=d.uc().$implicit;d.Ob(1),d.Bc("src",null==e?null:e.video,d.Vc)}}function O(n,t){if(1&n&&(d.cc(0,"iframe",43),d.vc(1,"safe")),2&n){var e=d.uc(2).$implicit;d.Bc("src",d.wc(1,1,e.embbedded),d.Uc)}}function M(n,t){if(1&n&&(d.gc(0,"div",42),d.bd(1,O,2,3,"iframe",45),d.fc()),2&n){var e=d.uc().$implicit;d.Ob(1),d.Bc("ngIf","null"!=e.embbedded)}}function C(n,t){if(1&n&&(d.gc(0,"span"),d.dd(1),d.fc()),2&n){var e=t.$implicit;d.Ob(1),d.fd("",null==e?null:e.categoryName,", ")}}var P=function(n){return["/blog/",n]},_=function(n){return{"background-color":n}},v=function(n,t){return{catagorytag:n,isnotimg:t}},y=function(n,t){return{isimage:n,isnotimage:t}};function w(n,t){if(1&n&&(d.gc(0,"div",27),d.gc(1,"div",28),d.gc(2,"div",29),d.gc(3,"span",30),d.dd(4),d.fc(),d.bd(5,x,2,1,"div",31),d.bd(6,h,3,1,"div",32),d.bd(7,M,2,1,"div",31),d.gc(8,"div",33),d.gc(9,"h5"),d.dd(10),d.vc(11,"date"),d.fc(),d.gc(12,"h4"),d.gc(13,"a",2),d.dd(14),d.fc(),d.fc(),d.gc(15,"p"),d.dd(16,"Categories:"),d.bd(17,C,2,1,"span",26),d.fc(),d.cc(18,"p",34),d.fc(),d.fc(),d.fc(),d.gc(19,"div",35),d.gc(20,"div",36),d.gc(21,"a",2),d.dd(22,"Read More..."),d.fc(),d.fc(),d.gc(23,"div",37),d.gc(24,"div",38),d.cc(25,"img",39),d.gc(26,"p",40),d.dd(27),d.fc(),d.fc(),d.gc(28,"div",38),d.cc(29,"img",41),d.gc(30,"h5",40),d.dd(31,"by "),d.gc(32,"span"),d.dd(33),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.fc()),2&n){var e=t.$implicit,o=d.uc();d.Ob(2),d.Bc("routerLink",d.Gc(19,P,e.blogurl)),d.Ob(1),d.Bc("ngStyle",d.Gc(21,_,null==e||null==e.categories[0]?null:e.categories[0].colorCode))("ngClass",d.Hc(23,v,e.featuredImage||e.embbedded||(null==e?null:e.video)||""==o.embbedded,!e.featuredImage)),d.Ob(1),d.ed(null==e||null==e.categories[0]?null:e.categories[0].categoryName),d.Ob(1),d.Bc("ngIf",e.featuredImage),d.Ob(1),d.Bc("ngIf",null!=e.video),d.Ob(1),d.Bc("ngIf",e.embbedded),d.Ob(3),d.ed(d.xc(11,16,e.createdAt.substring(0,10),"dd MMM yyyy")),d.Ob(3),d.Bc("routerLink",d.Gc(26,P,e.blogurl)),d.Ob(1),d.ed(e.title),d.Ob(3),d.Bc("ngForOf",e.categories),d.Ob(1),d.Bc("ngClass",d.Hc(28,y,e.featuredImage||e.embbedded||(null==e?null:e.video)||""==o.embbedded,!e.featuredImage))("innerHTML",o.truncateHTML(null==e?null:e.description),d.Tc),d.Ob(3),d.Bc("routerLink",d.Gc(31,P,e.blogurl)),d.Ob(6),d.fd("",null==e||null==e.comment?null:e.comment.length," | Comments"),d.Ob(6),d.ed(null==e||null==e.author?null:e.author.fullName)}}function k(n,t){if(1&n){var e=d.hc();d.gc(0,"button",46),d.qc("click",function(){return d.Sc(e),d.uc().getMoreData()}),d.dd(1,"Read More"),d.fc()}}var B=function(n){return["/blog/categories/",n]};function D(n,t){if(1&n&&(d.gc(0,"span",47),d.gc(1,"a",2),d.dd(2),d.fc(),d.fc()),2&n){var e=t.$implicit;d.Bc("ngStyle",d.Gc(3,_,null==e?null:e.colorCode)),d.Ob(1),d.Bc("routerLink",d.Gc(5,B,e.catslug)),d.Ob(1),d.ed(null==e?null:e.categoryName)}}function I(n,t){if(1&n&&(d.gc(0,"div",49),d.gc(1,"h3"),d.dd(2),d.vc(3,"date"),d.vc(4,"convertFrom24To12Format"),d.fc(),d.gc(5,"p"),d.dd(6),d.fc(),d.gc(7,"p"),d.dd(8),d.fc(),d.fc()),2&n){var e=d.uc().$implicit;d.Ob(2),d.gd("",d.wc(3,5,e.local_date),"\xa0|\xa0",d.wc(4,7,e.local_time)," "),d.Ob(4),d.gd("Venue: ",null==e?null:e.venue.address_1," , ",null==e?null:e.venue.name,""),d.Ob(2),d.ed(null==e?null:e.venue.city)}}function L(n,t){if(1&n&&(d.gc(0,"div"),d.bd(1,I,9,9,"div",48),d.fc()),2&n){var e=t.index;d.Ob(1),d.Bc("ngIf",e<3)}}var S,T,z,F=function(){return["/home/"]},A=function(){return["/blog/"]},H=function(){return{sourceType:"url",url:"https://twitter.com/HireSeat?ref_src=twsrc%5Etfw"}},U=function(){return{tweetLimit:3}},E=[{path:"",component:(S=function(){function t(e,o,i,c){n(this,t),this._blogservice=e,this._Userservice=o,this._sanitizer=i,this.spinner=c,this.colorsArray=["#0aafff","#3cb877","#f26422","#1a6efa","#1a6efa"],this.limit=9}return e(t,[{key:"ngOnInit",value:function(){var n=this;this._Userservice.getmeetup().subscribe(function(t){n.meetUpsData=t}),jQuery(".modal").modal(),this.spinner.show(),this._blogservice.getAllBlogPost(this.limit).subscribe(function(t){n.blogPOstData=t.data,n.viewmore=n.blogPOstData.length%9==0&&n.blogPOstData.length>0},function(t){console.log(t),n.spinner.hide()}),this._blogservice.getBlogCategories().subscribe(function(t){n.categoriesData=t.data,n.spinner.hide()},function(t){console.log(t),n.spinner.hide()})}},{key:"pageCount",value:function(){return this.blogPOstData.length}},{key:"getMoreData",value:function(){var n=this,t=this.pageCount()+9;this._blogservice.getAllBlogPost(t).subscribe(function(t){n.blogPOstData=t.data,n.viewmore=n.blogPOstData.length%9==0&&n.blogPOstData.length>0},function(t){console.log(t),n.spinner.hide()})}},{key:"getColors",value:function(n){var t=this.getnumber(n);return this.colorsArray[t]}},{key:"getnumber",value:function(n){var t=n;return t>this.colorsArray.length-1?(t-=this.colorsArray.length)<this.colorsArray.length?t:void this.getnumber(t):t}},{key:"truncateHTML",value:function(n){return!n||n.length<=500?n:n.replace(/<(?:.|\n)*?>/gm,"").trim().replace(/&nbsp;/g,"").substring(0,500)+"..."}}]),t}(),S.\u0275fac=function(n){return new(n||S)(d.bc(a.a),d.bc(g.a),d.bc(l.b),d.bc(s.c))},S.\u0275cmp=d.Vb({type:S,selectors:[["app-all-blogs"]],decls:46,vars:12,consts:[[1,"headerDiv","text-center","mar0","blogHeader"],[1,"pageHeading"],[3,"routerLink"],[1,"bgLightG"],[1,"container"],[1,"row"],[1,"col","s12","m7","l9","scrollPost"],[1,"row","flexWrap"],["class","blogListMain",4,"ngFor","ngForOf"],[1,"text-center"],["class","btn publishBtn",3,"click",4,"ngIf"],[1,"col","s12","m5","l3"],[1,"catgoryDivBlogs","catgoryDivBlogsCat"],[1,"catagoryList"],[3,"ngStyle",4,"ngFor","ngForOf"],[1,"catgoryDivBlogs"],[1,"boxDiv","tweetscroll"],["data-width","280","data-height","200",3,"data","opts"],[1,"meetupsMain"],[1,"boxDiv"],[1,"meetUpInner"],[1,"MeetUsigleArticle"],[1,"meetUphead"],["src","assets/img/staue.png",1,"staueImg"],[1,"headText"],["src","assets/img/location.png",1,""],[4,"ngFor","ngForOf"],[1,"blogListMain"],[1,"blogDeatialPage"],[1,"SingleBlock",3,"routerLink"],[3,"ngStyle","ngClass"],["class","postimage",4,"ngIf"],["class"," postimage",4,"ngIf"],[1,"postText"],[3,"ngClass","innerHTML"],[1,"postTextInner","postText"],[1,"readMoreDiv","text-right"],[1,"commentSectionMain"],[1,"commentCommonS"],["src","assets/img/commentIcon.png",1,"comentIcon"],[1,"comment"],["src","assets/img/profile.png",1,"profilePic"],[1,"postimage"],[3,"src"],["id","selectedVideo","height","100%","controls","",3,"src"],[3,"src",4,"ngIf"],[1,"btn","publishBtn",3,"click"],[3,"ngStyle"],["class","meetRepeat",4,"ngIf"],[1,"meetRepeat"]],template:function(n,t){1&n&&(d.cc(0,"app-navbar"),d.gc(1,"div",0),d.gc(2,"h4",1),d.dd(3,"HireSeat blog"),d.fc(),d.gc(4,"p"),d.gc(5,"a",2),d.dd(6,"Home"),d.fc(),d.dd(7," \u226b "),d.gc(8,"a",2),d.dd(9," Blog"),d.fc(),d.fc(),d.fc(),d.gc(10,"div",3),d.gc(11,"div",4),d.gc(12,"div",5),d.gc(13,"div",6),d.gc(14,"div",7),d.bd(15,w,34,33,"div",8),d.fc(),d.gc(16,"div",9),d.bd(17,k,2,0,"button",10),d.fc(),d.fc(),d.gc(18,"div",11),d.gc(19,"div",12),d.gc(20,"h5"),d.dd(21,"Library"),d.fc(),d.gc(22,"div",13),d.bd(23,D,3,7,"span",14),d.fc(),d.fc(),d.gc(24,"div",15),d.gc(25,"h5"),d.dd(26,"Recents Tweets"),d.fc(),d.gc(27,"div",16),d.cc(28,"ngx-twitter-timeline",17),d.fc(),d.fc(),d.gc(29,"div",15),d.gc(30,"h5"),d.dd(31,"Recents Meetps"),d.fc(),d.gc(32,"div",18),d.gc(33,"div",19),d.gc(34,"div",20),d.gc(35,"div",21),d.gc(36,"div",22),d.cc(37,"img",23),d.gc(38,"div",24),d.gc(39,"h4"),d.dd(40,"Human Resources Technology and Drinks"),d.fc(),d.gc(41,"p"),d.cc(42,"img",25),d.dd(43," New York City"),d.fc(),d.fc(),d.fc(),d.bd(44,L,2,1,"div",26),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.fc(),d.cc(45,"app-footer")),2&n&&(d.Ob(5),d.Bc("routerLink",d.Fc(8,F)),d.Ob(3),d.Bc("routerLink",d.Fc(9,A)),d.Ob(7),d.Bc("ngForOf",t.blogPOstData),d.Ob(2),d.Bc("ngIf",t.viewmore),d.Ob(6),d.Bc("ngForOf",t.categoriesData),d.Ob(5),d.Bc("data",d.Fc(10,H))("opts",d.Fc(11,U)),d.Ob(16),d.Bc("ngForOf",t.meetUpsData))},directives:[f.a,r.f,c.n,c.o,p.a,m.a,r.d,c.p,c.m],pipes:[c.f,u.a,b.a],styles:[".SingleBlock[_ngcontent-%COMP%]{position:relative}.flexWrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.postTextInner.postText[_ngcontent-%COMP%]{position:absolute;bottom:0;width:100%}.tweetscroll[_ngcontent-%COMP%]{max-height:560px;overflow-y:auto}.postText[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:15px!important;line-height:unset;margin:10px 0!important;font-family:gilroysemibold;color:#6a7683}.postimage[_ngcontent-%COMP%]{width:100%;padding:0;max-height:250px;height:250px;border:none}.blockHead[_ngcontent-%COMP%]{padding:0 10px}.postText[_ngcontent-%COMP%]{padding:15px}.postimage[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%;border:1px solid #ddd;border-radius:0;height:100%;-o-object-fit:cover;object-fit:cover}#selectedVideo[_ngcontent-%COMP%]{width:100%;height:250px}.postText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:20px!important;font-weight:700;margin:10px 0!important;color:#1c2d41!important}.postText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#1c2d41;font-family:gilroybold}.postText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0 0 15px!important;font-size:13px;color:#767a7f;word-break:break-word}.postText[_ngcontent-%COMP%]   p.comment[_ngcontent-%COMP%]{font-size:14px;color:#a8a8a8;margin-top:5px}.readMoreDiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:13px}.pageHeading[_ngcontent-%COMP%]{font-size:50px;font-weight:700;margin:0}.headerDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.headerDiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#fff;font-size:15px}.headerDiv[_ngcontent-%COMP%]{text-align:center;background-color:#6bf;padding:20px 0;margin:0 0 30px;color:#fff}.paginationMain[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{margin:0 2px;border:1px solid #ddd;position:relative}.paginationMain[_ngcontent-%COMP%]   .pagination[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{color:#fff;background-color:#6bf}.paginationMain[_ngcontent-%COMP%]{text-align:right}@media only screen and (min-width:768px) and (max-width:1024px){.headerDiv[_ngcontent-%COMP%]{padding:30px 0!important}.pageHeading[_ngcontent-%COMP%]{font-size:37px!important}}iframe[_ngcontent-%COMP%]{height:250px;width:100%;border:none}.postText[_ngcontent-%COMP%]   .isnotimage[_ngcontent-%COMP%]{display:block}.postText[_ngcontent-%COMP%]   .isimage[_ngcontent-%COMP%]{display:none}.Editdate.date[_ngcontent-%COMP%]{background-color:#ddd;margin:5px 0;font-size:20px;padding:10px 0}.postimage[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{display:inline-block;vertical-align:baseline;background-color:#000}.mar0[_ngcontent-%COMP%]{margin:0}.bgLightG[_ngcontent-%COMP%]{background-color:#f5f5f5;padding:10px 0 20px}.boxDiv[_ngcontent-%COMP%]   .sigleArticle[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:16px}.boxDiv[_ngcontent-%COMP%]   .sigleArticle[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-size:12px!important;color:hsla(0,0%,60%,.6);font-weight:500}.boxDiv[_ngcontent-%COMP%]   .sigleArticle[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0;font-size:15px;color:#6a6a6a;font-weight:500}.catgoryDivBlogs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff}.catgoryDivBlogs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]   .fa[_ngcontent-%COMP%]{color:#fff;margin-right:10px}.catgoryDivBlogs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:hover{cursor:pointer;transform:scale(1.1)}h2[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%]{font-size:20px!important}.catgoryDivBlogs[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{background-color:transparent}.catgoryDivBlogs[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{border-bottom:1px solid #ddd;padding:5px 20px;font-size:18px;position:relative;margin:0 0 10px;background-color:#008af9;transition:.2s}.replyMain[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.replyInner[_ngcontent-%COMP%]{width:calc(100% - 70px)}.userIcon[_ngcontent-%COMP%]{height:55px}.boxDiv[_ngcontent-%COMP%]{min-height:200px;box-shadow:0 0 10px #ddd;padding:10px;background-color:#fff}.catgoryDivBlogs[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:20px;font-weight:700}.meetupsMain[_ngcontent-%COMP%]   .boxDiv[_ngcontent-%COMP%]{max-height:400px;overflow-y:auto}.meetupsMain[_ngcontent-%COMP%]   .boxDiv[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-align:right;display:block;padding:0 15px}.meetupsMain[_ngcontent-%COMP%]   .sigleArticle[_ngcontent-%COMP%]{border-bottom:1px solid #d9d9d9;padding:5px 0 0}.postText[_ngcontent-%COMP%]   .commentSectionMain[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:11px!important;line-height:unset;margin:10px 0!important;font-family:gilroysemibold;color:#6a7683;padding:0 0 0 10px}.postText[_ngcontent-%COMP%]   .commentSectionMain[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-family:gilroybold;color:#1c2d41}.profilePic[_ngcontent-%COMP%]{width:30px;height:30px;border-radius:50%}.commentCommonS[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.postText[_ngcontent-%COMP%]   .commentSectionMain[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px;color:#6e7985;margin:0!important;padding:0 0 0 10px}.comentIcon[_ngcontent-%COMP%]{width:16px}.commentSectionMain[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between}.catagorytag[_ngcontent-%COMP%]{padding:2px 10px;color:#fff;position:absolute;top:0;left:0;font-family:gilroybold;text-transform:uppercase;font-size:12px;margin:14px 15px}.catgoryDivBlogs.catgoryDivBlogsCat[_ngcontent-%COMP%]{background-color:#fff;padding:10px;margin:20px 0 0}.catagoryList[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{margin:5px;padding:2px 10px;color:#fff}.isnotimg[_ngcontent-%COMP%]{font-family:gilroybold;text-transform:uppercase;font-size:12px;color:#fff;padding:2px 10px;margin:14px 15px;display:inline-block}.catagoryList[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap}.catagoryList[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{color:#fff;font-family:gilroybold;text-transform:uppercase;font-size:12px}.blogListMain[_ngcontent-%COMP%]{margin:20px 10px 0;border-bottom:1px solid #ddd;background-color:#fff;box-shadow:0 0 10px hsla(0,0%,60%,.1411764705882353);width:calc(33.33% - 20px);position:relative;padding:0 0 80px}.meetupsMain[_ngcontent-%COMP%]   .boxDiv[_ngcontent-%COMP%]{background-color:transparent}.meetUphead[_ngcontent-%COMP%]{display:flex;align-items:flex-end}.staueImg[_ngcontent-%COMP%]{filter:invert(1);width:40px;margin:0 10px 0 0}.headText[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:20px;font-family:gilroyextrabold;color:#fff;margin:0}.headText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;font-size:15px;color:#c4c5cb;display:flex;align-items:center}.headText[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{filter:invert(2);margin:0 6px 0 0;height:20px}.MeetUsigleArticle[_ngcontent-%COMP%]{padding:20px}.meetRepeat[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:25px;color:#fff;border-bottom:1px solid #fff;display:inline-block;padding:10px 0 20px}.meetRepeat[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;font-size:13px;color:#fff;font-family:gilroyregular}@media only screen and (min-width:320px) and (max-width:1024px){.flexWrap[_ngcontent-%COMP%]{flex-direction:column}.blogListMain[_ngcontent-%COMP%]{margin:20px 10px 0 0;width:100%}.scrollPost[_ngcontent-%COMP%]{max-height:100vh;overflow-y:auto}}@media only screen and (min-width:320px) and (max-width:767px){.pageHeading[_ngcontent-%COMP%]{font-size:30px}.headerDiv[_ngcontent-%COMP%]{padding:10px 0!important}}"]}),S)}],j=((T=function t(){n(this,t)}).\u0275fac=function(n){return new(n||T)},T.\u0275mod=d.Zb({type:T}),T.\u0275inj=d.Yb({imports:[[r.g.forChild(E)],r.g]}),T),R=i("k/VO"),G=i("3Pt+"),N=i("evil"),V=((z=function t(){n(this,t)}).\u0275fac=function(n){return new(n||z)},z.\u0275mod=d.Zb({type:z}),z.\u0275inj=d.Yb({imports:[[c.c,j,R.c,G.k,G.w,N.a,p.b]]}),z)}}])}();