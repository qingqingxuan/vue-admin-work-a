import{d as _,b as i,e as f,l as h,B as m,o as a,c as s,w as d,n as c,f as y,aX as v,ab as x}from"./vendor.1107f9f6.js";/* empty css               */import{d as b,L as g,u as l}from"./useEcharts.99e96b0d.js";import{_ as k}from"./index.59a0ec82.js";const B=_({name:"StudentChart",setup(){const e=i(!0),t=i(null),o=()=>{const r={grid:{left:"2%",right:"5%",top:"5%",bottom:"3%",containLabel:!0},tooltip:{trigger:"axis"},yAxis:{type:"category",data:["\u4E00\u6708","\u4E8C\u6708","\u4E09\u6708","\u56DB\u6708","\u4E94\u6708","\u516D\u6708"],axisTick:{show:!1}},xAxis:{type:"value",boundaryGap:0},series:[{data:[480,289,711,618,393,571,470],type:"bar",smooth:!0,showSymbol:!1,barWidth:"auto",itemStyle:{borderRadius:[0,15,15,0],color:new g(1,0,0,1,[{offset:0,color:"rgba(24, 144, 255)"},{offset:1,color:"rgba(244, 187, 236)"}])}}]};setTimeout(()=>{e.value=!1,m(()=>{l(t.value).setOption(r)})},1e3)},n=()=>{l(t.value).resize()};return f(o),h(()=>{b(t.value)}),{loading:e,updateChart:n,studentChart:t}}}),C={key:1,class:"text-sm"},E={class:"chart-item-container"},F={key:1,ref:"studentChart",class:"chart-item"};function w(e,t,o,n,r,S){const u=v,p=x;return a(),s(p,{"body-style":{padding:"10px"},"head-style":{padding:"0 10px"},title:"\u534A\u5E74\u62DB\u751F\u5BF9\u6BD4\u56FE\uFF08\u5355\u4F4D\uFF1A\u4EBA\uFF09"},{header:d(()=>[e.loading?(a(),s(u,{key:0,active:"",style:{width:"50%"}})):(a(),c("div",C))]),default:d(()=>[y("div",E,[e.loading?(a(),s(u,{key:0,active:""})):(a(),c("div",F,null,512))])]),_:1})}var L=k(B,[["render",w],["__scopeId","data-v-ae3ee132"]]);export{L as default};