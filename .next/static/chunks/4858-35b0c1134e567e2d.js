"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[4858],{34203:function(e,t,s){s.d(t,{SocketProvider:function(){return a},s:function(){return c}});var r=s(57437),l=s(2265),i=s(30998),n=s(34999);let o=(0,l.createContext)(null),a=e=>{var t;let{children:s}=e,{data:a}=(0,i.useSession)(),c=(0,l.useRef)(null);return(0,l.useEffect)(()=>{var e;return(null==a?void 0:null===(e=a.user)||void 0===e?void 0:e.email)&&!c.current&&(c.current=(0,n.ZP)("http://localhost:5000"),c.current.emit("register",a.user.email)),()=>{c.current&&c.current.disconnect()}},[null==a?void 0:null===(t=a.user)||void 0===t?void 0:t.email]),(0,r.jsx)(o.Provider,{value:c.current,children:s})},c=()=>(0,l.useContext)(o)},73314:function(e,t,s){s.d(t,{EdgeStoreProvider:function(){return r},P:function(){return l}});let{EdgeStoreProvider:r,useEdgeStore:l}=(0,s(37811).q)()},6577:function(e,t,s){var r=s(38472),l=s(30998);let i=r.Z.create({baseURL:"http://localhost:5000",headers:{"Content-Type":"application/json"}});i.interceptors.request.use(async e=>{let t=await (0,l.getSession)();return console.log("hi",t),t&&t.token&&(console.log(t),e.headers.Authorization="Bearer ".concat(t.token)),e},e=>Promise.reject(e)),t.Z=i},64858:function(e,t,s){s.d(t,{default:function(){return k}});var r=s(57437),l=s(30998),i=s(66648),n=s(87138),o=s(7583),a=s.n(o),c=s(95956);s(44193);var d=s(2265),u=s(49690),x=s(54008),h=s(73314),f=s(6577),m=s(92404),p=s(34203);function g(e){let{handleClose:t}=e,{data:s,status:o}=(0,l.useSession)(),[a,c]=(0,d.useState)(""),[u,x]=(0,d.useState)([]),[h,p]=(0,d.useState)(null),[g,v]=(0,d.useState)([]),j=async e=>{e.preventDefault();let t=await f.Z.get("/api/user/searchUser",{params:{searchQuery:a}});t&&(console.log(t.data.users),v(t.data.users))};async function b(e){console.log(e),await f.Z.post("/api/user/save-user-to-search-history",{userId:null==s?void 0:s.id,key:e})&&x(t=>[...t,{searchedProfileId:{name:e.name,username:e.username,profilePicture:e.profilePicture}}])}let w=(0,d.useCallback)(async()=>{let e=await f.Z.post("/api/user/get-recent-searches",{userId:null==s?void 0:s.id});console.log(e),x(e.data.searches)},[null==s?void 0:s.id]);return(0,d.useEffect)(()=>{w()},[w]),console.log(u),(0,r.jsx)("div",{className:"",children:(0,r.jsxs)("div",{className:"bg-white border rounded-lg w-[423px] h-[700px]  relative  ",children:[(0,r.jsx)("button",{onClick:t,className:"absolute text-2xl top-2 right-2 text-gray-500 hover:text-gray-800",children:"\xd7"}),(0,r.jsx)("div",{className:"flex top-0 left-0 mb-4",children:(0,r.jsx)("h1",{className:"p-4 text-2xl font-extrabold  tracking-tight lg:text-2xl flex justify-center items-center",children:"Search"})}),(0,r.jsx)("div",{className:"mx-2",children:(0,r.jsxs)("form",{action:"",onSubmit:j,children:[(0,r.jsx)(m.I,{type:"text",value:a,onChange:e=>{c(e.target.value)},placeholder:"Search...",className:"w-full px-3 py-2 border bg-gray-200 border-gray-300 rounded mb-4"}),(0,r.jsx)("button",{onSubmit:j,children:"Search"})]})}),(0,r.jsx)("div",{className:"border-t-2"}),a.length>0&&g.length>0?(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("h1",{className:"p-4 text-sm font-extrabold  tracking-tight cursor-pointer ",children:"Recent"}),(0,r.jsx)("h1",{className:"p-4 text-sm text-blue-600 font-extrabold  tracking-tight cursor-pointer "})]}),(0,r.jsx)("ul",{className:"list-disc list-inside cursor-pointer max-h-[500px] overflow-y-scroll",children:g.map((e,t)=>(0,r.jsxs)("div",{onClick:()=>b(e),className:"flex",children:[(0,r.jsx)("div",{className:"p-2",children:(0,r.jsx)(i.default,{src:e.profilePicture,alt:"failed",height:55,width:55,className:"rounded-full"})}),(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,r.jsx)("div",{className:"font-bold",children:e.username}),(0,r.jsx)("div",{className:"font-extralight text-gray-500 first-letter:uppercase",children:e.name})]}),(0,r.jsx)("div",{className:"ml-auto flex items-center justify-center p-4 "})]},t))})]}):(0,r.jsxs)("div",{children:[(0,r.jsxs)("div",{className:"flex justify-between",children:[(0,r.jsx)("h1",{className:"p-4 text-sm font-extrabold  tracking-tight cursor-pointer ",children:"Recent"}),(0,r.jsx)("h1",{className:"p-4 text-sm text-blue-600 font-extrabold  tracking-tight cursor-pointer "})]}),(0,r.jsx)("ul",{className:"list-disc list-inside cursor-pointer max-h-[500px] overflow-y-scroll",children:u.map((e,t)=>{var s,l,o,a;return(0,r.jsx)(n.default,{href:"/u/".concat(null==e?void 0:null===(s=e.searchedProfileId)||void 0===s?void 0:s.username),children:(0,r.jsxs)("div",{onClick:()=>b(e),className:"flex",children:[(0,r.jsx)("div",{className:"p-2",children:(0,r.jsx)(i.default,{src:null==e?void 0:null===(l=e.searchedProfileId)||void 0===l?void 0:l.profilePicture,alt:"failed",height:55,width:55,className:"rounded-full"})}),(0,r.jsxs)("div",{className:"flex flex-col items-center justify-center",children:[(0,r.jsx)("div",{className:"font-bold",children:null==e?void 0:null===(o=e.searchedProfileId)||void 0===o?void 0:o.username}),(0,r.jsx)("div",{className:"font-extralight text-gray-500 first-letter:uppercase",children:null==e?void 0:null===(a=e.searchedProfileId)||void 0===a?void 0:a.name})]})]})},t)})})]})]})})}s(22170);var v=s(68602),j=s(77700);let b=v.fC,w=v.xz,N=d.forwardRef((e,t)=>{let{className:s,align:l="center",sideOffset:i=4,...n}=e;return(0,r.jsx)(v.VY,{ref:t,align:l,sideOffset:i,className:(0,j.cn)("z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",s),...n})});function k(){let e=(0,p.s)(),{data:t}=(0,l.useSession)(),[s,o]=(0,d.useState)(!1),[m,v]=(0,d.useState)(),[j,k]=(0,d.useState)(),y=(0,d.useRef)(null),{edgestore:C}=(0,h.P)(),[S,P]=(0,d.useState)(!1),[Z,M]=(0,d.useState)(""),[z,I]=(0,d.useState)(""),[A,E]=(0,d.useState)(""),[R,B]=(0,d.useState)(0),O=()=>{P(!1)};async function U(){e&&e.emit("disconnectUser"),await (0,l.signOut)({redirect:!1})}return console.log(t),(0,d.useEffect)(()=>{let e=!0;return(async()=>{if(t)try{let s=await f.Z.post("/api/user/miniProfile",{id:t.id});console.log(s.data.user.roles),E(s.data.user.roles),e&&I(s.data.user)}catch(e){console.error("Error fetching profile details:",e)}})(),()=>{e=!1}},[t]),(0,d.useEffect)(()=>{e&&e.on("force-logout2",()=>{console.log("force logout 2"),(0,l.signOut)({callbackUrl:"/"})})},[e]),(0,d.useEffect)(()=>{let t=e=>{console.log(e),c.Am.info(e.message,{position:"top-right",autoClose:5e3,hideProgressBar:!1,closeOnClick:!0,pauseOnHover:!0,draggable:!0,progress:void 0})};if(e)return e.on("notification",t),()=>{e.off("notification",t)}},[e]),(0,r.jsxs)("div",{className:"",children:[(0,r.jsxs)("div",{className:"scroll-m-20 text-2xl font-semibold tracking-tight h-screen w-180 bg-gray-25  text-gray-700 ml-20 mt-8 rounded border-2 ",children:[(0,r.jsxs)("div",{className:"flex items-center justify-between p-6",children:[(0,r.jsxs)("div",{className:"flex flex-col",children:[(0,r.jsx)(i.default,{src:null==z?void 0:z.profilePicture,alt:"empty",className:"rounded-full border p-[2px] w-16 h-16 object-cover",width:60,height:60}),(0,r.jsx)("div",{onClick:()=>o(!0),className:"text-sm",children:"upload story"})]}),(0,r.jsxs)("div",{className:"",children:[(0,r.jsx)("p",{className:" first-letter:uppercase",children:null==z?void 0:z.name}),(0,r.jsx)(n.default,{href:"/u/".concat(null==z?void 0:z.username),children:(0,r.jsx)("h3",{className:"text-sm text-gray-400 hover:text-blue-500",children:"Visit Profile"})})]}),t?(0,r.jsx)("button",{onClick:U,className:"text-blue-500 text-sm",children:"signout"}):(0,r.jsx)("button",{onClick:l.signIn,className:"text-blue-500 text-sm",children:"signin"})]}),(0,r.jsx)("hr",{class:"border-t border-gray-300"}),(0,r.jsxs)("nav",{className:"mt-10 ",children:[(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"})}),(0,r.jsx)(n.default,{href:"/home",className:"font-semibold block py-2.5 px-4 rounded transition duration-200  hover:text-blue-500",children:"Feed"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsxs)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:[(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.431l-1.003.827c-.293.241-.438.613-.43.992a7.723 7.723 0 0 1 0 .255c-.008.378.137.75.43.991l1.004.827c.424.35.534.955.26 1.43l-1.298 2.247a1.125 1.125 0 0 1-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.47 6.47 0 0 1-.22.128c-.331.183-.581.495-.644.869l-.213 1.281c-.09.543-.56.94-1.11.94h-2.594c-.55 0-1.019-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 0 1-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 0 1-1.369-.49l-1.297-2.247a1.125 1.125 0 0 1 .26-1.431l1.004-.827c.292-.24.437-.613.43-.991a6.932 6.932 0 0 1 0-.255c.007-.38-.138-.751-.43-.992l-1.004-.827a1.125 1.125 0 0 1-.26-1.43l1.297-2.247a1.125 1.125 0 0 1 1.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.086.22-.128.332-.183.582-.495.644-.869l.214-1.28Z"}),(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"})]}),(0,r.jsx)(n.default,{href:"/u/settings",className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Settings"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24",strokeWidth:1.5,stroke:"currentColor",className:"size-6",children:(0,r.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",d:"M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"})}),"user"===A?(0,r.jsxs)(b,{children:[(0,r.jsx)(w,{children:(0,r.jsx)("p",{className:"font-semibold text-gray-500 block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Swipe!"})}),(0,r.jsx)(N,{children:"Unlock this feature by taking premium."})]}):"premium"===A||"admin"===A?(0,r.jsx)(n.default,{href:"/u/swipe",className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Swipe!"}):null]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"})}),(0,r.jsx)(n.default,{href:"/u/premium",className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Premium"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5"})}),(0,r.jsx)(n.default,{href:"/u/notifications",className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Notifications"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"})}),(0,r.jsx)(n.default,{href:"/u/messages",className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500",children:"Messages"})]}),(0,r.jsxs)("div",{className:"flex items-center justify-start ml-6",children:[(0,r.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 24 24","stroke-width":"1.5",stroke:"currentColor",class:"size-6",children:(0,r.jsx)("path",{"stroke-linecap":"round","stroke-linejoin":"round",d:"m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"})}),(0,r.jsx)("span",{onClick:()=>P(!0),className:"font-semibold block py-2.5 px-4 rounded transition duration-200 hover:text-blue-500 cursor-pointer",children:"Search"})]})]})]}),s&&(0,r.jsx)(a(),{isOpen:s,onRequestClose:()=>o(!1),className:"fixed inset-0 flex items-center justify-center p-4",overlayClassName:"fixed inset-0 bg-black bg-opacity-50 z",ariaHideApp:!1,contentLabel:"Example Modal",children:(0,r.jsxs)("div",{className:"relative bg-white rounded-lg shadow-lg p-6 w-full max-w-lg flex flex-col items-center",children:[(0,r.jsx)("h4",{className:" text-2xl font-extrabold  tracking-tight lg:teFxt-2xl   ",children:"Upload Story"}),m?(0,r.jsx)(i.default,{src:j,alt:"story",height:120,width:120}):(0,r.jsx)(x.ip9,{className:"text-5xl text-gray-400 cursor-pointer",onClick:()=>y.current.click()}),(0,r.jsx)("input",{hidden:!0,ref:y,type:"file",name:"file",accept:"image/*",onChange:function(e){let t=e.target.files[0];v(t),k(URL.createObjectURL(t))}}),(0,r.jsx)("button",{onClick:async()=>{if(m){let e=await C.publicFiles.upload({file:m,onProgressChange:e=>{console.log(e)}});console.log(e),await f.Z.post("/api/user/uploadStory",{url:e.url,userId:null==t?void 0:t.id})&&(v(null),k(null),o(!1))}},className:"w-full bg-red-600   text-white p-2 shadow-md   rounded-lg hover:brightness-105   disabled:bg-gray-200 disabled:cursor-not-allowed    disabled:hover:brightness-100",children:"upload Story"}),(0,r.jsx)(u.oHP,{className:"cursor-pointer absolute top-4 right-4 hover:text-red-600 transition duration-300",onClick:()=>o(!1)})]})}),S&&(0,r.jsx)(a(),{onClose:O,isOpen:S,className:"fixed inset-0 flex top-32 justify-center ",children:(0,r.jsx)("div",{children:(0,r.jsx)(g,{handleClose:O})})})]})}N.displayName=v.VY.displayName},92404:function(e,t,s){s.d(t,{I:function(){return n}});var r=s(57437),l=s(2265),i=s(77700);let n=l.forwardRef((e,t)=>{let{className:s,type:l,...n}=e;return(0,r.jsx)("input",{type:l,className:(0,i.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",s),ref:t,...n})});n.displayName="Input"},77700:function(e,t,s){s.d(t,{cn:function(){return i}});var r=s(44839),l=s(96164);function i(){for(var e=arguments.length,t=Array(e),s=0;s<e;s++)t[s]=arguments[s];return(0,l.m6)((0,r.W)(t))}}}]);