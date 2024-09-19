"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[2791],{95137:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(78030).Z)("ArrowLeft",[["path",{d:"m12 19-7-7 7-7",key:"1l729n"}],["path",{d:"M19 12H5",key:"x3x0zl"}]])},71976:function(e,t,n){n.d(t,{Z:function(){return r}});/**
 * @license lucide-react v0.417.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */let r=(0,n(78030).Z)("ArrowRight",[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]])},13304:function(e,t,n){n.d(t,{Dx:function(){return en},VY:function(){return et},aV:function(){return ee},dk:function(){return er},fC:function(){return K},h_:function(){return G},jm:function(){return U},p8:function(){return w},x8:function(){return eo},xz:function(){return Q}});var r=n(2265),o=n(78149),i=n(1584),u=n(98324),c=n(53201),a=n(91715),l=n(53938),s=n(80467),d=n(56935),f=n(31383),p=n(25171),g=n(20589),m=n(49418),h=n(78369),y=n(71538),v=n(57437),b="Dialog",[x,w]=(0,u.b)(b),[D,E]=x(b),O=e=>{let{__scopeDialog:t,children:n,open:o,defaultOpen:i,onOpenChange:u,modal:l=!0}=e,s=r.useRef(null),d=r.useRef(null),[f=!1,p]=(0,a.T)({prop:o,defaultProp:i,onChange:u});return(0,v.jsx)(D,{scope:t,triggerRef:s,contentRef:d,contentId:(0,c.M)(),titleId:(0,c.M)(),descriptionId:(0,c.M)(),open:f,onOpenChange:p,onOpenToggle:r.useCallback(()=>p(e=>!e),[p]),modal:l,children:n})};O.displayName=b;var I="DialogTrigger",j=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,u=E(I,n),c=(0,i.e)(t,u.triggerRef);return(0,v.jsx)(p.WV.button,{type:"button","aria-haspopup":"dialog","aria-expanded":u.open,"aria-controls":u.contentId,"data-state":Z(u.open),...r,ref:c,onClick:(0,o.M)(e.onClick,u.onOpenToggle)})});j.displayName=I;var k="DialogPortal",[M,S]=x(k,{forceMount:void 0}),R=e=>{let{__scopeDialog:t,forceMount:n,children:o,container:i}=e,u=E(k,t);return(0,v.jsx)(M,{scope:t,forceMount:n,children:r.Children.map(o,e=>(0,v.jsx)(f.z,{present:n||u.open,children:(0,v.jsx)(d.h,{asChild:!0,container:i,children:e})}))})};R.displayName=k;var F="DialogOverlay",A=r.forwardRef((e,t)=>{let n=S(F,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,i=E(F,e.__scopeDialog);return i.modal?(0,v.jsx)(f.z,{present:r||i.open,children:(0,v.jsx)(C,{...o,ref:t})}):null});A.displayName=F;var C=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=E(F,n);return(0,v.jsx)(m.Z,{as:y.g7,allowPinchZoom:!0,shards:[o.contentRef],children:(0,v.jsx)(p.WV.div,{"data-state":Z(o.open),...r,ref:t,style:{pointerEvents:"auto",...r.style}})})}),N="DialogContent",P=r.forwardRef((e,t)=>{let n=S(N,e.__scopeDialog),{forceMount:r=n.forceMount,...o}=e,i=E(N,e.__scopeDialog);return(0,v.jsx)(f.z,{present:r||i.open,children:i.modal?(0,v.jsx)(L,{...o,ref:t}):(0,v.jsx)(T,{...o,ref:t})})});P.displayName=N;var L=r.forwardRef((e,t)=>{let n=E(N,e.__scopeDialog),u=r.useRef(null),c=(0,i.e)(t,n.contentRef,u);return r.useEffect(()=>{let e=u.current;if(e)return(0,h.Ry)(e)},[]),(0,v.jsx)(V,{...e,ref:c,trapFocus:n.open,disableOutsidePointerEvents:!0,onCloseAutoFocus:(0,o.M)(e.onCloseAutoFocus,e=>{var t;e.preventDefault(),null===(t=n.triggerRef.current)||void 0===t||t.focus()}),onPointerDownOutside:(0,o.M)(e.onPointerDownOutside,e=>{let t=e.detail.originalEvent,n=0===t.button&&!0===t.ctrlKey;(2===t.button||n)&&e.preventDefault()}),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault())})}),T=r.forwardRef((e,t)=>{let n=E(N,e.__scopeDialog),o=r.useRef(!1),i=r.useRef(!1);return(0,v.jsx)(V,{...e,ref:t,trapFocus:!1,disableOutsidePointerEvents:!1,onCloseAutoFocus:t=>{var r,u;null===(r=e.onCloseAutoFocus)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current||null===(u=n.triggerRef.current)||void 0===u||u.focus(),t.preventDefault()),o.current=!1,i.current=!1},onInteractOutside:t=>{var r,u;null===(r=e.onInteractOutside)||void 0===r||r.call(e,t),t.defaultPrevented||(o.current=!0,"pointerdown"!==t.detail.originalEvent.type||(i.current=!0));let c=t.target;(null===(u=n.triggerRef.current)||void 0===u?void 0:u.contains(c))&&t.preventDefault(),"focusin"===t.detail.originalEvent.type&&i.current&&t.preventDefault()}})}),V=r.forwardRef((e,t)=>{let{__scopeDialog:n,trapFocus:o,onOpenAutoFocus:u,onCloseAutoFocus:c,...a}=e,d=E(N,n),f=r.useRef(null),p=(0,i.e)(t,f);return(0,g.EW)(),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(s.M,{asChild:!0,loop:!0,trapped:o,onMountAutoFocus:u,onUnmountAutoFocus:c,children:(0,v.jsx)(l.XB,{role:"dialog",id:d.contentId,"aria-describedby":d.descriptionId,"aria-labelledby":d.titleId,"data-state":Z(d.open),...a,ref:p,onDismiss:()=>d.onOpenChange(!1)})}),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(J,{titleId:d.titleId}),(0,v.jsx)(Y,{contentRef:f,descriptionId:d.descriptionId})]})]})}),_="DialogTitle",z=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=E(_,n);return(0,v.jsx)(p.WV.h2,{id:o.titleId,...r,ref:t})});z.displayName=_;var H="DialogDescription",B=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,o=E(H,n);return(0,v.jsx)(p.WV.p,{id:o.descriptionId,...r,ref:t})});B.displayName=H;var W="DialogClose",q=r.forwardRef((e,t)=>{let{__scopeDialog:n,...r}=e,i=E(W,n);return(0,v.jsx)(p.WV.button,{type:"button",...r,ref:t,onClick:(0,o.M)(e.onClick,()=>i.onOpenChange(!1))})});function Z(e){return e?"open":"closed"}q.displayName=W;var $="DialogTitleWarning",[U,X]=(0,u.k)($,{contentName:N,titleName:_,docsSlug:"dialog"}),J=e=>{let{titleId:t}=e,n=X($),o="`".concat(n.contentName,"` requires a `").concat(n.titleName,"` for the component to be accessible for screen reader users.\n\nIf you want to hide the `").concat(n.titleName,"`, you can wrap it with our VisuallyHidden component.\n\nFor more information, see https://radix-ui.com/primitives/docs/components/").concat(n.docsSlug);return r.useEffect(()=>{t&&!document.getElementById(t)&&console.error(o)},[o,t]),null},Y=e=>{let{contentRef:t,descriptionId:n}=e,o=X("DialogDescriptionWarning"),i="Warning: Missing `Description` or `aria-describedby={undefined}` for {".concat(o.contentName,"}.");return r.useEffect(()=>{var e;let r=null===(e=t.current)||void 0===e?void 0:e.getAttribute("aria-describedby");n&&r&&!document.getElementById(n)&&console.warn(i)},[i,t,n]),null},K=O,Q=j,G=R,ee=A,et=P,en=z,er=B,eo=q},74300:function(e,t,n){n.d(t,{Z:function(){return I}});var r=n(2265);function o(e){return"[object Object]"===Object.prototype.toString.call(e)||Array.isArray(e)}function i(e,t){let n=Object.keys(e),r=Object.keys(t);return n.length===r.length&&JSON.stringify(Object.keys(e.breakpoints||{}))===JSON.stringify(Object.keys(t.breakpoints||{}))&&n.every(n=>{let r=e[n],u=t[n];return"function"==typeof r?`${r}`==`${u}`:o(r)&&o(u)?i(r,u):r===u})}function u(e){return e.concat().sort((e,t)=>e.name>t.name?1:-1).map(e=>e.options)}function c(e){return"number"==typeof e}function a(e){return"string"==typeof e}function l(e){return"boolean"==typeof e}function s(e){return"[object Object]"===Object.prototype.toString.call(e)}function d(e){return Math.abs(e)}function f(e){return Math.sign(e)}function p(e){return y(e).map(Number)}function g(e){return e[m(e)]}function m(e){return Math.max(0,e.length-1)}function h(e,t=0){return Array.from(Array(e),(e,n)=>t+n)}function y(e){return Object.keys(e)}function v(e,t){return void 0!==t.MouseEvent&&e instanceof t.MouseEvent}function b(){let e=[],t={add:function(n,r,o,i={passive:!0}){let u;return"addEventListener"in n?(n.addEventListener(r,o,i),u=()=>n.removeEventListener(r,o,i)):(n.addListener(o),u=()=>n.removeListener(o)),e.push(u),t},clear:function(){e=e.filter(e=>e())}};return t}function x(e=0,t=0){let n=d(e-t);function r(n){return n<e||n>t}return{length:n,max:t,min:e,constrain:function(n){return r(n)?n<e?e:t:n},reachedAny:r,reachedMax:function(e){return e>t},reachedMin:function(t){return t<e},removeOffset:function(e){return n?e-n*Math.ceil((e-t)/n):e}}}function w(e){let t=e;function n(e){return c(e)?e:e.get()}return{get:function(){return t},set:function(e){t=n(e)},add:function(e){t+=n(e)},subtract:function(e){t-=n(e)}}}function D(e,t){let n="x"===e.scroll?function(e){return`translate3d(${e}px,0px,0px)`}:function(e){return`translate3d(0px,${e}px,0px)`},r=t.style,o=!1;return{clear:function(){o||(r.transform="",t.getAttribute("style")||t.removeAttribute("style"))},to:function(t){o||(r.transform=n(e.direction(t)))},toggleActive:function(e){o=!e}}}let E={align:"center",axis:"x",container:null,slides:null,containScroll:"trimSnaps",direction:"ltr",slidesToScroll:1,inViewThreshold:0,breakpoints:{},dragFree:!1,dragThreshold:10,loop:!1,skipSnaps:!1,duration:25,startIndex:0,active:!0,watchDrag:!0,watchResize:!0,watchSlides:!0};function O(e,t,n){let r,o,i,u,I;let j=e.ownerDocument,k=j.defaultView,M=function(e){function t(e,t){return function e(t,n){return[t,n].reduce((t,n)=>(y(n).forEach(r=>{let o=t[r],i=n[r],u=s(o)&&s(i);t[r]=u?e(o,i):i}),t),{})}(e,t||{})}return{mergeOptions:t,optionsAtMedia:function(n){let r=n.breakpoints||{},o=y(r).filter(t=>e.matchMedia(t).matches).map(e=>r[e]).reduce((e,n)=>t(e,n),{});return t(n,o)},optionsMediaQueries:function(t){return t.map(e=>y(e.breakpoints||{})).reduce((e,t)=>e.concat(t),[]).map(e.matchMedia)}}}(k),S=(I=[],{init:function(e,t){return(I=t.filter(({options:e})=>!1!==M.optionsAtMedia(e).active)).forEach(t=>t.init(e,M)),t.reduce((e,t)=>Object.assign(e,{[t.name]:t}),{})},destroy:function(){I=I.filter(e=>e.destroy())}}),R=b(),F=function(){let e,t={},n={init:function(t){e=t},emit:function(r){return(t[r]||[]).forEach(t=>t(e,r)),n},off:function(e,r){return t[e]=(t[e]||[]).filter(e=>e!==r),n},on:function(e,r){return t[e]=(t[e]||[]).concat([r]),n},clear:function(){t={}}};return n}(),{mergeOptions:A,optionsAtMedia:C,optionsMediaQueries:N}=M,{on:P,off:L,emit:T}=F,V=!1,_=A(E,O.globalOptions),z=A(_),H=[];function B(t,n){!V&&(z=C(_=A(_,t)),H=n||H,function(){let{container:t,slides:n}=z;i=(a(t)?e.querySelector(t):t)||e.children[0];let r=a(n)?i.querySelectorAll(n):n;u=[].slice.call(r||i.children)}(),r=function t(n){let r=function(e,t,n,r,o,i,u){let s,E;let{align:O,axis:I,direction:j,startIndex:k,loop:M,duration:S,dragFree:R,dragThreshold:F,inViewThreshold:A,slidesToScroll:C,skipSnaps:N,containScroll:P,watchResize:L,watchSlides:T,watchDrag:V}=i,_={measure:function(e){let{offsetTop:t,offsetLeft:n,offsetWidth:r,offsetHeight:o}=e;return{top:t,right:n+r,bottom:t+o,left:n,width:r,height:o}}},z=_.measure(t),H=n.map(_.measure),B=function(e,t){let n="rtl"===t,r="y"===e,o=!r&&n?-1:1;return{scroll:r?"y":"x",cross:r?"x":"y",startEdge:r?"top":n?"right":"left",endEdge:r?"bottom":n?"left":"right",measureSize:function(e){let{height:t,width:n}=e;return r?t:n},direction:function(e){return e*o}}}(I,j),W=B.measureSize(z),q={measure:function(e){return e/100*W}},Z=function(e,t){let n={start:function(){return 0},center:function(e){return(t-e)/2},end:function(e){return t-e}};return{measure:function(r,o){return a(e)?n[e](r):e(t,r,o)}}}(O,W),$=!M&&!!P,{slideSizes:U,slideSizesWithGaps:X,startGap:J,endGap:Y}=function(e,t,n,r,o,i){let{measureSize:u,startEdge:c,endEdge:a}=e,l=n[0]&&o,s=function(){if(!l)return 0;let e=n[0];return d(t[c]-e[c])}(),f=l?parseFloat(i.getComputedStyle(g(r)).getPropertyValue(`margin-${a}`)):0,p=n.map(u),h=n.map((e,t,n)=>{let r=t===m(n);return t?r?p[t]+f:n[t+1][c]-e[c]:p[t]+s}).map(d);return{slideSizes:p,slideSizesWithGaps:h,startGap:s,endGap:f}}(B,z,H,n,M||!!P,o),K=function(e,t,n,r,o,i,u,a,l){let{startEdge:s,endEdge:f,direction:h}=e,y=c(n);return{groupSlides:function(e){return y?p(e).filter(e=>e%n==0).map(t=>e.slice(t,t+n)):e.length?p(e).reduce((n,c,l)=>{let p=g(n)||0,y=c===m(e),v=o[s]-i[p][s],b=o[s]-i[c][f],x=r||0!==p?0:h(u),w=d(b-(!r&&y?h(a):0)-(v+x));return l&&w>t+2&&n.push(c),y&&n.push(e.length),n},[]).map((t,n,r)=>{let o=Math.max(r[n-1]||0);return e.slice(o,t)}):[]}}}(B,W,C,M,z,H,J,Y,0),{snaps:Q,snapsAligned:G}=function(e,t,n,r,o){let{startEdge:i,endEdge:u}=e,{groupSlides:c}=o,a=c(r).map(e=>g(e)[u]-e[0][i]).map(d).map(t.measure),l=r.map(e=>n[i]-e[i]).map(e=>-d(e)),s=c(l).map(e=>e[0]).map((e,t)=>e+a[t]);return{snaps:l,snapsAligned:s}}(B,Z,z,H,K),ee=-g(Q)+g(X),{snapsContained:et,scrollContainLimit:en}=function(e,t,n,r,o){let i=x(-t+e,0),u=n.map((e,t)=>{let{min:r,max:o}=i,u=i.constrain(e),c=t===m(n);return t?c||1>d(r-u)?r:1>d(o-u)?o:u:o}).map(e=>parseFloat(e.toFixed(3))),c=function(){let e=u[0],t=g(u);return x(u.lastIndexOf(e),u.indexOf(t)+1)}();return{snapsContained:function(){if(t<=e+2)return[i.max];if("keepSnaps"===r)return u;let{min:n,max:o}=c;return u.slice(n,o)}(),scrollContainLimit:c}}(W,ee,G,P,0),er=$?et:G,{limit:eo}=function(e,t,n){let r=t[0];return{limit:x(n?r-e:g(t),r)}}(ee,er,M),ei=function e(t,n,r){let{constrain:o}=x(0,t),i=t+1,u=c(n);function c(e){return r?d((i+e)%i):o(e)}function a(){return e(t,u,r)}let l={get:function(){return u},set:function(e){return u=c(e),l},add:function(e){return a().set(u+e)},clone:a};return l}(m(er),k,M),eu=ei.clone(),ec=p(n),ea=({dragHandler:e,scrollBody:t,scrollBounds:n,options:{loop:r}},o)=>{r||n.constrain(e.pointerDown()),t.seek(o)},el=({scrollBody:e,translate:t,location:n,offsetLocation:r,scrollLooper:o,slideLooper:i,dragHandler:u,animation:c,eventHandler:a,scrollBounds:l,options:{loop:s}},d)=>{let f=e.settled(),p=!l.shouldConstrain(),g=s?f:f&&p;g&&!u.pointerDown()&&(c.stop(),a.emit("settle")),g||a.emit("scroll");let m=n.get()*d+ep.get()*(1-d);r.set(m),s&&(o.loop(e.direction()),i.loop()),t.to(r.get())},es=function(e,t,n,r){let o=b(),i=1e3/60,u=null,c=0,a=0;function l(e){if(!a)return;u||(u=e);let o=e-u;for(u=e,c+=o;c>=i;)n(i),c-=i;r(c/i),a&&t.requestAnimationFrame(l)}function s(){t.cancelAnimationFrame(a),u=null,c=0,a=0}return{init:function(){o.add(e,"visibilitychange",()=>{e.hidden&&(u=null,c=0)})},destroy:function(){s(),o.clear()},start:function(){a||(a=t.requestAnimationFrame(l))},stop:s,update:()=>n(i),render:r}}(r,o,e=>ea(eO,e),e=>el(eO,e)),ed=er[ei.get()],ef=w(ed),ep=w(ed),eg=w(ed),em=w(ed),eh=function(e,t,n,r,o,i){let u=0,c=0,a=o,l=.68,s=e.get(),p=0;function g(e){return a=e,h}function m(e){return l=e,h}let h={direction:function(){return c},duration:function(){return a},velocity:function(){return u},seek:function(t){let o=t/1e3,i=a*o,d=r.get()-e.get(),g=0;return a?(n.set(e),u+=d/i,u*=l,s+=u,e.add(u*o),g=s-p):(u=0,n.set(r),e.set(r),g=d),c=f(g),p=s,h},settled:function(){return .001>d(r.get()-t.get())},useBaseFriction:function(){return m(.68)},useBaseDuration:function(){return g(o)},useFriction:m,useDuration:g};return h}(ef,eg,ep,em,S,0),ey=function(e,t,n,r,o){let{reachedAny:i,removeOffset:u,constrain:c}=r;function a(e){return e.concat().sort((e,t)=>d(e)-d(t))[0]}function l(t,r){let o=[t,t+n,t-n];if(!e)return t;if(!r)return a(o);let i=o.filter(e=>f(e)===r);return i.length?a(i):g(o)-n}return{byDistance:function(n,r){let a=o.get()+n,{index:s,distance:f}=function(n){let r=e?u(n):c(n),{index:o}=t.map((e,t)=>({diff:l(e-r,0),index:t})).sort((e,t)=>d(e.diff)-d(t.diff))[0];return{index:o,distance:r}}(a),p=!e&&i(a);if(!r||p)return{index:s,distance:n};let g=n+l(t[s]-f,0);return{index:s,distance:g}},byIndex:function(e,n){let r=l(t[e]-o.get(),n);return{index:e,distance:r}},shortcut:l}}(M,er,ee,eo,em),ev=function(e,t,n,r,o,i,u){function c(o){let c=o.distance,a=o.index!==t.get();i.add(c),c&&(r.duration()?e.start():(e.update(),e.render(1),e.update())),a&&(n.set(t.get()),t.set(o.index),u.emit("select"))}return{distance:function(e,t){c(o.byDistance(e,t))},index:function(e,n){let r=t.clone().set(e);c(o.byIndex(r.get(),n))}}}(es,ei,eu,eh,ey,em,u),eb=function(e){let{max:t,length:n}=e;return{get:function(e){return n?-((e-t)/n):0}}}(eo),ex=b(),ew=function(e,t,n,r){let o;let i={},u=null,c=null,a=!1;return{init:function(){o=new IntersectionObserver(e=>{a||(e.forEach(e=>{i[t.indexOf(e.target)]=e}),u=null,c=null,n.emit("slidesInView"))},{root:e.parentElement,threshold:r}),t.forEach(e=>o.observe(e))},destroy:function(){o&&o.disconnect(),a=!0},get:function(e=!0){if(e&&u)return u;if(!e&&c)return c;let t=y(i).reduce((t,n)=>{let r=parseInt(n),{isIntersecting:o}=i[r];return(e&&o||!e&&!o)&&t.push(r),t},[]);return e&&(u=t),e||(c=t),t}}}(t,n,u,A),{slideRegistry:eD}=function(e,t,n,r,o,i){let{groupSlides:u}=o,{min:c,max:a}=r;return{slideRegistry:function(){let r=u(i);return 1===n.length?[i]:e&&"keepSnaps"!==t?r.slice(c,a).map((e,t,n)=>{let r=t===m(n);return t?r?h(m(i)-g(n)[0]+1,g(n)[0]):e:h(g(n[0])+1)}):r}()}}($,P,er,en,K,ec),eE=function(e,t,n,r,o,i,u){let a=0;function l(e){"Tab"===e.code&&(a=new Date().getTime())}function s(l){i.add(l,"focus",()=>{if(new Date().getTime()-a>10)return;e.scrollLeft=0;let i=t.indexOf(l),s=n.findIndex(e=>e.includes(i));c(s)&&(o.useDuration(0),r.index(s,0),u.emit("slideFocus"))},{passive:!0,capture:!0})}return{init:function(){i.add(document,"keydown",l,!1),t.forEach(s)}}}(e,n,eD,ev,eh,ex,u),eO={ownerDocument:r,ownerWindow:o,eventHandler:u,containerRect:z,slideRects:H,animation:es,axis:B,dragHandler:function(e,t,n,r,o,i,u,c,a,s,p,g,m,h,y,w,D,E,O){let{cross:I,direction:j}=e,k=["INPUT","SELECT","TEXTAREA"],M={passive:!1},S=b(),R=b(),F=x(50,225).constrain(h.measure(20)),A={mouse:300,touch:400},C={mouse:500,touch:600},N=y?43:25,P=!1,L=0,T=0,V=!1,_=!1,z=!1,H=!1;function B(e){if(!v(e,r)&&e.touches.length>=2)return W(e);let t=i.readPoint(e),n=i.readPoint(e,I),u=d(t-L),a=d(n-T);if(!_&&!H&&(!e.cancelable||!(_=u>a)))return W(e);let l=i.pointerMove(e);u>w&&(z=!0),s.useFriction(.3).useDuration(.75),c.start(),o.add(j(l)),e.preventDefault()}function W(e){let t=p.byDistance(0,!1).index!==g.get(),n=i.pointerUp(e)*(y?C:A)[H?"mouse":"touch"],r=function(e,t){let n=g.add(-1*f(e)),r=p.byDistance(e,!y).distance;return y||d(e)<F?r:D&&t?.5*r:p.byIndex(n.get(),0).distance}(j(n),t),o=function(e,t){var n,r;if(0===e||0===t||d(e)<=d(t))return 0;let o=(n=d(e),r=d(t),d(n-r));return d(o/e)}(n,r);_=!1,V=!1,R.clear(),s.useDuration(N-10*o).useFriction(.68+o/50),a.distance(r,!y),H=!1,m.emit("pointerUp")}function q(e){z&&(e.stopPropagation(),e.preventDefault(),z=!1)}return{init:function(e){O&&S.add(t,"dragstart",e=>e.preventDefault(),M).add(t,"touchmove",()=>void 0,M).add(t,"touchend",()=>void 0).add(t,"touchstart",c).add(t,"mousedown",c).add(t,"touchcancel",W).add(t,"contextmenu",W).add(t,"click",q,!0);function c(c){(l(O)||O(e,c))&&function(e){let c=v(e,r);H=c,z=y&&c&&!e.buttons&&P,P=d(o.get()-u.get())>=2,c&&0!==e.button||function(e){let t=e.nodeName||"";return k.includes(t)}(e.target)||(V=!0,i.pointerDown(e),s.useFriction(0).useDuration(0),o.set(u),function(){let e=H?n:t;R.add(e,"touchmove",B,M).add(e,"touchend",W).add(e,"mousemove",B,M).add(e,"mouseup",W)}(),L=i.readPoint(e),T=i.readPoint(e,I),m.emit("pointerDown"))}(c)}},destroy:function(){S.clear(),R.clear()},pointerDown:function(){return V}}}(B,e,r,o,em,function(e,t){let n,r;function o(e){return e.timeStamp}function i(n,r){let o=r||e.scroll,i=`client${"x"===o?"X":"Y"}`;return(v(n,t)?n:n.touches[0])[i]}return{pointerDown:function(e){return n=e,r=e,i(e)},pointerMove:function(e){let t=i(e)-i(r),u=o(e)-o(n)>170;return r=e,u&&(n=e),t},pointerUp:function(e){if(!n||!r)return 0;let t=i(r)-i(n),u=o(e)-o(n),c=o(e)-o(r)>170,a=t/u;return u&&!c&&d(a)>.1?a:0},readPoint:i}}(B,o),ef,es,ev,eh,ey,ei,u,q,R,F,N,0,V),eventStore:ex,percentOfView:q,index:ei,indexPrevious:eu,limit:eo,location:ef,offsetLocation:eg,previousLocation:ep,options:i,resizeHandler:function(e,t,n,r,o,i,u){let c,a;let s=[e].concat(r),f=[],p=!1;function g(e){return o.measureSize(u.measure(e))}return{init:function(o){i&&(a=g(e),f=r.map(g),c=new ResizeObserver(n=>{(l(i)||i(o,n))&&function(n){for(let i of n){if(p)return;let n=i.target===e,u=r.indexOf(i.target),c=n?a:f[u];if(d(g(n?e:r[u])-c)>=.5){o.reInit(),t.emit("resize");break}}}(n)}),n.requestAnimationFrame(()=>{s.forEach(e=>c.observe(e))}))},destroy:function(){p=!0,c&&c.disconnect()}}}(t,u,o,n,B,L,_),scrollBody:eh,scrollBounds:function(e,t,n,r,o){let i=o.measure(10),u=o.measure(50),c=x(.1,.99),a=!1;function l(){return!!(!a&&e.reachedAny(n.get())&&e.reachedAny(t.get()))}return{shouldConstrain:l,constrain:function(o){if(!l())return;let a=e.reachedMin(t.get())?"min":"max",s=d(e[a]-t.get()),f=n.get()-t.get(),p=c.constrain(s/u);n.subtract(f*p),!o&&d(f)<i&&(n.set(e.constrain(n.get())),r.useDuration(25).useBaseFriction())},toggleActive:function(e){a=!e}}}(eo,eg,em,eh,q),scrollLooper:function(e,t,n,r){let{reachedMin:o,reachedMax:i}=x(t.min+.1,t.max+.1);return{loop:function(t){if(!(1===t?i(n.get()):-1===t&&o(n.get())))return;let u=-1*t*e;r.forEach(e=>e.add(u))}}}(ee,eo,eg,[ef,eg,ep,em]),scrollProgress:eb,scrollSnapList:er.map(eb.get),scrollSnaps:er,scrollTarget:ey,scrollTo:ev,slideLooper:function(e,t,n,r,o,i,u,c,a){let l=p(o),s=g(f(p(o).reverse(),u[0]),n,!1).concat(g(f(l,t-u[0]-1),-n,!0));function d(e,t){return e.reduce((e,t)=>e-o[t],t)}function f(e,t){return e.reduce((e,n)=>d(e,t)>0?e.concat([n]):e,[])}function g(o,u,l){let s=i.map((e,n)=>({start:e-r[n]+.5+u,end:e+t-.5+u}));return o.map(t=>{let r=l?0:-n,o=l?n:0,i=s[t][l?"end":"start"];return{index:t,loopPoint:i,slideLocation:w(-1),translate:D(e,a[t]),target:()=>c.get()>i?r:o}})}return{canLoop:function(){return s.every(({index:e})=>.1>=d(l.filter(t=>t!==e),t))},clear:function(){s.forEach(e=>e.translate.clear())},loop:function(){s.forEach(e=>{let{target:t,translate:n,slideLocation:r}=e,o=t();o!==r.get()&&(n.to(o),r.set(o))})},loopPoints:s}}(B,W,ee,U,X,Q,er,eg,n),slideFocus:eE,slidesHandler:(E=!1,{init:function(e){T&&(s=new MutationObserver(t=>{!E&&(l(T)||T(e,t))&&function(t){for(let n of t)if("childList"===n.type){e.reInit(),u.emit("slidesChanged");break}}(t)})).observe(t,{childList:!0})},destroy:function(){s&&s.disconnect(),E=!0}}),slidesInView:ew,slideIndexes:ec,slideRegistry:eD,slidesToScroll:K,target:em,translate:D(B,t)};return eO}(e,i,u,j,k,n,F);return n.loop&&!r.slideLooper.canLoop()?t(Object.assign({},n,{loop:!1})):r}(z),N([_,...H.map(({options:e})=>e)]).forEach(e=>R.add(e,"change",W)),z.active&&(r.translate.to(r.location.get()),r.animation.init(),r.slidesInView.init(),r.slideFocus.init(),r.eventHandler.init(U),r.resizeHandler.init(U),r.slidesHandler.init(U),r.options.loop&&r.slideLooper.loop(),i.offsetParent&&u.length&&r.dragHandler.init(U),o=S.init(U,H)))}function W(e,t){let n=$();q(),B(A({startIndex:n},e),t),F.emit("reInit")}function q(){r.dragHandler.destroy(),r.eventStore.clear(),r.translate.clear(),r.slideLooper.clear(),r.resizeHandler.destroy(),r.slidesHandler.destroy(),r.slidesInView.destroy(),r.animation.destroy(),S.destroy(),R.clear()}function Z(e,t,n){z.active&&!V&&(r.scrollBody.useBaseFriction().useDuration(!0===t?0:z.duration),r.scrollTo.index(e,n||0))}function $(){return r.index.get()}let U={canScrollNext:function(){return r.index.add(1).get()!==$()},canScrollPrev:function(){return r.index.add(-1).get()!==$()},containerNode:function(){return i},internalEngine:function(){return r},destroy:function(){V||(V=!0,R.clear(),q(),F.emit("destroy"),F.clear())},off:L,on:P,emit:T,plugins:function(){return o},previousScrollSnap:function(){return r.indexPrevious.get()},reInit:W,rootNode:function(){return e},scrollNext:function(e){Z(r.index.add(1).get(),e,-1)},scrollPrev:function(e){Z(r.index.add(-1).get(),e,1)},scrollProgress:function(){return r.scrollProgress.get(r.location.get())},scrollSnapList:function(){return r.scrollSnapList},scrollTo:Z,selectedScrollSnap:$,slideNodes:function(){return u},slidesInView:function(){return r.slidesInView.get()},slidesNotInView:function(){return r.slidesInView.get(!1)}};return B(t,n),setTimeout(()=>F.emit("init"),0),U}function I(e={},t=[]){let n=(0,r.useRef)(e),o=(0,r.useRef)(t),[c,a]=(0,r.useState)(),[l,s]=(0,r.useState)(),d=(0,r.useCallback)(()=>{c&&c.reInit(n.current,o.current)},[c]);return(0,r.useEffect)(()=>{if("undefined"!=typeof window&&window.document&&window.document.createElement&&l){O.globalOptions=I.globalOptions;let e=O(l,n.current,o.current);return a(e),()=>e.destroy()}a(void 0)},[l,a]),(0,r.useEffect)(()=>{i(n.current,e)||(n.current=e,d())},[e,d]),(0,r.useEffect)(()=>{!function(e,t){if(e.length!==t.length)return!1;let n=u(e),r=u(t);return n.every((e,t)=>i(e,r[t]))}(o.current,t)&&(o.current=t,d())},[t,d]),[s,c]}O.globalOptions=void 0,I.globalOptions=void 0}}]);