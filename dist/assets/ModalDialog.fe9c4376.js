import{d as c,r as _,o as u,c as d,w as i,a as v,Q as y,W as C,b as h,n as $,f as b,ak as w,al as g,M as k}from"./vendor.62cbb9fe.js";import{_ as p,c as S}from"./index.3d2e6184.js";const B=c({name:"AddButton",emits:["add"],setup(e,{emit:t}){function o(){t("add")}return{onAdd:o}}}),M=y(" \u6DFB\u52A0 ");function A(e,t,o,a,l,r){const n=_("PlusOutlined"),s=C;return u(),d(s,{type:"primary",size:"small",onClick:e.onAdd},{icon:i(()=>[v(n)]),default:i(()=>[M]),_:1},8,["onClick"])}var V=p(B,[["render",A]]);const D=c({name:"ModalDialog",props:{title:{type:String,default:"\u64CD\u4F5C"},contentHeight:{type:String,default:"30vh"}},emits:["confirm","cancel"],setup(e,{emit:t}){const o=h(!1),a=S(),l=$(()=>({width:a.state.device==="mobile"?"80%":"50%"}));function r(){return o.value=!o.value,Promise.resolve(o.value)}function n(){return o.value=!0,Promise.resolve(!0)}function s(){return o.value=!1,Promise.resolve(!1)}function f(){t("confirm")}function m(){o.value=!1,t("cancel")}return{showModal:o,bodyStyle:l,toggle:r,show:n,close:s,onConfirm:f,onCancel:m}}}),P={style:{maxHeight:"50vh",overflow:"auto"}};function O(e,t,o,a,l,r){const n=k;return u(),d(n,{visible:e.showModal,"onUpdate:visible":t[0]||(t[0]=s=>e.showModal=s),title:e.title,class:"modal-dialog-wrapper",style:g(e.bodyStyle),cancelText:"\u53D6\u6D88",okText:"\u786E\u5B9A",onOk:e.onConfirm,onCancel:e.onCancel},{default:i(()=>[b("div",P,[w(e.$slots,"content")])]),_:3},8,["visible","title","style","onOk","onCancel"])}var j=p(D,[["render",O]]);export{V as _,j as a};