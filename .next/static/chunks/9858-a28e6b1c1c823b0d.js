"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9858],{62361:function(e,t,r){r.d(t,{u:function(){return n}});function n(e,[t,r]){return Math.min(r,Math.max(t,e))}},44458:function(e,t,r){r.d(t,{Ee:function(){return x},NY:function(){return y},fC:function(){return b}});var n=r(2265),o=r(98324),a=r(75137),i=r(1336),l=r(25171),u=r(57437),d="Avatar",[s,c]=(0,o.b)(d),[f,p]=s(d),v=n.forwardRef((e,t)=>{let{__scopeAvatar:r,...o}=e,[a,i]=n.useState("idle");return(0,u.jsx)(f,{scope:r,imageLoadingStatus:a,onImageLoadingStatusChange:i,children:(0,u.jsx)(l.WV.span,{...o,ref:t})})});v.displayName=d;var m="AvatarImage",h=n.forwardRef((e,t)=>{let{__scopeAvatar:r,src:o,onLoadingStatusChange:d=()=>{},...s}=e,c=p(m,r),f=function(e){let[t,r]=n.useState("idle");return(0,i.b)(()=>{if(!e){r("error");return}let t=!0,n=new window.Image,o=e=>()=>{t&&r(e)};return r("loading"),n.onload=o("loaded"),n.onerror=o("error"),n.src=e,()=>{t=!1}},[e]),t}(o),v=(0,a.W)(e=>{d(e),c.onImageLoadingStatusChange(e)});return(0,i.b)(()=>{"idle"!==f&&v(f)},[f,v]),"loaded"===f?(0,u.jsx)(l.WV.img,{...s,ref:t,src:o}):null});h.displayName=m;var w="AvatarFallback",g=n.forwardRef((e,t)=>{let{__scopeAvatar:r,delayMs:o,...a}=e,i=p(w,r),[d,s]=n.useState(void 0===o);return n.useEffect(()=>{if(void 0!==o){let e=window.setTimeout(()=>s(!0),o);return()=>window.clearTimeout(e)}},[o]),d&&"loaded"!==i.imageLoadingStatus?(0,u.jsx)(l.WV.span,{...a,ref:t}):null});g.displayName=w;var b=v,x=h,y=g},52431:function(e,t,r){r.d(t,{fC:function(){return x},z$:function(){return y}});var n=r(2265),o=r(98324),a=r(25171),i=r(57437),l="Progress",[u,d]=(0,o.b)(l),[s,c]=u(l),f=n.forwardRef((e,t)=>{var r,n,o,l;let{__scopeProgress:u,value:d=null,max:c,getValueLabel:f=m,...p}=e;(c||0===c)&&!g(c)&&console.error((r="".concat(c),n="Progress","Invalid prop `max` of value `".concat(r,"` supplied to `").concat(n,"`. Only numbers greater than 0 are valid max values. Defaulting to `").concat(100,"`.")));let v=g(c)?c:100;null===d||b(d,v)||console.error((o="".concat(d),l="Progress","Invalid prop `value` of value `".concat(o,"` supplied to `").concat(l,"`. The `value` prop must be:\n  - a positive number\n  - less than the value passed to `max` (or ").concat(100," if no `max` prop is set)\n  - `null` or `undefined` if the progress is indeterminate.\n\nDefaulting to `null`.")));let x=b(d,v)?d:null,y=w(x)?f(x,v):void 0;return(0,i.jsx)(s,{scope:u,value:x,max:v,children:(0,i.jsx)(a.WV.div,{"aria-valuemax":v,"aria-valuemin":0,"aria-valuenow":w(x)?x:void 0,"aria-valuetext":y,role:"progressbar","data-state":h(x,v),"data-value":null!=x?x:void 0,"data-max":v,...p,ref:t})})});f.displayName=l;var p="ProgressIndicator",v=n.forwardRef((e,t)=>{var r;let{__scopeProgress:n,...o}=e,l=c(p,n);return(0,i.jsx)(a.WV.div,{"data-state":h(l.value,l.max),"data-value":null!==(r=l.value)&&void 0!==r?r:void 0,"data-max":l.max,...o,ref:t})});function m(e,t){return"".concat(Math.round(e/t*100),"%")}function h(e,t){return null==e?"indeterminate":e===t?"complete":"loading"}function w(e){return"number"==typeof e}function g(e){return w(e)&&!isNaN(e)&&e>0}function b(e,t){return w(e)&&!isNaN(e)&&e<=t&&e>=0}v.displayName=p;var x=f,y=v},99497:function(e,t,r){r.d(t,{ck:function(){return T},fC:function(){return W},oo:function(){return P},z$:function(){return z}});var n=r(2265),o=r(78149),a=r(1584),i=r(98324),l=r(25171),u=r(53398),d=r(91715),s=r(87513),c=r(75238),f=r(47250),p=r(31383),v=r(57437),m="Radio",[h,w]=(0,i.b)(m),[g,b]=h(m),x=n.forwardRef((e,t)=>{let{__scopeRadio:r,name:i,checked:u=!1,required:d,disabled:s,value:c="on",onCheck:f,...p}=e,[m,h]=n.useState(null),w=(0,a.e)(t,e=>h(e)),b=n.useRef(!1),x=!m||!!m.closest("form");return(0,v.jsxs)(g,{scope:r,checked:u,disabled:s,children:[(0,v.jsx)(l.WV.button,{type:"button",role:"radio","aria-checked":u,"data-state":j(u),"data-disabled":s?"":void 0,disabled:s,value:c,...p,ref:w,onClick:(0,o.M)(e.onClick,e=>{u||null==f||f(),x&&(b.current=e.isPropagationStopped(),b.current||e.stopPropagation())})}),x&&(0,v.jsx)(S,{control:m,bubbles:!b.current,name:i,value:c,checked:u,required:d,disabled:s,style:{transform:"translateX(-100%)"}})]})});x.displayName=m;var y="RadioIndicator",R=n.forwardRef((e,t)=>{let{__scopeRadio:r,forceMount:n,...o}=e,a=b(y,r);return(0,v.jsx)(p.z,{present:n||a.checked,children:(0,v.jsx)(l.WV.span,{"data-state":j(a.checked),"data-disabled":a.disabled?"":void 0,...o,ref:t})})});R.displayName=y;var S=e=>{let{control:t,checked:r,bubbles:o=!0,...a}=e,i=n.useRef(null),l=(0,f.D)(r),u=(0,c.t)(t);return n.useEffect(()=>{let e=i.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(l!==r&&t){let n=new Event("click",{bubbles:o});t.call(e,r),e.dispatchEvent(n)}},[l,r,o]),(0,v.jsx)("input",{type:"radio","aria-hidden":!0,defaultChecked:r,...a,tabIndex:-1,ref:i,style:{...e.style,...u,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function j(e){return e?"checked":"unchecked"}var k=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],E="RadioGroup",[D,P]=(0,i.b)(E,[u.Pc,w]),M=(0,u.Pc)(),C=w(),[I,N]=D(E),A=n.forwardRef((e,t)=>{let{__scopeRadioGroup:r,name:n,defaultValue:o,value:a,required:i=!1,disabled:c=!1,orientation:f,dir:p,loop:m=!0,onValueChange:h,...w}=e,g=M(r),b=(0,s.gm)(p),[x,y]=(0,d.T)({prop:a,defaultProp:o,onChange:h});return(0,v.jsx)(I,{scope:r,name:n,required:i,disabled:c,value:x,onValueChange:y,children:(0,v.jsx)(u.fC,{asChild:!0,...g,orientation:f,dir:b,loop:m,children:(0,v.jsx)(l.WV.div,{role:"radiogroup","aria-required":i,"aria-orientation":f,"data-disabled":c?"":void 0,dir:b,...w,ref:t})})})});A.displayName=E;var V="RadioGroupItem",_=n.forwardRef((e,t)=>{let{__scopeRadioGroup:r,disabled:i,...l}=e,d=N(V,r),s=d.disabled||i,c=M(r),f=C(r),p=n.useRef(null),m=(0,a.e)(t,p),h=d.value===l.value,w=n.useRef(!1);return n.useEffect(()=>{let e=e=>{k.includes(e.key)&&(w.current=!0)},t=()=>w.current=!1;return document.addEventListener("keydown",e),document.addEventListener("keyup",t),()=>{document.removeEventListener("keydown",e),document.removeEventListener("keyup",t)}},[]),(0,v.jsx)(u.ck,{asChild:!0,...c,focusable:!s,active:h,children:(0,v.jsx)(x,{disabled:s,required:d.required,checked:h,...f,...l,name:d.name,ref:m,onCheck:()=>d.onValueChange(l.value),onKeyDown:(0,o.M)(e=>{"Enter"===e.key&&e.preventDefault()}),onFocus:(0,o.M)(l.onFocus,()=>{var e;w.current&&(null===(e=p.current)||void 0===e||e.click())})})})});_.displayName=V;var L=n.forwardRef((e,t)=>{let{__scopeRadioGroup:r,...n}=e,o=C(r);return(0,v.jsx)(R,{...o,...n,ref:t})});L.displayName="RadioGroupIndicator";var W=A,T=_,z=L},67553:function(e,t,r){r.d(t,{bU:function(){return X},e6:function(){return F},fC:function(){return O},fQ:function(){return U}});var n=r(2265),o=r(62361),a=r(78149),i=r(1584),l=r(98324),u=r(91715),d=r(87513),s=r(47250),c=r(75238),f=r(25171),p=r(90976),v=r(57437),m=["PageUp","PageDown"],h=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"],w={"from-left":["Home","PageDown","ArrowDown","ArrowLeft"],"from-right":["Home","PageDown","ArrowDown","ArrowRight"],"from-bottom":["Home","PageDown","ArrowDown","ArrowLeft"],"from-top":["Home","PageDown","ArrowUp","ArrowLeft"]},g="Slider",[b,x,y]=(0,p.B)(g),[R,S]=(0,l.b)(g,[y]),[j,k]=R(g),E=n.forwardRef((e,t)=>{let{name:r,min:i=0,max:l=100,step:d=1,orientation:s="horizontal",disabled:c=!1,minStepsBetweenThumbs:f=0,defaultValue:p=[i],value:w,onValueChange:g=()=>{},onValueCommit:x=()=>{},inverted:y=!1,...R}=e,S=n.useRef(new Set),k=n.useRef(0),E="horizontal"===s?M:C,[D=[],P]=(0,u.T)({prop:w,defaultProp:p,onChange:e=>{var t;null===(t=[...S.current][k.current])||void 0===t||t.focus(),g(e)}}),I=n.useRef(D);function N(e,t){let{commit:r}=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{commit:!1},n=(String(d).split(".")[1]||"").length,a=function(e,t){let r=Math.pow(10,t);return Math.round(e*r)/r}(Math.round((e-i)/d)*d+i,n),u=(0,o.u)(a,[i,l]);P(function(){var e,n;let o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],a=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0,r=arguments.length>2?arguments[2]:void 0,n=[...e];return n[r]=t,n.sort((e,t)=>e-t)}(o,u,t);if(e=a,!(!((n=f*d)>0)||Math.min(...e.slice(0,-1).map((t,r)=>e[r+1]-t))>=n))return o;{k.current=a.indexOf(u);let e=String(a)!==String(o);return e&&r&&x(a),e?a:o}})}return(0,v.jsx)(j,{scope:e.__scopeSlider,name:r,disabled:c,min:i,max:l,valueIndexToChangeRef:k,thumbs:S.current,values:D,orientation:s,children:(0,v.jsx)(b.Provider,{scope:e.__scopeSlider,children:(0,v.jsx)(b.Slot,{scope:e.__scopeSlider,children:(0,v.jsx)(E,{"aria-disabled":c,"data-disabled":c?"":void 0,...R,ref:t,onPointerDown:(0,a.M)(R.onPointerDown,()=>{c||(I.current=D)}),min:i,max:l,inverted:y,onSlideStart:c?void 0:function(e){let t=function(e,t){if(1===e.length)return 0;let r=e.map(e=>Math.abs(e-t));return r.indexOf(Math.min(...r))}(D,e);N(e,t)},onSlideMove:c?void 0:function(e){N(e,k.current)},onSlideEnd:c?void 0:function(){let e=I.current[k.current];D[k.current]!==e&&x(D)},onHomeKeyDown:()=>!c&&N(i,0,{commit:!0}),onEndKeyDown:()=>!c&&N(l,D.length-1,{commit:!0}),onStepKeyDown:e=>{let{event:t,direction:r}=e;if(!c){let e=m.includes(t.key)||t.shiftKey&&h.includes(t.key),n=k.current;N(D[n]+d*(e?10:1)*r,n,{commit:!0})}}})})})})});E.displayName=g;var[D,P]=R(g,{startEdge:"left",endEdge:"right",size:"width",direction:1}),M=n.forwardRef((e,t)=>{let{min:r,max:o,dir:a,inverted:l,onSlideStart:u,onSlideMove:s,onSlideEnd:c,onStepKeyDown:f,...p}=e,[m,h]=n.useState(null),g=(0,i.e)(t,e=>h(e)),b=n.useRef(),x=(0,d.gm)(a),y="ltr"===x,R=y&&!l||!y&&l;function S(e){let t=b.current||m.getBoundingClientRect(),n=K([0,t.width],R?[r,o]:[o,r]);return b.current=t,n(e-t.left)}return(0,v.jsx)(D,{scope:e.__scopeSlider,startEdge:R?"left":"right",endEdge:R?"right":"left",direction:R?1:-1,size:"width",children:(0,v.jsx)(I,{dir:x,"data-orientation":"horizontal",...p,ref:g,style:{...p.style,"--radix-slider-thumb-transform":"translateX(-50%)"},onSlideStart:e=>{let t=S(e.clientX);null==u||u(t)},onSlideMove:e=>{let t=S(e.clientX);null==s||s(t)},onSlideEnd:()=>{b.current=void 0,null==c||c()},onStepKeyDown:e=>{let t=w[R?"from-left":"from-right"].includes(e.key);null==f||f({event:e,direction:t?-1:1})}})})}),C=n.forwardRef((e,t)=>{let{min:r,max:o,inverted:a,onSlideStart:l,onSlideMove:u,onSlideEnd:d,onStepKeyDown:s,...c}=e,f=n.useRef(null),p=(0,i.e)(t,f),m=n.useRef(),h=!a;function g(e){let t=m.current||f.current.getBoundingClientRect(),n=K([0,t.height],h?[o,r]:[r,o]);return m.current=t,n(e-t.top)}return(0,v.jsx)(D,{scope:e.__scopeSlider,startEdge:h?"bottom":"top",endEdge:h?"top":"bottom",size:"height",direction:h?1:-1,children:(0,v.jsx)(I,{"data-orientation":"vertical",...c,ref:p,style:{...c.style,"--radix-slider-thumb-transform":"translateY(50%)"},onSlideStart:e=>{let t=g(e.clientY);null==l||l(t)},onSlideMove:e=>{let t=g(e.clientY);null==u||u(t)},onSlideEnd:()=>{m.current=void 0,null==d||d()},onStepKeyDown:e=>{let t=w[h?"from-bottom":"from-top"].includes(e.key);null==s||s({event:e,direction:t?-1:1})}})})}),I=n.forwardRef((e,t)=>{let{__scopeSlider:r,onSlideStart:n,onSlideMove:o,onSlideEnd:i,onHomeKeyDown:l,onEndKeyDown:u,onStepKeyDown:d,...s}=e,c=k(g,r);return(0,v.jsx)(f.WV.span,{...s,ref:t,onKeyDown:(0,a.M)(e.onKeyDown,e=>{"Home"===e.key?(l(e),e.preventDefault()):"End"===e.key?(u(e),e.preventDefault()):m.concat(h).includes(e.key)&&(d(e),e.preventDefault())}),onPointerDown:(0,a.M)(e.onPointerDown,e=>{let t=e.target;t.setPointerCapture(e.pointerId),e.preventDefault(),c.thumbs.has(t)?t.focus():n(e)}),onPointerMove:(0,a.M)(e.onPointerMove,e=>{e.target.hasPointerCapture(e.pointerId)&&o(e)}),onPointerUp:(0,a.M)(e.onPointerUp,e=>{let t=e.target;t.hasPointerCapture(e.pointerId)&&(t.releasePointerCapture(e.pointerId),i(e))})})}),N="SliderTrack",A=n.forwardRef((e,t)=>{let{__scopeSlider:r,...n}=e,o=k(N,r);return(0,v.jsx)(f.WV.span,{"data-disabled":o.disabled?"":void 0,"data-orientation":o.orientation,...n,ref:t})});A.displayName=N;var V="SliderRange",_=n.forwardRef((e,t)=>{let{__scopeSlider:r,...o}=e,a=k(V,r),l=P(V,r),u=n.useRef(null),d=(0,i.e)(t,u),s=a.values.length,c=a.values.map(e=>H(e,a.min,a.max));return(0,v.jsx)(f.WV.span,{"data-orientation":a.orientation,"data-disabled":a.disabled?"":void 0,...o,ref:d,style:{...e.style,[l.startEdge]:(s>1?Math.min(...c):0)+"%",[l.endEdge]:100-Math.max(...c)+"%"}})});_.displayName=V;var L="SliderThumb",W=n.forwardRef((e,t)=>{let r=x(e.__scopeSlider),[o,a]=n.useState(null),l=(0,i.e)(t,e=>a(e)),u=n.useMemo(()=>o?r().findIndex(e=>e.ref.current===o):-1,[r,o]);return(0,v.jsx)(T,{...e,ref:l,index:u})}),T=n.forwardRef((e,t)=>{var r;let{__scopeSlider:o,index:l,name:u,...d}=e,s=k(L,o),p=P(L,o),[m,h]=n.useState(null),w=(0,i.e)(t,e=>h(e)),g=!m||!!m.closest("form"),x=(0,c.t)(m),y=s.values[l],R=void 0===y?0:H(y,s.min,s.max),S=(r=s.values.length)>2?"Value ".concat(l+1," of ").concat(r):2===r?["Minimum","Maximum"][l]:void 0,j=null==x?void 0:x[p.size],E=j?function(e,t,r){let n=e/2,o=K([0,50],[0,n]);return(n-o(t)*r)*r}(j,R,p.direction):0;return n.useEffect(()=>{if(m)return s.thumbs.add(m),()=>{s.thumbs.delete(m)}},[m,s.thumbs]),(0,v.jsxs)("span",{style:{transform:"var(--radix-slider-thumb-transform)",position:"absolute",[p.startEdge]:"calc(".concat(R,"% + ").concat(E,"px)")},children:[(0,v.jsx)(b.ItemSlot,{scope:e.__scopeSlider,children:(0,v.jsx)(f.WV.span,{role:"slider","aria-label":e["aria-label"]||S,"aria-valuemin":s.min,"aria-valuenow":y,"aria-valuemax":s.max,"aria-orientation":s.orientation,"data-orientation":s.orientation,"data-disabled":s.disabled?"":void 0,tabIndex:s.disabled?void 0:0,...d,ref:w,style:void 0===y?{display:"none"}:e.style,onFocus:(0,a.M)(e.onFocus,()=>{s.valueIndexToChangeRef.current=l})})}),g&&(0,v.jsx)(z,{name:null!=u?u:s.name?s.name+(s.values.length>1?"[]":""):void 0,value:y},l)]})});W.displayName=L;var z=e=>{let{value:t,...r}=e,o=n.useRef(null),a=(0,s.D)(t);return n.useEffect(()=>{let e=o.current,r=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"value").set;if(a!==t&&r){let n=new Event("input",{bubbles:!0});r.call(e,t),e.dispatchEvent(n)}},[a,t]),(0,v.jsx)("input",{style:{display:"none"},...r,ref:o,defaultValue:t})};function H(e,t,r){return(0,o.u)(100/(r-t)*(e-t),[0,100])}function K(e,t){return r=>{if(e[0]===e[1]||t[0]===t[1])return t[0];let n=(t[1]-t[0])/(e[1]-e[0]);return t[0]+n*(r-e[0])}}var O=E,U=A,F=_,X=W},9646:function(e,t,r){r.d(t,{bU:function(){return S},fC:function(){return R}});var n=r(2265),o=r(78149),a=r(1584),i=r(98324),l=r(91715),u=r(47250),d=r(75238),s=r(25171),c=r(57437),f="Switch",[p,v]=(0,i.b)(f),[m,h]=p(f),w=n.forwardRef((e,t)=>{let{__scopeSwitch:r,name:i,checked:u,defaultChecked:d,required:f,disabled:p,value:v="on",onCheckedChange:h,...w}=e,[g,b]=n.useState(null),R=(0,a.e)(t,e=>b(e)),S=n.useRef(!1),j=!g||!!g.closest("form"),[k=!1,E]=(0,l.T)({prop:u,defaultProp:d,onChange:h});return(0,c.jsxs)(m,{scope:r,checked:k,disabled:p,children:[(0,c.jsx)(s.WV.button,{type:"button",role:"switch","aria-checked":k,"aria-required":f,"data-state":y(k),"data-disabled":p?"":void 0,disabled:p,value:v,...w,ref:R,onClick:(0,o.M)(e.onClick,e=>{E(e=>!e),j&&(S.current=e.isPropagationStopped(),S.current||e.stopPropagation())})}),j&&(0,c.jsx)(x,{control:g,bubbles:!S.current,name:i,value:v,checked:k,required:f,disabled:p,style:{transform:"translateX(-100%)"}})]})});w.displayName=f;var g="SwitchThumb",b=n.forwardRef((e,t)=>{let{__scopeSwitch:r,...n}=e,o=h(g,r);return(0,c.jsx)(s.WV.span,{"data-state":y(o.checked),"data-disabled":o.disabled?"":void 0,...n,ref:t})});b.displayName=g;var x=e=>{let{control:t,checked:r,bubbles:o=!0,...a}=e,i=n.useRef(null),l=(0,u.D)(r),s=(0,d.t)(t);return n.useEffect(()=>{let e=i.current,t=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,"checked").set;if(l!==r&&t){let n=new Event("click",{bubbles:o});t.call(e,r),e.dispatchEvent(n)}},[l,r,o]),(0,c.jsx)("input",{type:"checkbox","aria-hidden":!0,defaultChecked:r,...a,tabIndex:-1,ref:i,style:{...e.style,...s,position:"absolute",pointerEvents:"none",opacity:0,margin:0}})};function y(e){return e?"checked":"unchecked"}var R=w,S=b},47250:function(e,t,r){r.d(t,{D:function(){return o}});var n=r(2265);function o(e){let t=n.useRef({value:e,previous:e});return n.useMemo(()=>(t.current.value!==e&&(t.current.previous=t.current.value,t.current.value=e),t.current.previous),[e])}}}]);