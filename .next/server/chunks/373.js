"use strict";exports.id=373,exports.ids=[373],exports.modules={25373:(e,n,t)=>{t.d(n,{Ee:()=>eK,Eh:()=>eU,Rk:()=>eA,Tr:()=>eB,VY:()=>eI,Wf:()=>I,Z0:()=>eW,ZA:()=>eO,__:()=>eF,ck:()=>eL,ee:()=>eT,fC:()=>eE,fF:()=>eG,h_:()=>eS,oC:()=>eN,tu:()=>eX,wU:()=>eV});var r=t(17577),o=t(82561),u=t(7747),a=t(48051),l=t(93095),c=t(17124),i=t(825),s=t(80699),d=t(10441),f=t(88957),p=t(17103),h=t(83078),v=t(9815),m=t(45226),g=t(15594),M=t(34214),x=t(55049),w=t(35664),C=t(58260),y=t(10326),_=["Enter"," "],j=["ArrowUp","PageDown","End"],R=["ArrowDown","PageUp","Home",...j],b={ltr:[..._,"ArrowRight"],rtl:[..._,"ArrowLeft"]},k={ltr:["ArrowLeft"],rtl:["ArrowRight"]},P="Menu",[D,E,T]=(0,u.B)(P),[S,I]=(0,l.b)(P,[T,p.D7,g.Pc]),O=(0,p.D7)(),F=(0,g.Pc)(),[L,N]=S(P),[K,A]=S(P),V=e=>{let{__scopeMenu:n,open:t=!1,children:o,dir:u,onOpenChange:a,modal:l=!0}=e,i=O(n),[s,d]=r.useState(null),f=r.useRef(!1),h=(0,x.W)(a),v=(0,c.gm)(u);return r.useEffect(()=>{let e=()=>{f.current=!0,document.addEventListener("pointerdown",n,{capture:!0,once:!0}),document.addEventListener("pointermove",n,{capture:!0,once:!0})},n=()=>f.current=!1;return document.addEventListener("keydown",e,{capture:!0}),()=>{document.removeEventListener("keydown",e,{capture:!0}),document.removeEventListener("pointerdown",n,{capture:!0}),document.removeEventListener("pointermove",n,{capture:!0})}},[]),(0,y.jsx)(p.fC,{...i,children:(0,y.jsx)(L,{scope:n,open:t,onOpenChange:h,content:s,onContentChange:d,children:(0,y.jsx)(K,{scope:n,onClose:r.useCallback(()=>h(!1),[h]),isUsingKeyboardRef:f,dir:v,modal:l,children:o})})})};V.displayName=P;var W=r.forwardRef((e,n)=>{let{__scopeMenu:t,...r}=e,o=O(t);return(0,y.jsx)(p.ee,{...o,...r,ref:n})});W.displayName="MenuAnchor";var U="MenuPortal",[B,G]=S(U,{forceMount:void 0}),X=e=>{let{__scopeMenu:n,forceMount:t,children:r,container:o}=e,u=N(U,n);return(0,y.jsx)(B,{scope:n,forceMount:t,children:(0,y.jsx)(v.z,{present:t||u.open,children:(0,y.jsx)(h.h,{asChild:!0,container:o,children:r})})})};X.displayName=U;var z="MenuContent",[Y,Z]=S(z),H=r.forwardRef((e,n)=>{let t=G(z,e.__scopeMenu),{forceMount:r=t.forceMount,...o}=e,u=N(z,e.__scopeMenu),a=A(z,e.__scopeMenu);return(0,y.jsx)(D.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(v.z,{present:r||u.open,children:(0,y.jsx)(D.Slot,{scope:e.__scopeMenu,children:a.modal?(0,y.jsx)(q,{...o,ref:n}):(0,y.jsx)(J,{...o,ref:n})})})})}),q=r.forwardRef((e,n)=>{let t=N(z,e.__scopeMenu),u=r.useRef(null),l=(0,a.e)(n,u);return r.useEffect(()=>{let e=u.current;if(e)return(0,w.Ry)(e)},[]),(0,y.jsx)(Q,{...e,ref:l,trapFocus:t.open,disableOutsidePointerEvents:t.open,disableOutsideScroll:!0,onFocusOutside:(0,o.M)(e.onFocusOutside,e=>e.preventDefault(),{checkForDefaultPrevented:!1}),onDismiss:()=>t.onOpenChange(!1)})}),J=r.forwardRef((e,n)=>{let t=N(z,e.__scopeMenu);return(0,y.jsx)(Q,{...e,ref:n,trapFocus:!1,disableOutsidePointerEvents:!1,disableOutsideScroll:!1,onDismiss:()=>t.onOpenChange(!1)})}),Q=r.forwardRef((e,n)=>{let{__scopeMenu:t,loop:u=!1,trapFocus:l,onOpenAutoFocus:c,onCloseAutoFocus:f,disableOutsidePointerEvents:h,onEntryFocus:v,onEscapeKeyDown:m,onPointerDownOutside:x,onFocusOutside:w,onInteractOutside:_,onDismiss:b,disableOutsideScroll:k,...P}=e,D=N(z,t),T=A(z,t),S=O(t),I=F(t),L=E(t),[K,V]=r.useState(null),W=r.useRef(null),U=(0,a.e)(n,W,D.onContentChange),B=r.useRef(0),G=r.useRef(""),X=r.useRef(0),Z=r.useRef(null),H=r.useRef("right"),q=r.useRef(0),J=k?C.Z:r.Fragment,Q=k?{as:M.g7,allowPinchZoom:!0}:void 0,$=e=>{let n=G.current+e,t=L().filter(e=>!e.disabled),r=document.activeElement,o=t.find(e=>e.ref.current===r)?.textValue,u=function(e,n,t){var r;let o=n.length>1&&Array.from(n).every(e=>e===n[0])?n[0]:n,u=(r=Math.max(t?e.indexOf(t):-1,0),e.map((n,t)=>e[(r+t)%e.length]));1===o.length&&(u=u.filter(e=>e!==t));let a=u.find(e=>e.toLowerCase().startsWith(o.toLowerCase()));return a!==t?a:void 0}(t.map(e=>e.textValue),n,o),a=t.find(e=>e.textValue===u)?.ref.current;(function e(n){G.current=n,window.clearTimeout(B.current),""!==n&&(B.current=window.setTimeout(()=>e(""),1e3))})(n),a&&setTimeout(()=>a.focus())};r.useEffect(()=>()=>window.clearTimeout(B.current),[]),(0,s.EW)();let ee=r.useCallback(e=>H.current===Z.current?.side&&function(e,n){return!!n&&function(e,n){let{x:t,y:r}=e,o=!1;for(let e=0,u=n.length-1;e<n.length;u=e++){let a=n[e].x,l=n[e].y,c=n[u].x,i=n[u].y;l>r!=i>r&&t<(c-a)*(r-l)/(i-l)+a&&(o=!o)}return o}({x:e.clientX,y:e.clientY},n)}(e,Z.current?.area),[]);return(0,y.jsx)(Y,{scope:t,searchRef:G,onItemEnter:r.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),onItemLeave:r.useCallback(e=>{ee(e)||(W.current?.focus(),V(null))},[ee]),onTriggerLeave:r.useCallback(e=>{ee(e)&&e.preventDefault()},[ee]),pointerGraceTimerRef:X,onPointerGraceIntentChange:r.useCallback(e=>{Z.current=e},[]),children:(0,y.jsx)(J,{...Q,children:(0,y.jsx)(d.M,{asChild:!0,trapped:l,onMountAutoFocus:(0,o.M)(c,e=>{e.preventDefault(),W.current?.focus({preventScroll:!0})}),onUnmountAutoFocus:f,children:(0,y.jsx)(i.XB,{asChild:!0,disableOutsidePointerEvents:h,onEscapeKeyDown:m,onPointerDownOutside:x,onFocusOutside:w,onInteractOutside:_,onDismiss:b,children:(0,y.jsx)(g.fC,{asChild:!0,...I,dir:T.dir,orientation:"vertical",loop:u,currentTabStopId:K,onCurrentTabStopIdChange:V,onEntryFocus:(0,o.M)(v,e=>{T.isUsingKeyboardRef.current||e.preventDefault()}),preventScrollOnEntryFocus:!0,children:(0,y.jsx)(p.VY,{role:"menu","aria-orientation":"vertical","data-state":eb(D.open),"data-radix-menu-content":"",dir:T.dir,...S,...P,ref:U,style:{outline:"none",...P.style},onKeyDown:(0,o.M)(P.onKeyDown,e=>{let n=e.target.closest("[data-radix-menu-content]")===e.currentTarget,t=e.ctrlKey||e.altKey||e.metaKey,r=1===e.key.length;n&&("Tab"===e.key&&e.preventDefault(),!t&&r&&$(e.key));let o=W.current;if(e.target!==o||!R.includes(e.key))return;e.preventDefault();let u=L().filter(e=>!e.disabled).map(e=>e.ref.current);j.includes(e.key)&&u.reverse(),function(e){let n=document.activeElement;for(let t of e)if(t===n||(t.focus(),document.activeElement!==n))return}(u)}),onBlur:(0,o.M)(e.onBlur,e=>{e.currentTarget.contains(e.target)||(window.clearTimeout(B.current),G.current="")}),onPointerMove:(0,o.M)(e.onPointerMove,eD(e=>{let n=e.target,t=q.current!==e.clientX;if(e.currentTarget.contains(n)&&t){let n=e.clientX>q.current?"right":"left";H.current=n,q.current=e.clientX}}))})})})})})})});H.displayName=z;var $=r.forwardRef((e,n)=>{let{__scopeMenu:t,...r}=e;return(0,y.jsx)(m.WV.div,{role:"group",...r,ref:n})});$.displayName="MenuGroup";var ee=r.forwardRef((e,n)=>{let{__scopeMenu:t,...r}=e;return(0,y.jsx)(m.WV.div,{...r,ref:n})});ee.displayName="MenuLabel";var en="MenuItem",et="menu.itemSelect",er=r.forwardRef((e,n)=>{let{disabled:t=!1,onSelect:u,...l}=e,c=r.useRef(null),i=A(en,e.__scopeMenu),s=Z(en,e.__scopeMenu),d=(0,a.e)(n,c),f=r.useRef(!1);return(0,y.jsx)(eo,{...l,ref:d,disabled:t,onClick:(0,o.M)(e.onClick,()=>{let e=c.current;if(!t&&e){let n=new CustomEvent(et,{bubbles:!0,cancelable:!0});e.addEventListener(et,e=>u?.(e),{once:!0}),(0,m.jH)(e,n),n.defaultPrevented?f.current=!1:i.onClose()}}),onPointerDown:n=>{e.onPointerDown?.(n),f.current=!0},onPointerUp:(0,o.M)(e.onPointerUp,e=>{f.current||e.currentTarget?.click()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let n=""!==s.searchRef.current;!t&&(!n||" "!==e.key)&&_.includes(e.key)&&(e.currentTarget.click(),e.preventDefault())})})});er.displayName=en;var eo=r.forwardRef((e,n)=>{let{__scopeMenu:t,disabled:u=!1,textValue:l,...c}=e,i=Z(en,t),s=F(t),d=r.useRef(null),f=(0,a.e)(n,d),[p,h]=r.useState(!1),[v,M]=r.useState("");return r.useEffect(()=>{let e=d.current;e&&M((e.textContent??"").trim())},[c.children]),(0,y.jsx)(D.ItemSlot,{scope:t,disabled:u,textValue:l??v,children:(0,y.jsx)(g.ck,{asChild:!0,...s,focusable:!u,children:(0,y.jsx)(m.WV.div,{role:"menuitem","data-highlighted":p?"":void 0,"aria-disabled":u||void 0,"data-disabled":u?"":void 0,...c,ref:f,onPointerMove:(0,o.M)(e.onPointerMove,eD(e=>{u?i.onItemLeave(e):(i.onItemEnter(e),e.defaultPrevented||e.currentTarget.focus({preventScroll:!0}))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eD(e=>i.onItemLeave(e))),onFocus:(0,o.M)(e.onFocus,()=>h(!0)),onBlur:(0,o.M)(e.onBlur,()=>h(!1))})})})}),eu=r.forwardRef((e,n)=>{let{checked:t=!1,onCheckedChange:r,...u}=e;return(0,y.jsx)(ep,{scope:e.__scopeMenu,checked:t,children:(0,y.jsx)(er,{role:"menuitemcheckbox","aria-checked":ek(t)?"mixed":t,...u,ref:n,"data-state":eP(t),onSelect:(0,o.M)(u.onSelect,()=>r?.(!!ek(t)||!t),{checkForDefaultPrevented:!1})})})});eu.displayName="MenuCheckboxItem";var ea="MenuRadioGroup",[el,ec]=S(ea,{value:void 0,onValueChange:()=>{}}),ei=r.forwardRef((e,n)=>{let{value:t,onValueChange:r,...o}=e,u=(0,x.W)(r);return(0,y.jsx)(el,{scope:e.__scopeMenu,value:t,onValueChange:u,children:(0,y.jsx)($,{...o,ref:n})})});ei.displayName=ea;var es="MenuRadioItem",ed=r.forwardRef((e,n)=>{let{value:t,...r}=e,u=ec(es,e.__scopeMenu),a=t===u.value;return(0,y.jsx)(ep,{scope:e.__scopeMenu,checked:a,children:(0,y.jsx)(er,{role:"menuitemradio","aria-checked":a,...r,ref:n,"data-state":eP(a),onSelect:(0,o.M)(r.onSelect,()=>u.onValueChange?.(t),{checkForDefaultPrevented:!1})})})});ed.displayName=es;var ef="MenuItemIndicator",[ep,eh]=S(ef,{checked:!1}),ev=r.forwardRef((e,n)=>{let{__scopeMenu:t,forceMount:r,...o}=e,u=eh(ef,t);return(0,y.jsx)(v.z,{present:r||ek(u.checked)||!0===u.checked,children:(0,y.jsx)(m.WV.span,{...o,ref:n,"data-state":eP(u.checked)})})});ev.displayName=ef;var em=r.forwardRef((e,n)=>{let{__scopeMenu:t,...r}=e;return(0,y.jsx)(m.WV.div,{role:"separator","aria-orientation":"horizontal",...r,ref:n})});em.displayName="MenuSeparator";var eg=r.forwardRef((e,n)=>{let{__scopeMenu:t,...r}=e,o=O(t);return(0,y.jsx)(p.Eh,{...o,...r,ref:n})});eg.displayName="MenuArrow";var eM="MenuSub",[ex,ew]=S(eM),eC=e=>{let{__scopeMenu:n,children:t,open:o=!1,onOpenChange:u}=e,a=N(eM,n),l=O(n),[c,i]=r.useState(null),[s,d]=r.useState(null),h=(0,x.W)(u);return r.useEffect(()=>(!1===a.open&&h(!1),()=>h(!1)),[a.open,h]),(0,y.jsx)(p.fC,{...l,children:(0,y.jsx)(L,{scope:n,open:o,onOpenChange:h,content:s,onContentChange:d,children:(0,y.jsx)(ex,{scope:n,contentId:(0,f.M)(),triggerId:(0,f.M)(),trigger:c,onTriggerChange:i,children:t})})})};eC.displayName=eM;var ey="MenuSubTrigger",e_=r.forwardRef((e,n)=>{let t=N(ey,e.__scopeMenu),u=A(ey,e.__scopeMenu),l=ew(ey,e.__scopeMenu),c=Z(ey,e.__scopeMenu),i=r.useRef(null),{pointerGraceTimerRef:s,onPointerGraceIntentChange:d}=c,f={__scopeMenu:e.__scopeMenu},p=r.useCallback(()=>{i.current&&window.clearTimeout(i.current),i.current=null},[]);return r.useEffect(()=>p,[p]),r.useEffect(()=>{let e=s.current;return()=>{window.clearTimeout(e),d(null)}},[s,d]),(0,y.jsx)(W,{asChild:!0,...f,children:(0,y.jsx)(eo,{id:l.triggerId,"aria-haspopup":"menu","aria-expanded":t.open,"aria-controls":l.contentId,"data-state":eb(t.open),...e,ref:(0,a.F)(n,l.onTriggerChange),onClick:n=>{e.onClick?.(n),e.disabled||n.defaultPrevented||(n.currentTarget.focus(),t.open||t.onOpenChange(!0))},onPointerMove:(0,o.M)(e.onPointerMove,eD(n=>{c.onItemEnter(n),n.defaultPrevented||e.disabled||t.open||i.current||(c.onPointerGraceIntentChange(null),i.current=window.setTimeout(()=>{t.onOpenChange(!0),p()},100))})),onPointerLeave:(0,o.M)(e.onPointerLeave,eD(e=>{p();let n=t.content?.getBoundingClientRect();if(n){let r=t.content?.dataset.side,o="right"===r,u=n[o?"left":"right"],a=n[o?"right":"left"];c.onPointerGraceIntentChange({area:[{x:e.clientX+(o?-5:5),y:e.clientY},{x:u,y:n.top},{x:a,y:n.top},{x:a,y:n.bottom},{x:u,y:n.bottom}],side:r}),window.clearTimeout(s.current),s.current=window.setTimeout(()=>c.onPointerGraceIntentChange(null),300)}else{if(c.onTriggerLeave(e),e.defaultPrevented)return;c.onPointerGraceIntentChange(null)}})),onKeyDown:(0,o.M)(e.onKeyDown,n=>{let r=""!==c.searchRef.current;!e.disabled&&(!r||" "!==n.key)&&b[u.dir].includes(n.key)&&(t.onOpenChange(!0),t.content?.focus(),n.preventDefault())})})})});e_.displayName=ey;var ej="MenuSubContent",eR=r.forwardRef((e,n)=>{let t=G(z,e.__scopeMenu),{forceMount:u=t.forceMount,...l}=e,c=N(z,e.__scopeMenu),i=A(z,e.__scopeMenu),s=ew(ej,e.__scopeMenu),d=r.useRef(null),f=(0,a.e)(n,d);return(0,y.jsx)(D.Provider,{scope:e.__scopeMenu,children:(0,y.jsx)(v.z,{present:u||c.open,children:(0,y.jsx)(D.Slot,{scope:e.__scopeMenu,children:(0,y.jsx)(Q,{id:s.contentId,"aria-labelledby":s.triggerId,...l,ref:f,align:"start",side:"rtl"===i.dir?"left":"right",disableOutsidePointerEvents:!1,disableOutsideScroll:!1,trapFocus:!1,onOpenAutoFocus:e=>{i.isUsingKeyboardRef.current&&d.current?.focus(),e.preventDefault()},onCloseAutoFocus:e=>e.preventDefault(),onFocusOutside:(0,o.M)(e.onFocusOutside,e=>{e.target!==s.trigger&&c.onOpenChange(!1)}),onEscapeKeyDown:(0,o.M)(e.onEscapeKeyDown,e=>{i.onClose(),e.preventDefault()}),onKeyDown:(0,o.M)(e.onKeyDown,e=>{let n=e.currentTarget.contains(e.target),t=k[i.dir].includes(e.key);n&&t&&(c.onOpenChange(!1),s.trigger?.focus(),e.preventDefault())})})})})})});function eb(e){return e?"open":"closed"}function ek(e){return"indeterminate"===e}function eP(e){return ek(e)?"indeterminate":e?"checked":"unchecked"}function eD(e){return n=>"mouse"===n.pointerType?e(n):void 0}eR.displayName=ej;var eE=V,eT=W,eS=X,eI=H,eO=$,eF=ee,eL=er,eN=eu,eK=ei,eA=ed,eV=ev,eW=em,eU=eg,eB=eC,eG=e_,eX=eR}};