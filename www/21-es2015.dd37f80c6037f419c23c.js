(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{"9nPL":function(e,t,i){"use strict";i.r(t),i.d(t,"SAUserListModule",function(){return M});var n=i("ofXK"),r=i("tyNb"),s=i("wl9n"),c=i("pW6c"),o=i("VITL"),a=i("xgIS"),l=i("lJxs"),d=i("pLZG"),g=i("Kj3r"),u=i("/uUt"),p=i("vkgz"),h=i("fXoL"),f=i("3Pt+"),m=i("oOf3");const b=["searchInputTerm"];function v(e,t){if(1&e){const e=h.gc();h.fc(0,"div",12),h.fc(1,"input",13,14),h.pc("ngModelChange",function(t){return h.Rc(e),h.tc().searchTerm=t}),h.ec(),h.ec()}if(2&e){const e=h.tc();h.Nb(1),h.Ac("ngModel",e.searchTerm)}}function k(e,t){if(1&e){const e=h.gc();h.fc(0,"li",15),h.fc(1,"div",16),h.pc("click",function(){h.Rc(e);const i=t.$implicit;return h.tc().loginUser(i.email)}),h.fc(2,"div",17),h.bc(3,"img",18),h.ec(),h.fc(4,"div",19),h.fc(5,"div",20),h.cd(6),h.ec(),h.fc(7,"div",21),h.cd(8),h.ec(),h.ec(),h.fc(9,"div",22),h.fc(10,"div",23),h.cd(11),h.ec(),h.ec(),h.ec(),h.bc(12,"div",24),h.ec()}if(2&e){const e=t.$implicit;h.Nb(6),h.dd(e.fullName),h.Nb(2),h.dd(e.email),h.Nb(3),h.ed(" ",e.userRole," ")}}function P(e,t){if(1&e){const e=h.gc();h.fc(0,"pagination-controls",25),h.pc("pageChange",function(t){return h.Rc(e),h.tc().handlePaginator(t)}),h.ec()}}function A(e,t){1&e&&(h.fc(0,"div"),h.cd(1," No Results to show "),h.ec())}const C=function(e,t){return{itemsPerPage:e,currentPage:t}},x=[{path:"",component:(()=>{class e{constructor(e,t,i,n){this.superAdmin=e,this.userAuth=t,this.userService=i,this.router=n,this.p=1,this.pagesAre=[1],this.createdAt=null,this.dropdownList=[],this.selectedItems=[],this.userList=[],this.paginatorMove=!0,this.itemsPerPageAre=100,this.noBiddingEvents=!1,this.dropdownSettings={}}ngOnInit(){const e=localStorage.getItem("saTab");this.itemsIs=e||"super-admin",this.getAllUsers({onLoad:!0,user:this.itemsIs,itemsPerPageAre:this.itemsPerPageAre}),jQuery("#"+this.itemsIs).css("background-color","#27B1BD")}ngAfterViewInit(){Object(a.a)(this.searchInputTerm.nativeElement,"keyup").pipe(Object(l.a)(e=>e),Object(d.a)(Boolean),Object(g.a)(1e3),Object(u.a)(),Object(p.a)(e=>{this.p=1,this.userList=[],this.pagesAre=[1],this.paginatorMove=""===this.searchTerm,this.getAllUsers({user:this.itemsIs,searchTerm:this.searchTerm,itemsPerPageAre:this.itemsPerPageAre})})).subscribe()}resetValues(){this.p=1,this.userList=[],this.pagesAre=[1],this.paginatorMove=!0}getAllUsers(e){this.superAdmin.getAllUsers(e).subscribe(t=>{t&&0!==t.length&&(this.userList=[...this.userList,...t],this.createdAt=t[t.length-1].createdAt,this.noBiddingEvents=0===this.userList.length,localStorage.setItem("saTab",e.user))},e=>{console.log(e)})}loginUser(e){"enterprise"!==this.itemsIs&&(localStorage.setItem("super-admin-email",this.userService.getUserData().email),this.userAuth.logoutWithoutNavigate(),this.superAdmin.unSecureLogin({email:e}).subscribe(e=>{e?"employer"==e.userInfo.userRole?this.router.navigate(["employer/dashboard"]):"recruiter"==e.userInfo.userRole?this.router.navigate(["recruiter/dashboard"]):"admin"==e.userInfo.userRole?this.router.navigate(["user-list"]):"super-admin"==e.userInfo.userRole?this.router.navigate(["super-admin/user-list"]):"enterprise"==e.userInfo.userRole?this.router.navigate(["enterprise/user-list"]):"candidate"==e.userInfo.userRole&&this.router.navigate(["candidate/all-recruiters"]):Materialize.toast("Enter valid details",1e3,"rounded")},e=>{console.log(e)}))}handlePaginator(e){this.p=e,this.paginatorMove&&-1===this.pagesAre.indexOf(e)&&(this.pagesAre.push(e),this.getAllUsers({user:this.itemsIs,createdAt:this.createdAt,itemsPerPageAre:this.itemsPerPageAre}))}checkUser(e){this.addProperties(e),this.resetValues(),this.getAllUsers({user:e,onLoad:!0,itemsPerPageAre:this.itemsPerPageAre})}addProperties(e){jQuery("#"+this.itemsIs).css("background-color","#33aaff"),this.itemsIs=e,jQuery("#"+e).css("background-color","#27B1BD")}}return e.\u0275fac=function(t){return new(t||e)(h.ac(s.a),h.ac(c.a),h.ac(o.a),h.ac(r.c))},e.\u0275cmp=h.Ub({type:e,selectors:[["app-sa-user-list"]],viewQuery:function(e,t){if(1&e&&h.gd(b,1),2&e){let e;h.Nc(e=h.qc())&&(t.searchInputTerm=e.first)}},decls:22,vars:16,consts:[[1,"tabs"],["id","super-admin",1,"tablink",3,"ngClass","click"],["id","admin",1,"tablink",3,"ngClass","click"],["id","recruiter",1,"tablink",3,"ngClass","click"],["id","employer",1,"tablink",3,"ngClass","click"],["id","candidate",1,"tablink",3,"ngClass","click"],["id","enterprise",1,"tablink",3,"ngClass","click"],["class","inputDivMainN",4,"ngIf"],["id","bidding-event-list",2,"margin-top","8px"],["style","cursor:pointer;",4,"ngFor","ngForOf"],[3,"pageChange",4,"ngIf"],[4,"ngIf"],[1,"inputDivMainN"],["type","text","id","searchText","placeholder","Search here...",3,"ngModel","ngModelChange"],["searchInputTerm",""],[2,"cursor","pointer"],[1,"bid-event-item",2,"padding","15px",3,"click"],[2,"display","inline-block","width","12%","heigth","auto","vertical-align","top"],["src","../../../assets/img/employee.png",1,"responsive-img",2,"width","100%","opacity","0.2","padding","15px"],[2,"display","inline-block","width","50%","height","auto","padding-left","15px","vertical-align","top"],[1,"job-title"],[1,"company-name"],[1,"BtnDivBuilding",2,"display","inline-block","width","50%","float","right","vertical-align","top","text-align","right"],[1,"chip","active-bidding-event",2,"display","inline-block","vertical-align","top"],[1,"divider"],[3,"pageChange"]],template:function(e,t){1&e&&(h.fc(0,"div"),h.fc(1,"div"),h.fc(2,"ul",0),h.fc(3,"li",1),h.pc("click",function(){return t.checkUser("super-admin")}),h.cd(4,"Super-admin"),h.ec(),h.fc(5,"li",2),h.pc("click",function(){return t.checkUser("admin")}),h.cd(6," Admin"),h.ec(),h.fc(7,"li",3),h.pc("click",function(){return t.checkUser("recruiter")}),h.cd(8,"Recruiter"),h.ec(),h.fc(9,"li",4),h.pc("click",function(){return t.checkUser("employer")}),h.cd(10,"Employer"),h.ec(),h.fc(11,"li",5),h.pc("click",function(){return t.checkUser("candidate")}),h.cd(12,"Candidates"),h.ec(),h.fc(13,"li",6),h.pc("click",function(){return t.checkUser("enterprise")}),h.cd(14,"Enterprise"),h.ec(),h.ec(),h.ec(),h.ad(15,v,3,1,"div",7),h.fc(16,"div"),h.fc(17,"ul",8),h.ad(18,k,13,3,"li",9),h.uc(19,"paginate"),h.ec(),h.ad(20,P,1,0,"pagination-controls",10),h.ec(),h.ad(21,A,2,0,"div",11),h.ec()),2&e&&(h.Nb(3),h.Ac("ngClass","super-admin"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngClass","admin"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngClass","recruiter"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngClass","employer"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngClass","candidate"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngClass","enterprise"===t.itemsIs&&"tablinkActive"),h.Nb(2),h.Ac("ngIf",!t.noBiddingEvents),h.Nb(3),h.Ac("ngForOf",h.wc(19,10,t.userList,h.Gc(13,C,t.itemsPerPageAre,t.p))),h.Nb(2),h.Ac("ngIf",!t.noBiddingEvents),h.Nb(1),h.Ac("ngIf",t.noBiddingEvents))},directives:[n.m,n.o,n.n,f.c,f.p,f.r,m.c],pipes:[m.b],styles:["#bidding-event-list[_ngcontent-%COMP%]{margin:.5rem 0 1rem;border:1px solid #e0e0e0;border-radius:2px}.bid-event-item[_ngcontent-%COMP%]:hover{background-color:#e9f4ff}.bid-event-item[_ngcontent-%COMP%]{transition:all .1s ease-in;background-color:#fff;display:flex;align-items:center;justify-content:space-between}.active-bidding-event[_ngcontent-%COMP%]{background-color:#3af;color:#fff}.scheduled-bidding-event[_ngcontent-%COMP%]{background-color:#b3e5fc;color:#546e7a}.expired-bidding-event[_ngcontent-%COMP%], .reward[_ngcontent-%COMP%]{background-color:#cfd8dc;color:#546e7a}.job-title[_ngcontent-%COMP%]{font-size:20px;color:#37474f;color:#148;font-weight:700}.company-name[_ngcontent-%COMP%]{font-size:16px;color:#333}@media only screen and (min-width:320px) and (max-width:667px){.chip[_ngcontent-%COMP%]{margin-right:0!important;display:flex!important;justify-content:center}.BtnDivBuilding[_ngcontent-%COMP%]{width:25%!important}}.inputDivMainN[_ngcontent-%COMP%]{top:10px;z-index:999;text-align:center;box-sizing:border-box;border-radius:5px}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{border:1px solid #ddd;width:100%;padding:0 70px 0 10px}.inputDivMainN[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], .selectUser[_ngcontent-%COMP%]{margin:0;color:#000;box-sizing:border-box;background-color:#fff;text-align:left}.selectUser[_ngcontent-%COMP%]{padding-right:0}.tablink[_ngcontent-%COMP%]{background-color:#fff!important;color:#3af!important;border-bottom:1px solid #3af!important;float:left;border:none;outline:none;cursor:pointer;font-size:16px;width:16%;z-index:1;height:40px;text-align:center;padding-top:8px;position:relative;margin-bottom:10px}.tablink[_ngcontent-%COMP%]:hover, .tablinkActive[_ngcontent-%COMP%]{background-color:#3af!important;color:#fff!important;box-shadow:0 3px 5px rgba(0,0,0,.2784313725490196)}.tabcontent[_ngcontent-%COMP%]{color:#fff;display:none;padding:100px 20px;height:100%}#Home[_ngcontent-%COMP%]{background-color:red}#News[_ngcontent-%COMP%]{background-color:green}#Contact[_ngcontent-%COMP%]{background-color:#00f}#About[_ngcontent-%COMP%]{background-color:orange}.tabs[_ngcontent-%COMP%]{width:100%;display:flex;justify-content:space-evenly}"]}),e})()}];let I=(()=>{class e{}return e.\u0275mod=h.Yb({type:e}),e.\u0275inj=h.Xb({factory:function(t){return new(t||e)},imports:[[r.g.forChild(x)],r.g]}),e})(),M=(()=>{class e{}return e.\u0275mod=h.Yb({type:e}),e.\u0275inj=h.Xb({factory:function(t){return new(t||e)},imports:[[n.c,I,f.k,f.w,m.a]]}),e})()},wl9n:function(e,t,i){"use strict";i.d(t,"a",function(){return o});var n=i("lJxs"),r=i("WDNW"),s=i("fXoL"),c=i("tk/3");let o=(()=>{class e{constructor(e){this.http=e}getAllUsers(e){return this.http.post(r.a+"api/all-users",e).pipe(Object(n.a)(e=>e))}unSecureLogin(e){return this.http.post(r.a+"api/unsecure-login",e).pipe(Object(n.a)(e=>(localStorage.setItem("currentUser",JSON.stringify({userInfo:e.userInfo,token:e.auth})),e)))}checkSuperAdminEmail(){return null!=localStorage.getItem("super-admin-email")}}return e.\u0275fac=function(t){return new(t||e)(s.mc(c.b))},e.\u0275prov=s.Wb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})()}}]);