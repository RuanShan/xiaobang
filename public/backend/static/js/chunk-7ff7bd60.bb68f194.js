(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7ff7bd60"],{"0cf6":function(e,t,r){"use strict";r.d(t,"a",function(){return s});r("7364");var n=r("98d4"),a=r("ab1f"),i=r("b0db"),o=r.n(i),c=File.prototype.slice||File.prototype.mozSlice||File.prototype.webkitSlice,s=function(){function e(t){Object(n["a"])(this,e),this.file=t,this.chunkSize=2097152,this.chunkCount=Math.ceil(this.file.size/this.chunkSize),this.chunkIndex=0}return Object(a["a"])(e,null,[{key:"create",value:function(t,r){var n=new e(t);n.create(r)}}]),Object(a["a"])(e,[{key:"create",value:function(e){var t=this;this.callback=e,this.md5Buffer=new o.a.ArrayBuffer,this.fileReader=new FileReader,this.fileReader.addEventListener("load",function(e){return t.fileReaderDidLoad(e)}),this.fileReader.addEventListener("error",function(e){return t.fileReaderDidError(e)}),this.readNextChunk()}},{key:"fileReaderDidLoad",value:function(e){if(this.md5Buffer.append(e.target.result),!this.readNextChunk()){var t=this.md5Buffer.end(!0),r=btoa(t);this.callback(null,r)}}},{key:"fileReaderDidError",value:function(e){this.callback("Error reading ".concat(this.file.name))}},{key:"readNextChunk",value:function(){if(this.chunkIndex<this.chunkCount||0===this.chunkIndex&&0===this.chunkCount){var e=this.chunkIndex*this.chunkSize,t=Math.min(e+this.chunkSize,this.file.size),r=c.call(this.file,e,t);return this.fileReader.readAsArrayBuffer(r),this.chunkIndex++,!0}return!1}}]),e}()},"601d":function(e,t,r){"use strict";r.d(t,"a",function(){return i});r("7364");var n=r("98d4"),a=r("ab1f"),i=function(){function e(t,r){var a=this;Object(n["a"])(this,e),this.file=t;var i=r.url,o=r.headers;for(var c in this.xhr=new XMLHttpRequest,this.xhr.open("PUT",i,!0),this.xhr.responseType="text",o)this.xhr.setRequestHeader(c,o[c]);this.xhr.addEventListener("load",function(e){return a.requestDidLoad(e)}),this.xhr.addEventListener("error",function(e){return a.requestDidError(e)})}return Object(a["a"])(e,[{key:"create",value:function(e){this.callback=e,this.xhr.send(this.file.slice())}},{key:"requestDidLoad",value:function(e){var t=this.xhr,r=t.status,n=t.response;r>=200&&r<300?this.callback(null,n):this.requestDidError(e)}},{key:"requestDidError",value:function(e){this.callback('Error storing "'.concat(this.file.name,'". Status: ').concat(this.xhr.status))}}]),e}()},7593:function(e,t,r){"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var n=Object.getOwnPropertySymbols,a=Object.prototype.hasOwnProperty,i=Object.prototype.propertyIsEnumerable;function o(e){if(null===e||void 0===e)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(e)}function c(){try{if(!Object.assign)return!1;var e=new String("abc");if(e[5]="de","5"===Object.getOwnPropertyNames(e)[0])return!1;for(var t={},r=0;r<10;r++)t["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(t).map(function(e){return t[e]});if("0123456789"!==n.join(""))return!1;var a={};return"abcdefghijklmnopqrst".split("").forEach(function(e){a[e]=e}),"abcdefghijklmnopqrst"===Object.keys(Object.assign({},a)).join("")}catch(i){return!1}}e.exports=c()?Object.assign:function(e,t){for(var r,c,s=o(e),u=1;u<arguments.length;u++){for(var l in r=Object(arguments[u]),r)a.call(r,l)&&(s[l]=r[l]);if(n){c=n(r);for(var f=0;f<c.length;f++)i.call(r,c[f])&&(s[c[f]]=r[c[f]])}}return s}},"9e32":function(e,t,r){"use strict";var n=r("c39e"),a=r("7593");function i(e){switch(e.arrayFormat){case"index":return function(t,r,n){return null===r?[c(t,e),"[",n,"]"].join(""):[c(t,e),"[",c(n,e),"]=",c(r,e)].join("")};case"bracket":return function(t,r){return null===r?c(t,e):[c(t,e),"[]=",c(r,e)].join("")};default:return function(t,r){return null===r?c(t,e):[c(t,e),"=",c(r,e)].join("")}}}function o(e){var t;switch(e.arrayFormat){case"index":return function(e,r,n){t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),t?(void 0===n[e]&&(n[e]={}),n[e][t[1]]=r):n[e]=r};case"bracket":return function(e,r,n){t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),t?void 0!==n[e]?n[e]=[].concat(n[e],r):n[e]=[r]:n[e]=r};default:return function(e,t,r){void 0!==r[e]?r[e]=[].concat(r[e],t):r[e]=t}}}function c(e,t){return t.encode?t.strict?n(e):encodeURIComponent(e):e}function s(e){return Array.isArray(e)?e.sort():"object"===typeof e?s(Object.keys(e)).sort(function(e,t){return Number(e)-Number(t)}).map(function(t){return e[t]}):e}t.extract=function(e){return e.split("?")[1]||""},t.parse=function(e,t){t=a({arrayFormat:"none"},t);var r=o(t),n=Object.create(null);return"string"!==typeof e?n:(e=e.trim().replace(/^(\?|#|&)/,""),e?(e.split("&").forEach(function(e){var t=e.replace(/\+/g," ").split("="),a=t.shift(),i=t.length>0?t.join("="):void 0;i=void 0===i?null:decodeURIComponent(i),r(decodeURIComponent(a),i,n)}),Object.keys(n).sort().reduce(function(e,t){var r=n[t];return Boolean(r)&&"object"===typeof r&&!Array.isArray(r)?e[t]=s(r):e[t]=r,e},Object.create(null))):n)},t.stringify=function(e,t){var r={encode:!0,strict:!0,arrayFormat:"none"};t=a(r,t);var n=i(t);return e?Object.keys(e).sort().map(function(r){var a=e[r];if(void 0===a)return"";if(null===a)return c(r,t);if(Array.isArray(a)){var i=[];return a.slice().forEach(function(e){void 0!==e&&i.push(n(r,e,i.length))}),i.join("&")}return c(r,t)+"="+c(a,t)}).filter(function(e){return e.length>0}).join("&"):""}},c39e:function(e,t,r){"use strict";e.exports=function(e){return encodeURIComponent(e).replace(/[!'()*]/g,function(e){return"%"+e.charCodeAt(0).toString(16).toUpperCase()})}},d4a4:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:e.command,expression:"command"}],staticClass:"addNewBox",staticStyle:{padding:"10px"}},[r("el-form",{ref:"form",attrs:{model:e.termData,"label-width":"80px"}},[r("el-form-item",{attrs:{label:"名称"}},[r("el-input",{model:{value:e.termData.name,callback:function(t){e.$set(e.termData,"name",t)},expression:"termData.name"}})],1),e._v(" "),r("el-form-item",[r("label",{attrs:{slot:"label"},slot:"label"},[e._v("别名\n        "),r("el-tooltip",{staticClass:"item",attrs:{effect:"light",content:"“别名”是在URL中使用的别称，它可以令URL更美观。通常使用小写，只能包含字母，数字和连字符（-）。",placement:"bottom"}},[r("i",{staticClass:"el-icon-question"})])],1),e._v(" "),r("el-input",{attrs:{placeholder:"URL中使用的别称"},model:{value:e.termData.slug,callback:function(t){e.$set(e.termData,"slug",t)},expression:"termData.slug"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"描述"}},[r("el-input",{attrs:{type:"textarea"},model:{value:e.termData.desc,callback:function(t){e.$set(e.termData,"desc",t)},expression:"termData.desc"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"上级分类"}},[r("el-select",{attrs:{placeholder:"请选择分类"},model:{value:e.termData.term,callback:function(t){e.$set(e.termData,"term",t)},expression:"termData.term"}},e._l(e.termList,function(e){return r("el-option",{key:e.id,attrs:{label:e.name,value:e.id}})}),1)],1),e._v(" "),r("el-form-item",[r("el-button",{attrs:{type:"primary"},on:{click:e.post_msg}},[e._v("立即创建")]),e._v(" "),r("el-button",[e._v("取消")])],1)],1)],1)},a=[],i=(r("7364"),r("63ff"),r("e71e")),o=r("cdad"),c=r.n(o),s=(r("debc"),r("9e32"),r("d96b")),u=r("8256"),l={components:{Tinymce:u["a"]},props:{command:{default:!1}},data:function(){return{albumData:{name:"",desc:"",Photos:[]},filelist:[],fileToDelete:[],termData:{name:"",slug:"",parent:null,desc:"",term:""},termList:[],account:"",password:""}},watch:{command:function(e,t){var r=this;Object(s["o"])().then(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("res----:",t),r.termList=t;case 2:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())}},created:function(){var e=this;Object(s["o"])().then(function(){var t=Object(i["a"])(regeneratorRuntime.mark(function t(r){return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:console.log("res----:",r),e.termList=r;case 2:case"end":return t.stop()}},t)}));return function(e){return t.apply(this,arguments)}}())},methods:{post_msg:function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){var r,n,a,o,u,l;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("========post_msg========"),c.a.form.validate("#form",function(e){},{regexp:{VCODE:/^.{4}$/}}),r=!0,n=this.termData.name,a=this.termData.slug,o=this.termData.desc,u=this.termData.term,""===n&&(c.a.form.showErrorTips({ele:n,msg:"termData名不能为空"}),r=!1),r&&(l={name:n,slug:a,desc:o,parent:u},Object(s["c"])(l).then(function(){var e=Object(i["a"])(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:console.log("res----:",t);case 1:case"end":return e.stop()}},e)}));return function(t){return e.apply(this,arguments)}}())),this.$emit("refresh"),this.termData={name:"",slug:"",parent:null,desc:"",term:""};case 11:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}()}},f=l,d=r("6691"),h=Object(d["a"])(f,n,a,!1,null,null,null);t["default"]=h.exports},e474:function(e,t,r){"use strict";r.d(t,"b",function(){return i}),r.d(t,"c",function(){return o}),r.d(t,"a",function(){return c});var n=r("7dfd"),a="/gapi/album",i=function(e,t){return Object(n["a"])(a+"/"+e+"/getPoster",t,"POST")},o=function(e,t){return Object(n["a"])(a+"/"+e+"/modifyPoster",t,"POST")},c=function(e,t){return Object(n["a"])(a+"/"+e+"/createDesc",t,"POST")}}}]);