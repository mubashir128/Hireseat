(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{W0oT:function(l,n,e){"use strict";e.r(n),e.d(n,"ViewForumModuleNgFactory",(function(){return el}));var u=e("8Y7J");class t{}var i=e("pMnS"),a=e("e36M"),o=e("s7LF"),r=e("SVse"),s=e("abRS"),d=e("xkgV"),c=e("iInd");class p{transform(l,n,e){if(!n)return l;if(!Array.isArray(l))return l;if(n&&Array.isArray(l)){let u=Object.keys(n);return l.filter(e?l=>u.reduce((e,u)=>e&&new RegExp(n[u],"gi").test(l[u])||""==n[u],!0):l=>u.some(e=>new RegExp(n[e],"gi").test(l[e])||""==n[e]))}}}var g=e("/9oy"),m=e("kWWo"),f=e("VITL"),v=e("pW6c"),h=e("wl9n"),C=e("CREj"),b=e("6XJ1"),w=e("mlDl"),I=e("izWZ"),P=e("mtpA"),A=e("oPde"),k=e("zIDM"),R=e("HbsC"),x=e("JbYw"),y=e("ScWD"),D=e("1haT"),_=e("fp1T"),N=e("mrSG"),F=e("XNiG");class L{constructor(l,n,e,u,t,i,a,r){this._forum=l,this.formBuilder=n,this.userService=e,this.router=u,this.authService=t,this.supperAdmin=i,this._interactComp=a,this._socket=r,this.questData=[],this.p=1,this.p2=1,this.itemsAre=[1],this.itemsAnswerAre=[1],this.itemsPerPage=10,this.itemsPerAnswerPage=10,this.paginatorMove=!0,this.isLoggedIn=!1,this.isEmployer=!1,this.isRecruiter=!1,this.isAdmin=!1,this.isSuperAdmin=!1,this.getAnswerData=[],this.submitted=!1,this.data=[this.questData,this.postAns],this.answerClick=!1,this.show=!1,this.getQuestion="addQuestion",this.questionObserver=new F.a,this.questionObserver$=this.questionObserver.asObservable(),this.loggedInUser=this.userService.getUserData(),"no"!=this.loggedInUser&&(this.isLoggedIn=!0,"employer"==this.loggedInUser.userRole?this.isEmployer=!0:"recruiter"==this.loggedInUser.userRole?this.isRecruiter=!0:"admin"==this.loggedInUser.userRole?this.isAdmin=!0:"super-admin"==this.loggedInUser.userRole&&(this.isSuperAdmin=!0)),this.postAnswer=this.formBuilder.group({answerPost:this.formBuilder.control("",[o.Validators.required])}),this.searchQues=this.formBuilder.group({question:this.formBuilder.control("",[o.Validators.required])}),this.postAnsw=this.formBuilder.group({postAnsw1:this.formBuilder.control("",[o.Validators.required])}),this._interactComp.interact$.subscribe(l=>{this.loadDataForQuestions(l)})}ngOnInit(){return Object(N.a)(this,void 0,void 0,(function*(){let l=JSON.parse(localStorage.getItem("currentUser"));null!==l&&(yield this.initSocket(l.token,l.userInfo.userRole)),yield this._socket.removeListener({type:2}),this._socket.addListener({type:2,callback:this.questionObserver}),this.questionObserver$.subscribe(l=>{this.handleQuestions(l)}),this.loadDataFromStorage(),jQuery(".modal").modal(),this.getLimitedQuestions({onLoad:!0,itemsPerPage:this.itemsPerPage}),this.getQuestionsAndAnswers({onLoad:!0,limit:this.itemsPerAnswerPage}),this.currUserData=this._forum.getUserId();let n=JSON.parse(this.currUserData);null!==n&&(this.curerntUserId=n.userInfo._id,this.curerntUserName=n.userInfo.fullName)}))}initSocket(l,n){return Object(N.a)(this,void 0,void 0,(function*(){yield this._socket.getInstance(l,n)}))}handleQuestions(l){switch(l.subType){case this.getQuestion:this.questData.unshift(l.result)}}getLimitedQuestions(l){this._forum.getLimitedQuestions(l).subscribe(l=>{this.paginatorMove=!0,this.loadDataFromStorage(),0!==l.length&&(this.questData=[...this.questData,...l],this.createdAt=l[l.length-1].createdAt)},l=>{console.log(l)})}getQuestionsAndAnswers(l){this._forum.getAnswerData(l).subscribe(l=>{0!==l.length&&(this.getAnswerData=[...this.getAnswerData,...l],this.createdAtAnswer=l[l.length-1].createdAt)},l=>{console.log(l)})}loadDataFromStorage(){let l=this.userService.getaskQuesUserId();this.askusersData=JSON.parse(l)}loadDataForQuestions(l){this.questData.unshift(l)}answerPopup(){jQuery("#answermsdPop").modal("open")}closeanswerPopup(){jQuery("#answermsdPop").modal("close")}showAnsDiv(l){let n=jQuery(".questionDivTextReply#"+l);"none"!==n.css("display")?n.css("display","none"):n.css("display","block")}textChanges(l){""==l.question&&(this.p=1,this.itemsAre=[1],this.questData=[],this.getLimitedQuestions({onLoad:!0,itemsPerPage:this.itemsPerPage}))}searchQuesData(l){this.paginatorMove=!1,this._forum.searchQuestionData(l).subscribe(l=>{this.questData=l.data},l=>{console.log(l)})}callback(l){var n=l.slice(0,19).replace("T"," "),e=new Date,u=e.getUTCFullYear()+"-"+(e.getUTCMonth()+1)+"-"+e.getUTCDate()+" "+e.getUTCHours()+":"+e.getUTCMinutes()+":"+e.getUTCSeconds();let t=new Date(n),i=new Date(u)-t,a=Math.floor(i/864e5),o=Math.floor(i%864e5/36e5),r=Math.round(i%864e5%36e5/6e4);return a>0&&o<24&&r<60?a+" days":a<1&&o>0?o+" hours ":a<1&&o<24&&r<60?r+" minutes ":void 0}postAns(l,n,e){this._forum.addAnserData({ans:l.answerPost,quesUserId:n,answerBy:this.curerntUserId,answerByName:this.curerntUserName,answercount:e}).subscribe(l=>{this.msgForPopup=l.message,this.answerPopup(),jQuery("#"+n).css("display","none"),setTimeout(()=>{this.closeanswerPopup()},2e3)},l=>{console.log(l)})}handleAnswerPost(l){jQuery(jQuery(l.target)).parent().find("button[id='postAnswerBtn']").prop("disabled",""===l.target.value)}handlePaginator(l){this.p=l,this.paginatorMove&&(this.itemsAre.includes(l)||(this.itemsAre.push(l),this.getLimitedQuestions({createdAt:this.createdAt,itemsPerPage:this.itemsPerPage})))}handleAnswerPaginator(l){this.p2=l,this.itemsAnswerAre.includes(l)||(this.itemsAnswerAre.push(l),this.getQuestionsAndAnswers({limit:this.itemsPerAnswerPage,createdAt:this.createdAtAnswer}))}}var S=u["\u0275crt"]({encapsulation:0,styles:[a.a],data:{}});function T(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,11,"div",[["class","forumQustionBlock forumQustionCommonBlock"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,10,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==u["\u0275nov"](l,3).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,3).onReset()&&t),t}),null,null)),u["\u0275did"](2,16384,null,0,o["\u0275angular_packages_forms_forms_z"],[],null,null),u["\u0275did"](3,540672,null,0,o.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),u["\u0275prd"](2048,null,o.ControlContainer,null,[o.FormGroupDirective]),u["\u0275did"](5,16384,null,0,o.NgControlStatusGroup,[[4,o.ControlContainer]],null,null),(l()(),u["\u0275eld"](6,0,null,null,2,"div",[["class","headDiv"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Your question"])),(l()(),u["\u0275eld"](9,0,null,null,2,"div",[["class","questionDivText"]],null,null,null,null,null)),(l()(),u["\u0275eld"](10,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](11,null,["",""]))],(function(l,n){l(n,3,0,n.component.postAnsw)}),(function(l,n){l(n,1,0,u["\u0275nov"](n,5).ngClassUntouched,u["\u0275nov"](n,5).ngClassTouched,u["\u0275nov"](n,5).ngClassPristine,u["\u0275nov"](n,5).ngClassDirty,u["\u0275nov"](n,5).ngClassValid,u["\u0275nov"](n,5).ngClassInvalid,u["\u0275nov"](n,5).ngClassPending),l(n,11,0,n.parent.context.$implicit.question)}))}function q(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,T)),u["\u0275did"](2,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,2,0,n.context.$implicit.questionById==e.askusersData._id&&!e.isLoggedIn)}),null)}function O(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"pagination-controls",[],null,[[null,"pageChange"]],(function(l,n,e){var u=!0;return"pageChange"===n&&(u=!1!==l.component.handlePaginator(e)&&u),u}),s.b,s.a)),u["\u0275did"](2,49152,null,0,d.c,[],null,{pageChange:"pageChange"})],null,null)}function V(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,6,"div",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,3,null,q)),u["\u0275did"](2,278528,null,0,r.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),u["\u0275pod"](3,{itemsPerPage:0,currentPage:1}),u["\u0275pid"](0,d.b,[d.e]),(l()(),u["\u0275and"](16777216,null,null,1,null,O)),u["\u0275did"](6,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component,t=u["\u0275unv"](n,2,0,u["\u0275nov"](n,4).transform(e.questData,l(n,3,0,e.itemsPerPage,e.p)));l(n,2,0,t),l(n,6,0,!e.isLoggedIn)}),null)}function U(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-star yellowStar"]],null,null,null,null,null))],null,null)}function M(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"div",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Answer is required*"]))],null,null)}function Q(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,29,"li",[["class","forumQustionBlock forumQustionCommonBlock"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,28,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==u["\u0275nov"](l,3).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,3).onReset()&&t),t}),null,null)),u["\u0275did"](2,16384,null,0,o["\u0275angular_packages_forms_forms_z"],[],null,null),u["\u0275did"](3,540672,null,0,o.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),u["\u0275prd"](2048,null,o.ControlContainer,null,[o.FormGroupDirective]),u["\u0275did"](5,16384,null,0,o.NgControlStatusGroup,[[4,o.ControlContainer]],null,null),(l()(),u["\u0275eld"](6,0,null,null,4,"div",[["class","headDiv"]],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Questions for You"])),(l()(),u["\u0275and"](16777216,null,null,1,null,U)),u["\u0275did"](10,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](11,0,null,null,1,"p",[["class","byAnnomus"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Question added by : Anonymous user"])),(l()(),u["\u0275eld"](13,0,null,null,16,"div",[["class","questionDivText"]],null,null,null,null,null)),(l()(),u["\u0275eld"](14,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](15,null,["",""])),(l()(),u["\u0275eld"](16,0,null,null,2,"button",[["class","answer"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.showAnsDiv(l.context.$implicit._id)&&u),u}),null,null)),(l()(),u["\u0275eld"](17,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-reply"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Answer"])),(l()(),u["\u0275eld"](19,0,null,null,10,"div",[["class","questionDivTextReply"]],[[8,"id",0]],null,null,null,null)),(l()(),u["\u0275eld"](20,0,null,null,5,"textarea",[["formControlName","answerPost"],["id","answerspost"],["placeholder","Write Your Answer here.."]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"keyup"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,e){var t=!0,i=l.component;return"input"===n&&(t=!1!==u["\u0275nov"](l,21)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,21).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,21)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,21)._compositionEnd(e.target.value)&&t),"keyup"===n&&(t=!1!==i.handleAnswerPost(e)&&t),t}),null,null)),u["\u0275did"](21,16384,null,0,o.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,o.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,o.NG_VALUE_ACCESSOR,(function(l){return[l]}),[o.DefaultValueAccessor]),u["\u0275did"](23,671744,null,0,o.FormControlName,[[3,o.ControlContainer],[8,null],[8,null],[6,o.NG_VALUE_ACCESSOR],[2,o["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,o.NgControl,null,[o.FormControlName]),u["\u0275did"](25,16384,null,0,o.NgControlStatus,[[4,o.NgControl]],null,null),(l()(),u["\u0275and"](16777216,null,null,1,null,M)),u["\u0275did"](27,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](28,0,null,null,1,"button",[["class","waves-effect waves-light btn"],["disabled",""],["id","postAnswerBtn"]],null,[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.postAns(t.postAnswer.value,l.context.$implicit._id,l.context.$implicit.answersCount)&&u),u}),null,null)),(l()(),u["\u0275ted"](-1,null,[" post "]))],(function(l,n){var e=n.component;l(n,3,0,e.postAnswer),l(n,10,0,0==n.context.$implicit.isAnswered),l(n,23,0,"answerPost"),l(n,27,0,e.postAnswer.hasError("","answerPost")&&e.postAnswer.get("answerPost").touched)}),(function(l,n){l(n,1,0,u["\u0275nov"](n,5).ngClassUntouched,u["\u0275nov"](n,5).ngClassTouched,u["\u0275nov"](n,5).ngClassPristine,u["\u0275nov"](n,5).ngClassDirty,u["\u0275nov"](n,5).ngClassValid,u["\u0275nov"](n,5).ngClassInvalid,u["\u0275nov"](n,5).ngClassPending),l(n,15,0,n.context.$implicit.question),l(n,19,0,n.context.$implicit._id),l(n,20,0,u["\u0275nov"](n,25).ngClassUntouched,u["\u0275nov"](n,25).ngClassTouched,u["\u0275nov"](n,25).ngClassPristine,u["\u0275nov"](n,25).ngClassDirty,u["\u0275nov"](n,25).ngClassValid,u["\u0275nov"](n,25).ngClassInvalid,u["\u0275nov"](n,25).ngClassPending)}))}function B(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,7,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,4,"ul",[],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,3,null,Q)),u["\u0275did"](3,278528,null,0,r.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),u["\u0275pod"](4,{id:0,itemsPerPage:1,currentPage:2}),u["\u0275pid"](0,d.b,[d.e]),(l()(),u["\u0275eld"](6,0,null,null,1,"pagination-controls",[["id","paginator1"]],null,[[null,"pageChange"]],(function(l,n,e){var u=!0;return"pageChange"===n&&(u=!1!==l.component.handlePaginator(e)&&u),u}),s.b,s.a)),u["\u0275did"](7,49152,null,0,d.c,[],{id:[0,"id"]},{pageChange:"pageChange"})],(function(l,n){var e=n.component,t=u["\u0275unv"](n,3,0,u["\u0275nov"](n,5).transform(e.questData,l(n,4,0,"paginator1",e.itemsPerPage,e.p)));l(n,3,0,t),l(n,7,0,"paginator1")}),null)}function E(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","profileImg"]],[[8,"src",4]],null,null,null,null))],null,(function(l,n){l(n,0,0,u["\u0275inlineInterpolate"](1,"",n.parent.context.$implicit.answerByUserId.profileimage,""))}))}function $(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,0,"img",[["class","profileImg"],["src","assets/img/user.png"]],null,null,null,null,null))],null,null)}function G(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,20,"div",[["class","forumAnswersBlock forumQustionCommonBlock"]],null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,19,"div",[["class","questionDivText"]],null,null,null,null,null)),(l()(),u["\u0275eld"](2,0,null,null,4,"h4",[],null,null,null,null,null)),(l()(),u["\u0275eld"](3,0,null,null,3,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,4).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](4,671744,null,0,c.o,[c.l,c.a,r.LocationStrategy],{routerLink:[0,"routerLink"]},null),u["\u0275pad"](5,2),(l()(),u["\u0275ted"](6,null,["",""])),(l()(),u["\u0275eld"](7,0,null,null,2,"div",[],null,null,null,null,null)),(l()(),u["\u0275eld"](8,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](9,null,[""," Answers"])),(l()(),u["\u0275eld"](10,0,null,null,8,"div",[["class","answerHead"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,E)),u["\u0275did"](12,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"],ngIfElse:[1,"ngIfElse"]},null),(l()(),u["\u0275and"](0,[["recriuterImg",2]],null,0,null,$)),(l()(),u["\u0275eld"](14,0,null,null,4,"div",[["class","queHeadtext"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,1,"h4",[],null,null,null,null,null)),(l()(),u["\u0275ted"](16,null,["",""])),(l()(),u["\u0275eld"](17,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](18,null,["Answered "," ago"])),(l()(),u["\u0275eld"](19,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](20,null,["",""]))],(function(l,n){var e=l(n,5,0,"/question-details/",n.context.$implicit.questionByUserId._id);l(n,4,0,e),l(n,12,0,n.context.$implicit.answerByUserId.profileimage,u["\u0275nov"](n,13))}),(function(l,n){var e=n.component;l(n,3,0,u["\u0275nov"](n,4).target,u["\u0275nov"](n,4).href),l(n,6,0,n.context.$implicit.questionByUserId.question),l(n,9,0,n.context.$implicit.questionByUserId.answersCount),l(n,16,0,n.context.$implicit.answerByUserId.fullName),l(n,18,0,e.callback(n.context.$implicit.createdAt)),l(n,20,0,n.context.$implicit.answer)}))}function j(l){return u["\u0275vid"](0,[u["\u0275pid"](0,p,[]),(l()(),u["\u0275eld"](1,0,null,null,1,"app-navbar",[],null,[["document","click"]],(function(l,n,e){var t=!0;return"document:click"===n&&(t=!1!==u["\u0275nov"](l,2).onClick(e)&&t),t}),g.b,g.a)),u["\u0275did"](2,114688,null,0,m.a,[f.a,c.l,v.a,h.a,c.a,C.a,b.a,w.a,u.ElementRef,I.a,P.a],null,null),(l()(),u["\u0275eld"](3,0,null,null,10,"div",[["class","headerDiv text-center mar0 blogHeader"]],null,null,null,null,null)),(l()(),u["\u0275eld"](4,0,null,null,1,"h4",[["class","pageHeading "]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Ask a Recruiter"])),(l()(),u["\u0275eld"](6,0,null,null,7,"p",[],null,null,null,null,null)),(l()(),u["\u0275eld"](7,0,null,null,3,"a",[],[[1,"target",0],[8,"href",4]],[[null,"click"]],(function(l,n,e){var t=!0;return"click"===n&&(t=!1!==u["\u0275nov"](l,8).onClick(e.button,e.ctrlKey,e.metaKey,e.shiftKey)&&t),t}),null,null)),u["\u0275did"](8,671744,null,0,c.o,[c.l,c.a,r.LocationStrategy],{routerLink:[0,"routerLink"]},null),u["\u0275pad"](9,1),(l()(),u["\u0275ted"](-1,null,["Home"])),(l()(),u["\u0275ted"](-1,null,[" \u226b "])),(l()(),u["\u0275eld"](12,0,null,null,1,"a",[],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,[" Ask a Recruiter"])),(l()(),u["\u0275eld"](14,0,null,null,38,"div",[["class","mainDivForums"]],null,null,null,null,null)),(l()(),u["\u0275eld"](15,0,null,null,37,"div",[["class","container"]],null,null,null,null,null)),(l()(),u["\u0275eld"](16,0,null,null,36,"div",[["class","forumMainSection"]],null,null,null,null,null)),(l()(),u["\u0275eld"](17,0,null,null,28,"div",[["class","forumPageMain"]],null,null,null,null,null)),(l()(),u["\u0275eld"](18,0,null,null,14,"div",[["class","inputDivMainN"]],null,null,null,null,null)),(l()(),u["\u0275eld"](19,0,null,null,13,"div",[["class","inputDivMainNInner"]],null,null,null,null,null)),(l()(),u["\u0275eld"](20,0,null,null,12,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],(function(l,n,e){var t=!0;return"submit"===n&&(t=!1!==u["\u0275nov"](l,22).onSubmit(e)&&t),"reset"===n&&(t=!1!==u["\u0275nov"](l,22).onReset()&&t),t}),null,null)),u["\u0275did"](21,16384,null,0,o["\u0275angular_packages_forms_forms_z"],[],null,null),u["\u0275did"](22,540672,null,0,o.FormGroupDirective,[[8,null],[8,null]],{form:[0,"form"]},null),u["\u0275prd"](2048,null,o.ControlContainer,null,[o.FormGroupDirective]),u["\u0275did"](24,16384,null,0,o.NgControlStatusGroup,[[4,o.ControlContainer]],null,null),(l()(),u["\u0275eld"](25,0,null,null,5,"input",[["formControlName","question"],["placeholder","search here ....."],["type","text"]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],(function(l,n,e){var t=!0,i=l.component;return"input"===n&&(t=!1!==u["\u0275nov"](l,26)._handleInput(e.target.value)&&t),"blur"===n&&(t=!1!==u["\u0275nov"](l,26).onTouched()&&t),"compositionstart"===n&&(t=!1!==u["\u0275nov"](l,26)._compositionStart()&&t),"compositionend"===n&&(t=!1!==u["\u0275nov"](l,26)._compositionEnd(e.target.value)&&t),"input"===n&&(t=!1!==i.textChanges(i.searchQues.value)&&t),t}),null,null)),u["\u0275did"](26,16384,null,0,o.DefaultValueAccessor,[u.Renderer2,u.ElementRef,[2,o.COMPOSITION_BUFFER_MODE]],null,null),u["\u0275prd"](1024,null,o.NG_VALUE_ACCESSOR,(function(l){return[l]}),[o.DefaultValueAccessor]),u["\u0275did"](28,671744,null,0,o.FormControlName,[[3,o.ControlContainer],[8,null],[8,null],[6,o.NG_VALUE_ACCESSOR],[2,o["\u0275angular_packages_forms_forms_q"]]],{name:[0,"name"]},null),u["\u0275prd"](2048,null,o.NgControl,null,[o.FormControlName]),u["\u0275did"](30,16384,null,0,o.NgControlStatus,[[4,o.NgControl]],null,null),(l()(),u["\u0275eld"](31,0,null,null,1,"button",[["class","serchBtn"]],null,[[null,"click"]],(function(l,n,e){var u=!0,t=l.component;return"click"===n&&(u=!1!==t.searchQuesData(t.searchQues.value)&&u),u}),null,null)),(l()(),u["\u0275eld"](32,0,null,null,0,"i",[["aria-hidden","true"],["class","fa fa-search"]],null,null,null,null,null)),(l()(),u["\u0275eld"](33,0,null,null,12,"div",[["class","forumPageInner"]],null,null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,V)),u["\u0275did"](35,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,B)),u["\u0275did"](37,16384,null,0,r.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,5,null,G)),u["\u0275did"](39,278528,null,0,r.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),u["\u0275pod"](40,{answer:0}),u["\u0275ppd"](41,2),u["\u0275pod"](42,{id:0,itemsPerPage:1,currentPage:2}),u["\u0275pid"](0,d.b,[d.e]),(l()(),u["\u0275eld"](44,0,null,null,1,"pagination-controls",[["id","paginator2"]],null,[[null,"pageChange"]],(function(l,n,e){var u=!0;return"pageChange"===n&&(u=!1!==l.component.handleAnswerPaginator(e)&&u),u}),s.b,s.a)),u["\u0275did"](45,49152,null,0,d.c,[],{id:[0,"id"]},{pageChange:"pageChange"}),(l()(),u["\u0275eld"](46,0,null,null,6,"div",[["class","stickyDiv"]],null,null,null,null,null)),(l()(),u["\u0275eld"](47,0,null,null,2,"div",[["class","AksQutionN"]],null,null,null,null,null)),(l()(),u["\u0275eld"](48,0,null,null,1,"app-askbutton",[],null,null,null,A.b,A.a)),u["\u0275did"](49,114688,null,0,k.a,[o.FormBuilder,c.l,f.a,c.a,R.a],null,null),(l()(),u["\u0275eld"](50,0,null,null,2,"div",[["class","recentQuestionsDivMain"]],null,null,null,null,null)),(l()(),u["\u0275eld"](51,0,null,null,1,"app-questions",[],null,null,null,x.b,x.a)),u["\u0275did"](52,4308992,null,0,y.a,[c.l,c.a],{questData:[0,"questData"]},null),(l()(),u["\u0275eld"](53,0,null,null,9,"div",[["class","modal videoModalMain forumPopMain forumMsgPopup newPopZindex"],["id","answermsdPop"]],null,null,null,null,null)),(l()(),u["\u0275eld"](54,0,null,null,2,"a",[["class"," videoCloseBtn"]],null,[[null,"click"]],(function(l,n,e){var u=!0;return"click"===n&&(u=!1!==l.component.closeanswerPopup()&&u),u}),null,null)),(l()(),u["\u0275eld"](55,0,null,null,1,"i",[["class","material-icons"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["close"])),(l()(),u["\u0275eld"](57,0,null,null,5,"div",[["class","modal-content videoModalContent"]],null,null,null,null,null)),(l()(),u["\u0275eld"](58,0,null,null,1,"h4",[["class","slide-heading text-center"]],null,null,null,null,null)),(l()(),u["\u0275ted"](-1,null,["Message"])),(l()(),u["\u0275eld"](60,0,null,null,2,"div",[["class","modalBodyPop"]],null,null,null,null,null)),(l()(),u["\u0275eld"](61,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),u["\u0275ted"](62,null,["",""])),(l()(),u["\u0275eld"](63,0,null,null,1,"app-footer",[],null,null,null,D.b,D.a)),u["\u0275did"](64,114688,null,0,_.a,[f.a,o.FormBuilder],null,null)],(function(l,n){var e=n.component;l(n,2,0);var t=l(n,9,0,"/home/");l(n,8,0,t),l(n,22,0,e.searchQues),l(n,28,0,"question"),l(n,35,0,e.askusersData),l(n,37,0,e.isLoggedIn);var i=u["\u0275unv"](n,39,0,u["\u0275nov"](n,43).transform(u["\u0275unv"](n,39,0,l(n,41,0,u["\u0275nov"](n,0),e.getAnswerData,l(n,40,0,e.searchText))),l(n,42,0,"paginator2",e.itemsPerAnswerPage,e.p2)));l(n,39,0,i),l(n,45,0,"paginator2"),l(n,49,0),l(n,52,0,e.questData),l(n,64,0)}),(function(l,n){var e=n.component;l(n,7,0,u["\u0275nov"](n,8).target,u["\u0275nov"](n,8).href),l(n,20,0,u["\u0275nov"](n,24).ngClassUntouched,u["\u0275nov"](n,24).ngClassTouched,u["\u0275nov"](n,24).ngClassPristine,u["\u0275nov"](n,24).ngClassDirty,u["\u0275nov"](n,24).ngClassValid,u["\u0275nov"](n,24).ngClassInvalid,u["\u0275nov"](n,24).ngClassPending),l(n,25,0,u["\u0275nov"](n,30).ngClassUntouched,u["\u0275nov"](n,30).ngClassTouched,u["\u0275nov"](n,30).ngClassPristine,u["\u0275nov"](n,30).ngClassDirty,u["\u0275nov"](n,30).ngClassValid,u["\u0275nov"](n,30).ngClassInvalid,u["\u0275nov"](n,30).ngClassPending),l(n,62,0,e.msgForPopup)}))}function z(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,1,"app-view-forum",[],null,null,null,j,S)),u["\u0275did"](1,114688,null,0,L,[C.a,o.FormBuilder,f.a,c.l,v.a,h.a,R.a,w.a],null,null)],(function(l,n){l(n,1,0)}),null)}var J=u["\u0275ccf"]("app-view-forum",L,z,{},{},[]),H=e("CLta");class K{}var Y=e("Ebhr"),W=e("MNke"),X=e("mB+Y"),Z=e("V1xO"),ll=e("6uQz"),nl=e("evil"),el=u["\u0275cmf"](t,[],(function(l){return u["\u0275mod"]([u["\u0275mpd"](512,u.ComponentFactoryResolver,u["\u0275CodegenComponentFactoryResolver"],[[8,[i.a,J]],[3,u.ComponentFactoryResolver],u.NgModuleRef]),u["\u0275mpd"](4608,r.NgLocalization,r.NgLocaleLocalization,[u.LOCALE_ID,[2,r["\u0275angular_packages_common_common_a"]]]),u["\u0275mpd"](4608,o["\u0275angular_packages_forms_forms_o"],o["\u0275angular_packages_forms_forms_o"],[]),u["\u0275mpd"](4608,o.FormBuilder,o.FormBuilder,[]),u["\u0275mpd"](4608,d.e,d.e,[]),u["\u0275mpd"](4608,H.h,H.h,[]),u["\u0275mpd"](1073742336,r.CommonModule,r.CommonModule,[]),u["\u0275mpd"](1073742336,c.p,c.p,[[2,c.u],[2,c.l]]),u["\u0275mpd"](1073742336,K,K,[]),u["\u0275mpd"](1073742336,Y.b,Y.b,[]),u["\u0275mpd"](1073742336,o["\u0275angular_packages_forms_forms_d"],o["\u0275angular_packages_forms_forms_d"],[]),u["\u0275mpd"](1073742336,o.FormsModule,o.FormsModule,[]),u["\u0275mpd"](1073742336,o.ReactiveFormsModule,o.ReactiveFormsModule,[]),u["\u0275mpd"](1073742336,W.b,W.b,[]),u["\u0275mpd"](1073742336,d.a,d.a,[]),u["\u0275mpd"](1073742336,X.e,X.e,[]),u["\u0275mpd"](1073742336,H.f,H.f,[]),u["\u0275mpd"](1073742336,Z.CKEditorModule,Z.CKEditorModule,[]),u["\u0275mpd"](1073742336,ll.a,ll.a,[]),u["\u0275mpd"](1073742336,nl.a,nl.a,[]),u["\u0275mpd"](1073742336,t,t,[]),u["\u0275mpd"](1024,c.j,(function(){return[[{path:"",component:L}]]}),[]),u["\u0275mpd"](256,o.COMPOSITION_BUFFER_MODE,!1,[])])}))},abRS:function(l,n,e){"use strict";e.d(n,"a",(function(){return a})),e.d(n,"b",(function(){return h}));var u=e("8Y7J"),t=e("xkgV"),i=e("SVse"),a=u["\u0275crt"]({encapsulation:2,styles:["\n.ngx-pagination {\n  margin-left: 0;\n  margin-bottom: 1rem; }\n  .ngx-pagination::before, .ngx-pagination::after {\n    content: ' ';\n    display: table; }\n  .ngx-pagination::after {\n    clear: both; }\n  .ngx-pagination li {\n    -moz-user-select: none;\n    -webkit-user-select: none;\n    -ms-user-select: none;\n    margin-right: 0.0625rem;\n    border-radius: 0; }\n  .ngx-pagination li {\n    display: inline-block; }\n  .ngx-pagination a,\n  .ngx-pagination button {\n    color: #0a0a0a; \n    display: block;\n    padding: 0.1875rem 0.625rem;\n    border-radius: 0; }\n    .ngx-pagination a:hover,\n    .ngx-pagination button:hover {\n      background: #e6e6e6; }\n  .ngx-pagination .current {\n    padding: 0.1875rem 0.625rem;\n    background: #2199e8;\n    color: #fefefe;\n    cursor: default; }\n  .ngx-pagination .disabled {\n    padding: 0.1875rem 0.625rem;\n    color: #cacaca;\n    cursor: default; } \n    .ngx-pagination .disabled:hover {\n      background: transparent; }\n  .ngx-pagination a, .ngx-pagination button {\n    cursor: pointer; }\n\n.ngx-pagination .pagination-previous a::before,\n.ngx-pagination .pagination-previous.disabled::before { \n  content: '\xab';\n  display: inline-block;\n  margin-right: 0.5rem; }\n\n.ngx-pagination .pagination-next a::after,\n.ngx-pagination .pagination-next.disabled::after {\n  content: '\xbb';\n  display: inline-block;\n  margin-left: 0.5rem; }\n\n.ngx-pagination .show-for-sr {\n  position: absolute !important;\n  width: 1px;\n  height: 1px;\n  overflow: hidden;\n  clip: rect(0, 0, 0, 0); }\n.ngx-pagination .small-screen {\n  display: none; }\n@media screen and (max-width: 601px) {\n  .ngx-pagination.responsive .small-screen {\n    display: inline-block; } \n  .ngx-pagination.responsive li:not(.small-screen):not(.pagination-previous):not(.pagination-next) {\n    display: none; }\n}\n  "],data:{}});function o(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"a",[["tabindex","0"]],[[1,"aria-label",0]],[[null,"keyup.enter"],[null,"click"]],(function(l,n,e){var t=!0;return"keyup.enter"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).previous()&&t),"click"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).previous()&&t),t}),null,null)),(l()(),u["\u0275ted"](1,null,[" "," "])),(l()(),u["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](3,null,["",""]))],null,(function(l,n){var e=n.component;l(n,0,0,e.previousLabel+" "+e.screenReaderPageLabel),l(n,1,0,e.previousLabel),l(n,3,0,e.screenReaderPageLabel)}))}function r(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](1,null,[" "," "])),(l()(),u["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](3,null,["",""]))],null,(function(l,n){var e=n.component;l(n,1,0,e.previousLabel),l(n,3,0,e.screenReaderPageLabel)}))}function s(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"li",[["class","pagination-previous"]],[[2,"disabled",null]],null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,o)),u["\u0275did"](2,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,r)),u["\u0275did"](4,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,1<u["\u0275nov"](n.parent.parent,1).getCurrent()),l(n,4,0,u["\u0275nov"](n.parent.parent,1).isFirstPage())}),(function(l,n){l(n,0,0,u["\u0275nov"](n.parent.parent,1).isFirstPage())}))}function d(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"a",[["tabindex","0"]],null,[[null,"keyup.enter"],[null,"click"]],(function(l,n,e){var t=!0;return"keyup.enter"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).setCurrent(l.parent.context.$implicit.value)&&t),"click"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).setCurrent(l.parent.context.$implicit.value)&&t),t}),null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," "])),(l()(),u["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,["",""]))],null,(function(l,n){l(n,2,0,n.component.screenReaderPageLabel),l(n,4,0,n.parent.context.$implicit.label)}))}function c(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,null,null,null,null,null,null,null)),(l()(),u["\u0275eld"](1,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](2,null,[""," "])),(l()(),u["\u0275eld"](3,0,null,null,1,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,["",""]))],null,(function(l,n){l(n,2,0,n.component.screenReaderCurrentLabel),l(n,4,0,n.parent.context.$implicit.label)}))}function p(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"li",[],[[2,"current",null],[2,"ellipsis",null]],null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,d)),u["\u0275did"](2,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,c)),u["\u0275did"](4,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,u["\u0275nov"](n.parent.parent,1).getCurrent()!==n.context.$implicit.value),l(n,4,0,u["\u0275nov"](n.parent.parent,1).getCurrent()===n.context.$implicit.value)}),(function(l,n){l(n,0,0,u["\u0275nov"](n.parent.parent,1).getCurrent()===n.context.$implicit.value,"..."===n.context.$implicit.label)}))}function g(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"a",[["tabindex","0"]],[[1,"aria-label",0]],[[null,"keyup.enter"],[null,"click"]],(function(l,n,e){var t=!0;return"keyup.enter"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).next()&&t),"click"===n&&(t=!1!==u["\u0275nov"](l.parent.parent.parent,1).next()&&t),t}),null,null)),(l()(),u["\u0275ted"](1,null,[" "," "])),(l()(),u["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](3,null,["",""]))],null,(function(l,n){var e=n.component;l(n,0,0,e.nextLabel+" "+e.screenReaderPageLabel),l(n,1,0,e.nextLabel),l(n,3,0,e.screenReaderPageLabel)}))}function m(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,3,"span",[],null,null,null,null,null)),(l()(),u["\u0275ted"](1,null,[" "," "])),(l()(),u["\u0275eld"](2,0,null,null,1,"span",[["class","show-for-sr"]],null,null,null,null,null)),(l()(),u["\u0275ted"](3,null,["",""]))],null,(function(l,n){var e=n.component;l(n,1,0,e.nextLabel),l(n,3,0,e.screenReaderPageLabel)}))}function f(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,4,"li",[["class","pagination-next"]],[[2,"disabled",null]],null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,g)),u["\u0275did"](2,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,m)),u["\u0275did"](4,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){l(n,2,0,!u["\u0275nov"](n.parent.parent,1).isLastPage()),l(n,4,0,u["\u0275nov"](n.parent.parent,1).isLastPage())}),(function(l,n){l(n,0,0,u["\u0275nov"](n.parent.parent,1).isLastPage())}))}function v(l){return u["\u0275vid"](0,[(l()(),u["\u0275eld"](0,0,null,null,8,"ul",[["class","ngx-pagination"],["role","navigation"]],[[1,"aria-label",0],[2,"responsive",null]],null,null,null,null)),(l()(),u["\u0275and"](16777216,null,null,1,null,s)),u["\u0275did"](2,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null),(l()(),u["\u0275eld"](3,0,null,null,1,"li",[["class","small-screen"]],null,null,null,null,null)),(l()(),u["\u0275ted"](4,null,[" "," / "," "])),(l()(),u["\u0275and"](16777216,null,null,1,null,p)),u["\u0275did"](6,278528,null,0,i.NgForOf,[u.ViewContainerRef,u.TemplateRef,u.IterableDiffers],{ngForOf:[0,"ngForOf"]},null),(l()(),u["\u0275and"](16777216,null,null,1,null,f)),u["\u0275did"](8,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,2,0,e.directionLinks),l(n,6,0,u["\u0275nov"](n.parent,1).pages),l(n,8,0,e.directionLinks)}),(function(l,n){var e=n.component;l(n,0,0,e.screenReaderPaginationLabel,e.responsive),l(n,4,0,u["\u0275nov"](n.parent,1).getCurrent(),u["\u0275nov"](n.parent,1).getLastPage())}))}function h(l){return u["\u0275vid"](2,[(l()(),u["\u0275eld"](0,0,null,null,3,"pagination-template",[],null,[[null,"pageChange"]],(function(l,n,e){var u=!0;return"pageChange"===n&&(u=!1!==l.component.pageChange.emit(e)&&u),u}),null,null)),u["\u0275did"](1,737280,[["p",4]],0,t.d,[t.e,u.ChangeDetectorRef],{id:[0,"id"],maxSize:[1,"maxSize"]},{pageChange:"pageChange"}),(l()(),u["\u0275and"](16777216,null,null,1,null,v)),u["\u0275did"](3,16384,null,0,i.NgIf,[u.ViewContainerRef,u.TemplateRef],{ngIf:[0,"ngIf"]},null)],(function(l,n){var e=n.component;l(n,1,0,e.id,e.maxSize),l(n,3,0,!(e.autoHide&&u["\u0275nov"](n,1).pages.length<=1))}),null)}}}]);