import{d as r,aY as _,o as p,q as d,f as n,H as l,a as o,w as s,I as i,P as u,aQ as m}from"./vendor.f0cebcb4.js";/* empty css               */import{_ as f}from"./index.99c1ba7d.js";const v=r({name:"ProjectItem",props:{item:{type:Object,default:()=>({})}},setup(e){const t=_(e,"item");return{gitee:function(){console.log(t.value.gitee),window.open(t.value.gitee)},preView:function(){window.open(t.value.target)}}}}),g={class:"item-container"},h={class:"info-wrapper"},w={class:"title"},y=i("\u9884\u89C8\u5730\u5740"),j=i("\u9879\u76EE\u5730\u5740");function C(e,t,k,b,x,I){const a=u,c=m;return p(),d("div",g,[n("div",h,[n("span",w,l(e.item.title),1),o(c,{class:"mt-1"},{default:s(()=>[o(a,{class:"mr-1",type:"primary",ghost:"",size:"small",onClick:e.preView},{default:s(()=>[y]),_:1},8,["onClick"]),o(a,{ghost:"",type:"primary",size:"small",onClick:e.gitee},{default:s(()=>[j]),_:1},8,["onClick"])]),_:1})])])}var $=f(v,[["render",C],["__scopeId","data-v-06714d94"]]);export{$ as default};