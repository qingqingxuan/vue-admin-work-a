import{_ as p,f as l}from"./index.59a0ec82.js";import{d,b as i,e as m,o as u,n as f,am as h}from"./vendor.1107f9f6.js";const g="http://api.map.baidu.com/getscript?v=3.0&ak=WxbQmaOc3bvSGSaKWcyeFSf8fnYCWpKd&services=&t="+new Date().getTime(),v=d({setup(){const e=i(null),n=i(0);return m(async()=>{var c,r;const{load:o}=l(g,()=>{},{manual:!0});await o(),n.value=((r=(c=e.value)==null?void 0:c.parentElement)==null?void 0:r.getBoundingClientRect().height)||0;const a=window.BMap,t=new a.Map(e.value),s=new a.Point(116.404,39.915);t.centerAndZoom(s,7),t.enableScrollWheelZoom(),t.setMapStyleV2({styleId:"ea4652613f3629247d47666706ce7e89"})}),{container:e,height:n}}});function _(e,n,o,a,t,s){return u(),f("div",{ref:"container",style:h({height:e.height+"px",width:"100%"})},null,4)}var w=p(v,[["render",_]]);export{w as default};
