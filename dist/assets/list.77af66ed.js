var k=Object.defineProperty,x=Object.defineProperties;var F=Object.getOwnPropertyDescriptors;var d=Object.getOwnPropertySymbols;var y=Object.prototype.hasOwnProperty,j=Object.prototype.propertyIsEnumerable;var l=(a,e,t)=>e in a?k(a,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):a[e]=t,u=(a,e)=>{for(var t in e||(e={}))y.call(e,t)&&l(a,t,e[t]);if(d)for(var t of d(e))j.call(e,t)&&l(a,t,e[t]);return a},m=(a,e)=>x(a,F(e));import{d as z,e as $,o as p,q as v,F as B,a7 as C,a as o,c as I,w as c,f as s,P as r,ag as L,ah as T,bF as N,aS as V,aV as P,aR as R,ad as q}from"./vendor.480a1782.js";/* empty css               */import{_ as D}from"./TableFooter.623aaac4.js";import{_ as E,p as M,e as A}from"./index.d8c8b215.js";import{u as G,d as H}from"./table.c46dc0d9.js";var J="/vue-admin-work-a/assets/img_vip_icon.ec5db992.png";const K=z({name:"List",setup(){const a=G(),e=H(t);function t(){M({url:A,data:()=>({page:e.page,pageSize:e.pageSize})}).then(_=>{a.handleSuccess(_),e.setTotalSize(_.totalSize||10)}).catch(console.log)}return $(t),m(u({},a),{pagination:e})}}),g=a=>(L("data-v-522c72e0"),a=a(),T(),a),O={class:"header-wrapper"},Q={class:"avatar-wrapper"},U=["src"],W=g(()=>s("img",{class:"vip",src:J},null,-1)),X={class:"nick-wrapper"},Y={class:"nick-name"},Z={class:"content"},aa={class:"content-wrapper"},ea=g(()=>s("div",null,"\u65F6\u95F4",-1));function ta(a,e,t,_,sa,oa){const h=N,i=V,f=P,w=R,S=q,b=D;return p(),v("div",null,[(p(!0),v(B,null,C(a.dataList,n=>(p(),I(S,{key:n.id,"content-style":"{ padding: '10px' }"},{default:c(()=>[o(w,{class:"item-wrapper","x-gap":10,"y-gap":10,cols:2},{default:c(()=>[o(i,{span:6},{default:c(()=>[s("div",O,[s("div",Q,[s("img",{class:"avatar",src:n.avatar},null,8,U),W]),s("div",X,[s("span",Y,r(n.nickName),1),o(h,{value:n.rate,size:"small",disabled:""},null,8,["value"]),s("div",Z,r(n.content),1)])])]),_:2},1024),o(i,{span:6},{default:c(()=>[s("div",aa,[ea,s("div",null,r(n.time),1)])]),_:2},1024),o(i,{span:12},{default:c(()=>[o(f,{percent:50,status:"active"})]),_:1})]),_:2},1024)]),_:2},1024))),128)),o(b,{pagination:a.pagination},null,8,["pagination"])])}var da=E(K,[["render",ta],["__scopeId","data-v-522c72e0"]]);export{da as default};
