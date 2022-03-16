/*! For license information please see module.js.LICENSE.txt */
define(["react","emotion","@grafana/data","@grafana/ui"],(function(e,t,n,r){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=4)}([function(t,n){t.exports=e},function(e,n){e.exports=t},function(e,t){e.exports=n},function(e,t){e.exports=r},function(e,t,n){"use strict";n.r(t);var r=n(2);function o(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return i}function a(e,t){return Object.defineProperty?Object.defineProperty(e,"raw",{value:t}):e.raw=t,e}var i,l,u,s,c,f,p,d=n(0),b=n.n(d),v=n(1),m=n(3),x=function(e){var t=e.color,n=e.translate;return b.a.createElement("circle",{className:Object(v.css)(i||(i=a(["\n        fill: ",";\n        &:hover {\n          fill: white;\n          opacity: 30%;\n          r: 84px;\n        }\n      "],["\n        fill: ",";\n        &:hover {\n          fill: white;\n          opacity: 30%;\n          r: 84px;\n        }\n      "])),t),r:80,cx:n.x,cy:n.y})},h=Object(m.stylesFactory)((function(){return{wrapper:Object(v.css)(c||(c=a(["\n      position: relative;\n    "],["\n      position: relative;\n    "]))),svg:Object(v.css)(f||(f=a(["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "],["\n      position: absolute;\n      top: 0;\n      left: 0;\n    "]))),textBox:Object(v.css)(p||(p=a(["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "],["\n      position: absolute;\n      bottom: 0;\n      left: 0;\n      padding: 10px;\n    "])))}}));n.d(t,"plugin",(function(){return g}));var g=new r.PanelPlugin((function(e){var t,n=e.options,i=e.data,c=e.width,f=e.height,p=Object(m.useTheme)(),g=h(),y=n.color;switch(y){case"red":y=p.palette.redBase;break;case"green":y=p.palette.greenBase;break;case"blue":y=p.palette.blue95}var w=i.series.values.length,O=null===(t=i.series[w].fields.find((function(e){return e.type===r.FieldType.number})))||void 0===t?void 0:t.values.get(0),j=O<=50?"green":"red",S=o(Object(d.useState)(!1),2),P=S[0],E=S[1],B=o(Object(d.useState)({x:0,y:0}),2),N=B[0],z=B[1];return b.a.createElement("div",{className:Object(v.cx)(g.wrapper,Object(v.css)(l||(l=a(["\n          width: ","px;\n          height: ","px;\n        "],["\n          width: ","px;\n          height: ","px;\n        "])),c,f))},b.a.createElement("svg",{className:g.svg,width:c,height:f,xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",viewBox:"-"+c/2+" -"+f/2+" "+c+" "+f},b.a.createElement("g",{onPointerDown:function(e){E(!0)},onPointerMove:function(e){!function(e){P&&z({x:N.x+e.movementX,y:N.y+e.movementY})}(e)},onPointerUp:function(e){return E(!1)}},b.a.createElement(x,{color:y,translate:N}),b.a.createElement(x,{color:y,translate:N}))),b.a.createElement("div",{className:g.textBox},n.showSeriesCount&&b.a.createElement("div",{className:Object(v.css)(u||(u=a(["\n              font-size: ",";\n            "],["\n              font-size: ",";\n            "])),p.typography.size[n.seriesCountSize])},"Number of series: ",i.series.length),b.a.createElement("div",null,"Text option value: ",n.text),b.a.createElement("div",{className:Object(v.css)(s||(s=a(["\n            color: ",";\n          "],["\n            color: ",";\n          "])),j)},O)))})).setPanelOptions((function(e){return e.addTextInput({path:"text",name:"Simple text option",description:"Description of panel option",defaultValue:"Default value of text input option"}).addBooleanSwitch({path:"showSeriesCount",name:"Show series counter",defaultValue:!1}).addRadio({path:"color",name:"Circle color",defaultValue:"red",settings:{options:[{value:"red",label:"Red"},{value:"green",label:"Green"},{value:"blue",label:"Blue"}]}}).addRadio({path:"seriesCountSize",defaultValue:"sm",name:"Series counter size",settings:{options:[{value:"sm",label:"Small"},{value:"md",label:"Medium"},{value:"lg",label:"Large"}]},showIf:function(e){return e.showSeriesCount}})}))}])}));
//# sourceMappingURL=module.js.map