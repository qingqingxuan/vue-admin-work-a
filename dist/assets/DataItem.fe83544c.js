import{d as m,b as r,e as _,D as x,o as a,c as n,w as c,y,ao as v,q as l,f as t,P as s,t as p,aW as h,ag as g,ah as M,aX as k,ad as b}from"./vendor.480a1782.js";/* empty css               */import{c as S,_ as j}from"./index.d8c8b215.js";const w=m({name:"DataItem",props:{dataModel:{type:Object,default:()=>({})}},setup(e){const o=r(!0),d=r(0),i=S(d,{duration:1e3});return setTimeout(()=>{o.value=!1},1e3),_(()=>{x(()=>{setTimeout(()=>{d.value=Number(e.dataModel.data)},1e3)})}),{loading:o,computedNum:i,prefix:e.dataModel.prefix,suffix:e.dataModel.suffix}}}),I=e=>(g("data-v-30571f3e"),e=e(),M(),e),D={key:1,style:{height:"130px"},class:"flex flex-col justify-between overflow-hidden"},C={key:0},N={class:"text-2xl text-bold"},T={key:1},$={class:"flex flex-col justify-center flex-1"},B=I(()=>t("div",{class:"divide"},null,-1)),z={class:"flex items-center justify-between"},V={class:"text-sm text-grey"},q={class:"text-sm text-grey"};function E(e,o,d,i,F,O){const u=k,f=b;return a(),n(f,{"body-style":{padding:"10px"},"head-style":{padding:"0 15px"},title:e.dataModel.title,size:"small"},{extra:c(()=>[(a(),n(y(e.dataModel.icon),{style:v({fontSize:"22px",color:e.dataModel.color})},null,8,["style"]))]),default:c(()=>[e.loading?(a(),n(u,{key:0,paragraph:{rows:4},active:""})):(a(),l("div",D,[t("div",null,[e.prefix?(a(),l("span",C,s(e.prefix),1)):p("v-if",!0),t("span",N,s(e.computedNum.toFixed(0)),1),e.suffix?(a(),l("span",T,s(e.suffix),1)):p("v-if",!0)]),t("div",$,[h(e.$slots,"extra",{extra:e.dataModel.extra},void 0,!0)]),B,t("div",z,[t("span",V,s(e.dataModel.bottomTitle),1),t("span",q,s(e.dataModel.totalSum),1)])]))]),_:3},8,["title"])}var A=j(w,[["render",E],["__scopeId","data-v-30571f3e"]]);export{A as default};