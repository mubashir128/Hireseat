(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"ct+p":function(e,t,n){"use strict";n.r(t),n.d(t,"HomeModule",function(){return H});var i=n("ofXK"),o=n("tyNb"),c=n("pW6c"),r=n("VITL"),a=n("3Pt+"),s=n("2AXT"),l=n("fXoL"),d=n("jhN1"),g=n("JqCM"),p=n("kWWo"),f=n("XPR2"),m=n("MkFp"),u=n("fp1T"),h=n("ZnKM"),x=n("lFQJ");function v(e,t){if(1&e&&(l.fc(0,"div",57),l.bc(1,"img",58),l.ec()),2&e){const e=l.tc(2).$implicit;l.Nb(1),l.Bc("src",e.featuredImage,l.Uc)}}function P(e,t){if(1&e&&(l.fc(0,"div",57),l.fc(1,"video",59),l.cd(2," Your browser does not support the video tag. "),l.ec(),l.ec()),2&e){const e=l.tc(2).$implicit;l.Nb(1),l.Ac("src",null==e?null:e.video,l.Uc)}}function M(e,t){if(1&e&&(l.bc(0,"iframe",61),l.uc(1,"safe")),2&e){const e=l.tc(3).$implicit;l.Ac("src",l.vc(1,1,null==e?null:e.embbedded),l.Tc)}}function b(e,t){if(1&e&&(l.fc(0,"div",57),l.ad(1,M,2,3,"iframe",60),l.ec()),2&e){const e=l.tc(2).$implicit;l.Nb(1),l.Ac("ngIf","null"!=(null==e?null:e.embbedded))}}function C(e,t){if(1&e&&l.bc(0,"p",62),2&e){const e=l.tc(2).$implicit,t=l.tc();l.Ac("innerHtml",t.truncateHTML(null==e?null:e.description),l.Sc)}}const _=function(e){return["/blog/",e]};function O(e,t){if(1&e&&(l.fc(0,"div",53),l.fc(1,"h5"),l.cd(2),l.uc(3,"date"),l.ec(),l.fc(4,"h4"),l.cd(5),l.ec(),l.ad(6,v,2,1,"div",54),l.ad(7,P,3,1,"div",54),l.ad(8,b,2,1,"div",54),l.ad(9,C,1,1,"p",55),l.fc(10,"a",56),l.cd(11,"Read More"),l.ec(),l.ec()),2&e){const e=l.tc().$implicit;l.Nb(2),l.dd(l.vc(3,7,null==e?null:e.updatedAt)),l.Nb(3),l.dd(null==e?null:e.title),l.Nb(1),l.Ac("ngIf",e.featuredImage),l.Nb(1),l.Ac("ngIf",null!=e.video),l.Nb(1),l.Ac("ngIf",e.embbedded),l.Nb(1),l.Ac("ngIf",!(null!=e&&e.featuredImage||null!=e&&e.embbedded||null!=(null==e?null:e.video))),l.Nb(1),l.Ac("routerLink",l.Fc(9,_,e.blogurl))}}function y(e,t){if(1&e&&(l.fc(0,"div",51),l.ad(1,O,12,11,"div",52),l.ec()),2&e){const e=t.index;l.Nb(1),l.Ac("ngIf",e<4)}}function w(e,t){if(1&e&&(l.fc(0,"div",65),l.bc(1,"img",66),l.fc(2,"h4",67),l.cd(3),l.ec(),l.fc(4,"p"),l.bc(5,"img",68),l.cd(6),l.ec(),l.fc(7,"div",69),l.fc(8,"h5"),l.cd(9),l.ec(),l.ec(),l.fc(10,"div",70),l.fc(11,"div",71),l.fc(12,"h3"),l.cd(13),l.uc(14,"date"),l.ec(),l.fc(15,"p"),l.cd(16),l.uc(17,"date"),l.ec(),l.ec(),l.fc(18,"div",72),l.fc(19,"h4"),l.cd(20),l.uc(21,"convertFrom24To12Format"),l.ec(),l.fc(22,"p"),l.cd(23),l.ec(),l.fc(24,"p"),l.cd(25),l.ec(),l.ec(),l.ec(),l.ec()),2&e){const e=l.tc().$implicit;l.Nb(3),l.dd(null==e?null:e.group.name),l.Nb(3),l.ed("",null==e?null:e.group.localized_location," "),l.Nb(3),l.dd(null==e?null:e.name),l.Nb(4),l.dd(l.wc(14,9,null==e?null:e.local_date,"dd")),l.Nb(3),l.dd(l.wc(17,12,null==e?null:e.local_date,"MMMM")),l.Nb(4),l.dd(l.vc(21,15,null==e?null:e.local_time)),l.Nb(3),l.fd(" Venue: ",null==e?null:e.venue.address_1," , ",null==e?null:e.venue.name," "),l.Nb(2),l.dd(null==e?null:e.venue.city)}}function k(e,t){if(1&e&&(l.fc(0,"div",63),l.ad(1,w,26,17,"div",64),l.ec()),2&e){const e=t.index;l.Nb(1),l.Ac("ngIf",e<1)}}const T=function(){return["/login"]},D=function(){return{sourceType:"url",url:"https://twitter.com/HireSeat?ref_src=twsrc%5Etfw"}},S=function(){return{tweetLimit:3}};let B=(()=>{class e{constructor(e,t,n,i,o,c,r,a){this.formBuilder=e,this._sanitizer=t,this._AuthService=n,this._blogservice=i,this.router=o,this._Userservice=c,this.spinner=r,this.route=a,this.emailValues="",this.users=[],this.leaders=[],this.resumeVisible=0,this.videoUrl="",this.verfStatus=!1,this.msgForPopup="",this.submitted=!1,this.emailSubmitted=!1,this.otpSubmitted=!1,this.blogPOstData=[],this.limit=1e3,this.article=[],window.addEventListener("scroll",this.scroll,!0)}ngOnInit(){$(document).ready(function(){$("html, body").animate({scrollTop:0},1500)}),jQuery(".modal").modal(),this.spinner.show(),this._Userservice.getmeetup().subscribe(e=>{e?this.meetUpsData=e:(console.log("data not received"),this.spinner.hide())},e=>{console.log("error ouccured"),this.spinner.hide()}),this.limit=this.pageCount()+10,this._blogservice.getAllBlogPost(this.limit).subscribe(e=>{this.article=e.data,this.spinner.hide()},e=>{console.log(e),this.spinner.hide()}),this.route.params.subscribe(e=>{this.handleRequest(e.id)}),this.verifyEmail=this.formBuilder.group({emailVerify:["",[a.y.required,a.y.email]]}),this.verifyOtp=this.formBuilder.group({otpVerify:["",[a.y.required]]}),this.askQues=this.formBuilder.group({addQuestions:["",[a.y.required]]}),this.askusersData=this._Userservice.getaskQuesUserId()}pageCount(){return this.article.length}truncateHTML(e){return!e||e.length<=450?e:e.replace(/<(?:.|\n)*?>/gm,"").trim().replace(/&nbsp;/g,"").substring(0,450)+"..."}handleRequest(e){if(null!=e){let t=jQuery("#"+e);jQuery("html,body").animate({scrollTop:t.offset().top})}}scrollToNextSlide(){let e=jQuery("#slide-2");jQuery("html,body").animate({scrollTop:e.offset().top})}createNewAccount(e){localStorage.setItem("Role",e),this.router.navigate(["/register"])}logout(){this._AuthService.logout(),this.router.navigate(["/login"])}scroll(){document.body.scrollTop>20||document.documentElement.scrollTop>20?jQuery("#myBtn").show():jQuery("#myBtn").hide()}topFunction(){this.scrollToTop()}scrollToTop(){!function e(){var t=document.documentElement.scrollTop||document.body.scrollTop;t>0&&(window.requestAnimationFrame(e),window.scrollTo(0,t-t/10))}()}closeVideoModal(){jQuery("#VideoModal").modal("close")}showVideo(e){this.videoUrl=e,jQuery("#VideoModal").modal("open");var t=document.getElementById("selectedVideo");t.pause(),setTimeout(()=>{const e=t.play();null!==e&&e.catch(()=>{t.play()})},1e3)}showforumPopup(){jQuery("#forumsPop").modal("open")}emailConfirmPopup(){jQuery("#emailConfirmPop").modal("open")}closeEmailConfirmpopup(){jQuery("#emailConfirmPop").modal("close")}closeForumModel(){jQuery("#forumsPop").modal("close")}get f(){return this.verifyEmail.controls}get otpVali(){return this.verifyOtp.controls}verifyUser(){this.submitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.userverification(this.verifyEmailData).subscribe(e=>{},e=>{console.log(e)}))}onSubmit(){this.emailSubmitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.sendEmail(this.verifyEmailData).subscribe(e=>{(e.status="success")&&(this.msgForPopup=e.message,e.data&&(this.verfStatus=e.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(e.data))),this.emailConfirmPopup())},e=>console.log(e)))}checkOtp(){this.otpSubmitted=!0,this.verifyOtp.invalid||(this.verifyEmailData=this.verifyEmail.value,this.verifyOtp.value.email=this.verifyEmailData.emailVerify,this.verifyOtpData=this.verifyOtp.value,this._Userservice.checkOtpEm(this.verifyOtpData).subscribe(e=>{this.verfStatus=e.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(e.data)),((e.status="success")||(e.status="failed"))&&(this.msgForPopup=e.message,this.emailConfirmPopup())},e=>{this.msgForPopup=e,this.emailConfirmPopup()}))}navigate(e){this.router.navigate(["/blog/",e])}addQuest(){this.askusersData=this._Userservice.getaskQuesUserId();let e=JSON.parse(this.askusersData);if(console.log(e),null==e)this.msgForPopup="Please Verfiy with Email  then ask Questions",this.emailConfirmPopup();else if(1==e.isVerified||1==this.verfStatus){this.submitted=!0,this.askQuesData=this.askQues.value;const t=this.askQuesData;t.otp=e.Otp,t.email=e.email,console.log(t),this._Userservice.addQuestion(t).subscribe(e=>{(e.status="success")&&(this.msgForPopup=e.message,this.emailConfirmPopup(),setTimeout(()=>{this.router.navigate(["/forum"])},2e3))},e=>console.log(e))}else{this.askQuesData=this.askQues.value;const t=this.askQuesData;t.otp=e.Otp,t.email=e.email,this._Userservice.addQuestion(t).subscribe(e=>{(e.status="success")&&(this.msgForPopup=e.message,this.emailConfirmPopup(),setTimeout(()=>{this.router.navigate(["/forum"])},2e3))},e=>console.log(e))}}}return e.\u0275fac=function(t){return new(t||e)(l.ac(a.f),l.ac(d.b),l.ac(c.a),l.ac(s.a),l.ac(o.c),l.ac(r.a),l.ac(g.c),l.ac(o.a))},e.\u0275cmp=l.Ub({type:e,selectors:[["app-home"]],decls:122,vars:8,consts:[["id","home-page",1,"homePageMain"],[1,"bestRecruitment"],["src","assets/img/firstSec.png",1,"sectionBGimg"],[1,"bestRecruitmentText"],[1,"ThinTextHeading"],[1,"BoldText"],[1,"hireSeatBtn"],[2,"color","#ffffff",3,"routerLink"],[1,"KnowMoreBtn",3,"click"],["src","assets/img/arrow.png",1,"arrowImg"],["id","slide-2",1,"ProveBest"],[1,"ProveBestInner"],[1,"proveHead"],[1,"width50"],["src","assets/img/provebg.png","loading","lazy",1,"headeLeftImg"],["src","assets/img/sitBg.png","loading","lazy",1,"SeatBAchH"],[1,"ProveInnerMain"],[1,"width50","ProveLeft"],[1,"secHeadingDiv"],[1,"SecHeading"],[1,"leftSectionPara","paddT30"],[1,"width100","min200"],[1,"proveTextimg"],["src","assets/img/candidate.png",1,""],[1,"proveText"],["src","assets/img/deal.png",1,""],[1,"newBtnTextB"],["src","assets/img/crm.png",1,""],[1,"width50","seatBack"],[1,"rightSectionPara","paddT30"],["src","assets/img/accounting.png",1,""],["src","assets/img/transperacy.png",1,"marB20"],[1,"newBtnTextB","min200"],[1,"width100"],["src","assets/img/competition.png",1,""],[1,"proveFooter"],["src","assets/img/prove_lowerBg.png",1,"bottomLeftImg"],["src","assets/img/sit_lowerBg.png",1,""],[1,"articleDiv"],[1,"articleDivInner1"],[1,"articleDiv70"],["src","assets/img/article.png",1,"ArticleHeadImg"],[1,"articleDiv30"],["src","assets/img/twitter.png",1,"tweeterHeaderImg"],[1,"articleDivInner"],[1,"SecHeading","blackHed"],[1,"row","mar0","flexWrap","scrollDiv"],["class","col m12 l6 marB20",4,"ngFor","ngForOf"],[1,"boxDiv"],["data-width","280","data-height","300",3,"data","opts"],["class","recruterMain",4,"ngFor","ngForOf"],[1,"col","m12","l6","marB20"],["class","ArticleDiv",4,"ngIf"],[1,"ArticleDiv"],["class","postimage",4,"ngIf"],[3,"innerHtml",4,"ngIf"],[3,"routerLink"],[1,"postimage"],["loading","lazy",3,"src"],["id","selectedVideo","height","100%","width","100%","controls","",3,"src"],["width","100%","height","100%","loading","lazy",3,"src",4,"ngIf"],["width","100%","height","100%","loading","lazy",3,"src"],[3,"innerHtml"],[1,"recruterMain"],["class","recruterInner",4,"ngIf"],[1,"recruterInner"],["src","assets/img/staue.png","loading","lazy",1,"staueIcon"],[1,"SecHeading","text-center"],["src","assets/img/location.png","loading","lazy",1,"staueIcon"],[1,"lineSide"],[1,"DateTime"],[1,"date"],[1,"Time"]],template:function(e,t){1&e&&(l.bc(0,"app-navbar"),l.fc(1,"div",0),l.fc(2,"div",1),l.bc(3,"img",2),l.fc(4,"div",3),l.fc(5,"h3",4),l.cd(6," Make your case Directly to Professional Recruiters from"),l.bc(7,"br"),l.cd(8," the Leading Companies in the World and "),l.bc(9,"br"),l.cd(10,"Avoid Automated Screenings "),l.ec(),l.fc(11,"h3",5),l.cd(12," Receive Free Feedback on your Pitch,"),l.bc(13,"br"),l.cd(14," Resume and Linkedin from Recruiters Specializing in Your Industry "),l.ec(),l.fc(15,"div",6),l.fc(16,"a",7),l.cd(17,"Login"),l.ec(),l.ec(),l.fc(18,"button",8),l.pc("click",function(){return t.scrollToNextSlide()}),l.cd(19," Know More "),l.bc(20,"img",9),l.ec(),l.ec(),l.ec(),l.fc(21,"div",10),l.fc(22,"div",11),l.fc(23,"div",12),l.fc(24,"div",13),l.bc(25,"img",14),l.ec(),l.fc(26,"div",13),l.bc(27,"img",15),l.ec(),l.ec(),l.fc(28,"div",16),l.fc(29,"div",17),l.fc(30,"div",18),l.fc(31,"h4",19),l.cd(32,"Candidates"),l.ec(),l.ec(),l.fc(33,"div",20),l.fc(34,"div",21),l.fc(35,"div",22),l.bc(36,"img",23),l.ec(),l.fc(37,"div",24),l.fc(38,"h5"),l.cd(39," State your Value Proposition to Professional Recruiters focused on specific Roles, Industries, Companies and Locations "),l.ec(),l.fc(40,"p"),l.cd(41," From developer roles in large tech companies in San Francisco, accounting roles in the Big 4 in NYC or engineering roles with a DoD contractor in Virgina, pitch yourself directly and avoid being screened by an ATS. "),l.ec(),l.ec(),l.ec(),l.fc(42,"div",21),l.fc(43,"div",22),l.bc(44,"img",25),l.ec(),l.fc(45,"div",24),l.fc(46,"h5"),l.cd(47," Get Coaching for your Product Control interview with a financial firm from a recruiter who has years of experience placing that exact role in the biggest banks on Wall St "),l.ec(),l.fc(48,"p"),l.cd(49," Gain real insights, true understanding, and professional advice from seasoned professionals on: "),l.bc(50,"br"),l.cd(51," - Interviewing"),l.bc(52,"br"),l.cd(53," - Job Seeking Strategy"),l.bc(54,"br"),l.cd(55," - Resume Review"),l.bc(56,"br"),l.cd(57," - Linkedin Review "),l.ec(),l.ec(),l.ec(),l.fc(58,"div",26),l.fc(59,"div",21),l.fc(60,"div",22),l.bc(61,"img",27),l.ec(),l.fc(62,"div",24),l.fc(63,"h5"),l.cd(64,"Q&A with a Professional Recruiters"),l.ec(),l.fc(65,"p"),l.cd(66," Ask any question and learn how the recruiting process works through the lens of a professional who places candidates in your dream job in your dream company every day. Find out what you are missing and what is holding you back from your dream job. "),l.ec(),l.ec(),l.ec(),l.ec(),l.ec(),l.ec(),l.fc(67,"div",28),l.fc(68,"div",18),l.fc(69,"h4",19),l.cd(70,"Recruiters"),l.ec(),l.ec(),l.fc(71,"div",29),l.fc(72,"div",21),l.fc(73,"div",22),l.bc(74,"img",30),l.ec(),l.fc(75,"div",24),l.fc(76,"h5"),l.cd(77,"Set your Rate and Set your Availability"),l.ec(),l.fc(78,"p"),l.cd(79," Monetize the experience and skill sets you have developed over the years by posting what you feel your time is worth and have the flexibility to provide more or less of your service by the week. "),l.ec(),l.ec(),l.ec(),l.fc(80,"div",21),l.fc(81,"div",22),l.bc(82,"img",31),l.ec(),l.fc(83,"div",24),l.fc(84,"h5"),l.cd(85," Expand your personal or business brand to a whole new market "),l.ec(),l.fc(86,"p"),l.cd(87," HireSeat will help promote you or your company to gain awareness as an SME from hiring managers and attract more business. "),l.ec(),l.ec(),l.ec(),l.fc(88,"div",32),l.fc(89,"div",33),l.fc(90,"div",22),l.bc(91,"img",34),l.ec(),l.fc(92,"div",24),l.fc(93,"h5"),l.cd(94," Build relationships with candidates and future hiring managers quickly and efficiently "),l.ec(),l.fc(95,"p"),l.cd(96," By helping candidates you are helping future hiring managers that can help you develop your business. Each coaching session is focused, light touch, and limited to a maximum of an hour "),l.ec(),l.ec(),l.ec(),l.ec(),l.ec(),l.ec(),l.ec(),l.fc(97,"div",35),l.fc(98,"div",13),l.bc(99,"img",36),l.ec(),l.fc(100,"div",13),l.bc(101,"img",37),l.ec(),l.ec(),l.ec(),l.ec(),l.bc(102,"app-media"),l.fc(103,"div",38),l.fc(104,"div",39),l.fc(105,"div",40),l.bc(106,"img",41),l.ec(),l.fc(107,"div",42),l.bc(108,"img",43),l.ec(),l.ec(),l.fc(109,"div",44),l.fc(110,"div",40),l.fc(111,"h4",45),l.cd(112,"Article"),l.ec(),l.fc(113,"div",46),l.ad(114,y,2,1,"div",47),l.ec(),l.ec(),l.fc(115,"div",42),l.fc(116,"h4",19),l.cd(117,"Twitter"),l.ec(),l.fc(118,"div",48),l.bc(119,"ngx-twitter-timeline",49),l.ec(),l.ec(),l.ec(),l.ec(),l.ad(120,k,2,1,"div",50),l.ec(),l.bc(121,"app-footer")),2&e&&(l.Nb(16),l.Ac("routerLink",l.Ec(5,T)),l.Nb(98),l.Ac("ngForOf",t.article),l.Nb(5),l.Ac("data",l.Ec(6,D))("opts",l.Ec(7,S)),l.Nb(1),l.Ac("ngForOf",t.meetUpsData))},directives:[p.a,o.f,f.a,i.n,m.a,u.a,i.o],pipes:[i.f,h.a,x.a],styles:['.sectionBGimg[_ngcontent-%COMP%]{width:100%;height:auto}.bestRecruitment[_ngcontent-%COMP%]{position:relative}.bestRecruitmentText[_ngcontent-%COMP%]{position:absolute;top:40%;left:36%;transform:translate(-50%,-50%)}.BoldText[_ngcontent-%COMP%]{margin:5px 0 40px;font-family:gilroybold}.ThinTextHeading[_ngcontent-%COMP%]{margin:0 0 20px;font-family:gilroyregular}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:28px;color:#1c2d41}.KnowMoreBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;color:#fff;min-width:200px;font-size:18px;font-family:gilroybold;height:60px;border-radius:5px;display:flex;align-items:center;justify-content:space-around}.width50[_ngcontent-%COMP%]{width:50%;float:left}.width100[_ngcontent-%COMP%]{width:100%;float:left}.min200[_ngcontent-%COMP%]{min-height:200px}.paddT30[_ngcontent-%COMP%]{padding-top:30px}.proveTextimg[_ngcontent-%COMP%]{width:15%;float:left}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:30px 0}.proveHead[_ngcontent-%COMP%]{display:flex;align-items:flex-end;margin:0 0 -.5555vw}.proveHead[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.SecHeading[_ngcontent-%COMP%]{font-size:45px;color:#fff;font-family:gilroyextrabold}.proveText[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:24px;color:#fff;font-family:gilroybold;margin:20px 0}.proveText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:gilroyregular;color:#fff;font-size:17px;line-height:1.5}.headeLeftImg[_ngcontent-%COMP%]{margin:0 0 -.0155vw}.bottomLeftImg[_ngcontent-%COMP%]{margin:-.355vw 0 0}a[_ngcontent-%COMP%]{cursor:pointer}.flexRow[_ngcontent-%COMP%]{display:flex;align-items:center}.marB50[_ngcontent-%COMP%]{margin-bottom:50px}.marB20[_ngcontent-%COMP%]{margin-bottom:20px}.proveText[_ngcontent-%COMP%]{padding:0 10px;width:75%;float:left}.transparentBtn[_ngcontent-%COMP%]{height:70px;border:3px solid #fff;background-color:transparent;color:#fff;display:flex;align-items:center;justify-content:space-around;min-width:100%;border-radius:5px;font-family:gilroybold;font-size:20px}.paddL60[_ngcontent-%COMP%]{padding-left:60px}.paddR60[_ngcontent-%COMP%]{padding-right:60px}.SecHeading.blackHed[_ngcontent-%COMP%]{color:#1c2d41;text-align:center;margin:80px 0}.imgDivVideoDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1c2d41;font-size:20px;font-family:gilroybold;padding:10px 20px;line-height:1.3}.VideoImg[_ngcontent-%COMP%]{width:100%;height:320px;-o-object-fit:contain;object-fit:contain;background-color:#000}.recruiterCommityInner[_ngcontent-%COMP%]{padding:20px 90px}.imgDivVideoDiv[_ngcontent-%COMP%]{background-color:#fff;box-shadow:0 0 7px hsla(0,0%,86.7%,.3411764705882353);margin-bottom:40px;padding:0 0 20px}.paddLR20[_ngcontent-%COMP%]{padding:0 20px}.homePageMain[_ngcontent-%COMP%]{background-color:#fbfbfb}.arows[_ngcontent-%COMP%]{margin:0 15px}.text-center[_ngcontent-%COMP%]{text-align:center}.ProveLeft[_ngcontent-%COMP%]{background-color:#3ea9f5;padding:0 20px 0 100px}.seatBack[_ngcontent-%COMP%]{background-color:#0964d9;padding:0 40px 0 90px;margin:0}.SeatBAchH[_ngcontent-%COMP%]{margin:0 0 2px!important}.proveFooter[_ngcontent-%COMP%]{display:flex;width:100%;align-items:flex-start}.proveFooter[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.ProveInnerMain[_ngcontent-%COMP%]{display:flex}.proveF[_ngcontent-%COMP%]{margin:-6px 0 0}.newBtnTextB[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center}.boxDiv[_ngcontent-%COMP%]{max-height:970px;overflow-y:auto}.articleDiv70[_ngcontent-%COMP%]{width:63%;background-color:#0aafff;padding:0 70px 0 100px}.articleDiv30[_ngcontent-%COMP%], .articleDiv70[_ngcontent-%COMP%]{float:left;position:relative}.articleDiv30[_ngcontent-%COMP%]{width:37%;background-color:#1c2d41;padding:0 180px 0 60px}.articleDiv30[_ngcontent-%COMP%]   .SecHeading[_ngcontent-%COMP%]{margin:40px 0}.articleDivInner[_ngcontent-%COMP%]{float:left;width:100%;display:flex;padding:0}.min330[_ngcontent-%COMP%]{min-height:330px}.flexC[_ngcontent-%COMP%]{display:flex;align-items:center;position:relative}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{width:100%;position:absolute;bottom:50px}.articleDiv70[_ngcontent-%COMP%]   .SecHeading.blackHed[_ngcontent-%COMP%]{color:#1c2d41;text-align:left;margin:40px 0}.ArticleDiv[_ngcontent-%COMP%]{background-color:#fff;padding:25px;margin:20px 0 0;display:block;height:100%}.even[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .odd[_ngcontent-%COMP%]{display:none}.ArticleDiv[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#1c2d41;font-size:20px;margin:10px 0;font-family:gilroysemibold}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1c2d41;font-size:35px;font-family:gilroybold}.ArticleDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#1c2d41;font-size:15px;font-family:gilroymedium}.ArticleHeadImg[_ngcontent-%COMP%], .tweeterHeaderImg[_ngcontent-%COMP%]{width:100%}.mar0[_ngcontent-%COMP%]{margin:0}.articleDivInner1[_ngcontent-%COMP%]   .articleDiv30[_ngcontent-%COMP%], .articleDivInner1[_ngcontent-%COMP%]   .articleDiv70[_ngcontent-%COMP%]{padding:0;background-color:unset}.articleDivInner1[_ngcontent-%COMP%]{display:flex;align-items:flex-end;margin:0 0 -.455vw;width:100%}.articleDiv[_ngcontent-%COMP%]{margin:0}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar{width:5px}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f1f1f1}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#0aafff;border-radius:10px}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#555}.recruterMain[_ngcontent-%COMP%]{width:100%;float:left}.recruterInner[_ngcontent-%COMP%]{max-width:600px;margin:50px auto;text-align:center}.staueIcon[_ngcontent-%COMP%]{filter:invert(1);margin:0 10px}.recruterInner[_ngcontent-%COMP%]   .SecHeading[_ngcontent-%COMP%]{font-size:40px;margin:10px 0;text-transform:uppercase}.recruterInner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#c4c5cb;font-size:23px;display:flex;align-items:center;justify-content:center;margin:0;line-height:1}.recruterInner[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#fff;text-transform:uppercase;font-size:20px;margin:10px 0;font-family:gilroybold;width:80%;position:relative}.lineSide[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;position:relative;margin:30px 0}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after{left:-150px}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after, .lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:before{width:130px;position:absolute;content:"";height:3px;background-color:#fff;top:40%}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:before{right:-150px}.DateTime[_ngcontent-%COMP%]{display:flex;margin:25px 0}.date[_ngcontent-%COMP%]{border-right:1px solid #fff;min-width:170px}.date[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:80px;color:#fff;font-family:gilroyregular;margin:0;line-height:1}.date[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px!important;margin:0!important;line-height:1}.Time[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 15px;text-align:left;color:#fff;font-size:30px;font-family:gilroyregular}.Time[_ngcontent-%COMP%]{padding:0 25px}.Time[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left!important;font-size:17px!important;display:block!important;font-family:gilroyregular;margin:7px 0 0!important}.postimage[_ngcontent-%COMP%]{width:100%;padding:0;max-height:210px;height:210px;border:none}.postimage[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%], .postimage[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .postimage[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{height:200px;width:100%}.flexWrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}.hireSeatBtn[_ngcontent-%COMP%]{min-width:150px!important;font-size:16px!important;display:none}@media only screen and (min-width:768px) and (max-width:1024px){.bestRecruitment[_ngcontent-%COMP%]{height:560px}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:29px}.bestRecruitmentText[_ngcontent-%COMP%]{top:50%;left:35%;width:50%}.paddT30[_ngcontent-%COMP%]{padding-top:110px}.SecHeading[_ngcontent-%COMP%]{font-size:35px}.ProveLeft[_ngcontent-%COMP%]{padding:0 0 0 20px;margin:-2px 0 0}.ProveLeft[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%]{width:100%}.seatBack[_ngcontent-%COMP%]{padding:0 0 0 20px;margin:-3px 0 0}.proveText[_ngcontent-%COMP%], .proveTextimg[_ngcontent-%COMP%]{width:100%;padding:0 10px}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:0}.newBtnTextB[_ngcontent-%COMP%]{display:block}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{position:static}.newBtnTextB[_ngcontent-%COMP%]   .min330[_ngcontent-%COMP%]{min-height:unset}.proveFooter[_ngcontent-%COMP%]{margin:-10px 0 0}.SecHeading[_ngcontent-%COMP%]{font-size:40px}.articleDiv70[_ngcontent-%COMP%]{width:60%;padding:0 10px 0 20px}.articleDiv30[_ngcontent-%COMP%]{padding:0 20px 0 10px;width:50%}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:25px}.articleDivInner1[_ngcontent-%COMP%]{margin:0 0 -1vw}.SeatBAchH[_ngcontent-%COMP%]{margin:0!important}.headeLeftImg[_ngcontent-%COMP%]{margin:0 0 -.1vw}.flexWrap.scrollDiv[_ngcontent-%COMP%]{max-height:1000px;overflow-y:auto}}@media only screen and (min-width:320px) and (max-width:767px){.bestRecruitment[_ngcontent-%COMP%]{min-height:500px}.bestRecruitmentText[_ngcontent-%COMP%]{top:50%;left:40%;width:55%}.SecHeading[_ngcontent-%COMP%]{font-size:26px}.ProveLeft[_ngcontent-%COMP%]{padding:20px 20px 40px;margin:0;width:100%}.ProveLeft[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%]{width:100%}.seatBack[_ngcontent-%COMP%]{padding:20px 20px 40px;margin:0}.secHeadingDiv[_ngcontent-%COMP%]{height:unset}.newBtnTextB[_ngcontent-%COMP%]{display:block}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{position:static}.newBtnTextB[_ngcontent-%COMP%]   .min330[_ngcontent-%COMP%]{min-height:unset}.proveFooter[_ngcontent-%COMP%]{display:none!important}.articleDiv70[_ngcontent-%COMP%]{width:100%;padding:0 10px 0 20px}.articleDiv30[_ngcontent-%COMP%]{padding:0 20px 0 10px;width:100%}.ArticleHeadImg[_ngcontent-%COMP%], .tweeterHeaderImg[_ngcontent-%COMP%]{width:0}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:25px}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after{width:100px;left:-100px}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:15px}.hireSeatBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;color:#fff;min-width:200px;font-size:18px;font-family:gilroybold;height:60px;border-radius:5px;display:flex;align-items:center;justify-content:space-around}.KnowMoreBtn[_ngcontent-%COMP%]{display:none;height:40px;min-width:150px!important;font-size:16px!important}.KnowMoreBtn[_ngcontent-%COMP%]   .arrowImg[_ngcontent-%COMP%]{display:none;width:20px!important}.proveHead[_ngcontent-%COMP%]{display:none!important}.proveText[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:22px}.ProveInnerMain[_ngcontent-%COMP%]{display:block}.recruiterCommityInner[_ngcontent-%COMP%]{padding:20px;width:100%;float:left}.SecHeading.blackHed[_ngcontent-%COMP%]{margin:10px 0 30px}.articleDivInner[_ngcontent-%COMP%]{display:block!important}.proveTextimg[_ngcontent-%COMP%]{width:100%;padding:0 10px}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:0}.proveText[_ngcontent-%COMP%]{width:100%}.proveText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.BoldText[_ngcontent-%COMP%]{margin:5px 0 20px}}@media only screen and (max-width:1024px) and (min-width:768px){.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:29px}}']}),e})();const I=[{path:"",component:B,children:[{path:"home",component:B},{path:"home/:id",component:B}]}];let z=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Yb({type:e}),e.\u0275inj=l.Xb({imports:[[i.c,o.g.forChild(I)],o.g]}),e})();var A=n("evil");let H=(()=>{class e{}return e.\u0275fac=function(t){return new(t||e)},e.\u0275mod=l.Yb({type:e}),e.\u0275inj=l.Xb({providers:[],imports:[[z,i.c,A.a,m.b]]}),e})()}}]);