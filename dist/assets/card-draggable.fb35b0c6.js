var v=Object.defineProperty;var u=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,C=Object.prototype.propertyIsEnumerable;var m=(a,e,t)=>e in a?v(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,p=(a,e)=>{for(var t in e||(e={}))y.call(e,t)&&m(a,t,e[t]);if(u)for(var t of u(e))C.call(e,t)&&m(a,t,e[t]);return a};import{ax as _,d as D,x as E,e as h,r as k,o as b,q as $,a as d,w as r,f,c as x,ak as B,y as F,H as j,I,P as A,a9 as M}from"./vendor.f0cebcb4.js";import{d as N}from"./vuedraggable.umd.b22ffd55.js";import{_ as S,t as V}from"./index.99c1ba7d.js";import"./index.560b6bae.js";const w=Object.keys(_).slice(0,100),z=D({name:"CardDraggable",components:p({draggable:N},_),setup(){const a=[...w],e=E([]),t=!1,l=["#e54d42","#f37b1d","#fbbd08","#8dc63f","#39b54a","#1cbbb4","#0081ff","#6739b6","#9c26b0","#e03997","#a5673f","#8799a3"],c=()=>l[Math.floor(Math.random()*l.length)],i=()=>{e.length=0,e.push(...a.map((o,s)=>({label:`\u7B2C ${s+1} \u4E2A\u5143\u7D20`,id:V(o),color:c()})))};return h(()=>{e.push(...a.map((o,s)=>({label:`\u7B2C ${s+1} \u4E2A\u5143\u7D20`,id:o,color:c()})))}),{drag:t,list:e,resetElements:i}}}),H={class:"main-container"},q=I("\u91CD\u7F6E\u5143\u7D20\u4F4D\u7F6E"),L={class:"card-item"},O={class:"label"};function P(a,e,t,l,c,i){const o=A,s=k("draggable"),g=M;return b(),$("div",H,[d(g,{title:"\u62D6\u52A8\u66F4\u6362\u56FE\u6807\u4F4D\u7F6E"},{extra:r(()=>[d(o,{size:"small",type:"primary",onClick:a.resetElements},{default:r(()=>[q]),_:1},8,["onClick"])]),default:r(()=>[d(s,{list:a.list,animation:"500",onStart:e[0]||(e[0]=n=>a.drag=!0),onEnd:e[1]||(e[1]=n=>a.drag=!1),"item-key":"id",tag:"ul"},{item:r(({element:n})=>[f("li",L,[(b(),x(F(n.id),{class:"icon",style:B({color:n.color})},null,8,["style"])),f("div",O,j(n.label),1)])]),_:1},8,["list"])]),_:1})])}var Q=S(z,[["render",P],["__scopeId","data-v-273ac3a7"]]);export{Q as default};
