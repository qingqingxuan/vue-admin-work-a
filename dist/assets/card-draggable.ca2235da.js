import{d as _,x as b,e as f,r as g,o as u,q as v,a as d,w as n,f as m,c as y,al as C,y as D,P as E,Q as h,W as $,ad as k}from"./vendor.62cbb9fe.js";import{d as x}from"./vuedraggable.umd.bd570ab4.js";import{A as B}from"./index.b719fa74.js";import{_ as F,t as j}from"./index.3d2e6184.js";import"./index.dd57a8d3.js";const A=Object.keys(B).slice(0,100),I=_({name:"CardDraggable",components:{draggable:x},setup(){const a=[...A],e=b([]),c=!1,r=["#e54d42","#f37b1d","#fbbd08","#8dc63f","#39b54a","#1cbbb4","#0081ff","#6739b6","#9c26b0","#e03997","#a5673f","#8799a3"],l=()=>r[Math.floor(Math.random()*r.length)],i=()=>{e.length=0,e.push(...a.map((t,o)=>({label:`\u7B2C ${o+1} \u4E2A\u5143\u7D20`,id:j(t),color:l()})))};return f(()=>{e.push(...a.map((t,o)=>({label:`\u7B2C ${o+1} \u4E2A\u5143\u7D20`,id:t,color:l()})))}),{drag:c,list:e,resetElements:i}}}),M={class:"main-container"},N=h("\u91CD\u7F6E\u5143\u7D20\u4F4D\u7F6E"),S={class:"card-item"},V={class:"label"};function w(a,e,c,r,l,i){const t=$,o=g("draggable"),p=k;return u(),v("div",M,[d(p,{title:"\u62D6\u52A8\u66F4\u6362\u56FE\u6807\u4F4D\u7F6E"},{extra:n(()=>[d(t,{size:"small",type:"primary",onClick:a.resetElements},{default:n(()=>[N]),_:1},8,["onClick"])]),default:n(()=>[d(o,{list:a.list,animation:"500",onStart:e[0]||(e[0]=s=>a.drag=!0),onEnd:e[1]||(e[1]=s=>a.drag=!1),"item-key":"id",tag:"ul"},{item:n(({element:s})=>[m("li",S,[(u(),y(D(s.id),{class:"icon",style:C({color:s.color})},null,8,["style"])),m("div",V,E(s.label),1)])]),_:1},8,["list"])]),_:1})])}var P=F(I,[["render",w],["__scopeId","data-v-72e212b0"]]);export{P as default};