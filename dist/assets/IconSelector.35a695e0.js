import{d as N,b as c,G as $,o as s,c as u,w as _,f as i,a as b,n as z,a5 as L,v as w,N as U,F as A,ae as O,af as P,O as x,m as G,i as R,aS as T,aR as V,bE as W,U as q,a1 as H}from"./vendor.1107f9f6.js";import{_ as J,h as K}from"./index.59a0ec82.js";import{A as M}from"./index.b88af64d.js";const k=r=>(O("data-v-19441216"),r=r(),P(),r),Q={class:"icon-container"},X=k(()=>i("div",{class:"mt-4"},null,-1)),Y={class:"icon-wrapper"},Z=["onClick"],ee={class:"label-name"},te=k(()=>i("div",{class:"mt-1"},null,-1)),se=x("\u8BF7\u9009\u62E9\u56FE\u6807"),oe=x(" \u5DF2\u9009\u62E9 "),ae=N({props:{value:{type:String,default:""},enableCopy:{type:Boolean,default:!1}},emits:["onSelect","update:value"],setup(r,{emit:C}){const d=r,o=Object.keys(M),t=36,f=c(1),p=c(o.slice(0,t)),a=c([]),m=c(o.length),h=c(!1),v=c(d.value);$(()=>d.value,e=>{v.value=e});function E(e){f.value=e,p.value=a.value.length===0?o.slice((e-1)*t,e*t):a.value.slice((e-1)*t,e*t)}function F(e){e?(a.value=o.filter(n=>n.startsWith(e.slice(0,1).toUpperCase()+e.slice(1).toLowerCase())),m.value=a.value.length,p.value=a.value.slice(0,t)):(a.value=[],m.value=o.length,p.value=o.slice((f.value-1)*t,f.value*t))}async function I(e){if(C("onSelect",e),C("update:value",e),v.value=e,h.value=!1,d.enableCopy){const{isSupported:n,copied:y,copy:g}=K();n&&(await g(`<${e} />`),y&&G.success(`\u5DF2\u9009\u62E9\u5E76\u4E14\u590D\u5236\u6210\u529F ${e} \u56FE\u6807`))}}return(e,n)=>{const y=R,g=T,B=V,D=W,S=q,j=H;return s(),u(j,{visible:h.value,"onUpdate:visible":n[0]||(n[0]=l=>h.value=l),trigger:"click"},{content:_(()=>[i("div",Q,[b(y,{placeholder:"\u641C\u7D22\u56FE\u6807\u540D\u79F0","enter-button":"",onSearch:F,allowClear:""}),X,i("div",Y,[b(B,{wrap:!0},{default:_(()=>[(s(!0),z(A,null,L(p.value,l=>(s(),u(g,{span:4,key:l},{default:_(()=>[i("div",{class:"flex justify-center items-center flex-col icon-item",onClick:ne=>I(l)},[(s(),u(w(l),{style:{"font-size":"22px"}})),i("div",ee,U(l),1)],8,Z)]),_:2},1024))),128))]),_:1})]),te,b(D,{size:"small",pageSize:t,total:m.value,"show-size-changer":!1,onChange:E},null,8,["total"])])]),default:_(()=>[v.value?(s(),u(S,{key:1,type:"primary",ghost:""},{default:_(()=>[oe,(s(),u(w(v.value)))]),_:1})):(s(),u(S,{key:0},{default:_(()=>[se]),_:1}))]),_:1},8,["visible"])}}});var _e=J(ae,[["__scopeId","data-v-19441216"]]);export{_e as _};