exports.id=579,exports.ids=[579],exports.modules={76245:(e,t,n)=>{var r=n(39288).Symbol;e.exports=r},1534:(e,t,n)=>{var r=n(76245),o=n(34244),i=n(13390),l=r?r.toStringTag:void 0;e.exports=function(e){return null==e?void 0===e?"[object Undefined]":"[object Null]":l&&l in Object(e)?o(e):i(e)}},37192:(e,t,n)=>{var r=n(5587),o=/^\s+/;e.exports=function(e){return e?e.slice(0,r(e)+1).replace(o,""):e}},37611:e=>{var t="object"==typeof global&&global&&global.Object===Object&&global;e.exports=t},34244:(e,t,n)=>{var r=n(76245),o=Object.prototype,i=o.hasOwnProperty,l=o.toString,a=r?r.toStringTag:void 0;e.exports=function(e){var t=i.call(e,a),n=e[a];try{e[a]=void 0;var r=!0}catch(e){}var o=l.call(e);return r&&(t?e[a]=n:delete e[a]),o}},13390:e=>{var t=Object.prototype.toString;e.exports=function(e){return t.call(e)}},39288:(e,t,n)=>{var r=n(37611),o="object"==typeof self&&self&&self.Object===Object&&self,i=r||o||Function("return this")();e.exports=i},5587:e=>{var t=/\s/;e.exports=function(e){for(var n=e.length;n--&&t.test(e.charAt(n)););return n}},19788:(e,t,n)=>{var r=n(62880),o=n(22695),i=n(41309),l=Math.max,a=Math.min;e.exports=function(e,t,n){var s,f,u,c,d,p,h=0,m=!1,g=!1,v=!0;if("function"!=typeof e)throw TypeError("Expected a function");function x(t){var n=s,r=f;return s=f=void 0,h=t,c=e.apply(r,n)}function y(e){var n=e-p,r=e-h;return void 0===p||n>=t||n<0||g&&r>=u}function w(){var e,n,r,i=o();if(y(i))return b(i);d=setTimeout(w,(e=i-p,n=i-h,r=t-e,g?a(r,u-n):r))}function b(e){return(d=void 0,v&&s)?x(e):(s=f=void 0,c)}function R(){var e,n=o(),r=y(n);if(s=arguments,f=this,p=n,r){if(void 0===d)return h=e=p,d=setTimeout(w,t),m?x(e):c;if(g)return clearTimeout(d),d=setTimeout(w,t),x(p)}return void 0===d&&(d=setTimeout(w,t)),c}return t=i(t)||0,r(n)&&(m=!!n.leading,u=(g="maxWait"in n)?l(i(n.maxWait)||0,t):u,v="trailing"in n?!!n.trailing:v),R.cancel=function(){void 0!==d&&clearTimeout(d),h=0,s=p=f=d=void 0},R.flush=function(){return void 0===d?c:b(o())},R}},62880:e=>{e.exports=function(e){var t=typeof e;return null!=e&&("object"==t||"function"==t)}},91380:e=>{e.exports=function(e){return null!=e&&"object"==typeof e}},76871:(e,t,n)=>{var r=n(1534),o=n(91380);e.exports=function(e){return"symbol"==typeof e||o(e)&&"[object Symbol]"==r(e)}},22695:(e,t,n)=>{var r=n(39288);e.exports=function(){return r.Date.now()}},41309:(e,t,n)=>{var r=n(37192),o=n(62880),i=n(76871),l=0/0,a=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,f=/^0o[0-7]+$/i,u=parseInt;e.exports=function(e){if("number"==typeof e)return e;if(i(e))return l;if(o(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=o(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=r(e);var n=s.test(e);return n||f.test(e)?u(e.slice(2),n?2:8):a.test(e)?l:+e}},97185:(e,t,n)=>{"use strict";n.d(t,{VY:()=>k,fC:()=>D,h_:()=>M,xz:()=>H});var r,o=n(17577),i=n(82561),l=n(93095),a=n(52067),s=n(48051),f=n(17103),u=n(83078),c=n(9815),d=n(45226),p=n(825),h=n(10326),m="HoverCard",[g,v]=(0,l.b)(m,[f.D7]),x=(0,f.D7)(),[y,w]=g(m),b=e=>{let{__scopeHoverCard:t,children:n,open:r,defaultOpen:i,onOpenChange:l,openDelay:s=700,closeDelay:u=300}=e,c=x(t),d=o.useRef(0),p=o.useRef(0),m=o.useRef(!1),g=o.useRef(!1),[v=!1,w]=(0,a.T)({prop:r,defaultProp:i,onChange:l}),b=o.useCallback(()=>{clearTimeout(p.current),d.current=window.setTimeout(()=>w(!0),s)},[s,w]),R=o.useCallback(()=>{clearTimeout(d.current),m.current||g.current||(p.current=window.setTimeout(()=>w(!1),u))},[u,w]),T=o.useCallback(()=>w(!1),[w]);return o.useEffect(()=>()=>{clearTimeout(d.current),clearTimeout(p.current)},[]),(0,h.jsx)(y,{scope:t,open:v,onOpenChange:w,onOpen:b,onClose:R,onDismiss:T,hasSelectionRef:m,isPointerDownOnContentRef:g,children:(0,h.jsx)(f.fC,{...c,children:n})})};b.displayName=m;var R="HoverCardTrigger",T=o.forwardRef((e,t)=>{let{__scopeHoverCard:n,...r}=e,o=w(R,n),l=x(n);return(0,h.jsx)(f.ee,{asChild:!0,...l,children:(0,h.jsx)(d.WV.a,{"data-state":o.open?"open":"closed",...r,ref:t,onPointerEnter:(0,i.M)(e.onPointerEnter,j(o.onOpen)),onPointerLeave:(0,i.M)(e.onPointerLeave,j(o.onClose)),onFocus:(0,i.M)(e.onFocus,o.onOpen),onBlur:(0,i.M)(e.onBlur,o.onClose),onTouchStart:(0,i.M)(e.onTouchStart,e=>e.preventDefault())})})});T.displayName=R;var S="HoverCardPortal",[E,C]=g(S,{forceMount:void 0}),A=e=>{let{__scopeHoverCard:t,forceMount:n,children:r,container:o}=e,i=w(S,t);return(0,h.jsx)(E,{scope:t,forceMount:n,children:(0,h.jsx)(c.z,{present:n||i.open,children:(0,h.jsx)(u.h,{asChild:!0,container:o,children:r})})})};A.displayName=S;var O="HoverCardContent",P=o.forwardRef((e,t)=>{let n=C(O,e.__scopeHoverCard),{forceMount:r=n.forceMount,...o}=e,l=w(O,e.__scopeHoverCard);return(0,h.jsx)(c.z,{present:r||l.open,children:(0,h.jsx)(L,{"data-state":l.open?"open":"closed",...o,onPointerEnter:(0,i.M)(e.onPointerEnter,j(l.onOpen)),onPointerLeave:(0,i.M)(e.onPointerLeave,j(l.onClose)),ref:t})})});P.displayName=O;var L=o.forwardRef((e,t)=>{let{__scopeHoverCard:n,onEscapeKeyDown:l,onPointerDownOutside:a,onFocusOutside:u,onInteractOutside:c,...d}=e,m=w(O,n),g=x(n),v=o.useRef(null),y=(0,s.e)(t,v),[b,R]=o.useState(!1);return o.useEffect(()=>{if(b){let e=document.body;return r=e.style.userSelect||e.style.webkitUserSelect,e.style.userSelect="none",e.style.webkitUserSelect="none",()=>{e.style.userSelect=r,e.style.webkitUserSelect=r}}},[b]),o.useEffect(()=>{if(v.current){let e=()=>{R(!1),m.isPointerDownOnContentRef.current=!1,setTimeout(()=>{document.getSelection()?.toString()!==""&&(m.hasSelectionRef.current=!0)})};return document.addEventListener("pointerup",e),()=>{document.removeEventListener("pointerup",e),m.hasSelectionRef.current=!1,m.isPointerDownOnContentRef.current=!1}}},[m.isPointerDownOnContentRef,m.hasSelectionRef]),o.useEffect(()=>{v.current&&(function(e){let t=[],n=document.createTreeWalker(e,NodeFilter.SHOW_ELEMENT,{acceptNode:e=>e.tabIndex>=0?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_SKIP});for(;n.nextNode();)t.push(n.currentNode);return t})(v.current).forEach(e=>e.setAttribute("tabindex","-1"))}),(0,h.jsx)(p.XB,{asChild:!0,disableOutsidePointerEvents:!1,onInteractOutside:c,onEscapeKeyDown:l,onPointerDownOutside:a,onFocusOutside:(0,i.M)(u,e=>{e.preventDefault()}),onDismiss:m.onDismiss,children:(0,h.jsx)(f.VY,{...g,...d,onPointerDown:(0,i.M)(d.onPointerDown,e=>{e.currentTarget.contains(e.target)&&R(!0),m.hasSelectionRef.current=!1,m.isPointerDownOnContentRef.current=!0}),ref:y,style:{...d.style,userSelect:b?"text":void 0,WebkitUserSelect:b?"text":void 0,"--radix-hover-card-content-transform-origin":"var(--radix-popper-transform-origin)","--radix-hover-card-content-available-width":"var(--radix-popper-available-width)","--radix-hover-card-content-available-height":"var(--radix-popper-available-height)","--radix-hover-card-trigger-width":"var(--radix-popper-anchor-width)","--radix-hover-card-trigger-height":"var(--radix-popper-anchor-height)"}})})});function j(e){return t=>"touch"===t.pointerType?void 0:e()}o.forwardRef((e,t)=>{let{__scopeHoverCard:n,...r}=e,o=x(n);return(0,h.jsx)(f.Eh,{...o,...r,ref:t})}).displayName="HoverCardArrow";var D=b,H=T,M=A,k=P},17103:(e,t,n)=>{"use strict";n.d(t,{ee:()=>eU,Eh:()=>eq,VY:()=>eX,fC:()=>eY,D7:()=>eP});var r=n(17577);let o=["top","right","bottom","left"],i=Math.min,l=Math.max,a=Math.round,s=Math.floor,f=e=>({x:e,y:e}),u={left:"right",right:"left",bottom:"top",top:"bottom"},c={start:"end",end:"start"};function d(e,t){return"function"==typeof e?e(t):e}function p(e){return e.split("-")[0]}function h(e){return e.split("-")[1]}function m(e){return"x"===e?"y":"x"}function g(e){return"y"===e?"height":"width"}function v(e){return["top","bottom"].includes(p(e))?"y":"x"}function x(e){return e.replace(/start|end/g,e=>c[e])}function y(e){return e.replace(/left|right|bottom|top/g,e=>u[e])}function w(e){return"number"!=typeof e?{top:0,right:0,bottom:0,left:0,...e}:{top:e,right:e,bottom:e,left:e}}function b(e){let{x:t,y:n,width:r,height:o}=e;return{width:r,height:o,top:n,left:t,right:t+r,bottom:n+o,x:t,y:n}}function R(e,t,n){let r,{reference:o,floating:i}=e,l=v(t),a=m(v(t)),s=g(a),f=p(t),u="y"===l,c=o.x+o.width/2-i.width/2,d=o.y+o.height/2-i.height/2,x=o[s]/2-i[s]/2;switch(f){case"top":r={x:c,y:o.y-i.height};break;case"bottom":r={x:c,y:o.y+o.height};break;case"right":r={x:o.x+o.width,y:d};break;case"left":r={x:o.x-i.width,y:d};break;default:r={x:o.x,y:o.y}}switch(h(t)){case"start":r[a]-=x*(n&&u?-1:1);break;case"end":r[a]+=x*(n&&u?-1:1)}return r}let T=async(e,t,n)=>{let{placement:r="bottom",strategy:o="absolute",middleware:i=[],platform:l}=n,a=i.filter(Boolean),s=await (null==l.isRTL?void 0:l.isRTL(t)),f=await l.getElementRects({reference:e,floating:t,strategy:o}),{x:u,y:c}=R(f,r,s),d=r,p={},h=0;for(let n=0;n<a.length;n++){let{name:i,fn:m}=a[n],{x:g,y:v,data:x,reset:y}=await m({x:u,y:c,initialPlacement:r,placement:d,strategy:o,middlewareData:p,rects:f,platform:l,elements:{reference:e,floating:t}});u=null!=g?g:u,c=null!=v?v:c,p={...p,[i]:{...p[i],...x}},y&&h<=50&&(h++,"object"==typeof y&&(y.placement&&(d=y.placement),y.rects&&(f=!0===y.rects?await l.getElementRects({reference:e,floating:t,strategy:o}):y.rects),{x:u,y:c}=R(f,d,s)),n=-1)}return{x:u,y:c,placement:d,strategy:o,middlewareData:p}};async function S(e,t){var n;void 0===t&&(t={});let{x:r,y:o,platform:i,rects:l,elements:a,strategy:s}=e,{boundary:f="clippingAncestors",rootBoundary:u="viewport",elementContext:c="floating",altBoundary:p=!1,padding:h=0}=d(t,e),m=w(h),g=a[p?"floating"===c?"reference":"floating":c],v=b(await i.getClippingRect({element:null==(n=await (null==i.isElement?void 0:i.isElement(g)))||n?g:g.contextElement||await (null==i.getDocumentElement?void 0:i.getDocumentElement(a.floating)),boundary:f,rootBoundary:u,strategy:s})),x="floating"===c?{x:r,y:o,width:l.floating.width,height:l.floating.height}:l.reference,y=await (null==i.getOffsetParent?void 0:i.getOffsetParent(a.floating)),R=await (null==i.isElement?void 0:i.isElement(y))&&await (null==i.getScale?void 0:i.getScale(y))||{x:1,y:1},T=b(i.convertOffsetParentRelativeRectToViewportRelativeRect?await i.convertOffsetParentRelativeRectToViewportRelativeRect({elements:a,rect:x,offsetParent:y,strategy:s}):x);return{top:(v.top-T.top+m.top)/R.y,bottom:(T.bottom-v.bottom+m.bottom)/R.y,left:(v.left-T.left+m.left)/R.x,right:(T.right-v.right+m.right)/R.x}}function E(e,t){return{top:e.top-t.height,right:e.right-t.width,bottom:e.bottom-t.height,left:e.left-t.width}}function C(e){return o.some(t=>e[t]>=0)}async function A(e,t){let{placement:n,platform:r,elements:o}=e,i=await (null==r.isRTL?void 0:r.isRTL(o.floating)),l=p(n),a=h(n),s="y"===v(n),f=["left","top"].includes(l)?-1:1,u=i&&s?-1:1,c=d(t,e),{mainAxis:m,crossAxis:g,alignmentAxis:x}="number"==typeof c?{mainAxis:c,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...c};return a&&"number"==typeof x&&(g="end"===a?-1*x:x),s?{x:g*u,y:m*f}:{x:m*f,y:g*u}}function O(e){return j(e)?(e.nodeName||"").toLowerCase():"#document"}function P(e){var t;return(null==e||null==(t=e.ownerDocument)?void 0:t.defaultView)||window}function L(e){var t;return null==(t=(j(e)?e.ownerDocument:e.document)||window.document)?void 0:t.documentElement}function j(e){return e instanceof Node||e instanceof P(e).Node}function D(e){return e instanceof Element||e instanceof P(e).Element}function H(e){return e instanceof HTMLElement||e instanceof P(e).HTMLElement}function M(e){return"undefined"!=typeof ShadowRoot&&(e instanceof ShadowRoot||e instanceof P(e).ShadowRoot)}function k(e){let{overflow:t,overflowX:n,overflowY:r,display:o}=V(e);return/auto|scroll|overlay|hidden|clip/.test(t+r+n)&&!["inline","contents"].includes(o)}function F(e){return[":popover-open",":modal"].some(t=>{try{return e.matches(t)}catch(e){return!1}})}function W(e){let t=N(),n=V(e);return"none"!==n.transform||"none"!==n.perspective||!!n.containerType&&"normal"!==n.containerType||!t&&!!n.backdropFilter&&"none"!==n.backdropFilter||!t&&!!n.filter&&"none"!==n.filter||["transform","perspective","filter"].some(e=>(n.willChange||"").includes(e))||["paint","layout","strict","content"].some(e=>(n.contain||"").includes(e))}function N(){return"undefined"!=typeof CSS&&!!CSS.supports&&CSS.supports("-webkit-backdrop-filter","none")}function $(e){return["html","body","#document"].includes(O(e))}function V(e){return P(e).getComputedStyle(e)}function z(e){return D(e)?{scrollLeft:e.scrollLeft,scrollTop:e.scrollTop}:{scrollLeft:e.scrollX,scrollTop:e.scrollY}}function B(e){if("html"===O(e))return e;let t=e.assignedSlot||e.parentNode||M(e)&&e.host||L(e);return M(t)?t.host:t}function _(e,t,n){var r;void 0===t&&(t=[]),void 0===n&&(n=!0);let o=function e(t){let n=B(t);return $(n)?t.ownerDocument?t.ownerDocument.body:t.body:H(n)&&k(n)?n:e(n)}(e),i=o===(null==(r=e.ownerDocument)?void 0:r.body),l=P(o);return i?t.concat(l,l.visualViewport||[],k(o)?o:[],l.frameElement&&n?_(l.frameElement):[]):t.concat(o,_(o,[],n))}function I(e){let t=V(e),n=parseFloat(t.width)||0,r=parseFloat(t.height)||0,o=H(e),i=o?e.offsetWidth:n,l=o?e.offsetHeight:r,s=a(n)!==i||a(r)!==l;return s&&(n=i,r=l),{width:n,height:r,$:s}}function Y(e){return D(e)?e:e.contextElement}function U(e){let t=Y(e);if(!H(t))return f(1);let n=t.getBoundingClientRect(),{width:r,height:o,$:i}=I(t),l=(i?a(n.width):n.width)/r,s=(i?a(n.height):n.height)/o;return l&&Number.isFinite(l)||(l=1),s&&Number.isFinite(s)||(s=1),{x:l,y:s}}let X=f(0);function q(e){let t=P(e);return N()&&t.visualViewport?{x:t.visualViewport.offsetLeft,y:t.visualViewport.offsetTop}:X}function K(e,t,n,r){var o;void 0===t&&(t=!1),void 0===n&&(n=!1);let i=e.getBoundingClientRect(),l=Y(e),a=f(1);t&&(r?D(r)&&(a=U(r)):a=U(e));let s=(void 0===(o=n)&&(o=!1),r&&(!o||r===P(l))&&o)?q(l):f(0),u=(i.left+s.x)/a.x,c=(i.top+s.y)/a.y,d=i.width/a.x,p=i.height/a.y;if(l){let e=P(l),t=r&&D(r)?P(r):r,n=e,o=n.frameElement;for(;o&&r&&t!==n;){let e=U(o),t=o.getBoundingClientRect(),r=V(o),i=t.left+(o.clientLeft+parseFloat(r.paddingLeft))*e.x,l=t.top+(o.clientTop+parseFloat(r.paddingTop))*e.y;u*=e.x,c*=e.y,d*=e.x,p*=e.y,u+=i,c+=l,o=(n=P(o)).frameElement}}return b({width:d,height:p,x:u,y:c})}function G(e){return K(L(e)).left+z(e).scrollLeft}function J(e,t,n){let r;if("viewport"===t)r=function(e,t){let n=P(e),r=L(e),o=n.visualViewport,i=r.clientWidth,l=r.clientHeight,a=0,s=0;if(o){i=o.width,l=o.height;let e=N();(!e||e&&"fixed"===t)&&(a=o.offsetLeft,s=o.offsetTop)}return{width:i,height:l,x:a,y:s}}(e,n);else if("document"===t)r=function(e){let t=L(e),n=z(e),r=e.ownerDocument.body,o=l(t.scrollWidth,t.clientWidth,r.scrollWidth,r.clientWidth),i=l(t.scrollHeight,t.clientHeight,r.scrollHeight,r.clientHeight),a=-n.scrollLeft+G(e),s=-n.scrollTop;return"rtl"===V(r).direction&&(a+=l(t.clientWidth,r.clientWidth)-o),{width:o,height:i,x:a,y:s}}(L(e));else if(D(t))r=function(e,t){let n=K(e,!0,"fixed"===t),r=n.top+e.clientTop,o=n.left+e.clientLeft,i=H(e)?U(e):f(1),l=e.clientWidth*i.x;return{width:l,height:e.clientHeight*i.y,x:o*i.x,y:r*i.y}}(t,n);else{let n=q(e);r={...t,x:t.x-n.x,y:t.y-n.y}}return b(r)}function Q(e){return"static"===V(e).position}function Z(e,t){return H(e)&&"fixed"!==V(e).position?t?t(e):e.offsetParent:null}function ee(e,t){let n=P(e);if(F(e))return n;if(!H(e)){let t=B(e);for(;t&&!$(t);){if(D(t)&&!Q(t))return t;t=B(t)}return n}let r=Z(e,t);for(;r&&["table","td","th"].includes(O(r))&&Q(r);)r=Z(r,t);return r&&$(r)&&Q(r)&&!W(r)?n:r||function(e){let t=B(e);for(;H(t)&&!$(t)&&!F(t);){if(W(t))return t;t=B(t)}return null}(e)||n}let et=async function(e){let t=this.getOffsetParent||ee,n=this.getDimensions,r=await n(e.floating);return{reference:function(e,t,n){let r=H(t),o=L(t),i="fixed"===n,l=K(e,!0,i,t),a={scrollLeft:0,scrollTop:0},s=f(0);if(r||!r&&!i){if(("body"!==O(t)||k(o))&&(a=z(t)),r){let e=K(t,!0,i,t);s.x=e.x+t.clientLeft,s.y=e.y+t.clientTop}else o&&(s.x=G(o))}return{x:l.left+a.scrollLeft-s.x,y:l.top+a.scrollTop-s.y,width:l.width,height:l.height}}(e.reference,await t(e.floating),e.strategy),floating:{x:0,y:0,width:r.width,height:r.height}}},en={convertOffsetParentRelativeRectToViewportRelativeRect:function(e){let{elements:t,rect:n,offsetParent:r,strategy:o}=e,i="fixed"===o,l=L(r),a=!!t&&F(t.floating);if(r===l||a&&i)return n;let s={scrollLeft:0,scrollTop:0},u=f(1),c=f(0),d=H(r);if((d||!d&&!i)&&(("body"!==O(r)||k(l))&&(s=z(r)),H(r))){let e=K(r);u=U(r),c.x=e.x+r.clientLeft,c.y=e.y+r.clientTop}return{width:n.width*u.x,height:n.height*u.y,x:n.x*u.x-s.scrollLeft*u.x+c.x,y:n.y*u.y-s.scrollTop*u.y+c.y}},getDocumentElement:L,getClippingRect:function(e){let{element:t,boundary:n,rootBoundary:r,strategy:o}=e,a=[..."clippingAncestors"===n?F(t)?[]:function(e,t){let n=t.get(e);if(n)return n;let r=_(e,[],!1).filter(e=>D(e)&&"body"!==O(e)),o=null,i="fixed"===V(e).position,l=i?B(e):e;for(;D(l)&&!$(l);){let t=V(l),n=W(l);n||"fixed"!==t.position||(o=null),(i?!n&&!o:!n&&"static"===t.position&&!!o&&["absolute","fixed"].includes(o.position)||k(l)&&!n&&function e(t,n){let r=B(t);return!(r===n||!D(r)||$(r))&&("fixed"===V(r).position||e(r,n))}(e,l))?r=r.filter(e=>e!==l):o=t,l=B(l)}return t.set(e,r),r}(t,this._c):[].concat(n),r],s=a[0],f=a.reduce((e,n)=>{let r=J(t,n,o);return e.top=l(r.top,e.top),e.right=i(r.right,e.right),e.bottom=i(r.bottom,e.bottom),e.left=l(r.left,e.left),e},J(t,s,o));return{width:f.right-f.left,height:f.bottom-f.top,x:f.left,y:f.top}},getOffsetParent:ee,getElementRects:et,getClientRects:function(e){return Array.from(e.getClientRects())},getDimensions:function(e){let{width:t,height:n}=I(e);return{width:t,height:n}},getScale:U,isElement:D,isRTL:function(e){return"rtl"===V(e).direction}},er=e=>({name:"arrow",options:e,async fn(t){let{x:n,y:r,placement:o,rects:a,platform:s,elements:f,middlewareData:u}=t,{element:c,padding:p=0}=d(e,t)||{};if(null==c)return{};let x=w(p),y={x:n,y:r},b=m(v(o)),R=g(b),T=await s.getDimensions(c),S="y"===b,E=S?"clientHeight":"clientWidth",C=a.reference[R]+a.reference[b]-y[b]-a.floating[R],A=y[b]-a.reference[b],O=await (null==s.getOffsetParent?void 0:s.getOffsetParent(c)),P=O?O[E]:0;P&&await (null==s.isElement?void 0:s.isElement(O))||(P=f.floating[E]||a.floating[R]);let L=P/2-T[R]/2-1,j=i(x[S?"top":"left"],L),D=i(x[S?"bottom":"right"],L),H=P-T[R]-D,M=P/2-T[R]/2+(C/2-A/2),k=l(j,i(M,H)),F=!u.arrow&&null!=h(o)&&M!==k&&a.reference[R]/2-(M<j?j:D)-T[R]/2<0,W=F?M<j?M-j:M-H:0;return{[b]:y[b]+W,data:{[b]:k,centerOffset:M-k-W,...F&&{alignmentOffset:W}},reset:F}}}),eo=(e,t,n)=>{let r=new Map,o={platform:en,...n},i={...o.platform,_c:r};return T(e,t,{...o,platform:i})};var ei=n(60962),el="undefined"!=typeof document?r.useLayoutEffect:r.useEffect;function ea(e,t){let n,r,o;if(e===t)return!0;if(typeof e!=typeof t)return!1;if("function"==typeof e&&e.toString()===t.toString())return!0;if(e&&t&&"object"==typeof e){if(Array.isArray(e)){if((n=e.length)!==t.length)return!1;for(r=n;0!=r--;)if(!ea(e[r],t[r]))return!1;return!0}if((n=(o=Object.keys(e)).length)!==Object.keys(t).length)return!1;for(r=n;0!=r--;)if(!({}).hasOwnProperty.call(t,o[r]))return!1;for(r=n;0!=r--;){let n=o[r];if(("_owner"!==n||!e.$$typeof)&&!ea(e[n],t[n]))return!1}return!0}return e!=e&&t!=t}function es(e){return"undefined"==typeof window?1:(e.ownerDocument.defaultView||window).devicePixelRatio||1}function ef(e,t){let n=es(e);return Math.round(t*n)/n}function eu(e){let t=r.useRef(e);return el(()=>{t.current=e}),t}let ec=e=>({name:"arrow",options:e,fn(t){let{element:n,padding:r}="function"==typeof e?e(t):e;return n&&({}).hasOwnProperty.call(n,"current")?null!=n.current?er({element:n.current,padding:r}).fn(t):{}:n?er({element:n,padding:r}).fn(t):{}}}),ed=(e,t)=>({...function(e){return void 0===e&&(e=0),{name:"offset",options:e,async fn(t){var n,r;let{x:o,y:i,placement:l,middlewareData:a}=t,s=await A(t,e);return l===(null==(n=a.offset)?void 0:n.placement)&&null!=(r=a.arrow)&&r.alignmentOffset?{}:{x:o+s.x,y:i+s.y,data:{...s,placement:l}}}}}(e),options:[e,t]}),ep=(e,t)=>({...function(e){return void 0===e&&(e={}),{name:"shift",options:e,async fn(t){let{x:n,y:r,placement:o}=t,{mainAxis:a=!0,crossAxis:s=!1,limiter:f={fn:e=>{let{x:t,y:n}=e;return{x:t,y:n}}},...u}=d(e,t),c={x:n,y:r},h=await S(t,u),g=v(p(o)),x=m(g),y=c[x],w=c[g];if(a){let e="y"===x?"top":"left",t="y"===x?"bottom":"right",n=y+h[e],r=y-h[t];y=l(n,i(y,r))}if(s){let e="y"===g?"top":"left",t="y"===g?"bottom":"right",n=w+h[e],r=w-h[t];w=l(n,i(w,r))}let b=f.fn({...t,[x]:y,[g]:w});return{...b,data:{x:b.x-n,y:b.y-r}}}}}(e),options:[e,t]}),eh=(e,t)=>({...function(e){return void 0===e&&(e={}),{options:e,fn(t){let{x:n,y:r,placement:o,rects:i,middlewareData:l}=t,{offset:a=0,mainAxis:s=!0,crossAxis:f=!0}=d(e,t),u={x:n,y:r},c=v(o),h=m(c),g=u[h],x=u[c],y=d(a,t),w="number"==typeof y?{mainAxis:y,crossAxis:0}:{mainAxis:0,crossAxis:0,...y};if(s){let e="y"===h?"height":"width",t=i.reference[h]-i.floating[e]+w.mainAxis,n=i.reference[h]+i.reference[e]-w.mainAxis;g<t?g=t:g>n&&(g=n)}if(f){var b,R;let e="y"===h?"width":"height",t=["top","left"].includes(p(o)),n=i.reference[c]-i.floating[e]+(t&&(null==(b=l.offset)?void 0:b[c])||0)+(t?0:w.crossAxis),r=i.reference[c]+i.reference[e]+(t?0:(null==(R=l.offset)?void 0:R[c])||0)-(t?w.crossAxis:0);x<n?x=n:x>r&&(x=r)}return{[h]:g,[c]:x}}}}(e),options:[e,t]}),em=(e,t)=>({...function(e){return void 0===e&&(e={}),{name:"flip",options:e,async fn(t){var n,r,o,i,l;let{placement:a,middlewareData:s,rects:f,initialPlacement:u,platform:c,elements:w}=t,{mainAxis:b=!0,crossAxis:R=!0,fallbackPlacements:T,fallbackStrategy:E="bestFit",fallbackAxisSideDirection:C="none",flipAlignment:A=!0,...O}=d(e,t);if(null!=(n=s.arrow)&&n.alignmentOffset)return{};let P=p(a),L=v(u),j=p(u)===u,D=await (null==c.isRTL?void 0:c.isRTL(w.floating)),H=T||(j||!A?[y(u)]:function(e){let t=y(e);return[x(e),t,x(t)]}(u)),M="none"!==C;!T&&M&&H.push(...function(e,t,n,r){let o=h(e),i=function(e,t,n){let r=["left","right"],o=["right","left"];switch(e){case"top":case"bottom":if(n)return t?o:r;return t?r:o;case"left":case"right":return t?["top","bottom"]:["bottom","top"];default:return[]}}(p(e),"start"===n,r);return o&&(i=i.map(e=>e+"-"+o),t&&(i=i.concat(i.map(x)))),i}(u,A,C,D));let k=[u,...H],F=await S(t,O),W=[],N=(null==(r=s.flip)?void 0:r.overflows)||[];if(b&&W.push(F[P]),R){let e=function(e,t,n){void 0===n&&(n=!1);let r=h(e),o=m(v(e)),i=g(o),l="x"===o?r===(n?"end":"start")?"right":"left":"start"===r?"bottom":"top";return t.reference[i]>t.floating[i]&&(l=y(l)),[l,y(l)]}(a,f,D);W.push(F[e[0]],F[e[1]])}if(N=[...N,{placement:a,overflows:W}],!W.every(e=>e<=0)){let e=((null==(o=s.flip)?void 0:o.index)||0)+1,t=k[e];if(t)return{data:{index:e,overflows:N},reset:{placement:t}};let n=null==(i=N.filter(e=>e.overflows[0]<=0).sort((e,t)=>e.overflows[1]-t.overflows[1])[0])?void 0:i.placement;if(!n)switch(E){case"bestFit":{let e=null==(l=N.filter(e=>{if(M){let t=v(e.placement);return t===L||"y"===t}return!0}).map(e=>[e.placement,e.overflows.filter(e=>e>0).reduce((e,t)=>e+t,0)]).sort((e,t)=>e[1]-t[1])[0])?void 0:l[0];e&&(n=e);break}case"initialPlacement":n=u}if(a!==n)return{reset:{placement:n}}}return{}}}}(e),options:[e,t]}),eg=(e,t)=>({...function(e){return void 0===e&&(e={}),{name:"size",options:e,async fn(t){let n,r;let{placement:o,rects:a,platform:s,elements:f}=t,{apply:u=()=>{},...c}=d(e,t),m=await S(t,c),g=p(o),x=h(o),y="y"===v(o),{width:w,height:b}=a.floating;"top"===g||"bottom"===g?(n=g,r=x===(await (null==s.isRTL?void 0:s.isRTL(f.floating))?"start":"end")?"left":"right"):(r=g,n="end"===x?"top":"bottom");let R=b-m.top-m.bottom,T=w-m.left-m.right,E=i(b-m[n],R),C=i(w-m[r],T),A=!t.middlewareData.shift,O=E,P=C;if(y?P=x||A?i(C,T):T:O=x||A?i(E,R):R,A&&!x){let e=l(m.left,0),t=l(m.right,0),n=l(m.top,0),r=l(m.bottom,0);y?P=w-2*(0!==e||0!==t?e+t:l(m.left,m.right)):O=b-2*(0!==n||0!==r?n+r:l(m.top,m.bottom))}await u({...t,availableWidth:P,availableHeight:O});let L=await s.getDimensions(f.floating);return w!==L.width||b!==L.height?{reset:{rects:!0}}:{}}}}(e),options:[e,t]}),ev=(e,t)=>({...function(e){return void 0===e&&(e={}),{name:"hide",options:e,async fn(t){let{rects:n}=t,{strategy:r="referenceHidden",...o}=d(e,t);switch(r){case"referenceHidden":{let e=E(await S(t,{...o,elementContext:"reference"}),n.reference);return{data:{referenceHiddenOffsets:e,referenceHidden:C(e)}}}case"escaped":{let e=E(await S(t,{...o,altBoundary:!0}),n.floating);return{data:{escapedOffsets:e,escaped:C(e)}}}default:return{}}}}}(e),options:[e,t]}),ex=(e,t)=>({...ec(e),options:[e,t]});var ey=n(45226),ew=n(10326),eb=r.forwardRef((e,t)=>{let{children:n,width:r=10,height:o=5,...i}=e;return(0,ew.jsx)(ey.WV.svg,{...i,ref:t,width:r,height:o,viewBox:"0 0 30 10",preserveAspectRatio:"none",children:e.asChild?n:(0,ew.jsx)("polygon",{points:"0,0 30,0 15,10"})})});eb.displayName="Arrow";var eR=n(48051),eT=n(93095),eS=n(55049),eE=n(65819),eC=n(2566),eA="Popper",[eO,eP]=(0,eT.b)(eA),[eL,ej]=eO(eA),eD=e=>{let{__scopePopper:t,children:n}=e,[o,i]=r.useState(null);return(0,ew.jsx)(eL,{scope:t,anchor:o,onAnchorChange:i,children:n})};eD.displayName=eA;var eH="PopperAnchor",eM=r.forwardRef((e,t)=>{let{__scopePopper:n,virtualRef:o,...i}=e,l=ej(eH,n),a=r.useRef(null),s=(0,eR.e)(t,a);return r.useEffect(()=>{l.onAnchorChange(o?.current||a.current)}),o?null:(0,ew.jsx)(ey.WV.div,{...i,ref:s})});eM.displayName=eH;var ek="PopperContent",[eF,eW]=eO(ek),eN=r.forwardRef((e,t)=>{let{__scopePopper:n,side:o="bottom",sideOffset:a=0,align:f="center",alignOffset:u=0,arrowPadding:c=0,avoidCollisions:d=!0,collisionBoundary:p=[],collisionPadding:h=0,sticky:m="partial",hideWhenDetached:g=!1,updatePositionStrategy:v="optimized",onPlaced:x,...y}=e,w=ej(ek,n),[b,R]=r.useState(null),T=(0,eR.e)(t,e=>R(e)),[S,E]=r.useState(null),C=(0,eC.t)(S),A=C?.width??0,O=C?.height??0,P="number"==typeof h?h:{top:0,right:0,bottom:0,left:0,...h},j=Array.isArray(p)?p:[p],D=j.length>0,H={padding:P,boundary:j.filter(eB),altBoundary:D},{refs:M,floatingStyles:k,placement:F,isPositioned:W,middlewareData:N}=function(e){void 0===e&&(e={});let{placement:t="bottom",strategy:n="absolute",middleware:o=[],platform:i,elements:{reference:l,floating:a}={},transform:s=!0,whileElementsMounted:f,open:u}=e,[c,d]=r.useState({x:0,y:0,strategy:n,placement:t,middlewareData:{},isPositioned:!1}),[p,h]=r.useState(o);ea(p,o)||h(o);let[m,g]=r.useState(null),[v,x]=r.useState(null),y=r.useCallback(e=>{e!==T.current&&(T.current=e,g(e))},[]),w=r.useCallback(e=>{e!==S.current&&(S.current=e,x(e))},[]),b=l||m,R=a||v,T=r.useRef(null),S=r.useRef(null),E=r.useRef(c),C=null!=f,A=eu(f),O=eu(i),P=r.useCallback(()=>{if(!T.current||!S.current)return;let e={placement:t,strategy:n,middleware:p};O.current&&(e.platform=O.current),eo(T.current,S.current,e).then(e=>{let t={...e,isPositioned:!0};L.current&&!ea(E.current,t)&&(E.current=t,ei.flushSync(()=>{d(t)}))})},[p,t,n,O]);el(()=>{!1===u&&E.current.isPositioned&&(E.current.isPositioned=!1,d(e=>({...e,isPositioned:!1})))},[u]);let L=r.useRef(!1);el(()=>(L.current=!0,()=>{L.current=!1}),[]),el(()=>{if(b&&(T.current=b),R&&(S.current=R),b&&R){if(A.current)return A.current(b,R,P);P()}},[b,R,P,A,C]);let j=r.useMemo(()=>({reference:T,floating:S,setReference:y,setFloating:w}),[y,w]),D=r.useMemo(()=>({reference:b,floating:R}),[b,R]),H=r.useMemo(()=>{let e={position:n,left:0,top:0};if(!D.floating)return e;let t=ef(D.floating,c.x),r=ef(D.floating,c.y);return s?{...e,transform:"translate("+t+"px, "+r+"px)",...es(D.floating)>=1.5&&{willChange:"transform"}}:{position:n,left:t,top:r}},[n,s,D.floating,c.x,c.y]);return r.useMemo(()=>({...c,update:P,refs:j,elements:D,floatingStyles:H}),[c,P,j,D,H])}({strategy:"fixed",placement:o+("center"!==f?"-"+f:""),whileElementsMounted:(...e)=>(function(e,t,n,r){let o;void 0===r&&(r={});let{ancestorScroll:a=!0,ancestorResize:f=!0,elementResize:u="function"==typeof ResizeObserver,layoutShift:c="function"==typeof IntersectionObserver,animationFrame:d=!1}=r,p=Y(e),h=a||f?[...p?_(p):[],..._(t)]:[];h.forEach(e=>{a&&e.addEventListener("scroll",n,{passive:!0}),f&&e.addEventListener("resize",n)});let m=p&&c?function(e,t){let n,r=null,o=L(e);function a(){var e;clearTimeout(n),null==(e=r)||e.disconnect(),r=null}return function f(u,c){void 0===u&&(u=!1),void 0===c&&(c=1),a();let{left:d,top:p,width:h,height:m}=e.getBoundingClientRect();if(u||t(),!h||!m)return;let g=s(p),v=s(o.clientWidth-(d+h)),x={rootMargin:-g+"px "+-v+"px "+-s(o.clientHeight-(p+m))+"px "+-s(d)+"px",threshold:l(0,i(1,c))||1},y=!0;function w(e){let t=e[0].intersectionRatio;if(t!==c){if(!y)return f();t?f(!1,t):n=setTimeout(()=>{f(!1,1e-7)},1e3)}y=!1}try{r=new IntersectionObserver(w,{...x,root:o.ownerDocument})}catch(e){r=new IntersectionObserver(w,x)}r.observe(e)}(!0),a}(p,n):null,g=-1,v=null;u&&(v=new ResizeObserver(e=>{let[r]=e;r&&r.target===p&&v&&(v.unobserve(t),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{var e;null==(e=v)||e.observe(t)})),n()}),p&&!d&&v.observe(p),v.observe(t));let x=d?K(e):null;return d&&function t(){let r=K(e);x&&(r.x!==x.x||r.y!==x.y||r.width!==x.width||r.height!==x.height)&&n(),x=r,o=requestAnimationFrame(t)}(),n(),()=>{var e;h.forEach(e=>{a&&e.removeEventListener("scroll",n),f&&e.removeEventListener("resize",n)}),null==m||m(),null==(e=v)||e.disconnect(),v=null,d&&cancelAnimationFrame(o)}})(...e,{animationFrame:"always"===v}),elements:{reference:w.anchor},middleware:[ed({mainAxis:a+O,alignmentAxis:u}),d&&ep({mainAxis:!0,crossAxis:!1,limiter:"partial"===m?eh():void 0,...H}),d&&em({...H}),eg({...H,apply:({elements:e,rects:t,availableWidth:n,availableHeight:r})=>{let{width:o,height:i}=t.reference,l=e.floating.style;l.setProperty("--radix-popper-available-width",`${n}px`),l.setProperty("--radix-popper-available-height",`${r}px`),l.setProperty("--radix-popper-anchor-width",`${o}px`),l.setProperty("--radix-popper-anchor-height",`${i}px`)}}),S&&ex({element:S,padding:c}),e_({arrowWidth:A,arrowHeight:O}),g&&ev({strategy:"referenceHidden",...H})]}),[$,V]=eI(F),z=(0,eS.W)(x);(0,eE.b)(()=>{W&&z?.()},[W,z]);let B=N.arrow?.x,I=N.arrow?.y,U=N.arrow?.centerOffset!==0,[X,q]=r.useState();return(0,eE.b)(()=>{b&&q(window.getComputedStyle(b).zIndex)},[b]),(0,ew.jsx)("div",{ref:M.setFloating,"data-radix-popper-content-wrapper":"",style:{...k,transform:W?k.transform:"translate(0, -200%)",minWidth:"max-content",zIndex:X,"--radix-popper-transform-origin":[N.transformOrigin?.x,N.transformOrigin?.y].join(" "),...N.hide?.referenceHidden&&{visibility:"hidden",pointerEvents:"none"}},dir:e.dir,children:(0,ew.jsx)(eF,{scope:n,placedSide:$,onArrowChange:E,arrowX:B,arrowY:I,shouldHideArrow:U,children:(0,ew.jsx)(ey.WV.div,{"data-side":$,"data-align":V,...y,ref:T,style:{...y.style,animation:W?void 0:"none"}})})})});eN.displayName=ek;var e$="PopperArrow",eV={top:"bottom",right:"left",bottom:"top",left:"right"},ez=r.forwardRef(function(e,t){let{__scopePopper:n,...r}=e,o=eW(e$,n),i=eV[o.placedSide];return(0,ew.jsx)("span",{ref:o.onArrowChange,style:{position:"absolute",left:o.arrowX,top:o.arrowY,[i]:0,transformOrigin:{top:"",right:"0 0",bottom:"center 0",left:"100% 0"}[o.placedSide],transform:{top:"translateY(100%)",right:"translateY(50%) rotate(90deg) translateX(-50%)",bottom:"rotate(180deg)",left:"translateY(50%) rotate(-90deg) translateX(50%)"}[o.placedSide],visibility:o.shouldHideArrow?"hidden":void 0},children:(0,ew.jsx)(eb,{...r,ref:t,style:{...r.style,display:"block"}})})});function eB(e){return null!==e}ez.displayName=e$;var e_=e=>({name:"transformOrigin",options:e,fn(t){let{placement:n,rects:r,middlewareData:o}=t,i=o.arrow?.centerOffset!==0,l=i?0:e.arrowWidth,a=i?0:e.arrowHeight,[s,f]=eI(n),u={start:"0%",center:"50%",end:"100%"}[f],c=(o.arrow?.x??0)+l/2,d=(o.arrow?.y??0)+a/2,p="",h="";return"bottom"===s?(p=i?u:`${c}px`,h=`${-a}px`):"top"===s?(p=i?u:`${c}px`,h=`${r.floating.height+a}px`):"right"===s?(p=`${-a}px`,h=i?u:`${d}px`):"left"===s&&(p=`${r.floating.width+a}px`,h=i?u:`${d}px`),{data:{x:p,y:h}}}});function eI(e){let[t,n="center"]=e.split("-");return[t,n]}var eY=eD,eU=eM,eX=eN,eq=ez},2566:(e,t,n)=>{"use strict";n.d(t,{t:()=>i});var r=n(17577),o=n(65819);function i(e){let[t,n]=r.useState(void 0);return(0,o.b)(()=>{if(e){n({width:e.offsetWidth,height:e.offsetHeight});let t=new ResizeObserver(t=>{let r,o;if(!Array.isArray(t)||!t.length)return;let i=t[0];if("borderBoxSize"in i){let e=i.borderBoxSize,t=Array.isArray(e)?e[0]:e;r=t.inlineSize,o=t.blockSize}else r=e.offsetWidth,o=e.offsetHeight;n({width:r,height:o})});return t.observe(e,{box:"border-box"}),()=>t.unobserve(e)}n(void 0)},[e]),t}}};