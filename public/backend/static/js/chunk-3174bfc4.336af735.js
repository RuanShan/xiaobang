(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3174bfc4"],{"201b":function(e,o,n){"use strict";n.r(o);var t=function(){var e=this,o=e.$createElement,n=e._self._c||o;return n("div",{staticClass:"form-container"},[n("Form",{on:{submit:e.handleSubmit}})],1)},a=[],l=(n("63ff"),n("e71e")),c=n("d96b"),s=n("238a"),i=n("b435"),r="/api/backend/photos/ztoupiao/create",u={components:{Form:s["a"]},props:{command:{default:!1}},data:function(){return{dialogImageUrl:"",dialogVisible:!1,image:{},postData:{name:"",desc:"",content:"",title:"",term:""},termList:[],newUploads:[]}},watch:{newUploads:function(e,o){console.log("watch-newUploads new: %s, old: %s",e,o)}},created:function(){var e=this;Object(c["o"])().then(function(){var o=Object(l["a"])(regeneratorRuntime.mark(function o(n){return regeneratorRuntime.wrap(function(o){while(1)switch(o.prev=o.next){case 0:console.log("res----:",n),e.termList=n;case 2:case"end":return o.stop()}},o)}));return function(e){return o.apply(this,arguments)}}())},methods:{handleUpload:function(e){var o=e.file,n=r+"?token="+this.$store.getters.token;console.log("handleDirectUpload option= ",e,n);var t=new i["a"](o,n,e,function(o){e.onSuccess(null,e.file)});console.log("uploader=",t),t.upload()},handleUploadSuccess:function(e,o,n){console.log("------------------handleUploadSuccess--------------------"),console.log(e,o,n)},handleRemove:function(e,o){console.log(e,o)},handlePictureCardPreview:function(e){console.log("file---:",e),this.dialogImageUrl=e.url,this.dialogVisible=!0},handleSubmit:function(e){var o=this;console.log("============handleSubmit============="),console.log("postData=====:",e),Object(c["b"])(e).then(function(e){console.log("res----:",e);var n=e.id;o.$router.push("/post/edit/"+n)})}}},d=u,f=(n("b645"),n("6691")),p=Object(f["a"])(d,t,a,!1,null,"82a871ea",null);o["default"]=p.exports},b645:function(e,o,n){"use strict";var t=n("f23f"),a=n.n(t);a.a},f23f:function(e,o,n){}}]);