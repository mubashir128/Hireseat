(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{abRS:function(n,l,e){"use strict";e.d(l,"a",(function(){return a})),e.d(l,"b",(function(){return b}));var t=e("8Y7J"),u=e("xkgV"),i=e("SVse"),a=t["\u0275crt"]({encapsulation:2,styles:["\n.ngx-pagination {\n  margin-left: 0;\n  margin-bottom: 1rem; }\n  .ngx-pagination::before, .ngx-pagination::after {\n    content: ' ';\n    display: table; }\n  .ngx-pagination::after {\n    clear: both; }\n  .ngx-pagination li {\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    margin-right: 0.0625rem;\n    border-radius: 0; }\n  .ngx-pagination li {\n    display: inline-block; }\n  .ngx-pagination a,\n  .ngx-pagination button {\n    color: #0a0a0a; \n    display: block;\n    padding: 0.1875rem 0.625rem;\n    border-radius: 0; }\n    .ngx-pagination a:hover,\n    .ngx-pagination button:hover {\n      background: #e6e6e6; }\n  .ngx-pagination .current {\n    padding: 0.1875rem 0.625rem;\n    background: #2199e8;\n    color: #fefefe;\n    cursor: default; }\n  .ngx-pagination .disabled {\n    padding: 0.1875rem 0.625rem;\n    color: #cacaca;\n    cursor: default; } \n    .ngx-pagination .disabled:hover {\n      background: transparent; }\n  .ngx-pagination a, .ngx-pagination button {\n    cursor: pointer; }\n\n.ngx-pagination .pagination-previous a::before,\n.ngx-pagination .pagination-previous.disabled::before { \n  content: '\xab';\n  display: inline-block;\n  margin-right: 0.5rem; }\n\n.ngx-pagination .pagination-next a::after,\n.ngx-pagination .pagination-next.disabled::after {\n  content: '\xbb';\n  display: inline-block;\n  margin-left: 0.5rem; }\n\n.ngx-pagination .show-for-sr {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0); }\n.ngx-pagination .small-screen {\n  display: none; }\n@media screen and (max-width: 601px) {\n  .ngx-pagination.responsive .small-screen {\n    display: inline-block; } \n  .ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next) {\n    display: none; }\n}\n  "],data:{}});function r(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"a",[["tabindex","0"]],[[1,"aria-label",0]],[[null,"keyup.enter"],[null,"click"]],(function(n,l,e){var u=!0;return"keyup.enter"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).previous()&&u),"click"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).previous()&&u),u}),null,null)),(n()(),t["\u0275ted"](1,null,[" "," "])),(n()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["",""]))],null,(function(n,l){var e=l.component;n(l,0,0,e.previousLabel+" "+e.screenReaderPageLabel),n(l,1,0,e.previousLabel),n(l,3,0,e.screenReaderPageLabel)}))}function o(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,[" "," "])),(n()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["",""]))],null,(function(n,l){var e=l.component;n(l,1,0,e.previousLabel),n(l,3,0,e.screenReaderPageLabel)}))}function s(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"li",[["class","pagination-previous"]],[[2,"disabled",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,r)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,o)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,1<t["\u0275nov"](l.parent.parent,1).getCurrent()),n(l,4,0,t["\u0275nov"](l.parent.parent,1).isFirstPage())}),(function(n,l){n(l,0,0,t["\u0275nov"](l.parent.parent,1).isFirstPage())}))}function d(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"a",[["tabindex","0"]],null,[[null,"keyup.enter"],[null,"click"]],(function(n,l,e){var u=!0;return"keyup.enter"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).setCurrent(n.parent.context.$implicit.value)&&u),"click"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).setCurrent(n.parent.context.$implicit.value)&&u),u}),null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,[""," "])),(n()(),t["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],null,(function(n,l){n(l,2,0,l.component.screenReaderPageLabel),n(l,4,0,l.parent.context.$implicit.label)}))}function p(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,null,null,null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](2,null,[""," "])),(n()(),t["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,["",""]))],null,(function(n,l){n(l,2,0,l.component.screenReaderCurrentLabel),n(l,4,0,l.parent.context.$implicit.label)}))}function c(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"li",[],[[2,"current",null],[2,"ellipsis",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,d)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,p)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,t["\u0275nov"](l.parent.parent,1).getCurrent()!==l.context.$implicit.value),n(l,4,0,t["\u0275nov"](l.parent.parent,1).getCurrent()===l.context.$implicit.value)}),(function(n,l){n(l,0,0,t["\u0275nov"](l.parent.parent,1).getCurrent()===l.context.$implicit.value,"..."===l.context.$implicit.label)}))}function g(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"a",[["tabindex","0"]],[[1,"aria-label",0]],[[null,"keyup.enter"],[null,"click"]],(function(n,l,e){var u=!0;return"keyup.enter"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).next()&&u),"click"===l&&(u=!1!==t["\u0275nov"](n.parent.parent.parent,1).next()&&u),u}),null,null)),(n()(),t["\u0275ted"](1,null,[" "," "])),(n()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["",""]))],null,(function(n,l){var e=l.component;n(l,0,0,e.nextLabel+" "+e.screenReaderPageLabel),n(l,1,0,e.nextLabel),n(l,3,0,e.screenReaderPageLabel)}))}function f(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(n()(),t["\u0275ted"](1,null,[" "," "])),(n()(),t["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(n()(),t["\u0275ted"](3,null,["",""]))],null,(function(n,l){var e=l.component;n(l,1,0,e.nextLabel),n(l,3,0,e.screenReaderPageLabel)}))}function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"li",[["class","pagination-next"]],[[2,"disabled",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,g)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,f)),t["\u0275did"](4,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){n(l,2,0,!t["\u0275nov"](l.parent.parent,1).isLastPage()),n(l,4,0,t["\u0275nov"](l.parent.parent,1).isLastPage())}),(function(n,l){n(l,0,0,t["\u0275nov"](l.parent.parent,1).isLastPage())}))}function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,8,"ul",[["class","ngx-pagination"],["role","navigation"]],[[1,"aria-label",0],[2,"responsive",null]],null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,s)),t["\u0275did"](2,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275eld"](3,0,null,null,1,"li",[["class","small-screen"]],null,null,null,null,null)),(n()(),t["\u0275ted"](4,null,[" "," / "," "])),(n()(),t["\u0275and"](16777216,null,null,1,null,c)),t["\u0275did"](6,278528,null,0,i.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,m)),t["\u0275did"](8,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0,e.directionLinks),n(l,6,0,t["\u0275nov"](l.parent,1).pages),n(l,8,0,e.directionLinks)}),(function(n,l){var e=l.component;n(l,0,0,e.screenReaderPaginationLabel,e.responsive),n(l,4,0,t["\u0275nov"](l.parent,1).getCurrent(),t["\u0275nov"](l.parent,1).getLastPage())}))}function b(n){return t["\u0275vid"](2,[(n()(),t["\u0275eld"](0,0,null,null,3,"pagination-template",[],null,[[null,"pageChange"]],(function(n,l,e){var t=!0;return"pageChange"===l&&(t=!1!==n.component.pageChange.emit(e)&&t),t}),null,null)),t["\u0275did"](1,737280,[["p",4]],0,u.d,[u.e,t.ChangeDetectorRef],{id:[0,"id"],maxSize:[1,"maxSize"]},{pageChange:"pageChange"}),(n()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](3,16384,null,0,i.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,1,0,e.id,e.maxSize),n(l,3,0,!(e.autoHide&&t["\u0275nov"](l,1).pages.length<=1))}),null)}},izWZ:function(n,l,e){"use strict";e.d(l,"a",(function(){return r}));var t=e("lJxs"),u=e("WDNW"),i=e("8Y7J"),a=e("IheW");let r=(()=>{class n{constructor(n){this.http=n}getAllEnterpriseUsers(){return this.http.get(u.a+"api/all-enterprise-users").pipe(Object(t.a)(n=>n))}unSecureEnterpriseEmployerLogin(n){return this.http.post(u.a+"api/unsecure-enterprise-login",n).pipe(Object(t.a)(n=>(localStorage.setItem("currentUser",JSON.stringify({userInfo:n.userInfo,token:n.auth})),n)))}checkEnterpriseEmail(){return null!=localStorage.getItem("enterprise-email")}}return n.ngInjectableDef=i["\u0275\u0275defineInjectable"]({factory:function(){return new n(i["\u0275\u0275inject"](a.c))},token:n,providedIn:"root"}),n})()},t4mg:function(n,l,e){"use strict";e.r(l),e.d(l,"EnterpriseUserListModuleNgFactory",(function(){return y}));var t=e("8Y7J");class u{}var i=e("pMnS"),a=e("SVse"),r=e("xkgV"),o=e("abRS"),s=e("pW6c"),d=e("VITL"),p=e("izWZ");class c{constructor(n,l,e,t){this.enterprise=n,this.userAuth=l,this.userService=e,this.router=t,this.noBiddingEvents=!0}ngOnInit(){this.getAllUsers()}getAllUsers(){this.enterprise.getAllEnterpriseUsers().subscribe(n=>{n?(this.noBiddingEvents=!1,console.log(n),this.userList=n):(this.noBiddingEvents=!0,console.log("no data received"))},n=>{console.log(n)})}loginUser(n){localStorage.setItem("enterprise-email",this.userService.getUserData().email),this.userAuth.logoutWithoutNavigate(),this.enterprise.unSecureEnterpriseEmployerLogin({email:n}).subscribe(n=>{n?"employer"==n.userInfo.userRole?this.router.navigate(["employer/bidding-event-list"]):"recruiter"==n.userInfo.userRole?this.router.navigate(["recruiter/bidding-event-list"]):"enterprise"==n.userInfo.userRole&&this.router.navigate(["enterprise/user-list"]):Materialize.toast("Enter valid details",1e3,"rounded")},n=>{console.log(n)})}}var g=e("iInd"),f=t["\u0275crt"]({encapsulation:0,styles:[["#bidding-event-list[_ngcontent-%COMP%]{margin:.5rem 0 1rem;border:1px solid #e0e0e0;border-radius:2px}.bid-event-item[_ngcontent-%COMP%]:hover{background-color:#e9f4ff}.bid-event-item[_ngcontent-%COMP%]{transition:all .1s ease-in;background-color:#fff;display:flex;align-items:center;justify-content:space-between}.active-bidding-event[_ngcontent-%COMP%]{background-color:#3af;color:#fff}.scheduled-bidding-event[_ngcontent-%COMP%]{background-color:#b3e5fc;color:#546e7a}.expired-bidding-event[_ngcontent-%COMP%], .reward[_ngcontent-%COMP%]{background-color:#cfd8dc;color:#546e7a}.job-title[_ngcontent-%COMP%]{font-size:20px;color:#148;font-weight:700}.company-name[_ngcontent-%COMP%]{font-size:16px;color:#333}@media only screen and (min-width:320px) and (max-width:667px){.chip[_ngcontent-%COMP%]{margin-right:0!important;display:flex!important;justify-content:center}.BtnDivBuilding[_ngcontent-%COMP%]{width:25%!important}}"]],data:{}});function m(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,12,"li",[["style","cursor:pointer;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,10,"div",[["class","bid-event-item"],["style","padding:15px;"]],null,[[null,"click"]],(function(n,l,e){var t=!0;return"click"===l&&(t=!1!==n.component.loginUser(n.context.$implicit.email)&&t),t}),null,null)),(n()(),t["\u0275eld"](2,0,null,null,1,"div",[["style","display:inline-block; width:12%; height:auto; vertical-align:top;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](3,0,null,null,0,"img",[["class","responsive-img"],["src","../../../assets/img/employee.png"],["style","width:100%;opacity:0.2;padding:15px;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](4,0,null,null,4,"div",[["style","display:inline-block;width:50%;height:auto;padding-left:15px;vertical-align:top;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](5,0,null,null,1,"div",[["class","job-title"]],null,null,null,null,null)),(n()(),t["\u0275ted"](6,null,["",""])),(n()(),t["\u0275eld"](7,0,null,null,1,"div",[["class","company-name"]],null,null,null,null,null)),(n()(),t["\u0275ted"](8,null,["",""])),(n()(),t["\u0275eld"](9,0,null,null,2,"div",[["class","BtnDivBuilding"],["style","display:inline-block;width:50%; float:right;vertical-align:top;text-align:right;"]],null,null,null,null,null)),(n()(),t["\u0275eld"](10,0,null,null,1,"div",[["class","chip active-bidding-event"],["style","display:inline-block; vertical-align:top;"]],null,null,null,null,null)),(n()(),t["\u0275ted"](11,null,[" "," "])),(n()(),t["\u0275eld"](12,0,null,null,0,"div",[["class","divider"]],null,null,null,null,null))],null,(function(n,l){n(l,6,0,l.context.$implicit.fullName),n(l,8,0,l.context.$implicit.email),n(l,11,0,l.context.$implicit.userRole)}))}function v(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(n()(),t["\u0275eld"](1,0,null,null,4,"ul",[["id","bidding-event-list"],["style","margin-top:8px;"]],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,3,null,m)),t["\u0275did"](3,278528,null,0,a.NgForOf,[t.ViewContainerRef,t.TemplateRef,t.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),t["\u0275pod"](4,{itemsPerPage:0,currentPage:1}),t["\u0275pid"](0,r.b,[r.e]),(n()(),t["\u0275eld"](6,0,null,null,1,"pagination-controls",[],null,[[null,"pageChange"]],(function(n,l,e){var t=!0;return"pageChange"===l&&(t=!1!==(n.component.p=e)&&t),t}),o.b,o.a)),t["\u0275did"](7,49152,null,0,r.c,[],null,{pageChange:"pageChange"})],(function(n,l){var e=l.component,u=t["\u0275unv"](l,3,0,t["\u0275nov"](l,5).transform(e.userList,n(l,4,0,5,e.p)));n(l,3,0,u)}),null)}function b(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(n()(),t["\u0275ted"](-1,null,[" No Results to show "]))],null,null)}function h(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,4,"div",[],null,null,null,null,null)),(n()(),t["\u0275and"](16777216,null,null,1,null,v)),t["\u0275did"](2,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null),(n()(),t["\u0275and"](16777216,null,null,1,null,b)),t["\u0275did"](4,16384,null,0,a.NgIf,[t.ViewContainerRef,t.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(n,l){var e=l.component;n(l,2,0,!e.noBiddingEvents),n(l,4,0,e.noBiddingEvents)}),null)}function x(n){return t["\u0275vid"](0,[(n()(),t["\u0275eld"](0,0,null,null,1,"app-enterprise-user-list",[],null,null,null,h,f)),t["\u0275did"](1,114688,null,0,c,[p.a,s.a,d.a,g.l],null,null)],(function(n,l){n(l,1,0)}),null)}var I=t["\u0275ccf"]("app-enterprise-user-list",c,x,{},{},[]),C=e("s7LF");class R{}var y=t["\u0275cmf"](u,[],(function(n){return t["\u0275mod"]([t["\u0275mpd"](512,t.ComponentFactoryResolver,t["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,I]],[3,t.ComponentFactoryResolver],t.NgModuleRef]),t["\u0275mpd"](4608,a.NgLocalization,a.NgLocaleLocalization,[t.LOCALE_ID,[2,a["\u0275angular_packages_common_common_a"]]]),t["\u0275mpd"](4608,r.e,r.e,[]),t["\u0275mpd"](4608,C["\u0275angular_packages_forms_forms_o"],C["\u0275angular_packages_forms_forms_o"],[]),t["\u0275mpd"](4608,C.FormBuilder,C.FormBuilder,[]),t["\u0275mpd"](1073742336,a.CommonModule,a.CommonModule,[]),t["\u0275mpd"](1073742336,g.p,g.p,[[2,g.u],[2,g.l]]),t["\u0275mpd"](1073742336,R,R,[]),t["\u0275mpd"](1073742336,r.a,r.a,[]),t["\u0275mpd"](1073742336,C["\u0275angular_packages_forms_forms_d"],C["\u0275angular_packages_forms_forms_d"],[]),t["\u0275mpd"](1073742336,C.FormsModule,C.FormsModule,[]),t["\u0275mpd"](1073742336,C.ReactiveFormsModule,C.ReactiveFormsModule,[]),t["\u0275mpd"](1073742336,u,u,[]),t["\u0275mpd"](1024,g.j,(function(){return[[{path:"",component:c}]]}),[])])}))}}]);