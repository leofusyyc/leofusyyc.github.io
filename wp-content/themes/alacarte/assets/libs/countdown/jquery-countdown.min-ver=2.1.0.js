!function(){var g=!1;window.JQClass=function(){};JQClass.classes={};JQClass.extend=function d(b){function c(){!g&&this._init&&this._init.apply(this,arguments)}var f=this.prototype;g=!0;var e=new this;g=!1;for(var h in b)if("function"==typeof b[h]&&"function"==typeof f[h])e[h]=function(b,d){return function(){var c=this._super;this._super=function(d){return f[b].apply(this,d||[])};var e=d.apply(this,arguments);return this._super=c,e}}(h,b[h]);else if("object"==typeof b[h]&&"object"==typeof f[h]&&"defaultOptions"===
h){var l,m=f[h],k=b[h],n={};for(l in m)n[l]=m[l];for(l in k)n[l]=k[l];e[h]=n}else e[h]=b[h];return c.prototype=e,c.prototype.constructor=c,c.extend=d,c}}();
(function(g){function a(a){return a.replace(/-([a-z])/g,function(a,b){return b.toUpperCase()})}JQClass.classes.JQPlugin=JQClass.extend({name:"plugin",defaultOptions:{},regionalOptions:{},deepMerge:!0,_getMarker:function(){return"is-"+this.name},_init:function(){g.extend(this.defaultOptions,this.regionalOptions&&this.regionalOptions[""]||{});var b=a(this.name);g[b]=this;g.fn[b]=function(a){var d=Array.prototype.slice.call(arguments,1),f=this,e=this;return this.each(function(){if("string"==typeof a){if("_"===
a[0]||!g[b][a])throw"Unknown method: "+a;var c=g[b][a].apply(g[b],[this].concat(d));if(c!==f&&void 0!==c)return e=c,!1}else g[b]._attach(this,a)}),e}},setDefaults:function(a){g.extend(this.defaultOptions,a||{})},_attach:function(a,d){if(a=g(a),!a.hasClass(this._getMarker())){a.addClass(this._getMarker());d=g.extend(this.deepMerge,{},this.defaultOptions,this._getMetadata(a),d||{});var b=g.extend({name:this.name,elem:a,options:d},this._instSettings(a,d));a.data(this.name,b);this._postAttach(a,b);this.option(a,
d)}},_instSettings:function(a,d){return{}},_postAttach:function(a,d){},_getMetadata:function(a){try{var b=a.data(this.name.toLowerCase())||"";b=b.replace(/(\\?)'/g,function(a,b){return b?"'":'"'}).replace(/([a-zA-Z0-9]+):/g,function(a,d,c){return(a=b.substring(0,c).match(/"/g))&&0!==a.length%2?d+":":'"'+d+'":'}).replace(/\\:/g,":");b=g.parseJSON("{"+b+"}");for(var c in b)if(b.hasOwnProperty(c)){var f=b[c];"string"==typeof f&&f.match(/^new Date\(([-0-9,\s]*)\)$/)&&(b[c]=eval(f))}return b}catch(e){return{}}},
_getInst:function(a){return g(a).data(this.name)||{}},option:function(a,d,c){a=g(a);var b=a.data(this.name),e=d||{};return!d||"string"==typeof d&&"undefined"==typeof c?(e=(b||{}).options,e&&d?e[d]:e):void(a.hasClass(this._getMarker())&&("string"==typeof d&&(e={},e[d]=c),this._optionsChanged(a,b,e),g.extend(b.options,e)))},_optionsChanged:function(a,d,c){},destroy:function(a){a=g(a);a.hasClass(this._getMarker())&&(this._preDestroy(a,this._getInst(a)),a.removeData(this.name).removeClass(this._getMarker()))},
_preDestroy:function(a,d){}});g.JQPlugin={createPlugin:function(b,d){"object"==typeof b&&(d=b,b="JQPlugin");b=a(b);var c=a(d.name);JQClass.classes[c]=JQClass.classes[b].extend(d);new JQClass.classes[c]}}})(jQuery);
!function(g){g.JQPlugin.createPlugin({name:"countdown",defaultOptions:{until:null,since:null,timezone:null,serverSync:null,format:"dHMS",layout:"",compact:!1,padZeroes:!1,significant:0,description:"",expiryUrl:"",expiryText:"",alwaysExpire:!1,onExpiry:null,onTick:null,tickInterval:1},regionalOptions:{"":{labels:"Years Months Weeks Days Hours Minutes Seconds".split(" "),labels1:"Year Month Week Day Hour Minute Second".split(" "),compactLabels:["y","m","w","d"],whichLabels:null,digits:"0123456789".split(""),
timeSeparator:":",isRTL:!1}},_rtlClass:"countdown-rtl",_sectionClass:"countdown-section",_amountClass:"countdown-amount",_periodClass:"countdown-period",_rowClass:"countdown-row",_holdingClass:"countdown-holding",_showClass:"countdown-show",_descrClass:"countdown-descr",_timerElems:[],_init:function(){function a(h){h=1E12>h?c?window.performance.now()+window.performance.timing.navigationStart:d():h||d();1E3<=h-e&&(b._updateElems(),e=h);f(a)}var b=this;this._super();this._serverSyncs=[];var d="function"==
typeof Date.now?Date.now:function(){return(new Date).getTime()},c=window.performance&&"function"==typeof window.performance.now,f=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||null,e=0;!f||g.noRequestAnimationFrame?(g.noRequestAnimationFrame=null,g.countdown._timer=setInterval(function(){b._updateElems()},1E3)):(e=window.animationStartTime||window.webkitAnimationStartTime||window.mozAnimationStartTime||
window.oAnimationStartTime||window.msAnimationStartTime||d(),f(a))},UTCDate:function(a,b,d,c,f,e,h,g){"object"==typeof b&&b instanceof Date&&(g=b.getMilliseconds(),h=b.getSeconds(),e=b.getMinutes(),f=b.getHours(),c=b.getDate(),d=b.getMonth(),b=b.getFullYear());var l=new Date;return l.setUTCFullYear(b),l.setUTCDate(1),l.setUTCMonth(d||0),l.setUTCDate(c||1),l.setUTCHours(f||0),l.setUTCMinutes((e||0)-(30>Math.abs(a)?60*a:a)),l.setUTCSeconds(h||0),l.setUTCMilliseconds(g||0),l},periodsToSeconds:function(a){return 31557600*
a[0]+2629800*a[1]+604800*a[2]+86400*a[3]+3600*a[4]+60*a[5]+a[6]},resync:function(){var a=this;g("."+this._getMarker()).each(function(){var b=g.data(this,a.name);if(b.options.serverSync){for(var c=null,f=0;f<a._serverSyncs.length;f++)if(a._serverSyncs[f][0]===b.options.serverSync){c=a._serverSyncs[f];break}a._eqNull(c[2])&&(f=g.isFunction(b.options.serverSync)?b.options.serverSync.apply(this,[]):null,c[2]=(f?(new Date).getTime()-f.getTime():0)-c[1]);b._since&&b._since.setMilliseconds(b._since.getMilliseconds()+
c[2]);b._until.setMilliseconds(b._until.getMilliseconds()+c[2])}});for(var b=0;b<a._serverSyncs.length;b++)a._eqNull(a._serverSyncs[b][2])||(a._serverSyncs[b][1]+=a._serverSyncs[b][2],delete a._serverSyncs[b][2])},_instSettings:function(a,b){return{_periods:[0,0,0,0,0,0,0]}},_addElem:function(a){this._hasElem(a)||this._timerElems.push(a)},_hasElem:function(a){return-1<g.inArray(a,this._timerElems)},_removeElem:function(a){this._timerElems=g.map(this._timerElems,function(b){return b===a?null:b})},
_updateElems:function(){for(var a=this._timerElems.length-1;0<=a;a--)this._updateCountdown(this._timerElems[a])},_optionsChanged:function(a,b,d){d.layout&&(d.layout=d.layout.replace(/&lt;/g,"<").replace(/&gt;/g,">"));this._resetExtraLabels(b.options,d);var c=b.options.timezone!==d.timezone;g.extend(b.options,d);this._adjustSettings(a,b,!this._eqNull(d.until)||!this._eqNull(d.since)||c);d=new Date;(b._since&&b._since<d||b._until&&b._until>d)&&this._addElem(a[0]);this._updateCountdown(a,b)},_updateCountdown:function(a,
b){if(a=a.jquery?a:g(a),b=b||this._getInst(a)){if(a.html(this._generateHTML(b)).toggleClass(this._rtlClass,b.options.isRTL),"pause"!==b._hold&&g.isFunction(b.options.onTick)){var d="lap"!==b._hold?b._periods:this._calculatePeriods(b,b._show,b.options.significant,new Date);1!==b.options.tickInterval&&0!==this.periodsToSeconds(d)%b.options.tickInterval||b.options.onTick.apply(a[0],[d])}if("pause"!==b._hold&&(b._since?b._now.getTime()<b._since.getTime():b._now.getTime()>=b._until.getTime())&&!b._expiring){if(b._expiring=
!0,this._hasElem(a[0])||b.options.alwaysExpire){if(this._removeElem(a[0]),g.isFunction(b.options.onExpiry)&&b.options.onExpiry.apply(a[0],[]),b.options.expiryText)d=b.options.layout,b.options.layout=b.options.expiryText,this._updateCountdown(a[0],b),b.options.layout=d;b.options.expiryUrl&&(window.location=b.options.expiryUrl)}b._expiring=!1}else"pause"===b._hold&&this._removeElem(a[0])}},_resetExtraLabels:function(a,b){var d=null;for(d in b)d.match(/[Ll]abels[02-9]|compactLabels1/)&&(a[d]=b[d]);for(d in a)d.match(/[Ll]abels[02-9]|compactLabels1/)&&
"undefined"==typeof b[d]&&(a[d]=null)},_eqNull:function(a){return"undefined"==typeof a||null===a},_adjustSettings:function(a,b,d){for(var c=null,f=0;f<this._serverSyncs.length;f++)if(this._serverSyncs[f][0]===b.options.serverSync){c=this._serverSyncs[f][1];break}this._eqNull(c)?(c=g.isFunction(b.options.serverSync)?b.options.serverSync.apply(a[0],[]):null,a=new Date,c=c?a.getTime()-c.getTime():0,this._serverSyncs.push([b.options.serverSync,c])):(a=new Date,c=b.options.serverSync?c:0);f=b.options.timezone;
f=this._eqNull(f)?-a.getTimezoneOffset():f;(d||!d&&this._eqNull(b._until)&&this._eqNull(b._since))&&(b._since=b.options.since,this._eqNull(b._since)||(b._since=this.UTCDate(f,this._determineTime(b._since,null)),b._since&&c&&b._since.setMilliseconds(b._since.getMilliseconds()+c)),b._until=this.UTCDate(f,this._determineTime(b.options.until,a)),c&&b._until.setMilliseconds(b._until.getMilliseconds()+c));b._show=this._determineShow(b)},_preDestroy:function(a,b){this._removeElem(a[0]);a.empty()},pause:function(a){this._hold(a,
"pause")},lap:function(a){this._hold(a,"lap")},resume:function(a){this._hold(a,null)},toggle:function(a){this[(g.data(a,this.name)||{})._hold?"resume":"pause"](a)},toggleLap:function(a){this[(g.data(a,this.name)||{})._hold?"resume":"lap"](a)},_hold:function(a,b){var d=g.data(a,this.name);if(d){if("pause"===d._hold&&!b){d._periods=d._savePeriods;var c=d._since?"-":"+";d[d._since?"_since":"_until"]=this._determineTime(c+d._periods[0]+"y"+c+d._periods[1]+"o"+c+d._periods[2]+"w"+c+d._periods[3]+"d"+c+
d._periods[4]+"h"+c+d._periods[5]+"m"+c+d._periods[6]+"s");this._addElem(a)}d._hold=b;d._savePeriods="pause"===b?d._periods:null;g.data(a,this.name,d);this._updateCountdown(a,d)}},getTimes:function(a){return(a=g.data(a,this.name))?"pause"===a._hold?a._savePeriods:a._hold?this._calculatePeriods(a,a._show,a.options.significant,new Date):a._periods:null},_determineTime:function(a,b){var d=this,c=function(a){var b=new Date;return b.setTime(b.getTime()+1E3*a),b},f=function(a){a=a.toLowerCase();var b=new Date,
c=b.getFullYear(),e=b.getMonth(),f=b.getDate(),g=b.getHours(),q=b.getMinutes();b=b.getSeconds();for(var r=/([+-]?[0-9]+)\s*(s|m|h|d|w|o|y)?/g,p=r.exec(a);p;){switch(p[2]||"s"){case "s":b+=parseInt(p[1],10);break;case "m":q+=parseInt(p[1],10);break;case "h":g+=parseInt(p[1],10);break;case "d":f+=parseInt(p[1],10);break;case "w":f+=7*parseInt(p[1],10);break;case "o":e+=parseInt(p[1],10);f=Math.min(f,d._getDaysInMonth(c,e));break;case "y":c+=parseInt(p[1],10),f=Math.min(f,d._getDaysInMonth(c,e))}p=r.exec(a)}return new Date(c,
e,f,g,q,b,0)};c=this._eqNull(a)?b:"string"==typeof a?f(a):"number"==typeof a?c(a):a;return c&&c.setMilliseconds(0),c},_getDaysInMonth:function(a,b){return 32-(new Date(a,b,32)).getDate()},_normalLabels:function(a){return a},_generateHTML:function(a){var b=this;a._periods=a._hold?a._periods:this._calculatePeriods(a,a._show,a.options.significant,new Date);var d=!1,c=0,f=a.options.significant,e=g.extend({},a._show),h=null;for(h=0;6>=h;h++)d=d||"?"===a._show[h]&&0<a._periods[h],e[h]="?"!==a._show[h]||
d?a._show[h]:null,c+=e[h]?1:0,f-=0<a._periods[h]?1:0;var l=[!1,!1,!1,!1,!1,!1,!1];for(h=6;0<=h;h--)a._show[h]&&(a._periods[h]?l[h]=!0:(l[h]=0<f,f--));var m=a.options.compact?a.options.compactLabels:a.options.labels,k=a.options.whichLabels||this._normalLabels;d=function(c){var d=a.options["compactLabels"+k(a._periods[c])];return e[c]?b._translateDigits(a,a._periods[c])+(d?d[c]:m[c])+" ":""};var n=a.options.padZeroes?2:1;f=function(c){var d=a.options["labels"+k(a._periods[c])];return!a.options.significant&&
e[c]||a.options.significant&&l[c]?'<span class="'+b._sectionClass+'"><span class="'+b._amountClass+'">'+b._minDigits(a,a._periods[c],n)+'</span><span class="'+b._periodClass+'">'+(d?d[c]:m[c])+"</span></span>":""};return a.options.layout?this._buildLayout(a,e,a.options.layout,a.options.compact,a.options.significant,l):(a.options.compact?'<span class="'+this._rowClass+" "+this._amountClass+(a._hold?" "+this._holdingClass:"")+'">'+d(0)+d(1)+d(2)+d(3)+(e[4]?this._minDigits(a,a._periods[4],2):"")+(e[5]?
(e[4]?a.options.timeSeparator:"")+this._minDigits(a,a._periods[5],2):"")+(e[6]?(e[4]||e[5]?a.options.timeSeparator:"")+this._minDigits(a,a._periods[6],2):""):'<span class="'+this._rowClass+" "+this._showClass+(a.options.significant||c)+(a._hold?" "+this._holdingClass:"")+'">'+f(0)+f(1)+f(2)+f(3)+f(4)+f(5)+f(6))+"</span>"+(a.options.description?'<span class="'+this._rowClass+" "+this._descrClass+'">'+a.options.description+"</span>":"")},_buildLayout:function(a,b,d,c,f,e){var h=a.options[c?"compactLabels":
"labels"],l=a.options.whichLabels||this._normalLabels,m=function(b){return(a.options[(c?"compactLabels":"labels")+l(a._periods[b])]||h)[b]},k=function(b,c){return a.options.digits[Math.floor(b/c)%10]};m={desc:a.options.description,sep:a.options.timeSeparator,yl:m(0),yn:this._minDigits(a,a._periods[0],1),ynn:this._minDigits(a,a._periods[0],2),ynnn:this._minDigits(a,a._periods[0],3),y1:k(a._periods[0],1),y10:k(a._periods[0],10),y100:k(a._periods[0],100),y1000:k(a._periods[0],1E3),ol:m(1),on:this._minDigits(a,
a._periods[1],1),onn:this._minDigits(a,a._periods[1],2),onnn:this._minDigits(a,a._periods[1],3),o1:k(a._periods[1],1),o10:k(a._periods[1],10),o100:k(a._periods[1],100),o1000:k(a._periods[1],1E3),wl:m(2),wn:this._minDigits(a,a._periods[2],1),wnn:this._minDigits(a,a._periods[2],2),wnnn:this._minDigits(a,a._periods[2],3),w1:k(a._periods[2],1),w10:k(a._periods[2],10),w100:k(a._periods[2],100),w1000:k(a._periods[2],1E3),dl:m(3),dn:this._minDigits(a,a._periods[3],1),dnn:this._minDigits(a,a._periods[3],
2),dnnn:this._minDigits(a,a._periods[3],3),d1:k(a._periods[3],1),d10:k(a._periods[3],10),d100:k(a._periods[3],100),d1000:k(a._periods[3],1E3),hl:m(4),hn:this._minDigits(a,a._periods[4],1),hnn:this._minDigits(a,a._periods[4],2),hnnn:this._minDigits(a,a._periods[4],3),h1:k(a._periods[4],1),h10:k(a._periods[4],10),h100:k(a._periods[4],100),h1000:k(a._periods[4],1E3),ml:m(5),mn:this._minDigits(a,a._periods[5],1),mnn:this._minDigits(a,a._periods[5],2),mnnn:this._minDigits(a,a._periods[5],3),m1:k(a._periods[5],
1),m10:k(a._periods[5],10),m100:k(a._periods[5],100),m1000:k(a._periods[5],1E3),sl:m(6),sn:this._minDigits(a,a._periods[6],1),snn:this._minDigits(a,a._periods[6],2),snnn:this._minDigits(a,a._periods[6],3),s1:k(a._periods[6],1),s10:k(a._periods[6],10),s100:k(a._periods[6],100),s1000:k(a._periods[6],1E3)};var n=d;for(d=0;6>=d;d++)k="yowdhms".charAt(d),n=n.replace(new RegExp("\\{"+k+"<\\}([\\s\\S]*)\\{"+k+">\\}","g"),!f&&b[d]||f&&e[d]?"$1":"");return g.each(m,function(a,b){n=n.replace(new RegExp("\\{"+
a+"\\}","g"),b)}),n},_minDigits:function(a,b,d){return b=""+b,b.length>=d?this._translateDigits(a,b):(b="0000000000"+b,this._translateDigits(a,b.substr(b.length-d)))},_translateDigits:function(a,b){return(""+b).replace(/[0-9]/g,function(b){return a.options.digits[b]})},_determineShow:function(a){a=a.options.format;var b=[];return b[0]=a.match("y")?"?":a.match("Y")?"!":null,b[1]=a.match("o")?"?":a.match("O")?"!":null,b[2]=a.match("w")?"?":a.match("W")?"!":null,b[3]=a.match("d")?"?":a.match("D")?"!":
null,b[4]=a.match("h")?"?":a.match("H")?"!":null,b[5]=a.match("m")?"?":a.match("M")?"!":null,b[6]=a.match("s")?"?":a.match("S")?"!":null,b},_calculatePeriods:function(a,b,d,c){a._now=c;a._now.setMilliseconds(0);var f=new Date(a._now.getTime());a._since?c.getTime()<a._since.getTime()?a._now=c=f:c=a._since:(f.setTime(a._until.getTime()),c.getTime()>a._until.getTime()&&(a._now=c=f));var e=[0,0,0,0,0,0,0];if(b[0]||b[1]){var h=this._getDaysInMonth(c.getFullYear(),c.getMonth()),g=this._getDaysInMonth(f.getFullYear(),
f.getMonth());g=f.getDate()===c.getDate()||f.getDate()>=Math.min(h,g)&&c.getDate()>=Math.min(h,g);var m=function(a){return 60*(60*a.getHours()+a.getMinutes())+a.getSeconds()};g=Math.max(0,12*(f.getFullYear()-c.getFullYear())+f.getMonth()-c.getMonth()+(f.getDate()<c.getDate()&&!g||g&&m(f)<m(c)?-1:0));e[0]=b[0]?Math.floor(g/12):0;e[1]=b[1]?g-12*e[0]:0;c=new Date(c.getTime());h=c.getDate()===h;g=this._getDaysInMonth(c.getFullYear()+e[0],c.getMonth()+e[1]);c.getDate()>g&&c.setDate(g);c.setFullYear(c.getFullYear()+
e[0]);c.setMonth(c.getMonth()+e[1]);h&&c.setDate(g)}var k=Math.floor((f.getTime()-c.getTime())/1E3);c=null;c=function(a,c){e[a]=b[a]?Math.floor(k/c):0;k-=e[a]*c};if(c(2,604800),c(3,86400),c(4,3600),c(5,60),c(6,1),0<k&&!a._since)for(a=[1,12,4.3482,7,24,60,60],f=6,h=1,c=6;0<=c;c--)b[c]&&(e[f]>=h&&(e[f]=0,k=1),0<k&&(e[c]++,k=0,f=c,h=1)),h*=a[c];if(d)for(c=0;6>=c;c++)d&&e[c]?d--:d||(e[c]=0);return e}})}(jQuery);
jQuery(document).ready(function(g){function a(){var a=[];g(".oc-countdown").each(function(){var b=g(this).find(".oc-countdown-bar"),c=b.data("count"),f=b.data("format"),e=b.data("timezone"),h="",l=(new Date).getTimezoneOffset();l=-l/60-e;if(void 0!=c){e=b.attr("data-label");e=void 0!=e&&""!=e?e.split(","):"YEARS MONTHS DAYS HOURS MINUTES SECONDS".split(" ");switch(f){case 1:f="yowdHMS";h='<span class="countdown row justify-content-center"><span class="countdown-section year col-auto"><span class="countdown-amount">{ynn}</span><span class="countdown-label">'+
e[0]+'</span></span><span class="countdown-section month col-auto"><span class="countdown-amount">{onn}</span><span class="countdown-label">'+e[1]+'</span></span><span class="countdown-section week col-auto"><span class="countdown-amount">{wnn}</span><span class="countdown-label">'+e[2]+'</span></span><span class="countdown-section day col-auto"><span class="countdown-amount">{dnn}</span><span class="countdown-label">'+e[3]+'</span></span><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+
e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+e[6]+"</span></span></span>";break;case 2:f="owdHMS";h='<span class="countdown row justify-content-center"><span class="countdown-section month col-auto"><span class="countdown-amount">{onn}</span><span class="countdown-label">'+
e[1]+'</span></span><span class="countdown-section week col-auto"><span class="countdown-amount">{wnn}</span><span class="countdown-label">'+e[2]+'</span></span><span class="countdown-section day col-auto"><span class="countdown-amount">{dnn}</span><span class="countdown-label">'+e[3]+'</span></span><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+
e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+e[6]+"</span></span></span>";break;case 3:f="odHMS";h='<span class="countdown row justify-content-center"><span class="countdown-section month col-auto"><span class="countdown-amount">{onn}</span><span class="countdown-label">'+e[1]+'</span></span><span class="countdown-section day col-auto"><span class="countdown-amount">{dnn}</span><span class="countdown-label">'+
e[3]+'</span></span><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+e[6]+"</span></span></span>";break;case 4:f="wdHMS";h='<span class="countdown row justify-content-center"><span class="countdown-section week col-auto"><span class="countdown-amount">{wnn}</span><span class="countdown-label">'+
e[2]+'</span></span><span class="countdown-section day col-auto"><span class="countdown-amount">{dnn}</span><span class="countdown-label">'+e[3]+'</span></span><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+
e[6]+"</span></span></span>";break;case 5:f="dHMS";h='<span class="countdown row justify-content-center"><span class="countdown-section day col-auto"><span class="countdown-amount">{dnn}</span><span class="countdown-label">'+e[3]+'</span></span><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+
e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+e[6]+"</span></span></span>";break;case 6:f="HMS",h='<span class="countdown row justify-content-center"><span class="countdown-section hour col-auto"><span class="countdown-amount">{hnn}</span><span class="countdown-label">'+e[4]+'</span></span><span class="countdown-section minute col-auto"><span class="countdown-amount">{mnn}</span><span class="countdown-label">'+
e[5]+'</span></span><span class="countdown-section second col-auto"><span class="countdown-amount">{snn}</span><span class="countdown-label">'+e[6]+"</span></span></span>"}c=c.split(",");c=new Date(c[0],parseInt(c[1])-1,c[2],parseInt(c[3])+l,c[4],c[5]);a.push(b.countdown({until:c,format:f,layout:h}))}})}g(window).on("load",function(){a()})});