import{d as m,t as g,b as c,G as w,o as u,n as d,F as y,a5 as x,p as B,y as F,f as i,N as E,c as h,w as v,a as n,O as R,ak as V,U as C,ab as $}from"./vendor.1107f9f6.js";import{_ as A}from"./index.59a0ec82.js";const b={class:"flex justify-between items-center mt-1.5"},k={class:"ml-1 mr-1"},z=m({props:{inputValue:{type:String,default:""},lowReg:{type:RegExp,default:/^[0-9]{6,16}$|^[a-zA-Z]{6,16}$/},middleReg:{type:RegExp,default:/^[A-Za-z0-9]{6,16}$/},strongReg:{type:RegExp,default:/^\w{6,16}$/}},setup(_){const e=_,t=g([{status:"normal"},{status:"normal"},{status:"normal"}]),a=c("\u5F31");return w(()=>e.inputValue,()=>{e.lowReg.test(e.inputValue)?(t[0].status="low",t[1].status="normal",t[2].status="normal",a.value="\u5F31"):e.middleReg.test(e.inputValue)?(t[0].status="low",t[1].status="middle",t[2].status="normal",a.value="\u4E2D"):e.strongReg.test(e.inputValue)?(t[0].status="low",t[1].status="middle",t[2].status="strong",a.value="\u5F3A"):t.forEach(s=>s.status="normal")}),(s,o)=>(u(),d("div",b,[(u(!0),d(y,null,x(F(t),(l,r)=>(u(),d("span",{class:B(["tip",[l.status]]),key:r},null,2))),128)),i("span",k,E(a.value),1)]))}});var N=A(z,[["__scopeId","data-v-82a9bf6c"]]);const S={class:"w-1/3",style:{margin:"0 auto"}},j={class:"mt-5 text-center"},D=R("\u786E\u5B9A"),P=m({setup(_){const e=c(""),t=c("");return(a,s)=>{const o=V,l=N,r=C,f=$;return u(),h(f,{title:"\u5BC6\u7801\u5F3A\u5EA6\u7EC4\u4EF6",segmented:""},{default:v(()=>[i("div",S,[n(o,{value:e.value,"onUpdate:value":s[0]||(s[0]=p=>e.value=p),placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801"},null,8,["value"]),n(l,{"input-value":e.value},null,8,["input-value"]),n(o,{value:t.value,"onUpdate:value":s[1]||(s[1]=p=>t.value=p),placeholder:"\u8BF7\u518D\u6B21\u8F93\u5165\u5BC6\u7801"},null,8,["value"]),i("div",j,[n(r,{size:"small",type:"primary",round:"",style:{width:"100%"}},{default:v(()=>[D]),_:1})])])]),_:1})}}});export{P as default};
