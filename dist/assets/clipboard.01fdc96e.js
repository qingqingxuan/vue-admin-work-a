import{d as i,b as l,m as s,o as m,c as F,w as o,a as r,Q as f,W as B,i as C,ad as v}from"./vendor.62cbb9fe.js";import{_ as b,i as h}from"./index.3d2e6184.js";const y=i({name:"Clipboard",setup(){const e=l(""),{copy:t,isSupported:u,text:n}=h({source:e}),a=()=>{t(e.value).then(()=>{s.success("\u590D\u5236\u6210\u529F\uFF0C\u5185\u5BB9\u4E3A\uFF1A"+n.value)})};return u||s.error("\u5F53\u524D\u6D4F\u89C8\u5668\u4E0D\u652F\u6301\u6B64\u529F\u80FD"),{content:e,onCopy:a}}}),D=f("\u590D\u5236");function x(e,t,u,n,a,$){const c=B,p=C,d=v;return m(),F(d,{title:"\u8BF7\u8F93\u5165\u5185\u5BB9","content-style":{padding:"10px"}},{default:o(()=>[r(p,{style:{width:"50%"},value:e.content,"onUpdate:value":t[0]||(t[0]=_=>e.content=_),placeholder:"\u8BF7\u8F93\u5165\u5185\u5BB9",onSearch:e.onCopy},{enterButton:o(()=>[r(c,{type:"primary"},{default:o(()=>[D]),_:1})]),_:1},8,["value","onSearch"])]),_:1})}var g=b(y,[["render",x]]);export{g as default};
