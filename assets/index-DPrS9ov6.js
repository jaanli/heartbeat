(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))a(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&a(o)}).observe(document,{childList:!0,subtree:!0});function e(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function a(n){if(n.ep)return;n.ep=!0;const i=e(n);fetch(n.href,i)}})();var k=k||{};k.Array=class{constructor(s){if(s){const t=new k.Reader(s),e=[147,78,85,77,80,89];if(!t.bytes(6).every((o,d)=>o==e[d]))throw new k.Error("Invalid signature.");const a=t.byte(),n=t.byte();if(a!==1&&n!==0)throw new k.Error("Invalid version '"+[a,n].join(".")+"'.");const i=JSON.parse(t.string().trim().replace(/'/g,'"').replace("False","false").replace("(","[").replace(/,*\),*/g,"]"));if(i.fortran_order)throw new k.Error("Fortran order is not supported.'");if(!i.descr||i.descr.length<2)throw new k.Error("Missing property 'descr'.");if(!i.shape)throw new k.Error("Missing property 'shape'.");switch(this._shape=i.shape,this._byteOrder=i.descr[0],this._byteOrder){case"|":{this._dataType=i.descr.substring(1),this._data=t.bytes(t.size-t.position);break}case">":case"<":{if(i.descr.length!==3)throw new k.Error("Unsupported data type '"+i.descr+"'.");this._dataType=i.descr.substring(1);const o=parseInt(i.descr[2],10)*this._shape.reduce((d,l)=>d*l,1);this._data=t.bytes(o);break}default:throw new k.Error("Unsupported data type '"+i.descr+"'.")}}}get data(){return this._data}set data(s){this._data=s}get dataType(){return this._dataType}set dataType(s){this._dataType=s}get shape(){return this._shape}set shape(s){this._shape=s}get byteOrder(){return this._byteOrder}set byteOrder(s){this._byteOrder=s}toBuffer(){const s=new k.Writer;s.bytes([147,78,85,77,80,89]),s.byte(1),s.byte(0);const t={itemSize:1,position:0,dataType:this._dataType,byteOrder:this._byteOrder||"<",shape:this._shape,descr:""};if(t.byteOrder!=="<"&&t.byteOrder!==">")throw new k.Error("Unknown byte order '"+this._byteOrder+"'.");if(t.dataType.length!==2||t.dataType[0]!=="f"&&t.dataType[0]!=="i"&&t.dataType[0]!=="u")throw new k.Error("Unsupported data type '"+this._dataType+"'.");t.itemSize=parseInt(t.dataType[1],10);let e="";switch(this._shape.length){case 0:throw new k.Error("Invalid shape.");case 1:e="("+this._shape[0].toString()+",)";break;default:e="("+this._shape.map(o=>o.toString()).join(", ")+")";break}let n="{ "+["'descr': '"+t.byteOrder+t.dataType+"'","'fortran_order': False","'shape': "+e].join(", ")+" }";n+=" ".repeat(16-(n.length+2+8+1&15))+`
`,s.string(n);const i=t.itemSize*this._shape.reduce((o,d)=>o*d);return t.data=new Uint8Array(i),t.view=new DataView(t.data.buffer,t.data.byteOffset,i),k.Array._encodeDimension(t,this._data,0),s.bytes(t.data),s.toBuffer()}static _encodeDimension(s,t,e){const a=s.shape[e],n=s.byteOrder==="<";if(e==s.shape.length-1)for(let i=0;i<a;i++){switch(s.dataType){case"f2":s.view.setFloat16(s.position,t[i],n);break;case"f4":s.view.setFloat32(s.position,t[i],n);break;case"f8":s.view.setFloat64(s.position,t[i],n);break;case"i1":s.view.setInt8(s.position,t[i],n);break;case"i2":s.view.setInt16(s.position,t[i],n);break;case"i4":s.view.setInt32(s.position,t[i],n);break;case"i8":s.view.setInt64(s.position,t[i],n);break;case"u1":s.view.setUint8(s.position,t[i],n);break;case"u2":s.view.setUint16(s.position,t[i],n);break;case"u4":s.view.setUint32(s.position,t[i],n);break;case"u8":s.view.setUint64(s.position,t[i],n);break}s.position+=s.itemSize}else for(let i=0;i<a;i++)k.Array._encodeDimension(s,t[i],e+1)}};k.Reader=class{constructor(s){this._buffer=s,this._position=0}get position(){return this._position}get size(){return this._buffer.length}byte(){return this._buffer[this._position++]}bytes(s){const t=this._buffer.slice(this._position,this._position+s);return this._position+=s,t}uint16(){return this.byte()|this.byte()<<8}string(){const s=this.uint16();let t="";for(let e=0;e<s;e++)t+=String.fromCharCode(this.byte());return t}};k.Writer=class{constructor(){this._length=0,this._head=null,this._tail=null}byte(s){this.bytes([s])}uint16(s){this.bytes([s&255,s>>8&255])}bytes(s){const t=new Uint8Array(s.length);for(let e=0;e<s.length;e++)t[e]=s[e];this._write(t)}string(s){this.uint16(s.length);const t=new Uint8Array(s.length);for(let e=0;e<s.length;e++)t[e]=s.charCodeAt(e);this._write(t)}_write(s){const t={buffer:s,next:null};this._tail?this._tail.next=t:this._head=t,this._tail=t,this._length+=t.buffer.length}toBuffer(){const s=new Uint8Array(this._length);let t=0,e=this._head;for(;e!=null;)s.set(e.buffer,t),t+=e.buffer.length,e=e.next;return s}};k.Error=class extends Error{constructor(s){super(s),this.name="NumPy Error"}};async function ct(s,t,e){let a="",n="";s==="done"?n=`<svg class='prog_list_icon' viewbox='0 0 24 24'>
                    <path class='st0' d='M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 1.5c-5.2 0-9.5-4.3-9.5-9.5S6.8 2.5 12 2.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z'></path>
                    <path class='st0' d='M11.1 12.9l-1.2-1.1c-.4-.3-.9-.3-1.3 0-.3.3-.4.8-.1 1.1l.1.1 1.8 1.6c.1.1.4.3.7.3.2 0 .5-.1.7-.3l3.6-4.1c.3-.3.4-.8.1-1.1l-.1-.1c-.4-.3-1-.3-1.3 0l-3 3.6z'></path>
                  </svg>`:s==="current"?n=`<svg class='prog_list_icon prog_list_icon-${t}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12.2 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 1.377a9.377 9.377 0 1 1 0-18.754 9.377 9.377 0 0 1 0 18.754zm-4-8a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754z' fill='#006DFF' fill-rule='evenodd'></path>
                </svg>`:n=`<svg class='prog_list_icon prog_list_icon-${e}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12 16.1c1.8 0 3.3-1.4 3.3-3.2 0-1.8-1.5-3.2-3.3-3.2s-3.3 1.4-3.3 3.2c0 1.7 1.5 3.2 3.3 3.2zm0 1.7c-2.8 0-5-2.2-5-4.9S9.2 8 12 8s5 2.2 5 4.9-2.2 4.9-5 4.9z'></path>
                </svg>`;let i="";t==="done"?i=`<svg class='prog_list_icon' viewbox='0 0 24 24'>
                    <path class='st0' d='M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 1.5c-5.2 0-9.5-4.3-9.5-9.5S6.8 2.5 12 2.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z'></path>
                    <path class='st0' d='M11.1 12.9l-1.2-1.1c-.4-.3-.9-.3-1.3 0-.3.3-.4.8-.1 1.1l.1.1 1.8 1.6c.1.1.4.3.7.3.2 0 .5-.1.7-.3l3.6-4.1c.3-.3.4-.8.1-1.1l-.1-.1c-.4-.3-1-.3-1.3 0l-3 3.6z'></path>
                  </svg>`:t==="current"?i=`<svg class='prog_list_icon prog_list_icon-${t}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12.2 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 1.377a9.377 9.377 0 1 1 0-18.754 9.377 9.377 0 0 1 0 18.754zm-4-8a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754z' fill='#006DFF' fill-rule='evenodd'></path>
                </svg>`:i=`<svg class='prog_list_icon prog_list_icon-${e}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12 16.1c1.8 0 3.3-1.4 3.3-3.2 0-1.8-1.5-3.2-3.3-3.2s-3.3 1.4-3.3 3.2c0 1.7 1.5 3.2 3.3 3.2zm0 1.7c-2.8 0-5-2.2-5-4.9S9.2 8 12 8s5 2.2 5 4.9-2.2 4.9-5 4.9z'></path>
                </svg>`;let o="";e==="done"?o=`<svg class='prog_list_icon' viewbox='0 0 24 24'>
                    <path class='st0' d='M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8zm0 1.5c-5.2 0-9.5-4.3-9.5-9.5S6.8 2.5 12 2.5s9.5 4.3 9.5 9.5-4.3 9.5-9.5 9.5z'></path>
                    <path class='st0' d='M11.1 12.9l-1.2-1.1c-.4-.3-.9-.3-1.3 0-.3.3-.4.8-.1 1.1l.1.1 1.8 1.6c.1.1.4.3.7.3.2 0 .5-.1.7-.3l3.6-4.1c.3-.3.4-.8.1-1.1l-.1-.1c-.4-.3-1-.3-1.3 0l-3 3.6z'></path>
                  </svg>`:e==="current"?o=`<svg class='prog_list_icon prog_list_icon-${t}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12.2 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm0 1.377a9.377 9.377 0 1 1 0-18.754 9.377 9.377 0 0 1 0 18.754zm-4-8a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754zm4 0a1.377 1.377 0 1 1 0-2.754 1.377 1.377 0 0 1 0 2.754z' fill='#006DFF' fill-rule='evenodd'></path>
                </svg>`:o=`<svg class='prog_list_icon prog_list_icon-${e}' width='24' height='24' viewbox='0 0 24 24'>
                  <path d='M12 16.1c1.8 0 3.3-1.4 3.3-3.2 0-1.8-1.5-3.2-3.3-3.2s-3.3 1.4-3.3 3.2c0 1.7 1.5 3.2 3.3 3.2zm0 1.7c-2.8 0-5-2.2-5-4.9S9.2 8 12 8s5 2.2 5 4.9-2.2 4.9-5 4.9z'></path>
                </svg>`,a=`
      <nav class='prog'>
        <ul class='prog_list'>
          <li class='prog prog-${s}'>
            ${n}<span class='prog_list_title'>Model loading</span>
          </li>
          <li class='prog prog-${t}'>
            ${i}<span class='prog_list_title'>Model building</span>
          </li>
          <li class='prog prog-${e}'>
            ${o}<span class='prog_list_title'>Model inferencing</span>
          </li>
        </ul>
      </nav>
    `,$("#progressmodel").show(),$("#progressstep").html(a),$(".shoulddisplay").hide(),$(".icdisplay").hide(),await new Promise(d=>setTimeout(d,100))}function Et(){$("#progressmodel").hide(),$(".icdisplay").show(),$(".shoulddisplay").show()}function Nt(s,t=!0){for(const e of s)t?($(e).addClass("clickDisabled"),e.startsWith(".btn")&&$(e).addClass("styleDisabled")):($(e).removeClass("clickDisabled"),e.startsWith(".btn")&&$(e).removeClass("styleDisabled"))}function ft(s,t="warning"){let e="alert-warning";if(t==="info"&&(e="alert-info",$(".alert-info").length)){$(".alert-info > span").html(s);return}$("<div>",{class:`alert ${e} alert-dismissible fade show mt-3`,role:"alert",html:`<span>${s}</span>`}).append($("<button>",{type:"button",class:"close","data-dismiss":"alert","aria-label":"close",html:'<span aria-hidden="true">&times;</span>'})).insertBefore($("#container").children()[0])}function xt(){return location.hostname.toLowerCase().indexOf("github.io")>-1?"https://jaanli.github.io/heartbeat":"../heartbeat"}function Ut(s){return s.reduce((t,e)=>t*e)}const Qt=function(){const s=new Float32Array(1),t=new Int32Array(s.buffer);return function(a){s[0]=a;const n=t[0];let i=n>>16&32768,o=n>>12&2047;const d=n>>23&255;return d<103?i:d>142?(i|=31744,i|=(d==255?0:1)&&n&8388607,i):d<113?(o|=2048,i|=(o>>114-d)+(o>>113-d&1),i):(i|=d-112<<10|o>>1,i+=o&1,i)}}();async function E(s,t,e="float32"){const a=new Map([["f2",{type:"float16",array:Uint16Array}],["f4",{type:"float32",array:Float32Array}],["f8",{type:"float64",array:Float64Array}],["i1",{type:"int8",array:Int8Array}],["i2",{type:"int16",array:Int16Array}],["i4",{type:"int32",array:Int32Array}],["i8",{type:"int64",array:BigInt64Array}],["u1",{type:"uint8",array:Uint8Array}],["u2",{type:"uint16",array:Uint16Array}],["u4",{type:"uint32",array:Uint32Array}],["u8",{type:"uint64",array:BigUint64Array}]]),i=await(await fetch(t)).arrayBuffer(),o=new k.Array(new Uint8Array(i));if(!a.has(o.dataType))throw new Error(`Data type ${o.dataType} is not supported.`);const d=o.shape;let l=a.get(o.dataType).type;const c=a.get(o.dataType).array,u=new Uint8Array(o.data.buffer).slice();let r=new c(u.buffer);if(l==="float32"&&e==="float16"){const b=new Uint16Array(r.length);for(let f=0;f<r.length;++f)b[f]=Qt(r[f]);r=b,l=e}else if(l!==e)throw new Error(`Conversion from ${o.dataType} to ${e} is not supported.`);return s.constant({dataType:l,dimensions:d,shape:d},r)}function te(s){const t=document.createElement("canvas");return t.width=s.videoWidth,t.height=s.videoHeight,t.getContext("2d").drawImage(s,0,0,t.width,t.height),t}async function ee(){const s={audio:!1,video:{facingMode:"user"}};return await navigator.mediaDevices.getUserMedia(s)}function se(s,t){cancelAnimationFrame(s),t&&t.getTracks().forEach(e=>{e.readyState==="live"&&e.kind==="video"&&e.stop()})}function zt(s,t){const e=t.inputShape,a=new Float32Array(e.slice(1).reduce((w,m)=>w*m));s.width=s.videoWidth||s.naturalWidth,s.height=s.videoHeight||s.naturalHeight;let[n,i,o]=e.slice(1);const d=t.mean||[0,0,0,0],l=t.std||[1,1,1,1],c=t.norm||!1,h=t.channelScheme||"RGB",u=t.scaledFlag||!1,r=t.inputLayout,b=4,f=t.drawOptions;r==="nhwc"&&([i,o,n]=e.slice(1));const p=document.createElement("canvas");p.width=o,p.height=i;const _=p.getContext("2d");if(f)_.drawImage(s,f.sx,f.sy,f.sWidth,f.sHeight,0,0,f.dWidth,f.dHeight);else if(u){const w=Math.max(Math.max(s.width/o,s.height/i),1),m=Math.floor(s.width/w),v=Math.floor(s.height/w);_.drawImage(s,0,0,m,v)}else _.drawImage(s,0,0,o,i);let g=_.getImageData(0,0,o,i).data;c&&(g=new Float32Array(g).map(w=>w/255));for(let w=0;w<n;++w)for(let m=0;m<i;++m)for(let v=0;v<o;++v){let y;h==="BGR"?y=g[m*o*b+v*b+(n-w-1)]:y=g[m*o*b+v*b+w],r==="nchw"?a[w*o*i+m*o+v]=(y-d[w])/l[w]:a[m*o*n+v*n+w]=(y-d[w])/l[w]}return a}function ie(s){return s=s.sort((t,e)=>t-e),s.length%2!==0?s[Math.floor(s.length/2)]:(s[s.length/2-1]+s[s.length/2])/2}function ne(){const s=new URLSearchParams(location.search);let t=s.get("numRuns");t=t===null?1:parseInt(t),t<1&&(ft("Ignore the url param: 'numRuns', its value must be >= 1."),t=1);let e=s.get("powerPreference");e&&!["default","high-performance","low-power"].includes(e)&&(ft("Ignore the url param: 'powerPreference', its value must be one of {'default', 'high-performance', 'low-power'}."),e=null);let n=s.get("numThreads");return n!=null&&(n=parseInt(n),(!Number.isInteger(n)||n<0)&&(ft("Ignore the url param: 'numThreads', its value must be an integer and not less than 0."),n=null)),[t,e,n]}async function Gt(){return typeof MLGraphBuilder<"u"?!(await navigator.ml.createContext()).tf:!1}function ae(){return"Your browser does not support WebNN."}function oe(){return'Your browser does not support WebNN. Please refer to <a href="https://github.com/webmachinelearning/webnn-samples/#webnn-installation-guides">WebNN Installation Guides</a> for more details.'}function Wt(s,t,e,a,n){let i;{const c=(Math.ceil(t/a)-1)*a+e;i=c>t?c-t:0}let o,d;switch(s){case"same-upper":o=Math.floor(i/2),d=Math.floor((i+1)/2);break;case"same-lower":o=Math.floor((i+1)/2),d=Math.floor(i/2);break;default:throw new Error("The autoPad is invalid.")}return[o,d]}function Lt(s,t,e,a,n){const[i,o]=s,[d,l]=t,[c,h]=e||[1,1],[u,r]=a||[1,1],b=(d-1)*u+1,f=(l-1)*r+1,[p,_]=Wt(n,i,b,c),[g,w]=Wt(n,o,f,h);return[p,_,g,w]}function le(s){if(s.indexOf("cpu")!=-1)return"nhwc";if(s.indexOf("gpu")!=-1||s.indexOf("npu")!=-1)return"nchw"}const Z=[2,2],x="same-upper";class re{constructor(){this.context_=null,this.builder_=null,this.graph_=null,this.inputTensor_=null,this.outputTensor_=null,this.weightsUrl_=xt()+"/test-data/models/facenet_nhwc/weights",this.inputOptions={mean:[127.5,127.5,127.5,127.5],std:[127.5,127.5,127.5,127.5],channelScheme:"BGR",inputLayout:"nhwc",inputShape:[1,160,160,3]},this.postOptions={distanceMetric:"euclidean",threshold:1.26},this.outputShape_=[1,512]}async buildConv_(t,e,a=void 0,n=!0){const i=`${this.weightsUrl_}/${e}_kernel.npy`,o=`${this.weightsUrl_}/${e}_Conv2D_bias.npy`,[d,l]=await Promise.all([i,o].map(h=>E(this.builder_,h)));a!==void 0?(a.inputLayout="nhwc",a.filterLayout="ohwi",a.bias=l):a={inputLayout:"nhwc",filterLayout:"ohwi",bias:l},t=await t,a.autoPad=="same-upper"&&(a.padding=Lt([t.shape()[1],t.shape()[2]],[d.shape()[1],d.shape()[2]],a.strides,a.dilations,a.autoPad));const c=this.builder_.conv2d(t,d,a);return n?this.builder_.relu(c):c}async buildBlock35_(t,e){const a=this.buildConv_(t,`Block35_${e}_Branch_0_Conv2d_1x1`,{autoPad:x}),n=this.buildConv_(t,`Block35_${e}_Branch_1_Conv2d_0a_1x1`,{autoPad:x}),i=this.buildConv_(n,`Block35_${e}_Branch_1_Conv2d_0b_3x3`,{autoPad:x}),o=this.buildConv_(t,`Block35_${e}_Branch_2_Conv2d_0a_1x1`,{autoPad:x}),d=this.buildConv_(o,`Block35_${e}_Branch_2_Conv2d_0b_3x3`,{autoPad:x}),l=this.buildConv_(d,`Block35_${e}_Branch_2_Conv2d_0c_3x3`,{autoPad:x}),c=Promise.all([a,i,l]).then(u=>this.builder_.concat(u,3)),h=this.buildConv_(c,`Block35_${e}_Conv2d_1x1`,{autoPad:x},!1);return this.builder_.relu(this.builder_.add(await t,await h))}async buildBlock17_(t,e){const a=this.buildConv_(t,`Block17_${e}_Branch_0_Conv2d_1x1`,{autoPad:x}),n=this.buildConv_(t,`Block17_${e}_Branch_1_Conv2d_0a_1x1`,{autoPad:x}),i=this.buildConv_(n,`Block17_${e}_Branch_1_Conv2d_0b_1x7`,{autoPad:x}),o=this.buildConv_(i,`Block17_${e}_Branch_1_Conv2d_0c_7x1`,{autoPad:x}),d=Promise.all([a,o]).then(c=>this.builder_.concat(c,3)),l=this.buildConv_(d,`Block17_${e}_Conv2d_1x1`,{autoPad:x},!1);return this.builder_.relu(this.builder_.add(await t,await l))}async buildBlock8_(t,e,a=!0){const n=this.buildConv_(t,`Block8_${e}_Branch_0_Conv2d_1x1`,{autoPad:x}),i=this.buildConv_(t,`Block8_${e}_Branch_1_Conv2d_0a_1x1`,{autoPad:x}),o=this.buildConv_(i,`Block8_${e}_Branch_1_Conv2d_0b_1x3`,{autoPad:x}),d=this.buildConv_(o,`Block8_${e}_Branch_1_Conv2d_0c_3x1`,{autoPad:x}),l=Promise.all([n,d]).then(u=>this.builder_.concat(u,3)),c=this.buildConv_(l,`Block8_${e}_Conv2d_1x1`,{autoPad:x},!1);let h=this.builder_.add(await t,await c);return a&&(h=this.builder_.relu(h)),h}async buildFullyConnected_(t){const e=E(this.builder_,`${this.weightsUrl_}/Bottleneck_kernel_transpose.npy`),a=E(this.builder_,`${this.weightsUrl_}/Bottleneck_MatMul_bias.npy`);t=this.builder_.reshape(await t,[1,1792]);const n={aTranspose:!1,bTranspose:!0,c:await a};return this.builder_.gemm(t,await e,n)}async load(t){this.context_=await navigator.ml.createContext(t),this.builder_=new MLGraphBuilder(this.context_);const e={dataType:"float32",dimensions:this.inputOptions.inputShape,shape:this.inputOptions.inputShape},a=this.builder_.input("input",e);e.usage=MLTensorUsage.WRITE,this.inputTensor_=await this.context_.createTensor(e),this.outputTensor_=await this.context_.createTensor({dataType:"float32",dimensions:this.outputShape_,shape:this.outputShape_,usage:MLTensorUsage.READ});const n={windowDimensions:[3,3],strides:Z,layout:"nhwc"},i=this.buildConv_(a,"Conv2d_1a_3x3",{strides:Z}),o=this.buildConv_(i,"Conv2d_2a_3x3"),l=this.buildConv_(o,"Conv2d_2b_3x3",{autoPad:x}).then(P=>this.builder_.maxPool2d(P,n)),c=this.buildConv_(l,"Conv2d_3b_1x1"),h=this.buildConv_(c,"Conv2d_4a_3x3"),u=this.buildConv_(h,"Conv2d_4b_3x3",{strides:Z}),r=this.buildBlock35_(u,1),b=this.buildBlock35_(r,2),f=this.buildBlock35_(b,3),p=this.buildBlock35_(f,4),_=this.buildBlock35_(p,5),g=this.buildConv_(_,"Mixed_6a_Branch_0_Conv2d_1a_3x3",{strides:Z}),w=_.then(P=>this.builder_.maxPool2d(P,n)),m=this.buildConv_(_,"Mixed_6a_Branch_1_Conv2d_0a_1x1",{autoPad:x}),v=this.buildConv_(m,"Mixed_6a_Branch_1_Conv2d_0b_3x3",{autoPad:x}),y=this.buildConv_(v,"Mixed_6a_Branch_1_Conv2d_1a_3x3",{strides:Z}),C=Promise.all([g,y,w]).then(P=>this.builder_.concat(P,3)),B=this.buildBlock17_(C,1),M=this.buildBlock17_(B,2),L=this.buildBlock17_(M,3),T=this.buildBlock17_(L,4),U=this.buildBlock17_(T,5),V=this.buildBlock17_(U,6),I=this.buildBlock17_(V,7),G=this.buildBlock17_(I,8),K=this.buildBlock17_(G,9),A=this.buildBlock17_(K,10),R=A.then(P=>this.builder_.maxPool2d(P,n)),J=this.buildConv_(A,"Mixed_7a_Branch_0_Conv2d_0a_1x1",{autoPad:x}),Y=this.buildConv_(J,"Mixed_7a_Branch_0_Conv2d_1a_3x3",{strides:Z}),X=this.buildConv_(A,"Mixed_7a_Branch_1_Conv2d_0a_1x1",{autoPad:x}),O=this.buildConv_(X,"Mixed_7a_Branch_1_Conv2d_1a_3x3",{strides:Z}),Q=this.buildConv_(A,"Mixed_7a_Branch_2_Conv2d_0a_1x1",{autoPad:x}),tt=this.buildConv_(Q,"Mixed_7a_Branch_2_Conv2d_0b_3x3",{autoPad:x}),et=this.buildConv_(tt,"Mixed_7a_Branch_2_Conv2d_1a_3x3",{strides:Z}),z=Promise.all([Y,O,et,R]).then(P=>this.builder_.concat(P,3)),st=this.buildBlock8_(z,1),it=this.buildBlock8_(st,2),nt=this.buildBlock8_(it,3),W=this.buildBlock8_(nt,4),Bt=this.buildBlock8_(W,5),wt=this.buildBlock8_(Bt,6,!1).then(P=>this.builder_.averagePool2d(P,{layout:"nhwc"}));return await this.buildFullyConnected_(wt)}async build(t){this.graph_=await this.builder_.build({output:t})}async compute(t){this.context_.writeTensor(this.inputTensor_,t);const e={input:this.inputTensor_},a={output:this.outputTensor_};this.context_.dispatch(this.graph_,e,a);const n=await this.context_.readTensor(this.outputTensor_);return new Float32Array(n)}}const H=[2,2],F="same-upper";class ce{constructor(){this.context_=null,this.builder_=null,this.graph_=null,this.inputTensor_=null,this.outputTensor_=null,this.weightsUrl_=xt()+"/test-data/models/facenet_nchw/weights",this.inputOptions={mean:[127.5,127.5,127.5,127.5],std:[127.5,127.5,127.5,127.5],channelScheme:"BGR",inputLayout:"nchw",inputShape:[1,3,160,160]},this.postOptions={distanceMetric:"euclidean",threshold:1.26},this.outputShape_=[1,512]}async buildConv_(t,e,a,n=void 0,i=!0){const o=`${this.weightsUrl_}/const_fold_opt__${e}.npy`,d=`${this.weightsUrl_}/${a}_Conv2D_bias.npy`,[l,c]=await Promise.all([o,d].map(u=>E(this.builder_,u)));n!==void 0?n.bias=c:n={bias:c},t=await t,n.autoPad=="same-upper"&&(n.padding=Lt([t.shape()[2],t.shape()[3]],[l.shape()[2],l.shape()[3]],n.strides,n.dilations,n.autoPad));const h=this.builder_.conv2d(t,l,n);return i?this.builder_.relu(h):h}async buildBlock35_(t,e,a){const n=this.buildConv_(t,a[0],`Block35_${e}_Branch_0_Conv2d_1x1`),i=this.buildConv_(t,a[1],`Block35_${e}_Branch_1_Conv2d_0a_1x1`),o=this.buildConv_(i,a[2],`Block35_${e}_Branch_1_Conv2d_0b_3x3`,{autoPad:F}),d=this.buildConv_(t,a[3],`Block35_${e}_Branch_2_Conv2d_0a_1x1`),l=this.buildConv_(d,a[4],`Block35_${e}_Branch_2_Conv2d_0b_3x3`,{autoPad:F}),c=this.buildConv_(l,a[5],`Block35_${e}_Branch_2_Conv2d_0c_3x3`,{autoPad:F}),h=Promise.all([n,o,c]).then(r=>this.builder_.concat(r,1)),u=this.buildConv_(h,a[6],`Block35_${e}_Conv2d_1x1`,{},!1);return this.builder_.relu(this.builder_.add(await t,await u))}async buildBlock17_(t,e,a){const n=this.buildConv_(t,a[0],`Block17_${e}_Branch_0_Conv2d_1x1`),i=this.buildConv_(t,a[1],`Block17_${e}_Branch_1_Conv2d_0a_1x1`),o=this.buildConv_(i,a[2],`Block17_${e}_Branch_1_Conv2d_0b_1x7`,{autoPad:F}),d=this.buildConv_(o,a[3],`Block17_${e}_Branch_1_Conv2d_0c_7x1`,{autoPad:F}),l=Promise.all([n,d]).then(h=>this.builder_.concat(h,1)),c=this.buildConv_(l,a[4],`Block17_${e}_Conv2d_1x1`,{},!1);return this.builder_.relu(this.builder_.add(await t,await c))}async buildBlock8_(t,e,a,n=!0){const i=this.buildConv_(t,a[0],`Block8_${e}_Branch_0_Conv2d_1x1`),o=this.buildConv_(t,a[1],`Block8_${e}_Branch_1_Conv2d_0a_1x1`),d=this.buildConv_(o,a[2],`Block8_${e}_Branch_1_Conv2d_0b_1x3`,{autoPad:F}),l=this.buildConv_(d,a[3],`Block8_${e}_Branch_1_Conv2d_0c_3x1`,{autoPad:F}),c=Promise.all([i,l]).then(r=>this.builder_.concat(r,1)),h=this.buildConv_(c,a[4],`Block8_${e}_Conv2d_1x1`,{},!1);let u=this.builder_.add(await t,await h);return n&&(u=this.builder_.relu(u)),u}async buildGemm_(t){const e=E(this.builder_,`${this.weightsUrl_}/const_fold_opt__888.npy`),a=E(this.builder_,`${this.weightsUrl_}/Bottleneck_MatMul_bias.npy`);return this.builder_.gemm(t,await e,{c:await a})}async load(t){this.context_=await navigator.ml.createContext(t),this.builder_=new MLGraphBuilder(this.context_);const e={dataType:"float32",dimensions:this.inputOptions.inputShape,shape:this.inputOptions.inputShape},a=this.builder_.input("input",e);e.usage=MLTensorUsage.WRITE,this.inputTensor_=await this.context_.createTensor(e),this.outputTensor_=await this.context_.createTensor({dataType:"float32",dimensions:this.outputShape_,shape:this.outputShape_,usage:MLTensorUsage.READ});const n={windowDimensions:[3,3],strides:H},i=this.buildConv_(a,"1070","Conv2d_1a_3x3",{strides:H}),o=this.buildConv_(i,"1146","Conv2d_2a_3x3"),l=this.buildConv_(o,"1068","Conv2d_2b_3x3",{autoPad:F}).then(D=>this.builder_.maxPool2d(D,n)),c=this.buildConv_(l,"1058","Conv2d_3b_1x1"),h=this.buildConv_(c,"1045","Conv2d_4a_3x3"),u=this.buildConv_(h,"976","Conv2d_4b_3x3",{strides:H}),r=this.buildBlock35_(u,1,["930","1073","912","1134","1127","921","959"]),b=this.buildBlock35_(r,2,["1005","1036","902","925","1016","1133","1059"]),f=this.buildBlock35_(b,3,["1046","1115","1020","1091","958","948","891"]),p=this.buildBlock35_(f,4,["1053","1151","919","961","1111","1124","900"]),_=this.buildBlock35_(p,5,["1083","1100","1015","1082","1099","1125","1081"]),g=this.buildConv_(_,"1079","Mixed_6a_Branch_0_Conv2d_1a_3x3",{strides:H}),w=_.then(D=>this.builder_.maxPool2d(D,n)),m=this.buildConv_(_,"1072","Mixed_6a_Branch_1_Conv2d_0a_1x1"),v=this.buildConv_(m,"1022","Mixed_6a_Branch_1_Conv2d_0b_3x3",{autoPad:F}),y=this.buildConv_(v,"1012","Mixed_6a_Branch_1_Conv2d_1a_3x3",{strides:H}),C=Promise.all([g,y,w]).then(D=>this.builder_.concat(D,1)),B=this.buildBlock17_(C,1,["1119","1112","989","1095","952"]),M=this.buildBlock17_(B,2,["947","918","906","1069","1148"]),L=this.buildBlock17_(M,3,["1087","932","1028","1150","1137"]),T=this.buildBlock17_(L,4,["1089","1039","1001","1135","1129"]),U=this.buildBlock17_(T,5,["1123","898","1090","1105","920"]),V=this.buildBlock17_(U,6,["935","998","1143","1061","1049"]),I=this.buildBlock17_(V,7,["1118","1023","1013","1092","1093"]),G=this.buildBlock17_(I,8,["1141","1024","1140","929","1120"]),K=this.buildBlock17_(G,9,["1067","908","1142","1003","1074"]),A=this.buildBlock17_(K,10,["1078","913","1138","982","967"]),R=A.then(D=>this.builder_.maxPool2d(D,n)),J=this.buildConv_(A,"1103","Mixed_7a_Branch_0_Conv2d_0a_1x1"),Y=this.buildConv_(J,"1066","Mixed_7a_Branch_0_Conv2d_1a_3x3",{strides:H}),X=this.buildConv_(A,"1056","Mixed_7a_Branch_1_Conv2d_0a_1x1"),O=this.buildConv_(X,"1043","Mixed_7a_Branch_1_Conv2d_1a_3x3",{strides:H}),Q=this.buildConv_(A,"1145","Mixed_7a_Branch_2_Conv2d_0a_1x1"),tt=this.buildConv_(Q,"1077","Mixed_7a_Branch_2_Conv2d_0b_3x3",{autoPad:F}),et=this.buildConv_(tt,"897","Mixed_7a_Branch_2_Conv2d_1a_3x3",{strides:H}),z=Promise.all([Y,O,et,R]).then(D=>this.builder_.concat(D,1)),st=this.buildBlock8_(z,1,["1065","1126","1110","1116","1107"]),it=this.buildBlock8_(st,2,["999","1144","1102","1097","981"]),nt=this.buildBlock8_(it,3,["962","934","1064","1052","1042"]),W=this.buildBlock8_(nt,4,["915","957","1000","1034","1071"]),Bt=this.buildBlock8_(W,5,["1139","1114","1106","997","970"]),Ft=this.buildBlock8_(Bt,6,["977","1104","978","1080","1086"],!1),wt=this.builder_.averagePool2d(await Ft),Mt=wt.shape();Mt.splice(2,2);const P=this.builder_.reshape(wt,Mt);return await this.buildGemm_(P)}async build(t){this.graph_=await this.builder_.build({output:t})}async compute(t){this.context_.writeTensor(this.inputTensor_,t);const e={input:this.inputTensor_},a={output:this.outputTensor_};this.context_.dispatch(this.graph_,e,a);const n=await this.context_.readTensor(this.outputTensor_);return new Float32Array(n)}}class de{constructor(){this.context_=null,this.deviceType_=null,this.builder_=null,this.graph_=null,this.inputTensor_=null,this.outputTensors_={},this.weightsUrl_=xt()+"/test-data/models/ssd_mobilenetv2_face_nhwc/weights/",this.inputOptions={inputLayout:"nhwc",margin:[1.2,1.2,.8,1.1],mean:[127.5,127.5,127.5],std:[127.5,127.5,127.5],boxSize:4,numClasses:2,numBoxes:[1083,600,150,54,24,6],inputShape:[1,300,300,3]},this.outputsInfo={biasAdd0:[1,19,19,12],biasAdd3:[1,19,19,6],biasAdd6:[1,10,10,24],biasAdd9:[1,10,10,12],biasAdd12:[1,5,5,24],biasAdd15:[1,5,5,12],biasAdd18:[1,3,3,24],biasAdd21:[1,3,3,12],biasAdd24:[1,2,2,24],biasAdd27:[1,2,2,12],biasAdd30:[1,1,1,24],biasAdd33:[1,1,1,12]}}async buildConv_(t,e,a=!0,n=void 0){let i=this.weightsUrl_;const o="_weights.npy";let d="_Conv2D_bias.npy";e[0].includes("expanded")?(i+="FeatureExtractor_MobilenetV2_expanded_conv_",e[0].includes("depthwise")?(i+=e[1]==="0"?"depthwise_depthwise":`${e[1]}_depthwise_depthwise`,d="_bias.npy"):e[0].includes("project")?i+=e[1]==="0"?"project":`${e[1]}_project`:i+=`${e[1]}_expand`):e[0]==="Class"||e[0]==="BoxEncoding"?i+=`BoxPredictor_${e[1]}_${e[0]}Predictor`:e[0].includes("layer")?i+=`FeatureExtractor_MobilenetV2_${e[0]}_Conv2d_${e[1]}`:i+=`${e[0]}`;const l=i+o,c=E(this.builder_,l),h=i+d,u=E(this.builder_,h);n!==void 0?(n.inputLayout="nhwc",n.filterLayout="ohwi"):n={inputLayout:"nhwc",filterLayout:"ohwi"},e[0].includes("depthwise")&&(n.filterLayout="ihwo"),n.bias=await u;const r=(await t).shape(),b=(await c).shape();n.padding=Lt([r[1],r[2]],[b[1],b[2]],n.strides,n.dilations,"same-upper");const f=this.builder_.conv2d(await t,await c,n);return a?this.builder_.clamp(f,{minValue:0,maxValue:6}):f}async buildLinearBottleneck_(t,e,a=!0,n,i){let o;const d={groups:n},l=[2,2];i==="convRelu6"&&(o={strides:l}),i==="dwiseRelu6"&&(d.strides=l);const c=e==="0"?"FeatureExtractor_MobilenetV2_Conv":"expanded",h=this.buildConv_(t,[c,e],!0,o),u=this.buildConv_(h,["expanded_depthwise",e],!0,d),r=this.buildConv_(u,["expanded_project",e],!1);return a?this.builder_.add(await t,await r):await r}async load(t){this.context_=await navigator.ml.createContext(t),this.deviceType_=t.deviceType,this.builder_=new MLGraphBuilder(this.context_);const e={dataType:"float32",dimensions:this.inputOptions.inputShape,shape:this.inputOptions.inputShape},a=this.builder_.input("input",e);e.usage=MLTensorUsage.WRITE,this.inputTensor_=await this.context_.createTensor(e);for(const[nt,W]of Object.entries(this.outputsInfo))this.outputTensors_[nt]=await this.context_.createTensor({dataType:"float32",dimensions:W,shape:W,usage:MLTensorUsage.READ});const n=this.buildLinearBottleneck_(a,"0",!1,32,"convRelu6"),i=this.buildLinearBottleneck_(n,"1",!1,96,"dwiseRelu6"),o=this.buildLinearBottleneck_(i,"2",!0,144),d=this.buildLinearBottleneck_(o,"3",!1,144,"dwiseRelu6"),l=this.buildLinearBottleneck_(d,"4",!0,192),c=this.buildLinearBottleneck_(l,"5",!0,192),h=this.buildLinearBottleneck_(c,"6",!1,192,"dwiseRelu6"),u=this.buildLinearBottleneck_(h,"7",!0,384),r=this.buildLinearBottleneck_(u,"8",!0,384),b=this.buildLinearBottleneck_(r,"9",!0,384),f=this.buildLinearBottleneck_(b,"10",!1,384),p=this.buildLinearBottleneck_(f,"11",!0,576),_=this.buildLinearBottleneck_(p,"12",!0,576),g=this.buildConv_(_,["expanded","13"]),w=this.buildConv_(g,["expanded_depthwise","13"],!0,{groups:576,strides:[2,2]}),m=this.buildConv_(w,["expanded_project","13"],!1),v=this.buildConv_(g,["BoxEncoding","0"],!1),y=this.buildConv_(g,["Class","0"],!1),C=this.buildLinearBottleneck_(m,"14",!0,960),B=this.buildLinearBottleneck_(C,"15",!0,960),M=this.buildLinearBottleneck_(B,"16",!1,960),L=this.buildConv_(M,["FeatureExtractor_MobilenetV2_Conv_1"]),T=this.buildConv_(L,["BoxEncoding","1"],!1),U=this.buildConv_(L,["Class","1"],!1),V=this.buildConv_(L,["layer_19_1","2_1x1_256"]),I=this.buildConv_(V,["layer_19_2","2_3x3_s2_512"],!0,{strides:[2,2]}),G=this.buildConv_(I,["BoxEncoding","2"],!1),K=this.buildConv_(I,["Class","2"],!1),A=this.buildConv_(I,["layer_19_1","3_1x1_128"]),R=this.buildConv_(A,["layer_19_2","3_3x3_s2_256"],!0,{strides:[2,2]}),J=this.buildConv_(R,["BoxEncoding","3"],!1),Y=this.buildConv_(R,["Class","3"],!1),X=this.buildConv_(R,["layer_19_1","4_1x1_128"]),O=this.buildConv_(X,["layer_19_2","4_3x3_s2_256"],!0,{strides:[2,2]}),Q=this.buildConv_(O,["BoxEncoding","4"],!1),tt=this.buildConv_(O,["Class","4"],!1),et=this.buildConv_(O,["layer_19_1","5_1x1_64"]),z=this.buildConv_(et,["layer_19_2","5_3x3_s2_128"],!0,{strides:[2,2]}),st=this.buildConv_(z,["BoxEncoding","5"],!1),it=this.buildConv_(z,["Class","5"],!1);return{biasAdd0:await v,biasAdd3:await y,biasAdd6:await T,biasAdd9:await U,biasAdd12:await G,biasAdd15:await K,biasAdd18:await J,biasAdd21:await Y,biasAdd24:await Q,biasAdd27:await tt,biasAdd30:await st,biasAdd33:await it}}async build(t){this.graph_=await this.builder_.build(t)}async compute(t){this.context_.writeTensor(this.inputTensor_,t);const e={input:this.inputTensor_};this.context_.dispatch(this.graph_,e,this.outputTensors_);const a={};for(const[n,i]of Object.entries(this.outputTensors_))a[n]=new Float32Array(await this.context_.readTensor(i));return a}}class he{constructor(){this.context_=null,this.deviceType_=null,this.builder_=null,this.graph_=null,this.inputTensor_=null,this.outputTensors_={},this.weightsUrl_=xt()+"/test-data/models/ssd_mobilenetv2_face_nchw/weights/",this.inputOptions={inputLayout:"nchw",margin:[1.2,1.2,.8,1.1],mean:[127.5,127.5,127.5],std:[127.5,127.5,127.5],boxSize:4,numClasses:2,numBoxes:[1083,600,150,54,24,6],inputShape:[1,3,300,300]},this.outputsInfo={biasAdd0:[1,12,19,19],biasAdd3:[1,6,19,19],biasAdd6:[1,24,10,10],biasAdd9:[1,12,10,10],biasAdd12:[1,24,5,5],biasAdd15:[1,12,5,5],biasAdd18:[1,24,3,3],biasAdd21:[1,12,3,3],biasAdd24:[1,24,2,2],biasAdd27:[1,12,2,2],biasAdd30:[1,24,1,1],biasAdd33:[1,12,1,1]}}async buildConv_(t,e,a=!0,n={}){let i=this.weightsUrl_;const o="_weights.npy";let d="_Conv2D_bias.npy";e[0].includes("expanded")?(i+="FeatureExtractor_MobilenetV2_expanded_conv_",e[0].includes("depthwise")?(i+=e[1]==="0"?"depthwise_depthwise":`${e[1]}_depthwise_depthwise`,d="_bias.npy"):e[0].includes("project")?i+=e[1]==="0"?"project":`${e[1]}_project`:i+=`${e[1]}_expand`):e[0]==="Class"||e[0]==="BoxEncoding"?i+=`BoxPredictor_${e[1]}_${e[0]}Predictor`:e[0].includes("layer")?i+=`FeatureExtractor_MobilenetV2_${e[0]}_Conv2d_${e[1]}`:i+=`${e[0]}`;const l=i+o,c=E(this.builder_,l),h=i+d,u=E(this.builder_,h),r=(await t).shape(),b=(await c).shape();n.padding=Lt([r[2],r[3]],[b[2],b[3]],n.strides,n.dilations,"same-upper"),n.bias=await u;const f=this.builder_.conv2d(await t,await c,n);return a?this.builder_.clamp(f,{minValue:0,maxValue:6}):f}async buildLinearBottleneck_(t,e,a=!0,n,i){let o;const d={groups:n},l=[2,2];i==="convRelu6"&&(o={strides:l}),i==="dwiseRelu6"&&(d.strides=l);const c=e==="0"?"FeatureExtractor_MobilenetV2_Conv":"expanded",h=this.buildConv_(t,[c,e],!0,o),u=this.buildConv_(h,["expanded_depthwise",e],!0,d),r=this.buildConv_(u,["expanded_project",e],!1);return a?this.builder_.add(await t,await r):await r}async load(t){this.context_=await navigator.ml.createContext(t),this.deviceType_=t.deviceType,this.builder_=new MLGraphBuilder(this.context_);const e={dataType:"float32",dimensions:this.inputOptions.inputShape,shape:this.inputOptions.inputShape},a=this.builder_.input("input",e);e.usage=MLTensorUsage.WRITE,this.inputTensor_=await this.context_.createTensor(e);for(const[nt,W]of Object.entries(this.outputsInfo))this.outputTensors_[nt]=await this.context_.createTensor({dataType:"float32",dimensions:W,shape:W,usage:MLTensorUsage.READ});const n=this.buildLinearBottleneck_(a,"0",!1,32,"convRelu6"),i=this.buildLinearBottleneck_(n,"1",!1,96,"dwiseRelu6"),o=this.buildLinearBottleneck_(i,"2",!0,144),d=this.buildLinearBottleneck_(o,"3",!1,144,"dwiseRelu6"),l=this.buildLinearBottleneck_(d,"4",!0,192),c=this.buildLinearBottleneck_(l,"5",!0,192),h=this.buildLinearBottleneck_(c,"6",!1,192,"dwiseRelu6"),u=this.buildLinearBottleneck_(h,"7",!0,384),r=this.buildLinearBottleneck_(u,"8",!0,384),b=this.buildLinearBottleneck_(r,"9",!0,384),f=this.buildLinearBottleneck_(b,"10",!1,384),p=this.buildLinearBottleneck_(f,"11",!0,576),_=this.buildLinearBottleneck_(p,"12",!0,576),g=this.buildConv_(_,["expanded","13"]),w=this.buildConv_(g,["expanded_depthwise","13"],!0,{groups:576,strides:[2,2]}),m=this.buildConv_(w,["expanded_project","13"],!1),v=this.buildConv_(g,["BoxEncoding","0"],!1),y=this.buildConv_(g,["Class","0"],!1),C=this.buildLinearBottleneck_(m,"14",!0,960),B=this.buildLinearBottleneck_(C,"15",!0,960),M=this.buildLinearBottleneck_(B,"16",!1,960),L=this.buildConv_(M,["FeatureExtractor_MobilenetV2_Conv_1"]),T=this.buildConv_(L,["BoxEncoding","1"],!1),U=this.buildConv_(L,["Class","1"],!1),V=this.buildConv_(L,["layer_19_1","2_1x1_256"]),I=this.buildConv_(V,["layer_19_2","2_3x3_s2_512"],!0,{strides:[2,2]}),G=this.buildConv_(I,["BoxEncoding","2"],!1),K=this.buildConv_(I,["Class","2"],!1),A=this.buildConv_(I,["layer_19_1","3_1x1_128"]),R=this.buildConv_(A,["layer_19_2","3_3x3_s2_256"],!0,{strides:[2,2]}),J=this.buildConv_(R,["BoxEncoding","3"],!1),Y=this.buildConv_(R,["Class","3"],!1),X=this.buildConv_(R,["layer_19_1","4_1x1_128"]),O=this.buildConv_(X,["layer_19_2","4_3x3_s2_256"],!0,{strides:[2,2]}),Q=this.buildConv_(O,["BoxEncoding","4"],!1),tt=this.buildConv_(O,["Class","4"],!1),et=this.buildConv_(O,["layer_19_1","5_1x1_64"]),z=this.buildConv_(et,["layer_19_2","5_3x3_s2_128"],!0,{strides:[2,2]}),st=this.buildConv_(z,["BoxEncoding","5"],!1),it=this.buildConv_(z,["Class","5"],!1);return{biasAdd0:await v,biasAdd3:await y,biasAdd6:await T,biasAdd9:await U,biasAdd12:await G,biasAdd15:await K,biasAdd18:await J,biasAdd21:await Y,biasAdd24:await Q,biasAdd27:await tt,biasAdd30:await st,biasAdd33:await it}}async build(t){this.graph_=await this.builder_.build(t)}async compute(t){this.context_.writeTensor(this.inputTensor_,t);const e={input:this.inputTensor_};this.context_.dispatch(this.graph_,e,this.outputTensors_);const a={};for(const[n,i]of Object.entries(this.outputTensors_))a[n]=new Float32Array(await this.context_.readTensor(i));return a}}function ue(s,t,e){const{boxSize:a=4,numBoxes:n=1917}=s;if(t.length%a!==0)throw new Error(`The length of outputBoxTensor should be the multiple of ${a}!`);const i=[10,10,5,5];let o=0,d,l,c,h,u,r,b,f;for(let p=0;p<n;++p){const[_,g,w,m]=e[p];d=t[o]/i[0],l=t[o+1]/i[1],c=t[o+2]/i[2],h=t[o+3]/i[3],u=Math.exp(h)*m,r=Math.exp(c)*w,b=d*w+_,f=l*m+g,t[o]=b-r/2,t[o+1]=f-u/2,t[o+2]=b+r/2,t[o+3]=f+u/2,o+=a}}function _e(s,t){if(s.length!==4||t.length!==4)throw new Error("IOU: each input length should be 4!");const[e,a,n,i]=s,[o,d,l,c]=t,h=Math.min(n,l),u=Math.max(e,o),r=Math.max(0,h-u),b=Math.min(i,c),f=Math.max(a,d),p=Math.max(0,b-f),_=r*p,g=(n-e)*(i-a),w=(l-o)*(c-d),m=g+w-_;if(m===0)throw new Error("[IOU] areaSum can not be 0!");return _/m}function be(s){const{minScale:t=.2,maxScale:e=.95,aspectRatios:a=[1,2,.5,3,.3333],baseAnchorSize:n=[1,1],featureMapShapeList:i=[[19,19],[10,10],[5,5],[3,3],[2,2],[1,1]],interpolatedScaleAspectRatio:o=1,reduceBoxesInLowestLayer:d=!0}=s,l=i.length,c=[],h=[];for(let r=0;r<l;++r){const b=t+(e-t)*r/(l-1);h.push(b)}h.forEach((r,b)=>{const f=b===h.length-1?1:h[b+1];let p=[];b===0&&d?p=[[.1,1],[r,2],[r,.5]]:(a.forEach((_,g)=>{p.push([r,_])}),o>0&&p.push([Math.sqrt(r*f),o])),c.push(p)});const u=[];for(let r=0;r<l;++r){const b=i[r][0],f=i[r][1],p=[1/b,1/f],_=[p[0]/2,p[1]/2];for(let g=0;g<b;++g)for(let w=0;w<f;++w)c[r].forEach((m,v)=>{const[y,C]=m,B=Math.sqrt(C),M=g*p[0]+_[0],L=w*p[1]+_[1],T=y/B*n[0],U=y*B*n[0];u.push([M,L,T,U])})}return u}function pe(s,t,e){const{scoreThreshold:a=.1,iouThreshold:n=.5,maxDetectionsPerClass:i=10,maxTotalDetections:o=100,numBoxes:d=1917,numClasses:l=91,boxSize:c=4}=s;let h=null,u=[],r=[],b=[];for(let f=1;f<l;++f){let p=[],_=[];for(let v=0;v<d;++v){const y=v*l+f;if(e[y]>a){const C=v*c;p.push(t.subarray(C,C+c)),_.push(e[y])}}const g=[],w=[],m=[];for(;_.length!==0&&w.length<i;){let v=0,y=0;_.forEach((L,T)=>{L>v&&(v=L,y=T)});const C=p[y];g.push(p.splice(y,1)[0]),w.push(_.splice(y,1)[0]),m.push(f);const B=[],M=[];p.forEach((L,T)=>{_e(L,C)<n&&(B.push(p[T]),M.push(_[T]))}),p=B,_=M}u=u.concat(g),r=r.concat(w),b=b.concat(m)}if(r.length>o){h=o;let f=0,p=r.length-1;for(;f<p;){let _=f,g=p;const w=r[_],m=u[_],v=b[_];for(;_<g;){for(;_<g&&r[g]<w;)--g;for(_<g&&(r[_]=r[g],u[_]=u[g],b[_]=b[g],++_);_<g&&r[_]>w;)++_;_<g&&(r[g]=r[_],u[g]=u[_],b[g]=b[_],--g)}r[_]=w,u[_]=m,b[_]=v,_===o?f=p:_<o?f=_+1:p=_-1}}else h=r.length;return[h,u,r,b]}function fe(s,t,e,a){const n=s.naturalWidth||s.width,i=s.naturalHeight||s.height;for(let o=0;o<t;++o){const[d,l,c,h]=e[o];e[o][0]=Math.max(0,(c+d)/2-(c-d)/2*a[2]),e[o][2]=Math.min(i,(c+d)/2+(c-d)/2*a[3]),e[o][1]=Math.max(0,(h+l)/2-(h-l)/2*a[0]),e[o][3]=Math.min(n,(h+l)/2+(h-l)/2*a[1])}return e}function Dt(s,t,e,a,n){t.height=n,t.width=s.width/s.height*t.height;let i=t.getContext("2d");i.drawImage(s,0,0,t.width,t.height),e.forEach((o,d)=>{let l=o[0]/s.height*t.height,c=o[1]/s.height*t.height,h=o[2]/s.height*t.height,u=o[3]/s.height*t.height;i.strokeStyle="#009bea",i.fillStyle="#009bea",i.lineWidth=3,i.strokeRect(l,c,h,u),i.font="20px Arial";let r=a[d],b=i.measureText(r).width;l>=2&&c>=parseInt(i.font,10)?(i.fillRect(l-2,c-parseInt(i.font,10),b+4,parseInt(i.font,10)),i.fillStyle="white",i.textAlign="start",i.fillText(r,l,c-3)):(i.fillRect(l+2,c,b+4,parseInt(i.font,10)),i.fillStyle="white",i.textAlign="start",i.fillText(r,l+2,c+15))})}function ge(s,t,e){const a=t.numBoxes,n=t.boxSize,i=t.numClasses,o=a.reduce((p,_)=>p+_),d=o*n,l=o*i,c=new Float32Array(d),h=new Float32Array(l);let u=0,r=0,b,f;for(let p=0;p<a.length;++p)t.inputLayout==="nchw"?(b=tf.tidy(()=>{const _=tf.tensor(s[2*p],Object.entries(e)[2*p][1],"float32");return tf.transpose(_,[0,2,3,1]).dataSync()}),f=tf.tidy(()=>{const _=tf.tensor(s[2*p+1],Object.entries(e)[2*p+1][1],"float32");return tf.transpose(_,[0,2,3,1]).dataSync()})):(b=s[2*p],f=s[2*p+1]),c.set(b,u),h.set(f,r),u+=n*a[p],r+=i*a[p];return{outputBoxTensor:c,outputClassScoresTensor:h}}function we(s,t,e){const a=(l,c)=>{let h=0;for(let u=0;u<l.length;u++)h+=Math.pow(l[u]-c[u],2);return Math.sqrt(h)},n=(l,c)=>{let h=0,u=0,r=0;for(let b=0;b<l.length;b++)h=h+l[b]*c[b],u=u+Math.pow(l[b],2),r=r+Math.pow(c[b],2);return u=Math.sqrt(u),r=Math.sqrt(r),1-h/(u*r)},i=l=>{let c=0;for(let r=0;r<l.length;r++)l[r]!==0&&(c=c+Math.pow(Math.abs(l[r]),2));const h=Math.sqrt(c),u=new Float32Array(l.length);for(let r=0;r<l.length;r++)l[r]!==0?u[r]=(l[r]/h).toFixed(10):u[r]=0;return u},o=[],d=new Map;for(let l=0;l<s.length;l++)for(let c=0;c<t.length;c++){o[c]="X";let h;if(e.distanceMetric==="euclidean"){const[...u]=Float32Array.from(i(s[l])),[...r]=Float32Array.from(i(t[c]));h=a(u,r)}else e.distanceMetric==="cosine"&&(h=n(s[l],t[c]));d.has(c)||d.set(c,new Map),d.get(c).set(l,h)}console.dir(d);for(const l of d.keys()){let c=null,h=null;for(const[u,r]of d.get(l).entries())(h==null||h>r)&&(c=u,h=r);o[l]==="X"&&h<e.threshold&&(o[l]=parseInt(c)+1)}return o}const At=document.getElementById("searchImage"),me=document.getElementById("searchCanvasShow"),jt=document.getElementById("cameraShow"),kt=document.getElementById("targetImage"),dt=document.getElementById("camElement");let j=null,S=null,ht="";const Kt="facenet";let lt="nhwc",$t=ht+lt,Zt=Kt+lt,Pt,Tt=!0,N="image",at=null,gt,ot=null,mt,vt=null,St=0,It=0,q=0,rt="",_t="",bt="",pt="",yt=!0,Rt=!1;const Ht=["#tabs > li",".btn"];$(document).ready(async()=>{$(".icdisplay").hide(),await Gt()?$("#webnn_cpu").click():(console.log(ae()),ft(oe()))});$("#backendBtns .btn").on("change",async s=>{N==="camera"&&await Ct(),lt=le($(s.target).attr("id")),await ut()});$("#fdModelBtns .btn").on("change",async s=>{N==="camera"&&await Ct(),ht=$(s.target).attr("id"),await ut()});$("#img").click(async()=>{if(N==="camera")await ct("current","pending","pending"),await Ct(),await new Promise(s=>{setTimeout(()=>{S=null,s()},1e3)});else return;N="image",S=null,await ut()});$("#targetImgFile").change(s=>{const t=s.target.files;t.length>0&&($("#targetImage").removeAttr("height"),$("#targetImage").removeAttr("width"),kt.src=URL.createObjectURL(t[0]))});$("#targetImage").on("load",async()=>{N==="camera"&&await Ct(),j=null,await ut()});$("#searchImgFile").change(s=>{const t=s.target.files;t.length>0&&($("#searchImage").removeAttr("height"),$("#searchImage").removeAttr("width"),At.src=URL.createObjectURL(t[0]))});$("#searchImage").on("load",async()=>{S=null,await ut()});$("#cam").click(async()=>{N!="camera"&&(N="camera",$(".shoulddisplay").hide(),await ut())});function Ct(){return yt=!0,se(Pt,vt),new Promise(s=>{setInterval(()=>{Rt||s()},100)})}async function Ot(){if(!vt.active||yt)return;if(dt.readyState===0){Pt=requestAnimationFrame(Ot);return}Rt=!0,S=null;const s=te(dt);console.log("- Computing... "),await Jt(kt,dt),console.log(`  done in ${q} ms.`),Xt(),await Yt(s,jt),$("#fps").text(`${(1e3/q).toFixed(0)} FPS`),await ve(dt,jt,S.strokedRects),Rt=!1,yt||(Pt=requestAnimationFrame(Ot))}async function qt(s){const t=zt(s,gt);let e=0,a=performance.now();const n=await at.compute(t);e=performance.now()-a;const i=[],o=[],d=s.naturalHeight||s.height,l=s.naturalWidth||s.width,c=[];for(const p of Object.entries(n))c.push(p[1]);const h=ge(c,gt,at.outputsInfo),u=be({});ue({},h.outputBoxTensor,u);let[r,b,f]=pe({numClasses:2},h.outputBoxTensor,h.outputClassScoresTensor);b=fe(s,r,b,gt.margin);for(let p=0;p<r;++p){let[_,g,w,m]=b[p];_=Math.max(0,_)*d,g=Math.max(0,g)*l,w=Math.min(1,w)*d,m=Math.min(1,m)*l;const v=1/(1+Math.exp(-f[p])),y=[g,_,m-g,w-_,v];i.push(y);const C={sx:g,sy:_,sWidth:y[2],sHeight:y[3],dWidth:160,dHeight:160};mt.drawOptions=C;const B=zt(s,mt);a=performance.now();const M=await ot.compute(B);e+=performance.now()-a;const[...L]=Float32Array.from(M);o.push(L)}return{computeTime:e,strokedRects:i,embeddings:o}}async function Jt(s,t){let e=!1,a=!1;j==null&&(j=await qt(s),e=!0),S==null&&(S=await qt(t),a=!0),e&&a?q=j.computeTime+S.computeTime:e&&!a?q=j.computeTime:!e&&a&&(q=S.computeTime)}async function Yt(s,t){$("#inferenceresult").show();const e=[];for(let i=0;i<j.embeddings.length;i++)e.push(i+1);const a=document.getElementById("targetCanvasShow");Dt(kt,a,j.strokedRects,e,300);const n=we(j.embeddings,S.embeddings,ot.postOptions);Dt(s,t,S.strokedRects,n,300)}function ve(s,t,e){const a=t.getContext("2d");a.clearRect(0,0,t.width,t.height),e.forEach(n=>{const[i,o,d,l]=n;a.drawImage(s,i,o,d,l,0,0,t.width,t.height)})}function Xt(s=void 0){$("#loadTime").html(`${St} ms`),$("#buildTime").html(`${It} ms`),s!==void 0?($("#computeLabel").html("Median inference time:"),$("#computeTime").html(`${s.toFixed(2)} ms`)):($("#computeLabel").html("Inference time:"),$("#computeTime").html(`${q.toFixed(2)} ms`))}function Vt(s){return{ssdmobilenetv2facenchw:new he,ssdmobilenetv2facenhwc:new de,facenetnchw:new ce,facenetnhwc:new re}[s]}async function ut(){try{if(ht==="")return;[bt,rt]=$('input[name="backend"]:checked').attr("id").split("_"),Nt(Ht,!0),Tt&&$("#hint").hide();const[s,t,e]=ne();let a;if(Tt||$t!==ht+lt||_t!=rt||pt!=bt){(_t!=rt||pt!=bt)&&(_t=_t!=rt?rt:_t,pt=pt!=bt?bt:pt),$t=ht+lt,Zt=Kt+lt,at=Vt($t),ot=Vt(Zt),gt=at.inputOptions,mt=ot.inputOptions,Tt=!1,console.log(`- Model name: ${ht}, Model layout: ${lt} -`),await ct("current","pending","pending"),console.log("- Loading weights... ");const n={deviceType:rt};t&&(n.powerPreference=t),e&&(n.numThreads=e),a=performance.now();const[i,o]=await Promise.all([at.load(n),ot.load(n)]);St=(performance.now()-a).toFixed(2),console.log(`  done in ${St} ms.`),await ct("done","current","pending"),console.log("- Building... "),a=performance.now(),await Promise.all([at.build(i),ot.build(o)]),It=(performance.now()-a).toFixed(2),console.log(`  done in ${It} ms.`)}if(await ct("done","done","current"),N==="image"){const n=[];let i;console.log("- Computing... "),await at.compute(new Float32Array(Ut(gt.inputShape))),await ot.compute(new Float32Array(Ut(mt.inputShape)));for(let o=0;o<s;o++)s>1&&(j=null,S=null),await Jt(kt,At),console.log(`  compute time ${o+1}: ${q} ms`),n.push(q);s>1&&(i=ie(n),console.log(`  median compute time: ${i.toFixed(2)} ms`)),await ct("done","done","done"),$("#fps").hide(),Et(),await Yt(At,me),Xt(i)}else if(N==="camera")vt=await ee(),dt.srcObject=vt,yt=!1,dt.onloadeddata=await Ot(),await ct("done","done","done"),$("#fps").show(),Et();else throw Error(`Unknown inputType ${N}`)}catch(s){console.log(s),ft(s.message)}Nt(Ht,!1)}const ye=()=>`
            <svg
            viewBox="2.6957588027748756 5.85526315789474 112.52568466533302 24.310003913380942"
            width="562.65"
            height="121.55"
            class="webnn"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            xmlns="http://www.w3.org/2000/svg"
        >
            <defs>
            <path
                d="M64.79 7.02C65.78 7.02 66.58 7.82 66.58 8.81C66.58 10.97 66.58 15.65 66.58 17.8C66.58 18.79 65.78 19.59 64.79 19.59C59.8 19.59 46.64 19.59 41.66 19.59C40.67 19.59 39.86 18.79 39.86 17.8C39.86 15.65 39.86 10.97 39.86 8.81C39.86 7.82 40.67 7.02 41.66 7.02C46.64 7.02 59.8 7.02 64.79 7.02Z"
                id="aUJMA4bMI"
            ></path>
            <text
                id="c5jvJP04B"
                x="63.6"
                y="121.55"
                font-size="10"
                font-family="Poppins"
                font-weight="100"
                alignment-baseline="before-edge"
                transform="matrix(1 0 0 1 -66.79615093164342 -104.194166492847)"
                style="line-height: 100%"
                xml:space="preserve"
                dominant-baseline="text-before-edge"
            >
                <tspan
                x="61"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="start"
                >
                neural network
                </tspan>
            </text>
            <text
                id="a1vYTZuYgt"
                x="138.5"
                y="89"
                font-size="10"
                font-family="Poppins"
                alignment-baseline="before-edge"
                transform="matrix(1 0 0 1 -136.17057369513643 -82.54473073858966)"
                style="line-height: 100%"
                xml:space="preserve"
                dominant-baseline="text-before-edge"
            >
                <tspan
                x="133.5"
                dy="0em"
                alignment-baseline="before-edge"
                dominant-baseline="text-before-edge"
                text-anchor="start"
                >
                web
                </tspan>
            </text>
            <path
                d="M29.98 27.82C29.98 29.12 28.93 30.17 27.64 30.17C26.35 30.17 25.3 29.12 25.3 27.82C25.3 26.53 26.35 25.48 27.64 25.48C28.93 25.48 29.98 26.53 29.98 27.82Z"
                id="m1AZcqfjwA"
            ></path>
            <path
                d="M22.48 13.75L22.91 14.38L23.06 15.15L22.91 15.92L22.48 16.55L21.85 16.98L21.08 17.13L20.31 16.98L19.68 16.55L19.26 15.92L19.1 15.15L19.26 14.38L19.68 13.75L20.31 13.33L21.08 13.17L21.85 13.33L22.48 13.75ZM20.29 14.36L20.04 14.72L19.96 15.16L20.04 15.6L20.29 15.96L20.65 16.2L21.09 16.29L21.53 16.2L21.89 15.96L22.13 15.6L22.22 15.16L22.13 14.72L21.89 14.36L21.53 14.11L21.09 14.03L20.65 14.11L20.29 14.36Z"
                id="a99wrsIm5"
            ></path>
            <path
                d="M21.08 21.31C21.08 22.61 20.03 23.65 18.74 23.65C17.45 23.65 16.4 22.61 16.4 21.31C16.4 20.02 17.45 18.97 18.74 18.97C20.03 18.97 21.08 20.02 21.08 21.31Z"
                id="b2fOGzz6El"
            ></path>
            <path
                d="M36.24 20.16L36.75 20.9L36.93 21.82L36.75 22.73L36.24 23.47L35.5 23.97L34.59 24.16L33.68 23.97L32.93 23.47L32.43 22.73L32.25 21.82L32.43 20.9L32.93 20.16L33.68 19.66L34.59 19.47L35.5 19.66L36.24 20.16ZM33.65 20.88L33.36 21.3L33.26 21.82L33.36 22.34L33.65 22.77L34.08 23.05L34.6 23.16L35.12 23.05L35.54 22.77L35.83 22.34L35.93 21.82L35.83 21.3L35.54 20.88L35.12 20.59L34.6 20.48L34.08 20.59L33.65 20.88Z"
                id="hfanhELPS"
            ></path>
            <path
                d="M17.01 11.16C17.01 12.46 15.96 13.5 14.67 13.5C13.38 13.5 12.33 12.46 12.33 11.16C12.33 9.87 13.38 8.82 14.67 8.82C15.96 8.82 17.01 9.87 17.01 11.16Z"
                id="g3EBuH3JyM"
            ></path>
            <path
                d="M24.08 7.44L24.39 7.9L24.5 8.46L24.39 9.02L24.08 9.48L23.62 9.79L23.06 9.9L22.5 9.79L22.04 9.48L21.73 9.02L21.62 8.46L21.73 7.9L22.04 7.44L22.5 7.13L23.06 7.02L23.62 7.13L24.08 7.44ZM22.48 7.88L22.31 8.15L22.24 8.47L22.31 8.79L22.48 9.05L22.75 9.22L23.07 9.29L23.39 9.22L23.65 9.05L23.82 8.79L23.89 8.47L23.82 8.15L23.65 7.88L23.39 7.71L23.07 7.64L22.75 7.71L22.48 7.88Z"
                id="a3SqsBDOg"
            ></path>
            <path
                d="M28.48 20.8L28.79 21.25L28.9 21.82L28.79 22.38L28.48 22.83L28.02 23.14L27.46 23.26L26.9 23.14L26.44 22.83L26.13 22.38L26.02 21.82L26.13 21.25L26.44 20.8L26.9 20.49L27.46 20.37L28.02 20.49L28.48 20.8ZM26.88 21.24L26.71 21.5L26.64 21.82L26.71 22.14L26.88 22.4L27.14 22.58L27.46 22.64L27.78 22.58L28.05 22.4L28.22 22.14L28.29 21.82L28.22 21.5L28.05 21.24L27.78 21.06L27.46 21L27.14 21.06L26.88 21.24Z"
                id="i15BKTlpWe"
            ></path>
            <path
                d="M9.79 12.15L10.1 12.61L10.21 13.17L10.1 13.73L9.79 14.19L9.33 14.5L8.77 14.61L8.21 14.5L7.75 14.19L7.44 13.73L7.33 13.17L7.44 12.61L7.75 12.15L8.21 11.84L8.77 11.73L9.33 11.84L9.79 12.15ZM8.19 12.59L8.02 12.85L7.95 13.17L8.02 13.49L8.19 13.76L8.45 13.93L8.77 14L9.09 13.93L9.36 13.76L9.53 13.49L9.6 13.17L9.53 12.85L9.36 12.59L9.09 12.42L8.77 12.35L8.45 12.42L8.19 12.59Z"
                id="a7ILsoRCN"
            ></path>
            <path
                d="M34.24 25.9L34.55 26.36L34.66 26.92L34.55 27.48L34.24 27.94L33.78 28.25L33.22 28.36L32.66 28.25L32.2 27.94L31.9 27.48L31.78 26.92L31.9 26.36L32.2 25.9L32.66 25.6L33.22 25.48L33.78 25.6L34.24 25.9ZM32.65 26.35L32.47 26.61L32.4 26.93L32.47 27.25L32.65 27.51L32.91 27.69L33.23 27.75L33.55 27.69L33.81 27.51L33.99 27.25L34.05 26.93L33.99 26.61L33.81 26.35L33.55 26.17L33.23 26.1L32.91 26.17L32.65 26.35Z"
                id="e1SP5zBvIe"
            ></path>
            <path
                d="M31.06 13.17C31.06 14.46 30.01 15.51 28.72 15.51C27.43 15.51 26.38 14.46 26.38 13.17C26.38 11.88 27.43 10.83 28.72 10.83C30.01 10.83 31.06 11.88 31.06 13.17Z"
                id="bfBySayYv"
            ></path>
            <path
                d="M21.74 25.9L22.05 26.36L22.16 26.92L22.05 27.48L21.74 27.94L21.28 28.25L20.72 28.36L20.16 28.25L19.7 27.94L19.39 27.48L19.28 26.92L19.39 26.36L19.7 25.9L20.16 25.6L20.72 25.48L21.28 25.6L21.74 25.9ZM20.14 26.35L19.97 26.61L19.9 26.93L19.97 27.25L20.14 27.51L20.4 27.69L20.72 27.75L21.04 27.69L21.31 27.51L21.48 27.25L21.55 26.93L21.48 26.61L21.31 26.35L21.04 26.17L20.72 26.1L20.4 26.17L20.14 26.35Z"
                id="b1cdUukPld"
            ></path>
            <path
                d="M14.97 16.11L15.28 16.57L15.39 17.13L15.28 17.69L14.97 18.15L14.51 18.46L13.95 18.57L13.39 18.46L12.93 18.15L12.62 17.69L12.51 17.13L12.62 16.57L12.93 16.11L13.39 15.8L13.95 15.69L14.51 15.8L14.97 16.11ZM13.37 16.55L13.2 16.82L13.13 17.14L13.2 17.46L13.37 17.72L13.64 17.89L13.96 17.96L14.28 17.89L14.54 17.72L14.71 17.46L14.78 17.14L14.71 16.82L14.54 16.55L14.28 16.38L13.96 16.31L13.64 16.38L13.37 16.55Z"
                id="eK2gZrDmt"
            ></path>
            <path
                d="M7.38 17.85C7.38 19.15 6.33 20.19 5.04 20.19C3.74 20.19 2.7 19.15 2.7 17.85C2.7 16.56 3.74 15.51 5.04 15.51C6.33 15.51 7.38 16.56 7.38 17.85Z"
                id="d7YHIEVZ2"
            ></path>
            <path d="M7.85 14.43L5.31 17.98" id="a17Or6DtLG"></path>
            <path d="M13.44 16.2L9.48 13.7" id="j4QWBAJZw"></path>
            <path d="M11.46 23.78L13.44 18.59" id="bhjRTNplq"></path>
            <path d="M16.57 20.69L7.19 17.98" id="cUv46xKpz"></path>
            <path d="" id="a86zQgXCB"></path>
            <path d="M19.81 15.74L14.79 16.81" id="cf4JQTqTn"></path>
            <path d="M26.24 13.7L23.1 14.43" id="a2mhrsE0Kx"></path>
            <path d="" id="bmGTT9MeB"></path>
            <path d="M21.75 8.99L16.97 10.37" id="c5ckw7gUg"></path>
            <path d="M21.75 13.13L22.49 9.68" id="bNq0DnU5M"></path>
            <path d="M27.39 20.69L27.87 15.74" id="b1AsRfq0o"></path>
            <path d="M21.75 26.3L26.24 22.63" id="a5Fonrsblc"></path>
            <path d="M26.24 21.19L22.12 16.81" id="a6xLjyPrwa"></path>
            <path d="M32.76 22.02L28.9 22.02" id="feqWMbnGx"></path>
            <path d="M17.88 19.33L15.59 13.13" id="b877fx0LIT"></path>
            <path d="M25.86 26.92L20.78 22.63" id="aHbsBwJX"></path>
            <path d="M32.04 27.54L30.11 28.46" id="b7wp4SAvn"></path>
            <path d="" id="c1lg9Iyd5S"></path>
            <path d="" id="b531Gp81NK"></path>
            <path d="M33.52 26.3L34.39 23.78" id="c4gBuIj7W"></path>
            <path d="M35.36 30.17L33.98 28" id="g75dLLAPY"></path>
            <path d="M33.96 19.91L30.46 14.95" id="b9EtFKjjmd"></path>
            </defs>
            <g>
            <g>
                <g>
                <use
                    xlink:href="#aUJMA4bMI"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="0.4"
                ></use>
                </g>
                <g id="c5WataF5oH">
                <use
                    xlink:href="#c5jvJP04B"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                ></use>
                </g>
                <g id="flQxJVdR">
                <use
                    xlink:href="#a1vYTZuYgt"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                ></use>
                </g>
                <g>
                <g>
                    <use
                    xlink:href="#m1AZcqfjwA"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#a99wrsIm5"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#b2fOGzz6El"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#hfanhELPS"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#g3EBuH3JyM"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#a3SqsBDOg"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#i15BKTlpWe"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#a7ILsoRCN"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#e1SP5zBvIe"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#bfBySayYv"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#b1cdUukPld"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#eK2gZrDmt"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <use
                    xlink:href="#d7YHIEVZ2"
                    opacity="1"
                    fill="rgba(255, 255, 255, 1.0)"
                    fill-opacity="1"
                    ></use>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#a17Or6DtLG"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#j4QWBAJZw"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#bhjRTNplq"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#cUv46xKpz"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#a86zQgXCB"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#cf4JQTqTn"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#a2mhrsE0Kx"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#bmGTT9MeB"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#c5ckw7gUg"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#bNq0DnU5M"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#b1AsRfq0o"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#a5Fonrsblc"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#a6xLjyPrwa"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#feqWMbnGx"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#b877fx0LIT"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#aHbsBwJX"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#b7wp4SAvn"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#c1lg9Iyd5S"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#b531Gp81NK"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#c4gBuIj7W"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#g75dLLAPY"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                <g>
                    <g>
                    <use
                        xlink:href="#b9EtFKjjmd"
                        opacity="1"
                        fill-opacity="0"
                        stroke="rgba(255, 255, 255, 1.0)"
                        stroke-width="1"
                        stroke-opacity="1"
                    ></use>
                    </g>
                </g>
                </g>
            </g>
            </g>
        </svg>
        `,xe=()=>`
        <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false">
            Samples
        </a>
        <div class="dropdown-menu" id="webnn-dropdown">
            <a class="dropdown-item" href="../nnotepad/">NNotepad - WebNN Playground</a>
            <a class="dropdown-item" href="../image_classification/">Image Classification</a>
            <a class="dropdown-item" href="../lenet/">Handwritten Digits Classification</a>
            <a class="dropdown-item" href="../nsnet2/">Noise Suppression (NSNet2)</a>
            <a class="dropdown-item" href="../rnnoise/">Noise Suppression (RNNoise)</a>
            <a class="dropdown-item" href="../style_transfer/">Fast Style Transfer</a>
            <a class="dropdown-item" href="../object_detection/">Object Detection</a>
            <a class="dropdown-item" href="../semantic_segmentation/">Semantic Segmentation</a>
            <a class="dropdown-item" href="../face_recognition/">Face Recognition</a>
            <a class="dropdown-item" href="../facial_landmark_detection/">Facial landmark Detection</a>
            <a class="dropdown-item" href="../code/">WebNN Code Editor</a>
        </div>
        </li>
    `,Le=()=>`
            <div class='webnnbadge mb-4'>
                <div class='webnn-title'>WebNN API</div>
                <div id="webnnstatus"></div>
            </div>
            <div class='webnnbadge mb-4'>
                <div class='webnn-title'>W3C Spec</div>
                <div class='webnn-status-true'><a href='https://www.w3.org/TR/webnn/#usecases'
                    title='W3C Web Neural Network API Use Cases'>Use Cases</a></div>
            </div>
        `,ke=()=>`
        <p>
          The WebNN API is under active development within W3C Web Machine Learning Working Group, please <a href="https://github.com/webmachinelearning/webnn-samples/issues" title="File a bug report for WebNN Samples">file a bug report</a> if the WebNN sample doesn't work in the latest versions of Chrome or Edge.
        </p>
        <p>
          &copy;2024 
          <a href="https://webmachinelearning.github.io/">WebNN API</a> ·
          <a href="https://github.com/webmachinelearning/webnn-samples#webnn-installation-guides">Installation Guides</a> · 
          <a href="https://webmachinelearning.github.io/webnn-status/">Implementation Status</a>
        </p>
    `;$(document).ready(async()=>{if($("nav ul.navbar-nav").html(xe()),$("#logosvg").html(ye()),$("#badge").html(Le()),$("#footer").html(ke()),await Gt()){if($("#backendBtns"))try{await navigator.ml.createContext({deviceType:"npu"})}catch{$("#webnn_npu").parent().addClass("disabled"),$("#webnn_npu").parent().addClass("btn-outline-secondary"),$("#webnn_npu").parent().removeClass("btn-outline-info"),$("#webnn_npu").parent().attr("title","Unable to find a capable NPU adapter.")}$("#webnnstatus").html("supported").addClass("webnn-status-true")}else $("#backendBtns")&&($('label[name="webnn"]').addClass("disabled"),$('label[name="webnn"]').addClass("btn-outline-secondary"),$('label[name="webnn"]').removeClass("btn-outline-info"),$('label[name="webnn"]').attr("title","WebNN is not supported!")),$("#webnnstatus").html("not supported").addClass("webnn-status-false")});
