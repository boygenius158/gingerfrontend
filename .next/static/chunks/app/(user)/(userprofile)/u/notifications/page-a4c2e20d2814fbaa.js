(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[3505],{50461:function(e,s,t){Promise.resolve().then(t.bind(t,64858)),Promise.resolve().then(t.bind(t,61613))},61613:function(e,s,t){"use strict";t.d(s,{default:function(){return d}});var i=t(57437),l=t(34203),n=t(6577),a=t(30998),o=t(66648),c=t(2265);let r=e=>{let s,{type:t,message:l,image:n,username:a}=e;switch(t){case"comment":s="\uD83D\uDCAC";break;case"like":s="❤️";break;case"follow":s="\uD83E\uDD35";break;default:s="\uD83D\uDD14"}return(0,i.jsxs)("div",{className:"border-b",children:[(0,i.jsxs)("div",{className:"flex items-center p-2 gap-2",children:[(0,i.jsx)(o.default,{src:n,className:"rounded-full",alt:"failed",height:40,width:40}),(0,i.jsxs)("p",{className:"font-semibold cursor-pointer",children:["@",a]}),(0,i.jsx)("p",{className:"font-light text-gray-700",children:l}),(0,i.jsx)("span",{className:"text-xl mr-2",children:s})]}),(0,i.jsx)("div",{className:"flex justify-end mb-2",children:(0,i.jsx)("p",{className:"font-extralight text-xs",children:"a few moments ago"})})]})};function d(){let e=(0,l.s)(),{data:s,status:t}=(0,a.useSession)(),[o,d]=(0,c.useState)([]),u=(0,c.useCallback)(async()=>{if(null==s?void 0:s.id)try{let e=await n.Z.post("/api/media/fetch-notifications",{userId:s.id});console.log(e),d(e.data.notifications)}catch(e){console.error("Failed to fetch notifications:",e)}},[null==s?void 0:s.id]);return(0,c.useEffect)(()=>{if(!e){console.log("socket is missing");return}e.on("notification_stack",e=>{console.log(e),d(s=>[...s,e])})},[s,e]),(0,c.useEffect)(()=>{(null==s?void 0:s.id)&&u()},[null==s?void 0:s.id,u]),console.log(o),(0,i.jsxs)("div",{className:"flex flex-col",children:[(0,i.jsx)("div",{className:"p-4",children:(0,i.jsx)("h1",{className:"text-4xl font-extrabold tracking-tight lg:text-5xl flex justify-center items-center",children:"Notifications"})}),(0,i.jsx)("div",{className:"max-h-[500px] overflow-y-scroll",children:o.map((e,s)=>{var t,l;return(0,i.jsx)(r,{type:e.type,message:e.message,username:null==e?void 0:null===(t=e.interactorId)||void 0===t?void 0:t.username,image:null==e?void 0:null===(l=e.interactorId)||void 0===l?void 0:l.profilePicture},s)})})]})}}},function(e){e.O(0,[4616,7259,8422,998,6648,8472,7138,4868,7671,556,4143,4784,4858,2971,7023,1744],function(){return e(e.s=50461)}),_N_E=e.O()}]);