import{d as C,x as p,bs as I,o as h,q as A,a as e,w as u,bt as _,Q as n,W as j,am as w,bu as g,bv as x,bw as k,aQ as M,aT as T,bx as q,by as L,bz as O,ad as D}from"./vendor.480a1782.js";/* empty css               *//* empty css               *//* empty css              *//* empty css               */import{_ as V}from"./index.d8c8b215.js";const $=C({name:"AdvanceForm",setup(){const o=p({name:null,isOnLine:null,joinType:null,address:null}),a=p({name:[{required:!0,message:"\u8BF7\u8F93\u5165\u5B66\u6821\u540D\u79F0"}],isOnLine:[{required:!0,message:"\u8BF7\u9009\u62E9\u7EBF\u4E0A\u7EBF\u4E0B"}],joinType:[{required:!0,message:"\u8BF7\u9009\u62E9\u52A0\u76DF\u65B9\u5F0F"}],address:[{required:!0,message:"\u8BF7\u8F93\u5165\u5B66\u6821\u5730\u5740"}]}),{validate:l,validateInfos:i}=I(o,a);function r(){l()}return{baseInfoModel:o,validateInfos:i,onVerifyForm:r}}}),R={class:"main-container"},U=n("\u6821\u9A8C"),z=n("\u7EBF\u4E0B"),N=n("\u7EBF\u4E0A"),Q=n("\u666E\u901A"),P=n("\u72EC\u5BB6"),W=n("\u4EE3\u7406");function G(o,a,l,i,r,H){const c=j,f=w,s=g,m=x,F=k,d=M,v=T,b=q,B=L,E=O,y=D;return h(),A("div",R,[e(y,{title:"\u884C\u5185\u8868\u5355\uFF08\u901A\u8FC7\u4F7F\u7528 useForm \u51FD\u6570\u8FDB\u884C\u6821\u9A8C\uFF09"},{extra:u(()=>[e(c,{type:"primary",onClick:o.onVerifyForm},{default:u(()=>[U]),_:1},8,["onClick"])]),default:u(()=>[e(E,{layout:"inline"},{default:u(()=>[e(s,_({label:"\u8F93\u5165\u6846",style:{width:"40%"}},o.validateInfos.name),{default:u(()=>[e(f,{value:o.baseInfoModel.name,"onUpdate:value":a[0]||(a[0]=t=>o.baseInfoModel.name=t),placeholder:"\u8BF7\u8F93\u5165\u4E00\u5B9A\u5185\u5BB9"},null,8,["value"])]),_:1},16),e(s,_({label:"\u5355\u9009\u7EC4",style:{width:"40%"}},o.validateInfos.isOnLine),{default:u(()=>[e(F,{value:o.baseInfoModel.isOnLine,"onUpdate:value":a[1]||(a[1]=t=>o.baseInfoModel.isOnLine=t)},{default:u(()=>[e(m,{value:0},{default:u(()=>[z]),_:1}),e(m,{value:1},{default:u(()=>[N]),_:1})]),_:1},8,["value"])]),_:1},16),e(s,_({label:"\u591A\u9009\u7EC4",style:{width:"40%"}},o.validateInfos.joinType),{default:u(()=>[e(b,{value:o.baseInfoModel.joinType,"onUpdate:value":a[2]||(a[2]=t=>o.baseInfoModel.joinType=t)},{default:u(()=>[e(v,null,{default:u(()=>[e(d,{value:1},{default:u(()=>[Q]),_:1}),e(d,{value:2},{default:u(()=>[P]),_:1}),e(d,{value:3},{default:u(()=>[W]),_:1})]),_:1})]),_:1},8,["value"])]),_:1},16),e(s,_({label:"\u591A\u884C\u8F93\u5165",style:{width:"40%"}},o.validateInfos.address),{default:u(()=>[e(B,{placeholder:"\u8BF7\u8F93\u5165\u591A\u884C\u8F93\u5165","auto-size":{minRows:2,maxRows:5}})]),_:1},16)]),_:1})]),_:1})])}var ee=V($,[["render",G],["__scopeId","data-v-90d45080"]]);export{ee as default};