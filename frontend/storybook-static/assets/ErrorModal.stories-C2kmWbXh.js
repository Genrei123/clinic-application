import{j as s}from"./jsx-runtime-D_zvdyIk.js";import{r as l}from"./index-D4lIrffr.js";/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const y=r=>r.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),C=r=>r.replace(/^([A-Z])|[\s-_]+(\w)/g,(e,t,o)=>o?o.toUpperCase():t.toLowerCase()),d=r=>{const e=C(r);return e.charAt(0).toUpperCase()+e.slice(1)},f=(...r)=>r.filter((e,t,o)=>!!e&&e.trim()!==""&&o.indexOf(e)===t).join(" ").trim(),v=r=>{for(const e in r)if(e.startsWith("aria-")||e==="role"||e==="title")return!0};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var j={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const N=l.forwardRef(({color:r="currentColor",size:e=24,strokeWidth:t=2,absoluteStrokeWidth:o,className:n="",children:a,iconNode:g,...i},x)=>l.createElement("svg",{ref:x,...j,width:e,height:e,stroke:r,strokeWidth:o?Number(t)*24/Number(e):t,className:f("lucide",n),...!a&&!v(i)&&{"aria-hidden":"true"},...i},[...g.map(([w,b])=>l.createElement(w,b)),...Array.isArray(a)?a:[a]]));/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const k=(r,e)=>{const t=l.forwardRef(({className:o,...n},a)=>l.createElement(N,{ref:a,iconNode:e,className:f(`lucide-${y(d(r))}`,`lucide-${r}`,o),...n}));return t.displayName=d(r),t};/**
 * @license lucide-react v0.503.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const A=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],E=k("x",A);function h({title:r="Ooops!",message:e="Something went wrong.",buttonText:t="Try Again",onClose:o,onRetry:n}){return s.jsxs("div",{className:"w-full max-w-md mx-auto overflow-hidden rounded-md shadow-lg border border-gray-200",children:[s.jsx("div",{className:"bg-red-400 p-4 flex justify-end",children:s.jsx("button",{onClick:o,className:"rounded-full border-2 border-white p-2 text-white hover:bg-red-500 transition-colors","aria-label":"Close",children:s.jsx(E,{className:"h-5 w-5"})})}),s.jsxs("div",{className:"bg-white p-8 flex flex-col items-center text-center",children:[s.jsx("h2",{className:"text-3xl font-medium text-gray-700 mb-2",children:r}),s.jsx("p",{className:"text-gray-600 mb-6",children:e}),s.jsx("button",{onClick:n,className:"bg-yellow-500 hover:bg-yellow-600 text-white font-medium px-8 py-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50",children:t})]})]})}h.__docgenInfo={description:"",methods:[],displayName:"ErrorModal",props:{title:{defaultValue:{value:'"Ooops!"',computed:!1},required:!1},message:{defaultValue:{value:'"Something went wrong."',computed:!1},required:!1},buttonText:{defaultValue:{value:'"Try Again"',computed:!1},required:!1}}};const O={component:h},c={args:{onClose:()=>{}}};var u,m,p;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    onClose: () => {}
  }
}`,...(p=(m=c.parameters)==null?void 0:m.docs)==null?void 0:p.source}}};const $=["Default"];export{c as Default,$ as __namedExportsOrder,O as default};
