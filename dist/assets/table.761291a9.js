import{as as r,b as o,x as f}from"./vendor.62cbb9fe.js";const b=async function(e){return new Promise(t=>{setTimeout(()=>{var i,c;const n=((i=document.querySelector(".main-section"))==null?void 0:i.getBoundingClientRect().height)||0,a=((c=document.querySelector(".ant-table-header"))==null?void 0:c.getBoundingClientRect().height)||0;if(e){let s=a;e.refs.tableHeaderRef&&(s+=e.refs.tableHeaderRef.$el.clientHeight),e.refs.tableFooterRef&&(s+=45),t(n-s)}t(150)},500)})},m=function(){const e=r([]),t=o(null),n=o(null),a=o(200),i=o(!1),c=o(!1),s=o(!0);return{dataList:e,tableHeaderRef:t,tableFooterRef:n,tableHeight:a,bordered:i,striped:c,tableLoading:s,handleSuccess:({data:l=[]})=>(s.value=!1,e.length=0,e.push(...l),Promise.resolve(l)),useTableColumn:g,selectionColumn:{type:"selection"},indexColumn:d()}},p=function(e){return function(t){return t[e]}},C=function(){const e=o([]);return{selectedRowKeys:e,onSelectChange:n=>{e.value=n}}},g=function(e,t={}){return e.map(n=>Object.assign(n,t))},d=function(){return{title:"\u5E8F\u53F7",key:"index",width:80}},R=function(e){function t(){e()}const n=f({page:1,pageSize:10,showSizePicker:!0,pageCount:1,pageSizes:["10","20","30","40"],onChange:t,setTotalSize(a){n.pageCount=a}});return n};export{g as a,C as b,p as c,R as d,b as e,m as u};