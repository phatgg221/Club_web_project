(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[868],{1110:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/forgotPassword",function(){return t(9048)}])},9048:function(e,n,t){"use strict";t.r(n);var o=t(5893),a=t(7294),r=t(7148),i=t.n(r),_=t(1993),s=t.n(_);n.default=function(){let[e,n]=(0,a.useState)(""),[t,r]=(0,a.useState)(""),[_,m]=(0,a.useState)("");(0,a.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/member_api"),n=(await e.json()).data.mongoData.find(e=>e.username===t);n?(console.log("Password:",n.password),m(n.password)):console.log("User not found")}catch(e){console.error("Error fetching data: ",e)}})()},[t]);let l=async n=>{n.preventDefault();let t=await fetch("/api/sendemail_api",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:e,password:_})});(await t.json()).success};return(0,o.jsxs)("div",{className:"".concat(i().formContainer," ").concat(i().userResetPasswordContainer),children:[(0,o.jsx)("h1",{children:"Forgot Password"}),(0,o.jsxs)("form",{className:i().form,onSubmit:l,children:[(0,o.jsxs)("div",{className:i().inputGroup,children:[(0,o.jsx)("label",{children:"Your email"}),(0,o.jsx)("input",{required:!0,type:"email",value:e,onChange:e=>n(e.target.value)})]}),(0,o.jsxs)("div",{className:i().inputGroup,children:[(0,o.jsx)("label",{children:"Your username (sID)"}),(0,o.jsx)("input",{required:!0,type:"text",value:t,onChange:e=>r(e.target.value)})]}),(0,o.jsx)("div",{className:s().btnBottomDiv,children:(0,o.jsx)("button",{className:"".concat(s().btn," ").concat(s().btnBottom," ").concat(s().btnForm),type:"submit",children:"Forgot Password"})})]})]})}},7148:function(e){e.exports={formContainer:"Admin_Form_formContainer__woS1p",formContainerTips:"Admin_Form_formContainerTips__EqLt9",userResetPasswordContainer:"Admin_Form_userResetPasswordContainer__8cHa0",formContainerAdminChangePassword:"Admin_Form_formContainerAdminChangePassword__2ZidI",form:"Admin_Form_form__TPPNs",formTips:"Admin_Form_formTips__LsRp0",inputGroup:"Admin_Form_inputGroup__tdFHl",inputGroupTips:"Admin_Form_inputGroupTips__zzKew",Row:"Admin_Form_Row__LVOvY",row:"Admin_Form_row__MxQDQ",organizerInput:"Admin_Form_organizerInput__0pcKt",hideLable:"Admin_Form_hideLable__CrPVN",btnTip:"Admin_Form_btnTip__7GRqP",contentInput:"Admin_Form_contentInput__L_npg",centered:"Admin_Form_centered__GuOUu",notificationMessage:"Admin_Form_notificationMessage__HpZle"}},1993:function(e){e.exports={divTable:"table_divTable__nZy3u",mainTable:"table_mainTable__2ozUS",tableHeading:"table_tableHeading__G1BNY",tableRow:"table_tableRow__OefgE",imageTable:"table_imageTable__8IOsJ",btnTableDiv:"table_btnTableDiv__TZLkB",btn:"table_btn__1oU_a",btnTable:"table_btnTable__M5Q8P",btnBottomDiv:"table_btnBottomDiv__9kcEX",btnBottom:"table_btnBottom__tziMg",btnForm:"table_btnForm__3wNV1"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=1110)}),_N_E=e.O()}]);