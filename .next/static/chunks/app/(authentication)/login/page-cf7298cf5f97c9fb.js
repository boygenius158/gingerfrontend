(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[801],{32051:function(e,s,t){Promise.resolve().then(t.bind(t,14043))},14043:function(e,s,t){"use strict";t.r(s),t.d(s,{default:function(){return n}});var r=t(57437),l=t(86670);function n(){return(0,r.jsx)("div",{children:(0,r.jsx)(l.Z,{})})}t(2265)},86670:function(e,s,t){"use strict";t.d(s,{Z:function(){return c}});var r=t(57437),l=t(66648),n=t(30998),a=t(2265),o=t(87138),i=t(16463);function c(){let{data:e,status:s}=(0,n.useSession)(),t=(0,i.useRouter)();(0,a.useEffect)(()=>{e&&t.replace("/home")},[t,e]);let[c,d]=(0,a.useState)(""),[u,m]=(0,a.useState)(""),[x,g]=(0,a.useState)(""),h=async e=>{e.preventDefault(),console.log(c,u,x);try{console.log("working");let e=await (0,n.signIn)("credentials",{email:c,password:u,redirect:!1});console.log("Response",e),"CredentialsSignin"===e.error&&g("Unable to Login"),"AccessDenied"===e.error&&g("AccessDenied")}catch(e){console.error("Error signing in:",e)}};return(0,r.jsx)("div",{className:"py-16",children:(0,r.jsxs)("div",{className:"flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl",children:[(0,r.jsx)("div",{className:"hidden lg:block lg:w-1/2 bg-cover",style:{backgroundImage:"url('https://i.pinimg.com/564x/7c/e7/fc/7ce7fc52be83670df90e94bd90b66d21.jpg')"}}),(0,r.jsxs)("div",{className:"w-full p-8 lg:w-1/2",children:[(0,r.jsx)("div",{className:"flex justify-center",children:(0,r.jsx)("h1",{className:"scroll-m-20 text-4xl text-gray-700 font-extrabold tracking-tight lg:text-5xl",children:"Ginger"})}),(0,r.jsxs)("button",{onClick:()=>(0,n.signIn)("google"),className:"flex items-center justify-center mt-4 text-white bg-black rounded-lg shadow-md hover:bg-gray-600 w-full py-2",children:[(0,r.jsx)(l.default,{src:"/Google_Icons-09-512.webp",height:24,width:24,alt:"Google Icon"}),(0,r.jsx)("span",{className:"ml-2",children:"Sign-up or Sign-in with Google"})]}),(0,r.jsxs)("div",{className:"mt-4 flex items-center justify-between",children:[(0,r.jsx)("span",{className:"border-b w-1/5 lg:w-1/4"}),(0,r.jsx)("a",{href:"#",className:"text-xs text-center text-gray-500 uppercase",children:"or login with email"}),(0,r.jsx)("span",{className:"border-b w-1/5 lg:w-1/4"})]}),(0,r.jsxs)("form",{onSubmit:h,className:"mt-4",children:[(0,r.jsxs)("div",{children:[(0,r.jsx)("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),(0,r.jsx)("input",{id:"email",type:"email",value:c,onChange:e=>d(e.target.value),required:!0,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,r.jsxs)("div",{className:"mt-4",children:[(0,r.jsx)("label",{htmlFor:"password",className:"block text-sm font-medium text-gray-700",children:"Password"}),(0,r.jsx)("input",{id:"password",type:"password",value:u,onChange:e=>m(e.target.value),required:!0,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"})]}),(0,r.jsx)("button",{type:"submit",className:"mt-8 bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600",children:"Sign In"}),x&&(0,r.jsx)("div",{className:"bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2",children:x})]}),(0,r.jsxs)("div",{className:"mt-4 flex items-center justify-between",children:[(0,r.jsx)("span",{className:"border-b w-1/5 md:w-1/4"}),(0,r.jsx)(o.default,{href:"/forgotpassword",className:"text-xs text-gray-500 uppercase",children:"Forgot password?"}),(0,r.jsx)("span",{className:"border-b w-1/5 md:w-1/4"})]}),(0,r.jsxs)("p",{className:"text-center mt-2",children:["Dont have an account?"," ",(0,r.jsx)(o.default,{href:"/register",children:(0,r.jsx)("span",{className:"cursor-pointer text-blue-500",children:"Register"})})]})]})]})})}},16463:function(e,s,t){"use strict";var r=t(71169);t.o(r,"useRouter")&&t.d(s,{useRouter:function(){return r.useRouter}})}},function(e){e.O(0,[998,6648,7138,2971,7023,1744],function(){return e(e.s=32051)}),_N_E=e.O()}]);