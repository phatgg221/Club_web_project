(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[438],{8756:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/samples",function(){return t(83)}])},953:function(e,n,t){"use strict";var a=t(5893),o=t(7294);n.Z=function(e){let{onChange:n,style:t,showButton:s,placeholder:i=""}=e,[r,l]=(0,o.useState)("");return(0,a.jsxs)("form",{className:"search-bar",style:t,onSubmit:e=>{e.preventDefault(),console.log("Searching for: ".concat(r))},children:[(0,a.jsx)("input",{className:"text-box",type:"search",value:r,onChange:e=>{l(e.target.value),n(e.target.value)},placeholder:i}),s&&(0,a.jsx)("button",{className:"submit-btn",type:"submit"})]})}},4759:function(e,n,t){"use strict";var a=t(5893),o=t(5932),s=t.n(o),i=t(7294),r=t(1664),l=t.n(r),c=t(2345),d=t(1398),_=t(856),m=t.n(_);n.Z=e=>{let{title:n,year:t,author:o,link:r,isTip:_,tips:u}=e,[h,p]=(0,i.useState)(!0);return(0,a.jsxs)("div",{className:s().item,children:[(0,a.jsxs)("div",{className:s().innerContainer,children:[(0,a.jsx)("h3",{className:s().title,children:_?u.tipName:n}),_&&u.tipsLink&&(0,a.jsx)(l(),{href:u.tipsLink,children:"Link"}),(0,a.jsx)("div",{className:"".concat(s().foldableContainer," ").concat(h?s().folded:""),children:(0,a.jsx)("button",{onClick:()=>{p(!h)},className:s().foldButton,children:h?"Show":"Hide"})})]}),!_&&(0,a.jsx)("div",{className:"".concat(s().contentContainer," ").concat(h?s().foldedContent:""),children:(0,a.jsxs)("div",{className:s().content,children:[(0,a.jsx)("span",{children:t}),(0,a.jsx)("span",{children:o}),r&&(0,a.jsx)(l(),{href:r,children:"Link"})]})}),_&&u.realContent&&u.realContent.map((e,n)=>(0,a.jsx)("div",{className:"".concat(s().contentContainer," ").concat(h?s().foldedContent:""),children:(0,a.jsxs)("div",{className:s().content,children:[(0,a.jsx)("h4",{children:e.name}),(0,a.jsx)(c.Z,{modal:!0,trigger:(0,a.jsx)("button",{className:s().foldButton,children:"View"}),children:n=>(0,a.jsx)(d.Z,{close:n,className:m().modal,content:e})})]})},n))]})}},1398:function(e,n,t){"use strict";var a=t(5893),o=t(7294);t(5675);var s=t(856),i=t.n(s),r=t(7148),l=t.n(r),c=t(1993),d=t.n(c);t(1664),t(6785),n.Z=e=>{let{close:n,content:t,isAdminChangePass:s}=e,[r,c]=(0,o.useState)([]),[_,m]=(0,o.useState)(""),[u,h]=(0,o.useState)(""),[p,b]=(0,o.useState)(!1),[f,C]=(0,o.useState)(!1),[x,g]=(0,o.useState)(!1);(0,o.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/admin_api"),n=await e.json();c(n)}catch(e){console.log("Error fecthing data: ",e)}})()},[]);let j=async e=>{e.preventDefault();let n=r.data.mongoData[0]._id;if(console.log(n+"id"),!_||!u){b(!0);return}if(_!==r.data.mongoData[0].adminPassword){C(!0);return}try{let e=await fetch("/api/admin_api?id=".concat(n),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({adminUsername:r.data.mongoData[0].adminUsername,adminPassword:u})});if(!e.ok)throw Error("Network response was not ok");window.location.reload();let t=await e.json();t.success?g(!0):console.error(t.message)}catch(e){console.error("There has been a problem with your fetch operation:",e)}};return s?(0,a.jsx)("div",{className:"".concat(l().formContainer," ").concat(l().formContainerAdminChangePassword),children:(0,a.jsxs)("form",{className:l().form,onSubmit:j,children:[(0,a.jsxs)("div",{className:l().inputGroup,children:[(0,a.jsx)("label",{children:"Your old Password:"}),(0,a.jsx)("input",{required:!0,type:"password",value:_,onChange:e=>m(e.target.value)})]}),(0,a.jsxs)("div",{className:l().inputGroup,children:[(0,a.jsx)("label",{children:"Your new Password:"}),(0,a.jsx)("input",{required:!0,type:"password",value:u,onChange:e=>h(e.target.value)})]}),p&&(0,a.jsx)("p",{className:l().notificationMessage,style:{color:"red"},children:"Please fill in the blank."}),f&&(0,a.jsx)("p",{className:l().notificationMessage,style:{color:"red"},children:"Wrong old password."}),x&&(0,a.jsx)("p",{className:l().notificationMessage,style:{color:"green"},children:"Password successfully updated."}),(0,a.jsx)("div",{className:d().btnBottomDiv,children:(0,a.jsx)("button",{className:"".concat(d().btn," ").concat(d().btnBottom," ").concat(d().btnForm),type:"submit",children:"Change password"})})]})}):(0,a.jsxs)("div",{className:i().modal,children:[(0,a.jsx)("p",{className:i().close,onClick:n,children:"\xd7"}),(0,a.jsx)("div",{className:i().header,children:t.name}),(0,a.jsxs)("div",{className:i().content,children:[(0,a.jsx)("p",{children:t.contents}),(0,a.jsx)("p",{children:(0,a.jsx)("img",{className:i().cotentImage,src:t.tipImage,alt:"",width:500,height:300})})]})]})}},83:function(e,n,t){"use strict";t.r(n);var a=t(5893),o=t(4759),s=t(953),i=t(5610),r=t.n(i),l=t(7294);n.default=function(){let[e,n]=(0,l.useState)({data:[]}),[t,i]=(0,l.useState)("");(0,l.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/sample_api"),t=await e.json();n(t)}catch(e){console.error("Error fetching data:",e)}})()},[]);let c=e.data&&e.data.mongoData?e.data.mongoData.filter(e=>e.sampleName.toLowerCase().includes(t.toLowerCase())):[];return console.log(JSON.stringify(e.data)+"aksdjhasdkjashdkasdahsdmv,navkadljj"),(0,a.jsxs)("div",{className:r().mainContainer,children:[(0,a.jsx)("h1",{className:r().title,children:"Showcase"}),(0,a.jsx)(s.Z,{showButton:!0,placeholder:"Search for Competitions",style:{width:"80%"},onChange:e=>{i(e)}}),c.map((e,n)=>(0,a.jsx)(o.Z,{title:e.sampleName,year:e.sampleContents,link:e.sampleLink,author:e.sampleAuthor},n))]})}},7148:function(e){e.exports={formContainer:"Admin_Form_formContainer__woS1p",formContainerTips:"Admin_Form_formContainerTips__EqLt9",userResetPasswordContainer:"Admin_Form_userResetPasswordContainer__8cHa0",formContainerAdminChangePassword:"Admin_Form_formContainerAdminChangePassword__2ZidI",form:"Admin_Form_form__TPPNs",formTips:"Admin_Form_formTips__LsRp0",inputGroup:"Admin_Form_inputGroup__tdFHl",inputGroupTips:"Admin_Form_inputGroupTips__zzKew",Row:"Admin_Form_Row__LVOvY",row:"Admin_Form_row__MxQDQ",organizerInput:"Admin_Form_organizerInput__0pcKt",hideLable:"Admin_Form_hideLable__CrPVN",btnTip:"Admin_Form_btnTip__7GRqP",contentInput:"Admin_Form_contentInput__L_npg",centered:"Admin_Form_centered__GuOUu",notificationMessage:"Admin_Form_notificationMessage__HpZle"}},5932:function(e){e.exports={mainContainer:"Foldable_mainContainer__nfLzC",container:"Foldable_container__9JlEO",item:"Foldable_item__o_oJs",innerContainer:"Foldable_innerContainer__68UcD",foldButton:"Foldable_foldButton__q3U_O",title:"Foldable_title__UMWCZ",contentContainer:"Foldable_contentContainer__3SWAb",foldedContent:"Foldable_foldedContent___st4C",content:"Foldable_content__xtypi",contentContainerChamp:"Foldable_contentContainerChamp__fwcIg",hideChamp:"Foldable_hideChamp__qdlvn"}},5610:function(e){e.exports={mainContainer:"Samples_mainContainer__yCmoH",title:"Samples_title__JpFJL"}},856:function(e){e.exports={modal:"content_modal__zzFVO",header:"content_header__bkkZB",content:"content_content__ch1N_",actions:"content_actions__S8L9P",close:"content_close__tNO7o",cotentImage:"content_cotentImage__7huai"}},1993:function(e){e.exports={divTable:"table_divTable__nZy3u",mainTable:"table_mainTable__2ozUS",tableHeading:"table_tableHeading__G1BNY",tableRow:"table_tableRow__OefgE",imageTable:"table_imageTable__8IOsJ",btnTableDiv:"table_btnTableDiv__TZLkB",btn:"table_btn__1oU_a",btnTable:"table_btnTable__M5Q8P",btnBottomDiv:"table_btnBottomDiv__9kcEX",btnBottom:"table_btnBottom__tziMg",btnForm:"table_btnForm__3wNV1"}}},function(e){e.O(0,[675,345,774,888,179],function(){return e(e.s=8756)}),_N_E=e.O()}]);