!function(){function e(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function t(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{"ct+p":function(n,i,o){"use strict";o.r(i),o.d(i,"HomeModule",function(){return Q});var c=o("ofXK"),r=o("tyNb"),a=o("pW6c"),s=o("VITL"),l=o("3Pt+"),d=o("2AXT"),g=o("fXoL"),f=o("jhN1"),p=o("JqCM"),u=o("kWWo"),m=o("XPR2"),h=o("MkFp"),v=o("fp1T"),x=o("ZnKM"),P=o("lFQJ");function b(e,t){if(1&e&&(g.fc(0,"div",57),g.bc(1,"img",58),g.ec()),2&e){var n=g.tc(2).$implicit;g.Nb(1),g.Bc("src",n.featuredImage,g.Uc)}}function M(e,t){if(1&e&&(g.fc(0,"div",57),g.fc(1,"video",59),g.cd(2," Your browser does not support the video tag. "),g.ec(),g.ec()),2&e){var n=g.tc(2).$implicit;g.Nb(1),g.Ac("src",null==n?null:n.video,g.Uc)}}function C(e,t){if(1&e&&(g.bc(0,"iframe",61),g.uc(1,"safe")),2&e){var n=g.tc(3).$implicit;g.Ac("src",g.vc(1,1,null==n?null:n.embbedded),g.Tc)}}function _(e,t){if(1&e&&(g.fc(0,"div",57),g.ad(1,C,2,3,"iframe",60),g.ec()),2&e){var n=g.tc(2).$implicit;g.Nb(1),g.Ac("ngIf","null"!=(null==n?null:n.embbedded))}}function O(e,t){if(1&e&&g.bc(0,"p",62),2&e){var n=g.tc(2).$implicit,i=g.tc();g.Ac("innerHtml",i.truncateHTML(null==n?null:n.description),g.Sc)}}var y=function(e){return["/blog/",e]};function w(e,t){if(1&e&&(g.fc(0,"div",53),g.fc(1,"h5"),g.cd(2),g.uc(3,"date"),g.ec(),g.fc(4,"h4"),g.cd(5),g.ec(),g.ad(6,b,2,1,"div",54),g.ad(7,M,3,1,"div",54),g.ad(8,_,2,1,"div",54),g.ad(9,O,1,1,"p",55),g.fc(10,"a",56),g.cd(11,"Read More"),g.ec(),g.ec()),2&e){var n=g.tc().$implicit;g.Nb(2),g.dd(g.vc(3,7,null==n?null:n.updatedAt)),g.Nb(3),g.dd(null==n?null:n.title),g.Nb(1),g.Ac("ngIf",n.featuredImage),g.Nb(1),g.Ac("ngIf",null!=n.video),g.Nb(1),g.Ac("ngIf",n.embbedded),g.Nb(1),g.Ac("ngIf",!(null!=n&&n.featuredImage||null!=n&&n.embbedded||null!=(null==n?null:n.video))),g.Nb(1),g.Ac("routerLink",g.Fc(9,y,n.blogurl))}}function k(e,t){if(1&e&&(g.fc(0,"div",51),g.ad(1,w,12,11,"div",52),g.ec()),2&e){var n=t.index;g.Nb(1),g.Ac("ngIf",n<4)}}function T(e,t){if(1&e&&(g.fc(0,"div",65),g.bc(1,"img",66),g.fc(2,"h4",67),g.cd(3),g.ec(),g.fc(4,"p"),g.bc(5,"img",68),g.cd(6),g.ec(),g.fc(7,"div",69),g.fc(8,"h5"),g.cd(9),g.ec(),g.ec(),g.fc(10,"div",70),g.fc(11,"div",71),g.fc(12,"h3"),g.cd(13),g.uc(14,"date"),g.ec(),g.fc(15,"p"),g.cd(16),g.uc(17,"date"),g.ec(),g.ec(),g.fc(18,"div",72),g.fc(19,"h4"),g.cd(20),g.uc(21,"convertFrom24To12Format"),g.ec(),g.fc(22,"p"),g.cd(23),g.ec(),g.fc(24,"p"),g.cd(25),g.ec(),g.ec(),g.ec(),g.ec()),2&e){var n=g.tc().$implicit;g.Nb(3),g.dd(null==n?null:n.group.name),g.Nb(3),g.ed("",null==n?null:n.group.localized_location," "),g.Nb(3),g.dd(null==n?null:n.name),g.Nb(4),g.dd(g.wc(14,9,null==n?null:n.local_date,"dd")),g.Nb(3),g.dd(g.wc(17,12,null==n?null:n.local_date,"MMMM")),g.Nb(4),g.dd(g.vc(21,15,null==n?null:n.local_time)),g.Nb(3),g.fd(" Venue: ",null==n?null:n.venue.address_1," , ",null==n?null:n.venue.name," "),g.Nb(2),g.dd(null==n?null:n.venue.city)}}function D(e,t){if(1&e&&(g.fc(0,"div",63),g.ad(1,T,26,17,"div",64),g.ec()),2&e){var n=t.index;g.Nb(1),g.Ac("ngIf",n<1)}}var S,B,I,z=function(){return["/login"]},A=function(){return{sourceType:"url",url:"https://twitter.com/HireSeat?ref_src=twsrc%5Etfw"}},H=function(){return{tweetLimit:3}},F=((S=function(){function n(t,i,o,c,r,a,s,l){e(this,n),this.formBuilder=t,this._sanitizer=i,this._AuthService=o,this._blogservice=c,this.router=r,this._Userservice=a,this.spinner=s,this.route=l,this.emailValues="",this.users=[],this.leaders=[],this.resumeVisible=0,this.videoUrl="",this.verfStatus=!1,this.msgForPopup="",this.submitted=!1,this.emailSubmitted=!1,this.otpSubmitted=!1,this.blogPOstData=[],this.limit=1e3,this.article=[],window.addEventListener("scroll",this.scroll,!0)}var i,o,c;return i=n,(o=[{key:"ngOnInit",value:function(){var e=this;$(document).ready(function(){$("html, body").animate({scrollTop:0},1500)}),jQuery(".modal").modal(),this.spinner.show(),this._Userservice.getmeetup().subscribe(function(t){t?e.meetUpsData=t:(console.log("data not received"),e.spinner.hide())},function(t){console.log("error ouccured"),e.spinner.hide()}),this.limit=this.pageCount()+10,this._blogservice.getAllBlogPost(this.limit).subscribe(function(t){e.article=t.data,e.spinner.hide()},function(t){console.log(t),e.spinner.hide()}),this.route.params.subscribe(function(t){e.handleRequest(t.id)}),this.verifyEmail=this.formBuilder.group({emailVerify:["",[l.y.required,l.y.email]]}),this.verifyOtp=this.formBuilder.group({otpVerify:["",[l.y.required]]}),this.askQues=this.formBuilder.group({addQuestions:["",[l.y.required]]}),this.askusersData=this._Userservice.getaskQuesUserId()}},{key:"pageCount",value:function(){return this.article.length}},{key:"truncateHTML",value:function(e){return!e||e.length<=450?e:e.replace(/<(?:.|\n)*?>/gm,"").trim().replace(/&nbsp;/g,"").substring(0,450)+"..."}},{key:"handleRequest",value:function(e){if(null!=e){var t=jQuery("#"+e);jQuery("html,body").animate({scrollTop:t.offset().top})}}},{key:"scrollToNextSlide",value:function(){var e=jQuery("#slide-2");jQuery("html,body").animate({scrollTop:e.offset().top})}},{key:"createNewAccount",value:function(e){localStorage.setItem("Role",e),this.router.navigate(["/register"])}},{key:"logout",value:function(){this._AuthService.logout(),this.router.navigate(["/login"])}},{key:"scroll",value:function(){document.body.scrollTop>20||document.documentElement.scrollTop>20?jQuery("#myBtn").show():jQuery("#myBtn").hide()}},{key:"topFunction",value:function(){this.scrollToTop()}},{key:"scrollToTop",value:function(){!function e(){var t=document.documentElement.scrollTop||document.body.scrollTop;t>0&&(window.requestAnimationFrame(e),window.scrollTo(0,t-t/10))}()}},{key:"closeVideoModal",value:function(){jQuery("#VideoModal").modal("close")}},{key:"showVideo",value:function(e){this.videoUrl=e,jQuery("#VideoModal").modal("open");var t=document.getElementById("selectedVideo");t.pause(),setTimeout(function(){var e=t.play();null!==e&&e.catch(function(){t.play()})},1e3)}},{key:"showforumPopup",value:function(){jQuery("#forumsPop").modal("open")}},{key:"emailConfirmPopup",value:function(){jQuery("#emailConfirmPop").modal("open")}},{key:"closeEmailConfirmpopup",value:function(){jQuery("#emailConfirmPop").modal("close")}},{key:"closeForumModel",value:function(){jQuery("#forumsPop").modal("close")}},{key:"f",get:function(){return this.verifyEmail.controls}},{key:"otpVali",get:function(){return this.verifyOtp.controls}},{key:"verifyUser",value:function(){this.submitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.userverification(this.verifyEmailData).subscribe(function(e){},function(e){console.log(e)}))}},{key:"onSubmit",value:function(){var e=this;this.emailSubmitted=!0,this.verifyEmail.invalid||(this.verifyEmailData=this.verifyEmail.value,this._Userservice.sendEmail(this.verifyEmailData).subscribe(function(t){(t.status="success")&&(e.msgForPopup=t.message,t.data&&(e.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data))),e.emailConfirmPopup())},function(e){return console.log(e)}))}},{key:"checkOtp",value:function(){var e=this;this.otpSubmitted=!0,this.verifyOtp.invalid||(this.verifyEmailData=this.verifyEmail.value,this.verifyOtp.value.email=this.verifyEmailData.emailVerify,this.verifyOtpData=this.verifyOtp.value,this._Userservice.checkOtpEm(this.verifyOtpData).subscribe(function(t){e.verfStatus=t.data.isVerified,localStorage.setItem("askQuestionUser",JSON.stringify(t.data)),((t.status="success")||(t.status="failed"))&&(e.msgForPopup=t.message,e.emailConfirmPopup())},function(t){e.msgForPopup=t,e.emailConfirmPopup()}))}},{key:"navigate",value:function(e){this.router.navigate(["/blog/",e])}},{key:"addQuest",value:function(){var e=this;this.askusersData=this._Userservice.getaskQuesUserId();var t=JSON.parse(this.askusersData);if(console.log(t),null==t)this.msgForPopup="Please Verfiy with Email  then ask Questions",this.emailConfirmPopup();else if(1==t.isVerified||1==this.verfStatus){this.submitted=!0,this.askQuesData=this.askQues.value;var n=this.askQuesData;n.otp=t.Otp,n.email=t.email,console.log(n),this._Userservice.addQuestion(n).subscribe(function(t){(t.status="success")&&(e.msgForPopup=t.message,e.emailConfirmPopup(),setTimeout(function(){e.router.navigate(["/forum"])},2e3))},function(e){return console.log(e)})}else{this.askQuesData=this.askQues.value;var i=this.askQuesData;i.otp=t.Otp,i.email=t.email,this._Userservice.addQuestion(i).subscribe(function(t){(t.status="success")&&(e.msgForPopup=t.message,e.emailConfirmPopup(),setTimeout(function(){e.router.navigate(["/forum"])},2e3))},function(e){return console.log(e)})}}}])&&t(i.prototype,o),c&&t(i,c),n}()).\u0275fac=function(e){return new(e||S)(g.ac(l.f),g.ac(f.b),g.ac(a.a),g.ac(d.a),g.ac(r.c),g.ac(s.a),g.ac(p.c),g.ac(r.a))},S.\u0275cmp=g.Ub({type:S,selectors:[["app-home"]],decls:122,vars:8,consts:[["id","home-page",1,"homePageMain"],[1,"bestRecruitment"],["src","assets/img/firstSec.png",1,"sectionBGimg"],[1,"bestRecruitmentText"],[1,"ThinTextHeading"],[1,"BoldText"],[1,"hireSeatBtn"],[2,"color","#ffffff",3,"routerLink"],[1,"KnowMoreBtn",3,"click"],["src","assets/img/arrow.png",1,"arrowImg"],["id","slide-2",1,"ProveBest"],[1,"ProveBestInner"],[1,"proveHead"],[1,"width50"],["src","assets/img/provebg.png","loading","lazy",1,"headeLeftImg"],["src","assets/img/sitBg.png","loading","lazy",1,"SeatBAchH"],[1,"ProveInnerMain"],[1,"width50","ProveLeft"],[1,"secHeadingDiv"],[1,"SecHeading"],[1,"leftSectionPara","paddT30"],[1,"width100","min200"],[1,"proveTextimg"],["src","assets/img/candidate.png",1,""],[1,"proveText"],["src","assets/img/deal.png",1,""],[1,"newBtnTextB"],["src","assets/img/crm.png",1,""],[1,"width50","seatBack"],[1,"rightSectionPara","paddT30"],["src","assets/img/accounting.png",1,""],["src","assets/img/transperacy.png",1,"marB20"],[1,"newBtnTextB","min200"],[1,"width100"],["src","assets/img/competition.png",1,""],[1,"proveFooter"],["src","assets/img/prove_lowerBg.png",1,"bottomLeftImg"],["src","assets/img/sit_lowerBg.png",1,""],[1,"articleDiv"],[1,"articleDivInner1"],[1,"articleDiv70"],["src","assets/img/article.png",1,"ArticleHeadImg"],[1,"articleDiv30"],["src","assets/img/twitter.png",1,"tweeterHeaderImg"],[1,"articleDivInner"],[1,"SecHeading","blackHed"],[1,"row","mar0","flexWrap","scrollDiv"],["class","col m12 l6 marB20",4,"ngFor","ngForOf"],[1,"boxDiv"],["data-width","280","data-height","300",3,"data","opts"],["class","recruterMain",4,"ngFor","ngForOf"],[1,"col","m12","l6","marB20"],["class","ArticleDiv",4,"ngIf"],[1,"ArticleDiv"],["class","postimage",4,"ngIf"],[3,"innerHtml",4,"ngIf"],[3,"routerLink"],[1,"postimage"],["loading","lazy",3,"src"],["id","selectedVideo","height","100%","width","100%","controls","",3,"src"],["width","100%","height","100%","loading","lazy",3,"src",4,"ngIf"],["width","100%","height","100%","loading","lazy",3,"src"],[3,"innerHtml"],[1,"recruterMain"],["class","recruterInner",4,"ngIf"],[1,"recruterInner"],["src","assets/img/staue.png","loading","lazy",1,"staueIcon"],[1,"SecHeading","text-center"],["src","assets/img/location.png","loading","lazy",1,"staueIcon"],[1,"lineSide"],[1,"DateTime"],[1,"date"],[1,"Time"]],template:function(e,t){1&e&&(g.bc(0,"app-navbar"),g.fc(1,"div",0),g.fc(2,"div",1),g.bc(3,"img",2),g.fc(4,"div",3),g.fc(5,"h3",4),g.cd(6," Make your case Directly to Professional Recruiters from"),g.bc(7,"br"),g.cd(8," the Leading Companies in the World and "),g.bc(9,"br"),g.cd(10,"Avoid Automated Screenings "),g.ec(),g.fc(11,"h3",5),g.cd(12," Receive Free Feedback on your Pitch,"),g.bc(13,"br"),g.cd(14," Resume and Linkedin from Recruiters Specializing in Your Industry "),g.ec(),g.fc(15,"div",6),g.fc(16,"a",7),g.cd(17,"Login"),g.ec(),g.ec(),g.fc(18,"button",8),g.pc("click",function(){return t.scrollToNextSlide()}),g.cd(19," Know More "),g.bc(20,"img",9),g.ec(),g.ec(),g.ec(),g.fc(21,"div",10),g.fc(22,"div",11),g.fc(23,"div",12),g.fc(24,"div",13),g.bc(25,"img",14),g.ec(),g.fc(26,"div",13),g.bc(27,"img",15),g.ec(),g.ec(),g.fc(28,"div",16),g.fc(29,"div",17),g.fc(30,"div",18),g.fc(31,"h4",19),g.cd(32,"Candidates"),g.ec(),g.ec(),g.fc(33,"div",20),g.fc(34,"div",21),g.fc(35,"div",22),g.bc(36,"img",23),g.ec(),g.fc(37,"div",24),g.fc(38,"h5"),g.cd(39," State your Value Proposition to Professional Recruiters focused on specific Roles, Industries, Companies and Locations "),g.ec(),g.fc(40,"p"),g.cd(41," From developer roles in large tech companies in San Francisco, accounting roles in the Big 4 in NYC or engineering roles with a DoD contractor in Virgina, pitch yourself directly and avoid being screened by an ATS. "),g.ec(),g.ec(),g.ec(),g.fc(42,"div",21),g.fc(43,"div",22),g.bc(44,"img",25),g.ec(),g.fc(45,"div",24),g.fc(46,"h5"),g.cd(47," Get Coaching for your Product Control interview with a financial firm from a recruiter who has years of experience placing that exact role in the biggest banks on Wall St "),g.ec(),g.fc(48,"p"),g.cd(49," Gain real insights, true understanding, and professional advice from seasoned professionals on: "),g.bc(50,"br"),g.cd(51," - Interviewing"),g.bc(52,"br"),g.cd(53," - Job Seeking Strategy"),g.bc(54,"br"),g.cd(55," - Resume Review"),g.bc(56,"br"),g.cd(57," - Linkedin Review "),g.ec(),g.ec(),g.ec(),g.fc(58,"div",26),g.fc(59,"div",21),g.fc(60,"div",22),g.bc(61,"img",27),g.ec(),g.fc(62,"div",24),g.fc(63,"h5"),g.cd(64,"Q&A with a Professional Recruiters"),g.ec(),g.fc(65,"p"),g.cd(66," Ask any question and learn how the recruiting process works through the lens of a professional who places candidates in your dream job in your dream company every day. Find out what you are missing and what is holding you back from your dream job. "),g.ec(),g.ec(),g.ec(),g.ec(),g.ec(),g.ec(),g.fc(67,"div",28),g.fc(68,"div",18),g.fc(69,"h4",19),g.cd(70,"Recruiters"),g.ec(),g.ec(),g.fc(71,"div",29),g.fc(72,"div",21),g.fc(73,"div",22),g.bc(74,"img",30),g.ec(),g.fc(75,"div",24),g.fc(76,"h5"),g.cd(77,"Set your Rate and Set your Availability"),g.ec(),g.fc(78,"p"),g.cd(79," Monetize the experience and skill sets you have developed over the years by posting what you feel your time is worth and have the flexibility to provide more or less of your service by the week. "),g.ec(),g.ec(),g.ec(),g.fc(80,"div",21),g.fc(81,"div",22),g.bc(82,"img",31),g.ec(),g.fc(83,"div",24),g.fc(84,"h5"),g.cd(85," Expand your personal or business brand to a whole new market "),g.ec(),g.fc(86,"p"),g.cd(87," HireSeat will help promote you or your company to gain awareness as an SME from hiring managers and attract more business. "),g.ec(),g.ec(),g.ec(),g.fc(88,"div",32),g.fc(89,"div",33),g.fc(90,"div",22),g.bc(91,"img",34),g.ec(),g.fc(92,"div",24),g.fc(93,"h5"),g.cd(94," Build relationships with candidates and future hiring managers quickly and efficiently "),g.ec(),g.fc(95,"p"),g.cd(96," By helping candidates you are helping future hiring managers that can help you develop your business. Each coaching session is focused, light touch, and limited to a maximum of an hour "),g.ec(),g.ec(),g.ec(),g.ec(),g.ec(),g.ec(),g.ec(),g.fc(97,"div",35),g.fc(98,"div",13),g.bc(99,"img",36),g.ec(),g.fc(100,"div",13),g.bc(101,"img",37),g.ec(),g.ec(),g.ec(),g.ec(),g.bc(102,"app-media"),g.fc(103,"div",38),g.fc(104,"div",39),g.fc(105,"div",40),g.bc(106,"img",41),g.ec(),g.fc(107,"div",42),g.bc(108,"img",43),g.ec(),g.ec(),g.fc(109,"div",44),g.fc(110,"div",40),g.fc(111,"h4",45),g.cd(112,"Article"),g.ec(),g.fc(113,"div",46),g.ad(114,k,2,1,"div",47),g.ec(),g.ec(),g.fc(115,"div",42),g.fc(116,"h4",19),g.cd(117,"Twitter"),g.ec(),g.fc(118,"div",48),g.bc(119,"ngx-twitter-timeline",49),g.ec(),g.ec(),g.ec(),g.ec(),g.ad(120,D,2,1,"div",50),g.ec(),g.bc(121,"app-footer")),2&e&&(g.Nb(16),g.Ac("routerLink",g.Ec(5,z)),g.Nb(98),g.Ac("ngForOf",t.article),g.Nb(5),g.Ac("data",g.Ec(6,A))("opts",g.Ec(7,H)),g.Nb(1),g.Ac("ngForOf",t.meetUpsData))},directives:[u.a,r.f,m.a,c.n,h.a,v.a,c.o],pipes:[c.f,x.a,P.a],styles:['.sectionBGimg[_ngcontent-%COMP%]{width:100%;height:auto}.bestRecruitment[_ngcontent-%COMP%]{position:relative}.bestRecruitmentText[_ngcontent-%COMP%]{position:absolute;top:40%;left:36%;transform:translate(-50%,-50%)}.BoldText[_ngcontent-%COMP%]{margin:5px 0 40px;font-family:gilroybold}.ThinTextHeading[_ngcontent-%COMP%]{margin:0 0 20px;font-family:gilroyregular}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:28px;color:#1c2d41}.KnowMoreBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;color:#fff;min-width:200px;font-size:18px;font-family:gilroybold;height:60px;border-radius:5px;display:flex;align-items:center;justify-content:space-around}.width50[_ngcontent-%COMP%]{width:50%;float:left}.width100[_ngcontent-%COMP%]{width:100%;float:left}.min200[_ngcontent-%COMP%]{min-height:200px}.paddT30[_ngcontent-%COMP%]{padding-top:30px}.proveTextimg[_ngcontent-%COMP%]{width:15%;float:left}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin:30px 0}.proveHead[_ngcontent-%COMP%]{display:flex;align-items:flex-end;margin:0 0 -.5555vw}.proveHead[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.SecHeading[_ngcontent-%COMP%]{font-size:45px;color:#fff;font-family:gilroyextrabold}.proveText[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:24px;color:#fff;font-family:gilroybold;margin:20px 0}.proveText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-family:gilroyregular;color:#fff;font-size:17px;line-height:1.5}.headeLeftImg[_ngcontent-%COMP%]{margin:0 0 -.0155vw}.bottomLeftImg[_ngcontent-%COMP%]{margin:-.355vw 0 0}a[_ngcontent-%COMP%]{cursor:pointer}.flexRow[_ngcontent-%COMP%]{display:flex;align-items:center}.marB50[_ngcontent-%COMP%]{margin-bottom:50px}.marB20[_ngcontent-%COMP%]{margin-bottom:20px}.proveText[_ngcontent-%COMP%]{padding:0 10px;width:75%;float:left}.transparentBtn[_ngcontent-%COMP%]{height:70px;border:3px solid #fff;background-color:transparent;color:#fff;display:flex;align-items:center;justify-content:space-around;min-width:100%;border-radius:5px;font-family:gilroybold;font-size:20px}.paddL60[_ngcontent-%COMP%]{padding-left:60px}.paddR60[_ngcontent-%COMP%]{padding-right:60px}.SecHeading.blackHed[_ngcontent-%COMP%]{color:#1c2d41;text-align:center;margin:80px 0}.imgDivVideoDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1c2d41;font-size:20px;font-family:gilroybold;padding:10px 20px;line-height:1.3}.VideoImg[_ngcontent-%COMP%]{width:100%;height:320px;-o-object-fit:contain;object-fit:contain;background-color:#000}.recruiterCommityInner[_ngcontent-%COMP%]{padding:20px 90px}.imgDivVideoDiv[_ngcontent-%COMP%]{background-color:#fff;box-shadow:0 0 7px hsla(0,0%,86.7%,.3411764705882353);margin-bottom:40px;padding:0 0 20px}.paddLR20[_ngcontent-%COMP%]{padding:0 20px}.homePageMain[_ngcontent-%COMP%]{background-color:#fbfbfb}.arows[_ngcontent-%COMP%]{margin:0 15px}.text-center[_ngcontent-%COMP%]{text-align:center}.ProveLeft[_ngcontent-%COMP%]{background-color:#3ea9f5;padding:0 20px 0 100px}.seatBack[_ngcontent-%COMP%]{background-color:#0964d9;padding:0 40px 0 90px;margin:0}.SeatBAchH[_ngcontent-%COMP%]{margin:0 0 2px!important}.proveFooter[_ngcontent-%COMP%]{display:flex;width:100%;align-items:flex-start}.proveFooter[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{width:100%}.ProveInnerMain[_ngcontent-%COMP%]{display:flex}.proveF[_ngcontent-%COMP%]{margin:-6px 0 0}.newBtnTextB[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center}.boxDiv[_ngcontent-%COMP%]{max-height:970px;overflow-y:auto}.articleDiv70[_ngcontent-%COMP%]{width:63%;background-color:#0aafff;padding:0 70px 0 100px}.articleDiv30[_ngcontent-%COMP%], .articleDiv70[_ngcontent-%COMP%]{float:left;position:relative}.articleDiv30[_ngcontent-%COMP%]{width:37%;background-color:#1c2d41;padding:0 180px 0 60px}.articleDiv30[_ngcontent-%COMP%]   .SecHeading[_ngcontent-%COMP%]{margin:40px 0}.articleDivInner[_ngcontent-%COMP%]{float:left;width:100%;display:flex;padding:0}.min330[_ngcontent-%COMP%]{min-height:330px}.flexC[_ngcontent-%COMP%]{display:flex;align-items:center;position:relative}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{width:100%;position:absolute;bottom:50px}.articleDiv70[_ngcontent-%COMP%]   .SecHeading.blackHed[_ngcontent-%COMP%]{color:#1c2d41;text-align:left;margin:40px 0}.ArticleDiv[_ngcontent-%COMP%]{background-color:#fff;padding:25px;margin:20px 0 0;display:block;height:100%}.even[_ngcontent-%COMP%]   p[_ngcontent-%COMP%], .odd[_ngcontent-%COMP%]{display:none}.ArticleDiv[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#1c2d41;font-size:20px;margin:10px 0;font-family:gilroysemibold}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#1c2d41;font-size:35px;font-family:gilroybold}.ArticleDiv[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#1c2d41;font-size:15px;font-family:gilroymedium}.ArticleHeadImg[_ngcontent-%COMP%], .tweeterHeaderImg[_ngcontent-%COMP%]{width:100%}.mar0[_ngcontent-%COMP%]{margin:0}.articleDivInner1[_ngcontent-%COMP%]   .articleDiv30[_ngcontent-%COMP%], .articleDivInner1[_ngcontent-%COMP%]   .articleDiv70[_ngcontent-%COMP%]{padding:0;background-color:unset}.articleDivInner1[_ngcontent-%COMP%]{display:flex;align-items:flex-end;margin:0 0 -.455vw;width:100%}.articleDiv[_ngcontent-%COMP%]{margin:0}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar{width:5px}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-track{background:#f1f1f1}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-thumb{background:#0aafff;border-radius:10px}.boxDiv[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover{background:#555}.recruterMain[_ngcontent-%COMP%]{width:100%;float:left}.recruterInner[_ngcontent-%COMP%]{max-width:600px;margin:50px auto;text-align:center}.staueIcon[_ngcontent-%COMP%]{filter:invert(1);margin:0 10px}.recruterInner[_ngcontent-%COMP%]   .SecHeading[_ngcontent-%COMP%]{font-size:40px;margin:10px 0;text-transform:uppercase}.recruterInner[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:#c4c5cb;font-size:23px;display:flex;align-items:center;justify-content:center;margin:0;line-height:1}.recruterInner[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{color:#fff;text-transform:uppercase;font-size:20px;margin:10px 0;font-family:gilroybold;width:80%;position:relative}.lineSide[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;position:relative;margin:30px 0}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after{left:-150px}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after, .lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:before{width:130px;position:absolute;content:"";height:3px;background-color:#fff;top:40%}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:before{right:-150px}.DateTime[_ngcontent-%COMP%]{display:flex;margin:25px 0}.date[_ngcontent-%COMP%]{border-right:1px solid #fff;min-width:170px}.date[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:80px;color:#fff;font-family:gilroyregular;margin:0;line-height:1}.date[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:20px!important;margin:0!important;line-height:1}.Time[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 15px;text-align:left;color:#fff;font-size:30px;font-family:gilroyregular}.Time[_ngcontent-%COMP%]{padding:0 25px}.Time[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{text-align:left!important;font-size:17px!important;display:block!important;font-family:gilroyregular;margin:7px 0 0!important}.postimage[_ngcontent-%COMP%]{width:100%;padding:0;max-height:210px;height:210px;border:none}.postimage[_ngcontent-%COMP%]   iframe[_ngcontent-%COMP%], .postimage[_ngcontent-%COMP%]   img[_ngcontent-%COMP%], .postimage[_ngcontent-%COMP%]   video[_ngcontent-%COMP%]{height:200px;width:100%}.flexWrap[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap}.footerSection[_ngcontent-%COMP%]{width:100%;float:left;padding:50px 100px;background-color:#0a111a}.footerSection[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{color:#fff;font-size:17px;font-family:gilroyregular;margin:15px 0}.footerSection[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:14px;color:#858c94;margin:10px 0}.marB30[_ngcontent-%COMP%]{margin-bottom:30px!important}.Emailtext[_ngcontent-%COMP%]{position:relative;margin:20px 0 0}.emailF[_ngcontent-%COMP%]{position:absolute;top:15px;left:15px;filter:brightness(235%)}.Emailtext[_ngcontent-%COMP%]   input[type=text][_ngcontent-%COMP%]{border:none!important;background-color:#fff!important;border-radius:5px!important;padding:0 0 0 50px!important;width:100%!important;height:50px!important;box-sizing:border-box}.SearchBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;min-width:151px;height:50px;border-radius:5px;color:#fff;font-size:18px}.FooterBottom[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:space-between;border-top:.5px solid #1c2d41;padding:30px 0}.FooterBottom[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{text-decoration:none;color:#858c94;font-size:13px}.hireSeatBtn[_ngcontent-%COMP%]{min-width:150px!important;font-size:16px!important;display:none}@media only screen and (min-width:768px) and (max-width:1024px){.bestRecruitment[_ngcontent-%COMP%]{height:560px}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:29px}.bestRecruitmentText[_ngcontent-%COMP%]{top:50%;left:35%;width:50%}.paddT30[_ngcontent-%COMP%]{padding-top:110px}.SecHeading[_ngcontent-%COMP%]{font-size:35px}.ProveLeft[_ngcontent-%COMP%]{padding:0 0 0 20px;margin:-2px 0 0}.ProveLeft[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%]{width:100%}.seatBack[_ngcontent-%COMP%]{padding:0 0 0 20px;margin:-3px 0 0}.proveText[_ngcontent-%COMP%], .proveTextimg[_ngcontent-%COMP%]{width:100%;padding:0 10px}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:0}.newBtnTextB[_ngcontent-%COMP%]{display:block}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{position:static}.newBtnTextB[_ngcontent-%COMP%]   .min330[_ngcontent-%COMP%]{min-height:unset}.proveFooter[_ngcontent-%COMP%]{margin:-10px 0 0}.SecHeading[_ngcontent-%COMP%]{font-size:40px}.articleDiv70[_ngcontent-%COMP%]{width:60%;padding:0 10px 0 20px}.articleDiv30[_ngcontent-%COMP%]{padding:0 20px 0 10px;width:50%}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:25px}.articleDivInner1[_ngcontent-%COMP%]{margin:0 0 -1vw}.SeatBAchH[_ngcontent-%COMP%]{margin:0!important}.headeLeftImg[_ngcontent-%COMP%]{margin:0 0 -.1vw}.flexWrap.scrollDiv[_ngcontent-%COMP%]{max-height:1000px;overflow-y:auto}}@media only screen and (min-width:320px) and (max-width:767px){.bestRecruitment[_ngcontent-%COMP%]{min-height:500px}.bestRecruitmentText[_ngcontent-%COMP%]{top:50%;left:40%;width:55%}.SecHeading[_ngcontent-%COMP%]{font-size:26px}.ProveLeft[_ngcontent-%COMP%]{padding:20px 20px 40px;margin:0;width:100%}.ProveLeft[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%], .seatBack[_ngcontent-%COMP%]   .width50[_ngcontent-%COMP%]{width:100%}.seatBack[_ngcontent-%COMP%]{padding:20px 20px 40px;margin:0}.secHeadingDiv[_ngcontent-%COMP%]{height:unset}.newBtnTextB[_ngcontent-%COMP%]{display:block}.flexC[_ngcontent-%COMP%]   .proveText[_ngcontent-%COMP%]{position:static}.newBtnTextB[_ngcontent-%COMP%]   .min330[_ngcontent-%COMP%]{min-height:unset}.proveFooter[_ngcontent-%COMP%]{display:none!important}.articleDiv70[_ngcontent-%COMP%]{width:100%;padding:0 10px 0 20px}.articleDiv30[_ngcontent-%COMP%]{padding:0 20px 0 10px;width:100%}.ArticleHeadImg[_ngcontent-%COMP%], .tweeterHeaderImg[_ngcontent-%COMP%]{width:0}.ArticleDiv[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{font-size:25px}.lineSide[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]:after{width:100px;left:-100px}.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:15px}.hireSeatBtn[_ngcontent-%COMP%]{background-color:#0aafff;border:none;color:#fff;min-width:200px;font-size:18px;font-family:gilroybold;height:60px;border-radius:5px;display:flex;align-items:center;justify-content:space-around}.KnowMoreBtn[_ngcontent-%COMP%]{display:none;height:40px;min-width:150px!important;font-size:16px!important}.KnowMoreBtn[_ngcontent-%COMP%]   .arrowImg[_ngcontent-%COMP%]{display:none;width:20px!important}.proveHead[_ngcontent-%COMP%]{display:none!important}.proveText[_ngcontent-%COMP%]   h5[_ngcontent-%COMP%]{font-size:22px}.ProveInnerMain[_ngcontent-%COMP%]{display:block}.recruiterCommityInner[_ngcontent-%COMP%]{padding:20px;width:100%;float:left}.SecHeading.blackHed[_ngcontent-%COMP%]{margin:10px 0 30px}.articleDivInner[_ngcontent-%COMP%]{display:block!important}.proveTextimg[_ngcontent-%COMP%]{width:100%;padding:0 10px}.proveTextimg[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{margin-bottom:0}.proveText[_ngcontent-%COMP%]{width:100%}.proveText[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:16px}.BoldText[_ngcontent-%COMP%]{margin:5px 0 20px}}@media only screen and (max-width:1024px) and (min-width:768px){.bestRecruitmentText[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:29px}}']}),S),N=[{path:"",component:F,children:[{path:"home",component:F},{path:"home/:id",component:F}]}],R=((B=function t(){e(this,t)}).\u0275fac=function(e){return new(e||B)},B.\u0275mod=g.Yb({type:B}),B.\u0275inj=g.Xb({imports:[[c.c,r.g.forChild(N)],r.g]}),B),E=o("evil"),Q=((I=function t(){e(this,t)}).\u0275fac=function(e){return new(e||I)},I.\u0275mod=g.Yb({type:I}),I.\u0275inj=g.Xb({providers:[],imports:[[R,c.c,E.a,h.b]]}),I)}}])}();