(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[242],{8989:function(e,t,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/admin/Card/view",function(){return a(2846)}])},953:function(e,t,a){"use strict";var n=a(5893),o=a(7294);t.Z=function(e){let{onChange:t,style:a,showButton:l,placeholder:c=""}=e,[i,s]=(0,o.useState)("");return(0,n.jsxs)("form",{className:"search-bar",style:a,onSubmit:e=>{e.preventDefault(),console.log("Searching for: ".concat(i))},children:[(0,n.jsx)("input",{className:"text-box",type:"search",value:i,onChange:e=>{s(e.target.value),t(e.target.value)},placeholder:c}),l&&(0,n.jsx)("button",{className:"submit-btn",type:"submit"})]})}},9985:function(e,t,a){"use strict";var n=a(5893);a(7294);var o=a(1899),l=a.n(o),c=a(4436);a(1664),t.Z=function(){let{adminLogout:e}=(0,c.a)(),t=async()=>{e(),window.location.href="/"};return(0,n.jsx)("header",{className:l().headerStyle,children:(0,n.jsxs)("div",{className:l().Hstyle,children:[(0,n.jsx)("h3",{className:l().textStyle,children:"Admin Dashboard"}),(0,n.jsx)("button",{onClick:t,className:l().buttonStyle,children:(0,n.jsx)("p",{children:"Logout"})})]})})}},2846:function(e,t,a){"use strict";a.r(t);var n=a(5893),o=a(7294),l=a(1163),c=a(1993),i=a.n(c);a(9985);var s=a(953),r=a(4436),d=a(1664),b=a.n(d);let h=()=>{let[e,t]=(0,o.useState)([]),[a,c]=(0,o.useState)(""),{isAdmin:d}=(0,r.a)(),h=(0,l.useRouter)();(0,o.useEffect)(()=>{(async()=>{try{let e=await fetch("/api/card_api"),a=await e.json();t(a)}catch(e){console.error("Error fetching data:",e)}})()},[]);let m=async e=>{try{(await fetch("/api/card_api?id=".concat(e._id),{method:"DELETE"})).ok?(console.log("Card delete successful"),window.location.reload()):console.error("Failed to delete card")}catch(e){console.error("Error deleting card",e)}},_=async()=>{window.location.href="/admin/dashboard/view"},u=async()=>{window.location.href="/admin/Card/form"},x=async e=>{console.log("ID to update "+e),window.location.href="/admin/Card/form?id=".concat(e)},j=e&&e.data&&e.data.mongoData&&e.data.mongoData.filter(e=>e.competitionName.toLowerCase().includes(a.toLowerCase()));return(0,o.useEffect)(()=>{d||h.push("/login")},[d,h]),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(s.Z,{placeholder:"Search for competition name",onChange:e=>{c(e)},showButton:!0}),(0,n.jsx)("div",{className:i().divTable,children:(0,n.jsxs)("table",{className:i().mainTable,children:[(0,n.jsx)("thead",{className:i().tableHeading,children:(0,n.jsxs)("tr",{children:[(0,n.jsx)("th",{children:"Organizer"}),(0,n.jsx)("th",{children:"Competition name"}),(0,n.jsx)("th",{children:"Location"}),(0,n.jsx)("th",{children:"Link to web"}),(0,n.jsx)("th",{children:"Image"}),(0,n.jsx)("th",{children:"Action"})]})}),(0,n.jsx)("tbody",{children:j&&j.map((e,t)=>(0,n.jsxs)("tr",{className:i().tableRow,children:[(0,n.jsx)("td",{children:e.organizer}),(0,n.jsx)("td",{children:e.competitionName}),(0,n.jsx)("td",{children:e.location}),(0,n.jsx)("td",{children:(0,n.jsx)(b(),{href:e.linkToWeb,children:"Link"})}),(0,n.jsx)("td",{children:(0,n.jsx)("img",{className:i().imageTable,src:e.imageURL,alt:"Compete image"})}),(0,n.jsx)("td",{className:i().btnContainer,children:(0,n.jsxs)("div",{className:i().btnTableDiv,children:[(0,n.jsx)("button",{className:"".concat(i().btn," ").concat(i().btnTable),onClick:()=>x(e._id),children:"Update"}),(0,n.jsx)("button",{className:"".concat(i().btn," ").concat(i().btnTable),onClick:()=>m(e),children:"Delete"})]})})]},t))})]})}),(0,n.jsxs)("div",{className:i().btnBottomDiv,children:[(0,n.jsx)("button",{className:"".concat(i().btn," ").concat(i().btnBottom),onClick:u,children:"Create new card event"}),(0,n.jsx)("button",{className:"".concat(i().btn," ").concat(i().btnBottom),onClick:_,children:"Return"})]})]})};h.hideLayout=!0,t.default=h},1899:function(e){e.exports={body:"AdminHeader_body__yU8Dy",headerStyle:"AdminHeader_headerStyle__2hs6_",Hstyle:"AdminHeader_Hstyle__SjPis",textStyle:"AdminHeader_textStyle__knUD_",buttonStyle:"AdminHeader_buttonStyle__mkLsq"}},1993:function(e){e.exports={divTable:"table_divTable__nZy3u",mainTable:"table_mainTable__2ozUS",tableHeading:"table_tableHeading__G1BNY",tableRow:"table_tableRow__OefgE",imageTable:"table_imageTable__8IOsJ",btnTableDiv:"table_btnTableDiv__TZLkB",btn:"table_btn__1oU_a",btnTable:"table_btnTable__M5Q8P",btnBottomDiv:"table_btnBottomDiv__9kcEX",btnBottom:"table_btnBottom__tziMg",btnForm:"table_btnForm__3wNV1"}},1163:function(e,t,a){e.exports=a(2937)}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8989)}),_N_E=e.O()}]);