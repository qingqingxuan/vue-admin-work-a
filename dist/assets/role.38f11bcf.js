var $=Object.defineProperty,q=Object.defineProperties;var S=Object.getOwnPropertyDescriptors;var x=Object.getOwnPropertySymbols;var z=Object.prototype.hasOwnProperty,J=Object.prototype.propertyIsEnumerable;var K=(e,a,n)=>a in e?$(e,a,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[a]=n,T=(e,a)=>{for(var n in a||(a={}))z.call(a,n)&&K(e,n,a[n]);if(x)for(var n of x(a))J.call(a,n)&&K(e,n,a[n]);return e},j=(e,a)=>q(e,S(a));import{_ as V,a as G}from"./ModalDialog.fe9c4376.js";import{_ as X,a as H}from"./TableBody.5391925b.js";import{b as c,m as F,d as P,as as Q,e as W,o as m,q as R,a as s,w as r,F as L,Q as y,P as Y,t as D,c as h,a7 as Z,D as ee,M as oe,W as ae,aX as ne,b3 as ue,bF as te,dX as le,s as se,aq as re,bE as de,bA as ie}from"./vendor.62cbb9fe.js";/* empty css               *//* empty css               *//* empty css               *//* empty css              */import{_ as ce,p as O,m as me,n as pe}from"./index.3d2e6184.js";/* empty css               *//* empty css                */import{u as _e,a as fe,c as ve}from"./table.761291a9.js";const U="ROLE_",C=[{label:"\u89D2\u8272\u540D\u79F0",type:"input",key:"name",value:c(""),required:!0,placeholder:"\u8BF7\u8F93\u5165\u89D2\u8272\u540D\u79F0",validator:function(){return this.value.value?!0:(F.error(this.placeholder),!1)}},{label:"\u89D2\u8272\u7F16\u53F7",key:"roleCode",value:c(""),type:"input",required:!0,placeholder:"\u8BF7\u8F93\u5165\u89D2\u8272\u7F16\u53F7",validator:function(){return this.value.value?!0:(F.error(this.placeholder),!1)}},{label:"\u89D2\u8272\u63CF\u8FF0",key:"description",value:c(""),type:"textarea",placeholder:"\u8BF7\u8F93\u5165\u89D2\u8272\u63CF\u8FF0"}];function N(e,a,n){const _=[];return e.forEach(d=>{const l={};l.key=d.menuUrl,l.title=d.menuName,a.push(l.key),d.children&&(n.push(l.key),l.children=N(d.children,a,n)),_.push(l)}),_}const Fe=P({name:"Role",setup(){const e=c(null),a=c(null),n=_e(),_=ve("id"),d=c("\u6DFB\u52A0\u89D2\u8272"),l=Q([]),k=fe([n.indexColumn,{title:"\u89D2\u8272\u540D\u79F0",key:"name",dataIndex:"name"},{title:"\u89D2\u8272\u7F16\u53F7",key:"roleCode",dataIndex:"roleCode"},{title:"\u89D2\u8272\u63CF\u8FF0",key:"description",dataIndex:"description"},{title:"\u521B\u5EFA\u65F6\u95F4",key:"createTime",dataIndex:"createTime"},{title:"\u89D2\u8272\u7F16\u53F7",key:"roleCode",dataIndex:"roleCode"},{title:"\u64CD\u4F5C",key:"actions"}],{align:"center"}),f=c([]),p=c([]);function g(){O({url:me,data:{}}).then(n.handleSuccess).catch(console.log)}function b(){var u;d.value="\u6DFB\u52A0\u89D2\u8272",(u=e.value)==null||u.toggle()}function A(u){var t;d.value="\u7F16\u8F91\u89D2\u8272",(t=e.value)==null||t.toggle(),ee(()=>{C.forEach(o=>{const i=o.key,v=u[i];v&&(o.key==="roleCode"?o.value.value=v.replace(U,""):o.value.value=v)})})}function B(u){oe.confirm({title:"\u63D0\u793A",content:"\u662F\u5426\u8981\u5220\u9664\u6B64\u89D2\u8272\uFF1F",cancelText:"\u53D6\u6D88",okText:"\u5220\u9664",onOk:()=>{F.success("\u6A21\u62DF\u89D2\u8272\u5220\u9664\u6210\u529F\uFF0C\u53C2\u6570\u4E3A"+JSON.stringify(u))}})}function I(){var u;C.every(t=>t.validator?t.validator():!0)&&((u=e.value)==null||u.toggle(),F.success("\u6A21\u62DF\u83DC\u5355\u6DFB\u52A0\u6210\u529F\uFF0C\u53C2\u6570\u4E3A\uFF1A"+JSON.stringify(C.reduce((t,o)=>(t[o.key]=o.value.value,t),{}))))}function E(u){O({url:pe,data:{roleId:u.id}}).then(t=>{var o;l.length=0,l.push(...N(t.data,f.value,p.value)),(o=a.value)==null||o.toggle()}).catch(console.log)}function M(){var u;(u=a.value)==null||u.close(),F.success("\u63D0\u4EA4\u6210\u529F: "+JSON.stringify(f.value))}return W(g),j(T({ROLE_CODE_FLAG:U,modalDialogRef:e,menuModalDialogRef:a,rowKey:_,menuData:l,tableColumns:k,formItems:C,actionTitle:d,defaultCheckedKeys:f,defaultExpandedKeys:p},n),{onAddItem:b,onDataFormConfirm:I,onShowMenu:E,onDeleteItem:B,onUpdateItem:A,onMenuConfirm:M})}}),ye={class:"main-container"},De=y("\u7F16\u8F91"),he=y("\u5220\u9664"),Ce=y(" \u83DC\u5355\u6743\u9650 ");function ke(e,a,n,_,d,l){const k=V,f=X,p=ae,g=ne,b=ue,A=H,B=re,I=de,E=ie,M=te,u=G,t=le;return m(),R("div",ye,[s(f,{"show-filter":!1},{"top-right":r(()=>[s(k,{onAdd:e.onAddItem},null,8,["onAdd"])]),_:1}),s(A,null,{default:r(()=>[s(b,{loading:e.tableLoading,"data-source":e.dataList,columns:e.tableColumns,pagination:!1,"row-key":e.rowKey},{bodyCell:r(({column:o,record:i,index:v})=>[o.key==="index"?(m(),R(L,{key:0},[y(Y(v+1),1)],2112)):D("v-if",!0),o.key==="actions"?(m(),h(g,{key:1},{default:r(()=>[s(p,{ghost:"",type:"primary",onClick:w=>e.onUpdateItem(i),size:"small"},{default:r(()=>[De]),_:2},1032,["onClick"]),s(p,{danger:"",size:"small",onClick:w=>e.onDeleteItem(i)},{default:r(()=>[he]),_:2},1032,["onClick"]),s(p,{ghost:"",type:"primary",size:"small",onClick:w=>e.onShowMenu(i)},{default:r(()=>[Ce]),_:2},1032,["onClick"])]),_:2},1024)):D("v-if",!0)]),_:1},8,["loading","data-source","columns","row-key"])]),_:1}),s(u,{ref:"modalDialogRef",title:e.actionTitle,onConfirm:e.onDataFormConfirm},{content:r(()=>[s(M,null,{default:r(()=>[(m(!0),R(L,null,Z(e.formItems,o=>(m(),h(E,{class:se([o.required?"form-item__require":"form-item__no_require"]),label:o.label,key:o.key},{default:r(()=>[o.type==="input"?(m(),h(B,{key:0,"addon-before":o.key==="roleCode"?e.ROLE_CODE_FLAG:"",placeholder:o.placeholder,value:o.value.value,"onUpdate:value":i=>o.value.value=i},null,8,["addon-before","placeholder","value","onUpdate:value"])):D("v-if",!0),o.type==="textarea"?(m(),h(I,{key:1,value:o.value.value,"onUpdate:value":i=>o.value.value=i,placeholder:o.placeholder,"auto-size":{minRows:3,maxRows:5}},null,8,["value","onUpdate:value","placeholder"])):D("v-if",!0)]),_:2},1032,["class","label"]))),128))]),_:1})]),_:1},8,["title","onConfirm"]),s(u,{ref:"menuModalDialogRef",title:"\u7F16\u8F91\u83DC\u5355\u6743\u9650",onConfirm:e.onMenuConfirm},{content:r(()=>[s(t,{"tree-data":e.menuData,checkable:"",expandedKeys:e.defaultExpandedKeys,"onUpdate:expandedKeys":a[0]||(a[0]=o=>e.defaultExpandedKeys=o),checkedKeys:e.defaultCheckedKeys,"onUpdate:checkedKeys":a[1]||(a[1]=o=>e.defaultCheckedKeys=o)},null,8,["tree-data","expandedKeys","checkedKeys"])]),_:1},8,["onConfirm"])])}var je=ce(Fe,[["render",ke]]);export{je as default};