(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[232],{2410:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/champions/view",function(){return a(7574)}])},9985:function(e,t,a){"use strict";var n=a(5893);a(7294);var i=a(1899),o=a.n(i),s=a(4436);a(1664),t.Z=function(){let{adminLogout:e}=(0,s.a)(),t=async()=>{e(),window.location.href="/"};return(0,n.jsx)("header",{className:o().headerStyle,children:(0,n.jsxs)("div",{className:o().Hstyle,children:[(0,n.jsx)("h3",{className:o().textStyle,children:"Admin Dashboard"}),(0,n.jsx)("button",{onClick:t,className:o().buttonStyle,children:(0,n.jsx)("p",{children:"Logout"})})]})})}},8637:function(e,t,a){"use strict";a.d(t,{Z:function(){return m}});var n=a(5893),i=a(7294),o=a(2641),s=a(5675),r=a.n(s),c=e=>{let{team:t,activeTeam:a}=e,[s,c]=(0,i.useState)("false"),l=a===t.index;return(0,n.jsxs)("div",{children:[(0,n.jsx)(o.Z,{className:"curtain-form ".concat(l?"":"hidden"),children:(0,n.jsx)(r(),{unoptimized:!0,alt:"",width:100,height:100,htmlFor:"".concat(t.index),src:"/trophy.svg",className:"icon-trophy",onClick:()=>c("true"===s?"false":"true")})}),(0,n.jsx)("div",{clicked:s,className:"curtain ".concat(l?"":"hidden"),children:(0,n.jsxs)("div",{className:"content",children:[(0,n.jsx)("h2",{children:t.name}),(0,n.jsx)("h3",{children:t.competition}),(0,n.jsx)("h3",{children:t.award})]})})]})},l=a(5522),d=a(1330);function m(){let[e,t]=(0,i.useState)(0),[a,o]=(0,i.useState)([]),[s,r]=(0,i.useState)(0);return(0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/champion_api"),t=(await e.json()).data.mongoData.map((e,t)=>({name:e.teamName||"Name Not Available",competition:e.competitionDescription||"Description Not Available",award:e.awardDes||"Award Not Available",image:e.image||"/champ-bg.png",images:e.images||[],index:t}));o(t),console.log("teamList state:",a)}catch(e){console.error("Error fetching data:",e)}})()},[a]),(0,i.useEffect)(()=>{t(s)},[s]),(0,n.jsx)("main",{className:"champCardMain",children:(0,n.jsx)("div",{className:"Champcontainer",children:(0,n.jsxs)("div",{className:"slider",children:[(0,n.jsx)(l.Z,{className:"carousel",onSlide:e=>r(e),children:a.map((e,t)=>(0,n.jsx)(l.Z.Item,{id:t,className:"carousel-item",children:(0,n.jsx)(d.Z,{className:"carousel-img",src:e.images[0],alt:"image-${index}",fluid:!0,unoptimized:!0})},t))}),a.map((t,a)=>(0,n.jsx)(c,{team:{...t},activeTeam:e},a))]})})})}},3026:function(e,t,a){"use strict";a.r(t),a.d(t,{default:function(){return _}});var n=a(5893),i=a(7294),o=a(856),s=a.n(o),r=a(1993),c=a.n(r),l=a(7148),d=a.n(l);a(5675);var m=a(1163),p=a(4436);function _(e){let{isUpdate:t,championToUpdate:a,onUpdateSuccess:o,order:r,teamList:l,setTeamList:_,close:h}=e,{isAdmin:u}=(0,p.a)(),b=(0,m.useRouter)(),[x,j]=(0,i.useState)({teamName:"",competitionDescription:"",awardDes:"",images:"",teamOrder:r}),[f,g]=(0,i.useState)("");async function w(e){e.preventDefault();let n=new URLSearchParams,i="";try{let e=document.getElementById("Image").files[0];if(e){let t=new FormData;t.append("file",e),t.append("upload_preset","lzz18aot");let a=await fetch("https://api.cloudinary.com/v1_1/dhjapmqga/image/upload",{method:"POST",body:t});if(!a.ok)throw Error("Failer to upload image.");i=(await a.json()).secure_url}n.append("teamName",x.teamName),n.append("competitionDescription",x.competitionDescription),n.append("awardDes",x.awardDes),i?n.append("images",i):n.append("images",""),console.log("params "+n),console.log("Params "+n);let s=t?"/api/champion_api?id=".concat(a.id):"/api/champion_api";(await fetch(s,{method:t?"PUT":"POST",body:n,headers:{"Content-Type":"application/x-www-form-urlencoded"}})).ok?(console.log("Champion ".concat(t?"updated":"created"," successfully!")),o&&o()):console.error("Failed to ".concat(t?"update":"create"," champion"))}catch(e){console.error("Error ".concat(t?"updating":"creating"," champion:"),e)}}(0,i.useEffect)(()=>{t&&a&&(j({id:a.id||"",teamName:a.name||"",competitionDescription:a.competition||"",awardDes:a.award||"",image:a.image||""}),g(a.images||""))},[t,a,r]);let N=e=>{let{name:t,value:a}=e.target;j({...x,[t]:a})};return(0,i.useEffect)(()=>{u||b.push("/login")},[u,b]),(0,n.jsx)("div",{children:(0,n.jsxs)("div",{className:s().modal,children:[(0,n.jsx)("p",{className:s().close,onClick:h,children:"\xd7"}),(0,n.jsxs)("div",{className:s().header,style:{fontSize:"30px"},children:[" ",t?"Update":"Add New"," Champion"]}),(0,n.jsx)("div",{className:s().content,children:(0,n.jsxs)("form",{style:{padding:"20px",margin:"auto",width:"100%"},className:d().form,onSubmit:w,children:[(0,n.jsx)("label",{htmlFor:"teamName",children:"Team Name"}),(0,n.jsx)("input",{type:"text",id:"teamName",name:"teamName",placeholder:a?a.teamName:"",value:x.teamName,onChange:N,required:!0}),(0,n.jsx)("br",{}),(0,n.jsx)("label",{htmlFor:"competitionDescription",children:"Competition Description"}),(0,n.jsx)("input",{type:"text",id:"competitionDescription",name:"competitionDescription",placeholder:a?a.competitionDescription:"",value:x.competitionDescription,onChange:N,required:!0}),(0,n.jsx)("br",{}),(0,n.jsx)("label",{htmlFor:"awardDes",children:"Award Description"}),(0,n.jsx)("input",{type:"text",id:"awardDes",name:"awardDes",placeholder:a?a.awardDes:"",value:x.awardDes,onChange:N,required:!0}),(0,n.jsx)("br",{}),(0,n.jsx)("br",{}),(0,n.jsx)("label",{children:"Images"}),(0,n.jsx)("input",{id:"Image",type:"file",name:"images",accept:".jpg, .jpeg, .png",required:!0}),(0,n.jsx)("br",{}),(0,n.jsxs)("button",{style:{marginTop:"5%",marginLeft:"30%"},className:"".concat(c().btn," ").concat(c().btnBottom),type:"submit",children:[t?"Update":"Add","Champion"]})]})})]})})}},7574:function(e,t,a){"use strict";a.r(t);var n=a(5893),i=a(7294),o=a(8637),s=a(1993),r=a.n(s),c=a(3026),l=a(9985),d=a(2345),m=a(1163),p=a(4436);function _(){let[e,t]=(0,i.useState)([]),[a,s]=(0,i.useState)(null),_=(0,m.useRouter)(),{isAdmin:h}=(0,p.a)();(0,i.useEffect)(()=>{(async()=>{try{let e=await fetch("../../api/champion_api"),a=(await e.json()).data.mongoData.map((e,t)=>({id:e._id,name:e.teamName||!1,competition:e.competitionDescription||!1,award:e.awardDes||!1,images:e.image||"",available:e.teamName||!1,index:t,teamOrder:e.teamOrder||t}));a=a.sort((e,t)=>e.teamOrder-t.teamOrder),t(a)}catch(e){console.error("Error fetching data:",e)}})()},[]);let u=async()=>{window.location.href="/admin/dashboard/view"},b=e=>{s(t=>t===e?null:e)},x=async(e,t)=>{switch(e){case"update":setChampionToUpdate(t),setIsUpdate(!0);break;case"delete":try{(await fetch("/api/champion_api?id=".concat(t.id),{method:"DELETE"})).ok?(console.log("Champion deleted successfully!"),j()):console.error("Failed to delete champion")}catch(e){console.error("Error deleting champion:",e)}break;case"new":setIsUpdate(!1)}},j=()=>{window.location.reload()};return(0,i.useEffect)(()=>{h||_.push("/login")},[h,_]),(0,n.jsxs)("div",{children:[(0,n.jsx)(l.Z,{}),(0,n.jsx)(o.Z,{}),(0,n.jsx)("div",{className:r().divTable,children:(0,n.jsxs)("table",{className:r().mainTable,children:[(0,n.jsx)("thead",{className:r().tableHeading,children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Team name"}),(0,n.jsx)("th",{children:"Competition Description"}),(0,n.jsx)("th",{children:"Award Description"}),(0,n.jsx)("th",{children:"Actions"})]})}),(0,n.jsx)("tbody",{children:e.map((i,o)=>{let s=a!==o,l=e.map(e=>e.teamOrder),m=Array.from({length:e.length},(e,t)=>t+1).find(e=>!l.includes(e));return(0,n.jsxs)("tr",{className:r().tableRow,children:[(0,n.jsx)("td",{children:i?i.name:"No teams here"}),(0,n.jsx)("td",{children:i?i.competition:""}),(0,n.jsx)("td",{children:i?i.award:""}),(0,n.jsx)("td",{className:r().btnContainer,children:(0,n.jsx)("div",{className:r().btnTableDiv,children:i&&i.available?(0,n.jsx)(n.Fragment,{children:(0,n.jsxs)("div",{className:r().btnBottomDiv,children:[(0,n.jsx)(d.Z,{modal:!0,trigger:(0,n.jsx)("button",{className:"".concat(r().btn," ").concat(r().btnBottom),onClick:()=>{x("update",i),b(o)},children:s?"Update":"Cancel"}),children:a=>(0,n.jsx)(c.default,{isUpdate:!0,championToUpdate:i||null,onUpdateSuccess:j,index:o,teamList:e,setTeamList:t,close:a})}),(0,n.jsx)("br",{}),(0,n.jsx)("button",{className:"".concat(r().btn," ").concat(r().btnBottom),onClick:()=>x("delete",i),children:"Delete"})]})}):(0,n.jsx)("div",{className:r().btnBottomDiv,children:(0,n.jsx)(d.Z,{modal:!0,trigger:(0,n.jsx)("button",{className:"".concat(r().btn," ").concat(r().btnBottom),onClick:()=>{b(o),x("new")},children:s?"Add new":"Cancel"}),children:e=>(0,n.jsx)(c.default,{order:m,onUpdateSuccess:j,close:e})})})})})]},o)})})]})}),(0,n.jsx)("div",{className:r().btnBottomDiv,children:(0,n.jsx)(d.Z,{modal:!0,trigger:(0,n.jsx)("button",{className:"".concat(r().btn," ").concat(r().btnBottom),onClick:()=>{b(index),x("new")},children:"Create new"}),children:e=>(0,n.jsx)(c.default,{onUpdateSuccess:j,close:e})})}),(0,n.jsx)("div",{style:{textAlign:"center"},children:(0,n.jsx)("button",{className:"".concat(r().btn," ").concat(r().btnBottom),onClick:u,children:"Return"})})]})}_.hideLayout=!0,t.default=_},7148:function(e){e.exports={formContainer:"Admin_Form_formContainer__woS1p",formContainerTips:"Admin_Form_formContainerTips__EqLt9",userResetPasswordContainer:"Admin_Form_userResetPasswordContainer__8cHa0",formContainerAdminChangePassword:"Admin_Form_formContainerAdminChangePassword__2ZidI",form:"Admin_Form_form__TPPNs",formTips:"Admin_Form_formTips__LsRp0",inputGroup:"Admin_Form_inputGroup__tdFHl",inputGroupTips:"Admin_Form_inputGroupTips__zzKew",Row:"Admin_Form_Row__LVOvY",row:"Admin_Form_row__MxQDQ",organizerInput:"Admin_Form_organizerInput__0pcKt",hideLable:"Admin_Form_hideLable__CrPVN",btnTip:"Admin_Form_btnTip__7GRqP",contentInput:"Admin_Form_contentInput__L_npg",centered:"Admin_Form_centered__GuOUu",notificationMessage:"Admin_Form_notificationMessage__HpZle"}},1899:function(e){e.exports={body:"AdminHeader_body__yU8Dy",headerStyle:"AdminHeader_headerStyle__2hs6_",Hstyle:"AdminHeader_Hstyle__SjPis",textStyle:"AdminHeader_textStyle__knUD_",buttonStyle:"AdminHeader_buttonStyle__mkLsq"}},856:function(e){e.exports={modal:"content_modal__zzFVO",header:"content_header__bkkZB",content:"content_content__ch1N_",actions:"content_actions__S8L9P",close:"content_close__tNO7o",cotentImage:"content_cotentImage__7huai"}},1993:function(e){e.exports={divTable:"table_divTable__nZy3u",mainTable:"table_mainTable__2ozUS",tableHeading:"table_tableHeading__G1BNY",tableRow:"table_tableRow__OefgE",imageTable:"table_imageTable__8IOsJ",btnTableDiv:"table_btnTableDiv__TZLkB",btn:"table_btn__1oU_a",btnTable:"table_btnTable__M5Q8P",btnBottomDiv:"table_btnBottomDiv__9kcEX",btnBottom:"table_btnBottom__tziMg",btnForm:"table_btnForm__3wNV1"}},1163:function(e,t,a){e.exports=a(2937)}},function(e){e.O(0,[675,345,906,774,888,179],function(){return e(e.s=2410)}),_N_E=e.O()}]);