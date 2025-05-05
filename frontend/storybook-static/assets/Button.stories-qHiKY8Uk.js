import{j as p}from"./jsx-runtime-D_zvdyIk.js";const s=({label:n,onClick:l,disabled:o=!1,size:i="md",variant:u="primary",className:d=""})=>{const m={sm:"py-1 px-3 text-sm",md:"py-2 px-4 text-base",lg:"py-3 px-6 text-lg"},c={primary:"bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",secondary:"bg-white text-blue-600 border border-blue-300 hover:bg-blue-50",outline:"bg-white text-gray-700 border border-gray-400 hover:bg-gray-50"};return p.jsx("button",{className:`
        rounded-full
        font-medium
        shadow-sm
        transition-colors
        duration-200
        focus:outline-none 
        focus:ring-2 
        focus:ring-gray-300
        disabled:opacity-50 
        disabled:cursor-not-allowed
        ${m[i]}
        ${c[u]}
        ${d}
      `,onClick:l,disabled:o,type:"button",children:n})};s.__docgenInfo={description:"",methods:[],displayName:"Button",props:{label:{required:!0,tsType:{name:"string"},description:""},onClick:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},disabled:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"",defaultValue:{value:"'md'",computed:!1}},variant:{required:!1,tsType:{name:"union",raw:"'primary' | 'secondary' | 'outline'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'secondary'"},{name:"literal",value:"'outline'"}]},description:"",defaultValue:{value:"'primary'",computed:!1}},className:{required:!1,tsType:{name:"string"},description:"",defaultValue:{value:"''",computed:!1}},children:{required:!1,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},type:{required:!1,tsType:{name:"union",raw:'"button" | "submit" | "reset"',elements:[{name:"literal",value:'"button"'},{name:"literal",value:'"submit"'},{name:"literal",value:'"reset"'}]},description:""}}};const b={component:s},e={args:{label:"Button",onClick:()=>{}}};var a,t,r;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    label: "Button",
    onClick: () => {}
  }
}`,...(r=(t=e.parameters)==null?void 0:t.docs)==null?void 0:r.source}}};const g=["Default"];export{e as Default,g as __namedExportsOrder,b as default};
