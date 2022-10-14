!function(t,e,i,s){function n(e,i){this.settings=null,this.options=t.extend({},n.Defaults,i),this.$element=t(e),this._handlers={},this._plugins={},this._supress={},this._current=null,this._speed=null,this._coordinates=[],this._breakpoint=null,this._width=null,this._items=[],this._clones=[],this._mergers=[],this._widths=[],this._invalidated={},this._pipe=[],this._drag={time:null,target:null,pointer:null,stage:{start:null,current:null},direction:null},this._states={current:{},tags:{initializing:["busy"],animating:["busy"],dragging:["interacting"]}},t.each(["onResize","onThrottledResize"],t.proxy(function(e,i){this._handlers[i]=t.proxy(this[i],this)},this)),t.each(n.Plugins,t.proxy(function(t,e){this._plugins[t.charAt(0).toLowerCase()+t.slice(1)]=new e(this)},this)),t.each(n.Workers,t.proxy(function(e,i){this._pipe.push({filter:i.filter,run:t.proxy(i.run,this)})},this)),this.setup(),this.initialize()}n.Defaults={items:3,loop:!1,center:!1,rewind:!1,mouseDrag:!0,touchDrag:!0,pullDrag:!0,freeDrag:!1,margin:0,stagePadding:0,merge:!1,mergeFit:!0,autoWidth:!1,startPosition:0,rtl:!1,smartSpeed:250,fluidSpeed:!1,dragEndSpeed:!1,responsive:{},responsiveRefreshRate:200,responsiveBaseElement:e,fallbackEasing:"swing",info:!1,nestedItemSelector:!1,itemElement:"div",stageElement:"div",refreshClass:"owl-refresh",loadedClass:"owl-loaded",loadingClass:"owl-loading",rtlClass:"owl-rtl",responsiveClass:"owl-responsive",dragClass:"owl-drag",itemClass:"owl-item",stageClass:"owl-stage",stageOuterClass:"owl-stage-outer",grabClass:"owl-grab"},n.Width={Default:"default",Inner:"inner",Outer:"outer"},n.Type={Event:"event",State:"state"},n.Plugins={},n.Workers=[{filter:["width","settings"],run:function(){this._width=this.$element.width()}},{filter:["width","items","settings"],run:function(t){t.current=this._items&&this._items[this.relative(this._current)]}},{filter:["items","settings"],run:function(){this.$stage.children(".cloned").remove()}},{filter:["width","items","settings"],run:function(t){var e=this.settings.margin||"",i=!this.settings.autoWidth,s=this.settings.rtl,n={width:"auto","margin-left":s?e:"","margin-right":s?"":e};!i&&this.$stage.children().css(n),t.css=n}},{filter:["width","items","settings"],run:function(t){var e=(this.width()/this.settings.items).toFixed(3)-this.settings.margin,i=null,s=this._items.length,n=!this.settings.autoWidth,o=[];for(t.items={merge:!1,width:e};s--;)i=this._mergers[s],i=this.settings.mergeFit&&Math.min(i,this.settings.items)||i,t.items.merge=i>1||t.items.merge,o[s]=n?e*i:this._items[s].width();this._widths=o}},{filter:["items","settings"],run:function(){var e=[],i=this._items,s=this.settings,n=Math.max(2*s.items,4),o=2*Math.ceil(i.length/2),r=s.loop&&i.length?s.rewind?n:Math.max(n,o):0,a="",h="";for(r/=2;r--;)e.push(this.normalize(e.length/2,!0)),a+=i[e[e.length-1]][0].outerHTML,e.push(this.normalize(i.length-1-(e.length-1)/2,!0)),h=i[e[e.length-1]][0].outerHTML+h;this._clones=e,t(a).addClass("cloned").appendTo(this.$stage),t(h).addClass("cloned").prependTo(this.$stage)}},{filter:["width","items","settings"],run:function(){for(var t=this.settings.rtl?1:-1,e=this._clones.length+this._items.length,i=-1,s=0,n=0,o=[];++i<e;)s=o[i-1]||0,n=this._widths[this.relative(i)]+this.settings.margin,o.push(s+n*t);this._coordinates=o}},{filter:["width","items","settings"],run:function(){var t=this.settings.stagePadding,e=this._coordinates,i={width:Math.ceil(Math.abs(e[e.length-1]))+2*t,"padding-left":t||"","padding-right":t||""};this.$stage.css(i)}},{filter:["width","items","settings"],run:function(t){var e=this._coordinates.length,i=!this.settings.autoWidth,s=this.$stage.children();if(i&&t.items.merge)for(;e--;)t.css.width=this._widths[this.relative(e)],s.eq(e).css(t.css);else i&&(t.css.width=t.items.width,s.css(t.css))}},{filter:["items"],run:function(){this._coordinates.length<1&&this.$stage.removeAttr("style")}},{filter:["width","items","settings"],run:function(t){t.current=t.current?this.$stage.children().index(t.current):0,t.current=Math.max(this.minimum(),Math.min(this.maximum(),t.current)),this.reset(t.current)}},{filter:["position"],run:function(){this.animate(this.coordinates(this._current))}},{filter:["width","position","items","settings"],run:function(){var t,e,i,s,n=this.settings.rtl?1:-1,o=2*this.settings.stagePadding,r=this.coordinates(this.current())+o,a=r+this.width()*n,h=[];for(i=0,s=this._coordinates.length;i<s;i++)t=this._coordinates[i-1]||0,e=Math.abs(this._coordinates[i])+o*n,(this.op(t,"<=",r)&&this.op(t,">",a)||this.op(e,"<",r)&&this.op(e,">",a))&&h.push(i);this.$stage.children(".active").removeClass("active"),this.$stage.children(":eq("+h.join("), :eq(")+")").addClass("active"),this.settings.center&&(this.$stage.children(".center").removeClass("center"),this.$stage.children().eq(this.current()).addClass("center"))}}],n.prototype.initialize=function(){if(this.enter("initializing"),this.trigger("initialize"),this.$element.toggleClass(this.settings.rtlClass,this.settings.rtl),this.settings.autoWidth&&!this.is("pre-loading")){var e,i,n;e=this.$element.find("img"),i=this.settings.nestedItemSelector?"."+this.settings.nestedItemSelector:s,n=this.$element.children(i).width(),e.length&&n<=0&&this.preloadAutoWidthImages(e)}this.$element.addClass(this.options.loadingClass),this.$stage=t("<"+this.settings.stageElement+' class="'+this.settings.stageClass+'"/>').wrap('<div class="'+this.settings.stageOuterClass+'"/>'),this.$element.append(this.$stage.parent()),this.replace(this.$element.children().not(this.$stage.parent())),this.$element.is(":visible")?this.refresh():this.invalidate("width"),this.$element.removeClass(this.options.loadingClass).addClass(this.options.loadedClass),this.registerEventHandlers(),this.leave("initializing"),this.trigger("initialized")},n.prototype.setup=function(){var e=this.viewport(),i=this.options.responsive,s=-1,n=null;i?(t.each(i,function(t){t<=e&&t>s&&(s=Number(t))}),n=t.extend({},this.options,i[s]),"function"==typeof n.stagePadding&&(n.stagePadding=n.stagePadding()),delete n.responsive,n.responsiveClass&&this.$element.attr("class",this.$element.attr("class").replace(new RegExp("("+this.options.responsiveClass+"-)\\S+\\s","g"),"$1"+s))):n=t.extend({},this.options),this.trigger("change",{property:{name:"settings",value:n}}),this._breakpoint=s,this.settings=n,this.invalidate("settings"),this.trigger("changed",{property:{name:"settings",value:this.settings}})},n.prototype.optionsLogic=function(){this.settings.autoWidth&&(this.settings.stagePadding=!1,this.settings.merge=!1)},n.prototype.prepare=function(e){var i=this.trigger("prepare",{content:e});return i.data||(i.data=t("<"+this.settings.itemElement+"/>").addClass(this.options.itemClass).append(e)),this.trigger("prepared",{content:i.data}),i.data},n.prototype.update=function(){for(var e=0,i=this._pipe.length,s=t.proxy(function(t){return this[t]},this._invalidated),n={};e<i;)(this._invalidated.all||t.grep(this._pipe[e].filter,s).length>0)&&this._pipe[e].run(n),e++;this._invalidated={},!this.is("valid")&&this.enter("valid")},n.prototype.width=function(t){switch(t=t||n.Width.Default){case n.Width.Inner:case n.Width.Outer:return this._width;default:return this._width-2*this.settings.stagePadding+this.settings.margin}},n.prototype.refresh=function(){this.enter("refreshing"),this.trigger("refresh"),this.setup(),this.optionsLogic(),this.$element.addClass(this.options.refreshClass),this.update(),this.$element.removeClass(this.options.refreshClass),this.leave("refreshing"),this.trigger("refreshed")},n.prototype.onThrottledResize=function(){e.clearTimeout(this.resizeTimer),this.resizeTimer=e.setTimeout(this._handlers.onResize,this.settings.responsiveRefreshRate)},n.prototype.onResize=function(){return!!this._items.length&&(this._width!==this.$element.width()&&(!!this.$element.is(":visible")&&(this.enter("resizing"),this.trigger("resize").isDefaultPrevented()?(this.leave("resizing"),!1):(this.invalidate("width"),this.refresh(),this.leave("resizing"),void this.trigger("resized")))))},n.prototype.registerEventHandlers=function(){t.support.transition&&this.$stage.on(t.support.transition.end+".owl.core",t.proxy(this.onTransitionEnd,this)),this.settings.responsive!==!1&&this.on(e,"resize",this._handlers.onThrottledResize),this.settings.mouseDrag&&(this.$element.addClass(this.options.dragClass),this.$stage.on("mousedown.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("dragstart.owl.core selectstart.owl.core",function(){return!1})),this.settings.touchDrag&&(this.$stage.on("touchstart.owl.core",t.proxy(this.onDragStart,this)),this.$stage.on("touchcancel.owl.core",t.proxy(this.onDragEnd,this)))},n.prototype.onDragStart=function(e){var s=null;3!==e.which&&(t.support.transform?(s=this.$stage.css("transform").replace(/.*\(|\)| /g,"").split(","),s={x:s[16===s.length?12:4],y:s[16===s.length?13:5]}):(s=this.$stage.position(),s={x:this.settings.rtl?s.left+this.$stage.width()-this.width()+this.settings.margin:s.left,y:s.top}),this.is("animating")&&(t.support.transform?this.animate(s.x):this.$stage.stop(),this.invalidate("position")),this.$element.toggleClass(this.options.grabClass,"mousedown"===e.type),this.speed(0),this._drag.time=(new Date).getTime(),this._drag.target=t(e.target),this._drag.stage.start=s,this._drag.stage.current=s,this._drag.pointer=this.pointer(e),t(i).on("mouseup.owl.core touchend.owl.core",t.proxy(this.onDragEnd,this)),t(i).one("mousemove.owl.core touchmove.owl.core",t.proxy(function(e){var s=this.difference(this._drag.pointer,this.pointer(e));t(i).on("mousemove.owl.core touchmove.owl.core",t.proxy(this.onDragMove,this)),Math.abs(s.x)<Math.abs(s.y)&&this.is("valid")||(e.preventDefault(),this.enter("dragging"),this.trigger("drag"))},this)))},n.prototype.onDragMove=function(t){var e=null,i=null,s=null,n=this.difference(this._drag.pointer,this.pointer(t)),o=this.difference(this._drag.stage.start,n);this.is("dragging")&&(t.preventDefault(),this.settings.loop?(e=this.coordinates(this.minimum()),i=this.coordinates(this.maximum()+1)-e,o.x=((o.x-e)%i+i)%i+e):(e=this.settings.rtl?this.coordinates(this.maximum()):this.coordinates(this.minimum()),i=this.settings.rtl?this.coordinates(this.minimum()):this.coordinates(this.maximum()),s=this.settings.pullDrag?-1*n.x/5:0,o.x=Math.max(Math.min(o.x,e+s),i+s)),this._drag.stage.current=o,this.animate(o.x))},n.prototype.onDragEnd=function(e){var s=this.difference(this._drag.pointer,this.pointer(e)),n=this._drag.stage.current,o=s.x>0^this.settings.rtl?"left":"right";t(i).off(".owl.core"),this.$element.removeClass(this.options.grabClass),(0!==s.x&&this.is("dragging")||!this.is("valid"))&&(this.speed(this.settings.dragEndSpeed||this.settings.smartSpeed),this.current(this.closest(n.x,0!==s.x?o:this._drag.direction)),this.invalidate("position"),this.update(),this._drag.direction=o,(Math.abs(s.x)>3||(new Date).getTime()-this._drag.time>300)&&this._drag.target.one("click.owl.core",function(){return!1})),this.is("dragging")&&(this.leave("dragging"),this.trigger("dragged"))},n.prototype.closest=function(e,i){var s=-1,n=30,o=this.width(),r=this.coordinates();return this.settings.freeDrag||t.each(r,t.proxy(function(t,a){return"left"===i&&e>a-n&&e<a+n?s=t:"right"===i&&e>a-o-n&&e<a-o+n?s=t+1:this.op(e,"<",a)&&this.op(e,">",r[t+1]||a-o)&&(s="left"===i?t+1:t),s===-1},this)),this.settings.loop||(this.op(e,">",r[this.minimum()])?s=e=this.minimum():this.op(e,"<",r[this.maximum()])&&(s=e=this.maximum())),s},n.prototype.animate=function(e){var i=this.speed()>0;this.is("animating")&&this.onTransitionEnd(),i&&(this.enter("animating"),this.trigger("translate")),t.support.transform3d&&t.support.transition?this.$stage.css({transform:"translate3d("+e+"px,0px,0px)",transition:this.speed()/1e3+"s"}):i?this.$stage.animate({left:e+"px"},this.speed(),this.settings.fallbackEasing,t.proxy(this.onTransitionEnd,this)):this.$stage.css({left:e+"px"})},n.prototype.is=function(t){return this._states.current[t]&&this._states.current[t]>0},n.prototype.current=function(t){if(t===s)return this._current;if(0===this._items.length)return s;if(t=this.normalize(t),this._current!==t){var e=this.trigger("change",{property:{name:"position",value:t}});e.data!==s&&(t=this.normalize(e.data)),this._current=t,this.invalidate("position"),this.trigger("changed",{property:{name:"position",value:this._current}})}return this._current},n.prototype.invalidate=function(e){return"string"===t.type(e)&&(this._invalidated[e]=!0,this.is("valid")&&this.leave("valid")),t.map(this._invalidated,function(t,e){return e})},n.prototype.reset=function(t){t=this.normalize(t),t!==s&&(this._speed=0,this._current=t,this.suppress(["translate","translated"]),this.animate(this.coordinates(t)),this.release(["translate","translated"]))},n.prototype.normalize=function(t,e){var i=this._items.length,n=e?0:this._clones.length;return!this.isNumeric(t)||i<1?t=s:(t<0||t>=i+n)&&(t=((t-n/2)%i+i)%i+n/2),t},n.prototype.relative=function(t){return t-=this._clones.length/2,this.normalize(t,!0)},n.prototype.maximum=function(t){var e,i,s,n=this.settings,o=this._coordinates.length;if(n.loop)o=this._clones.length/2+this._items.length-1;else if(n.autoWidth||n.merge){for(e=this._items.length,i=this._items[--e].width(),s=this.$element.width();e--&&(i+=this._items[e].width()+this.settings.margin,!(i>s)););o=e+1}else o=n.center?this._items.length-1:this._items.length-n.items;return t&&(o-=this._clones.length/2),Math.max(o,0)},n.prototype.minimum=function(t){return t?0:this._clones.length/2},n.prototype.items=function(t){return t===s?this._items.slice():(t=this.normalize(t,!0),this._items[t])},n.prototype.mergers=function(t){return t===s?this._mergers.slice():(t=this.normalize(t,!0),this._mergers[t])},n.prototype.clones=function(e){var i=this._clones.length/2,n=i+this._items.length,o=function(t){return t%2===0?n+t/2:i-(t+1)/2};return e===s?t.map(this._clones,function(t,e){return o(e)}):t.map(this._clones,function(t,i){return t===e?o(i):null})},n.prototype.speed=function(t){return t!==s&&(this._speed=t),this._speed},n.prototype.coordinates=function(e){var i,n=1,o=e-1;return e===s?t.map(this._coordinates,t.proxy(function(t,e){return this.coordinates(e)},this)):(this.settings.center?(this.settings.rtl&&(n=-1,o=e+1),i=this._coordinates[e],i+=(this.width()-i+(this._coordinates[o]||0))/2*n):i=this._coordinates[o]||0,i=Math.ceil(i))},n.prototype.duration=function(t,e,i){return 0===i?0:Math.min(Math.max(Math.abs(e-t),1),6)*Math.abs(i||this.settings.smartSpeed)},n.prototype.to=function(t,e){var i=this.current(),s=null,n=t-this.relative(i),o=(n>0)-(n<0),r=this._items.length,a=this.minimum(),h=this.maximum();this.settings.loop?(!this.settings.rewind&&Math.abs(n)>r/2&&(n+=o*-1*r),t=i+n,s=((t-a)%r+r)%r+a,s!==t&&s-n<=h&&s-n>0&&(i=s-n,t=s,this.reset(i))):this.settings.rewind?(h+=1,t=(t%h+h)%h):t=Math.max(a,Math.min(h,t)),this.speed(this.duration(i,t,e)),this.current(t),this.$element.is(":visible")&&this.update()},n.prototype.next=function(t){t=t||!1,this.to(this.relative(this.current())+1,t)},n.prototype.prev=function(t){t=t||!1,this.to(this.relative(this.current())-1,t)},n.prototype.onTransitionEnd=function(t){return(t===s||(t.stopPropagation(),(t.target||t.srcElement||t.originalTarget)===this.$stage.get(0)))&&(this.leave("animating"),void this.trigger("translated"))},n.prototype.viewport=function(){var s;if(this.options.responsiveBaseElement!==e)s=t(this.options.responsiveBaseElement).width();else if(e.innerWidth)s=e.innerWidth;else{if(!i.documentElement||!i.documentElement.clientWidth)throw"Can not detect viewport width.";s=i.documentElement.clientWidth}return s},n.prototype.replace=function(e){this.$stage.empty(),this._items=[],e&&(e=e instanceof jQuery?e:t(e)),this.settings.nestedItemSelector&&(e=e.find("."+this.settings.nestedItemSelector)),e.filter(function(){return 1===this.nodeType}).each(t.proxy(function(t,e){e=this.prepare(e),this.$stage.append(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)},this)),this.reset(this.isNumeric(this.settings.startPosition)?this.settings.startPosition:0),this.invalidate("items")},n.prototype.add=function(e,i){var n=this.relative(this._current);i=i===s?this._items.length:this.normalize(i,!0),e=e instanceof jQuery?e:t(e),this.trigger("add",{content:e,position:i}),e=this.prepare(e),0===this._items.length||i===this._items.length?(0===this._items.length&&this.$stage.append(e),0!==this._items.length&&this._items[i-1].after(e),this._items.push(e),this._mergers.push(1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)):(this._items[i].before(e),this._items.splice(i,0,e),this._mergers.splice(i,0,1*e.find("[data-merge]").addBack("[data-merge]").attr("data-merge")||1)),this._items[n]&&this.reset(this._items[n].index()),this.invalidate("items"),this.trigger("added",{content:e,position:i})},n.prototype.remove=function(t){t=this.normalize(t,!0),t!==s&&(this.trigger("remove",{content:this._items[t],position:t}),this._items[t].remove(),this._items.splice(t,1),this._mergers.splice(t,1),this.invalidate("items"),this.trigger("removed",{content:null,position:t}))},n.prototype.preloadAutoWidthImages=function(e){e.each(t.proxy(function(e,i){this.enter("pre-loading"),i=t(i),t(new Image).one("load",t.proxy(function(t){i.attr("src",t.target.src),i.css("opacity",1),this.leave("pre-loading"),!this.is("pre-loading")&&!this.is("initializing")&&this.refresh()},this)).attr("src",i.attr("src")||i.attr("data-src")||i.attr("data-src-retina"))},this))},n.prototype.destroy=function(){this.$element.off(".owl.core"),this.$stage.off(".owl.core"),t(i).off(".owl.core"),this.settings.responsive!==!1&&(e.clearTimeout(this.resizeTimer),this.off(e,"resize",this._handlers.onThrottledResize));for(var s in this._plugins)this._plugins[s].destroy();this.$stage.children(".cloned").remove(),this.$stage.unwrap(),this.$stage.children().contents().unwrap(),this.$stage.children().unwrap(),this.$element.removeClass(this.options.refreshClass).removeClass(this.options.loadingClass).removeClass(this.options.loadedClass).removeClass(this.options.rtlClass).removeClass(this.options.dragClass).removeClass(this.options.grabClass).attr("class",this.$element.attr("class").replace(new RegExp(this.options.responsiveClass+"-\\S+\\s","g"),"")).removeData("owl.carousel")},n.prototype.op=function(t,e,i){var s=this.settings.rtl;switch(e){case"<":return s?t>i:t<i;case">":return s?t<i:t>i;case">=":return s?t<=i:t>=i;case"<=":return s?t>=i:t<=i}},n.prototype.on=function(t,e,i,s){t.addEventListener?t.addEventListener(e,i,s):t.attachEvent&&t.attachEvent("on"+e,i)},n.prototype.off=function(t,e,i,s){t.removeEventListener?t.removeEventListener(e,i,s):t.detachEvent&&t.detachEvent("on"+e,i)},n.prototype.trigger=function(e,i,s,o,r){var a={item:{count:this._items.length,index:this.current()}},h=t.camelCase(t.grep(["on",e,s],function(t){return t}).join("-").toLowerCase()),l=t.Event([e,"owl",s||"carousel"].join(".").toLowerCase(),t.extend({relatedTarget:this},a,i));return this._supress[e]||(t.each(this._plugins,function(t,e){e.onTrigger&&e.onTrigger(l)}),this.register({type:n.Type.Event,name:e}),this.$element.trigger(l),this.settings&&"function"==typeof this.settings[h]&&this.settings[h].call(this,l)),l},n.prototype.enter=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){this._states.current[e]===s&&(this._states.current[e]=0),this._states.current[e]++},this))},n.prototype.leave=function(e){t.each([e].concat(this._states.tags[e]||[]),t.proxy(function(t,e){this._states.current[e]--},this))},n.prototype.register=function(e){if(e.type===n.Type.Event){if(t.event.special[e.name]||(t.event.special[e.name]={}),!t.event.special[e.name].owl){var i=t.event.special[e.name]._default;t.event.special[e.name]._default=function(t){return!i||!i.apply||t.namespace&&t.namespace.indexOf("owl")!==-1?t.namespace&&t.namespace.indexOf("owl")>-1:i.apply(this,arguments)},t.event.special[e.name].owl=!0}}else e.type===n.Type.State&&(this._states.tags[e.name]?this._states.tags[e.name]=this._states.tags[e.name].concat(e.tags):this._states.tags[e.name]=e.tags,this._states.tags[e.name]=t.grep(this._states.tags[e.name],t.proxy(function(i,s){return t.inArray(i,this._states.tags[e.name])===s},this)))},n.prototype.suppress=function(e){t.each(e,t.proxy(function(t,e){this._supress[e]=!0},this))},n.prototype.release=function(e){t.each(e,t.proxy(function(t,e){delete this._supress[e]},this))},n.prototype.pointer=function(t){var i={x:null,y:null};return t=t.originalEvent||t||e.event,t=t.touches&&t.touches.length?t.touches[0]:t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,t.pageX?(i.x=t.pageX,i.y=t.pageY):(i.x=t.clientX,i.y=t.clientY),i},n.prototype.isNumeric=function(t){return!isNaN(parseFloat(t))},n.prototype.difference=function(t,e){return{x:t.x-e.x,y:t.y-e.y}},t.fn.owlCarousel=function(e){var i=Array.prototype.slice.call(arguments,1);return this.each(function(){var s=t(this),o=s.data("owl.carousel");o||(o=new n(this,"object"==typeof e&&e),s.data("owl.carousel",o),t.each(["next","prev","to","destroy","refresh","replace","add","remove"],function(e,i){o.register({type:n.Type.Event,name:i}),o.$element.on(i+".owl.carousel.core",t.proxy(function(t){t.namespace&&t.relatedTarget!==this&&(this.suppress([i]),o[i].apply(this,[].slice.call(arguments,1)),this.release([i]))},o))})),"string"==typeof e&&"_"!==e.charAt(0)&&o[e].apply(o,i)})},t.fn.owlCarousel.Constructor=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._interval=null,this._visible=null,this._handlers={"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoRefresh&&this.watch()},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers)};n.Defaults={autoRefresh:!0,autoRefreshInterval:500},n.prototype.watch=function(){this._interval||(this._visible=this._core.$element.is(":visible"),this._interval=e.setInterval(t.proxy(this.refresh,this),this._core.settings.autoRefreshInterval))},n.prototype.refresh=function(){this._core.$element.is(":visible")!==this._visible&&(this._visible=!this._visible,this._core.$element.toggleClass("owl-hidden",!this._visible),this._visible&&this._core.invalidate("width")&&this._core.refresh())},n.prototype.destroy=function(){var t,i;e.clearInterval(this._interval);for(t in this._handlers)this._core.$element.off(t,this._handlers[t]);for(i in Object.getOwnPropertyNames(this))"function"!=typeof this[i]&&(this[i]=null)},t.fn.owlCarousel.Constructor.Plugins.AutoRefresh=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._loaded=[],this._handlers={"initialized.owl.carousel change.owl.carousel resized.owl.carousel":t.proxy(function(e){if(e.namespace&&this._core.settings&&this._core.settings.lazyLoad&&(e.property&&"position"==e.property.name||"initialized"==e.type))for(var i=this._core.settings,n=i.center&&Math.ceil(i.items/2)||i.items,o=i.center&&n*-1||0,r=(e.property&&e.property.value!==s?e.property.value:this._core.current())+o,a=this._core.clones().length,h=t.proxy(function(t,e){this.load(e)},this);o++<n;)this.load(a/2+this._core.relative(r)),a&&t.each(this._core.clones(this._core.relative(r)),h),r++},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers)};n.Defaults={lazyLoad:!1},n.prototype.load=function(i){var s=this._core.$stage.children().eq(i),n=s&&s.find(".owl-lazy");!n||t.inArray(s.get(0),this._loaded)>-1||(n.each(t.proxy(function(i,s){var n,o=t(s),r=e.devicePixelRatio>1&&o.attr("data-src-retina")||o.attr("data-src");this._core.trigger("load",{element:o,url:r},"lazy"),o.is("img")?o.one("load.owl.lazy",t.proxy(function(){o.css("opacity",1),this._core.trigger("loaded",{element:o,url:r},"lazy")},this)).attr("src",r):(n=new Image,n.onload=t.proxy(function(){o.css({"background-image":"url("+r+")",opacity:"1"}),this._core.trigger("loaded",{element:o,url:r},"lazy")},this),n.src=r)},this)),this._loaded.push(s.get(0)))},n.prototype.destroy=function(){var t,e;for(t in this.handlers)this._core.$element.off(t,this.handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Lazy=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._handlers={"initialized.owl.carousel refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&this.update()},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&"position"==t.property.name&&this.update()},this),"loaded.owl.lazy":t.proxy(function(t){t.namespace&&this._core.settings.autoHeight&&t.element.closest("."+this._core.settings.itemClass).index()===this._core.current()&&this.update()},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers)};n.Defaults={autoHeight:!1,autoHeightClass:"owl-height"},n.prototype.update=function(){var e=this._core._current,i=e+this._core.settings.items,s=this._core.$stage.children().toArray().slice(e,i),n=[],o=0;t.each(s,function(e,i){n.push(t(i).height())}),o=Math.max.apply(null,n),this._core.$stage.parent().height(o).addClass(this._core.settings.autoHeightClass)},n.prototype.destroy=function(){var t,e;for(t in this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.AutoHeight=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._videos={},this._playing=null,this._handlers={"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.register({type:"state",name:"playing",tags:["interacting"]})},this),"resize.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.video&&this.isInFullScreen()&&t.preventDefault()},this),"refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._core.is("resizing")&&this._core.$stage.find(".cloned .owl-video-frame").remove()},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&"position"===t.property.name&&this._playing&&this.stop()},this),"prepared.owl.carousel":t.proxy(function(e){if(e.namespace){var i=t(e.content).find(".owl-video");i.length&&(i.css("display","none"),this.fetch(i,t(e.content)))}},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this._core.$element.on(this._handlers),this._core.$element.on("click.owl.video",".owl-video-play-icon",t.proxy(function(t){this.play(t)},this))};n.Defaults={video:!1,videoHeight:!1,videoWidth:!1},n.prototype.fetch=function(t,e){var i=function(){return t.attr("data-vimeo-id")?"vimeo":t.attr("data-vzaar-id")?"vzaar":"youtube"}(),s=t.attr("data-vimeo-id")||t.attr("data-youtube-id")||t.attr("data-vzaar-id"),n=t.attr("data-width")||this._core.settings.videoWidth,o=t.attr("data-height")||this._core.settings.videoHeight,r=t.attr("href");if(!r)throw new Error("Missing video URL.");if(s=r.match(/(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/),s[3].indexOf("youtu")>-1)i="youtube";else if(s[3].indexOf("vimeo")>-1)i="vimeo";else{if(!(s[3].indexOf("vzaar")>-1))throw new Error("Video URL not supported.");i="vzaar"}s=s[6],this._videos[r]={type:i,id:s,width:n,height:o},e.attr("data-video",r),this.thumbnail(t,this._videos[r])},n.prototype.thumbnail=function(e,i){var s,n,o,r=i.width&&i.height?'style="width:'+i.width+"px;height:"+i.height+'px;"':"",a=e.find("img"),h="src",l="",c=this._core.settings,p=function(t){n='<div class="owl-video-play-icon"></div>',s=c.lazyLoad?'<div class="owl-video-tn '+l+'" '+h+'="'+t+'"></div>':'<div class="owl-video-tn" style="opacity:1;background-image:url('+t+')"></div>',e.after(s),e.after(n)};return e.wrap('<div class="owl-video-wrapper"'+r+"></div>"),this._core.settings.lazyLoad&&(h="data-src",l="owl-lazy"),a.length?(p(a.attr(h)),a.remove(),!1):void("youtube"===i.type?(o="//img.youtube.com/vi/"+i.id+"/hqdefault.jpg",p(o)):"vimeo"===i.type?t.ajax({type:"GET",url:"//vimeo.com/api/v2/video/"+i.id+".json",jsonp:"callback",dataType:"jsonp",success:function(t){o=t[0].thumbnail_large,p(o)}}):"vzaar"===i.type&&t.ajax({type:"GET",url:"//vzaar.com/api/videos/"+i.id+".json",jsonp:"callback",dataType:"jsonp",success:function(t){o=t.framegrab_url,p(o)}}))},n.prototype.stop=function(){this._core.trigger("stop",null,"video"),this._playing.find(".owl-video-frame").remove(),this._playing.removeClass("owl-video-playing"),this._playing=null,this._core.leave("playing"),this._core.trigger("stopped",null,"video")},n.prototype.play=function(e){var i,s=t(e.target),n=s.closest("."+this._core.settings.itemClass),o=this._videos[n.attr("data-video")],r=o.width||"100%",a=o.height||this._core.$stage.height();this._playing||(this._core.enter("playing"),this._core.trigger("play",null,"video"),n=this._core.items(this._core.relative(n.index())),this._core.reset(n.index()),"youtube"===o.type?i='<iframe width="'+r+'" height="'+a+'" src="//www.youtube.com/embed/'+o.id+"?autoplay=1&v="+o.id+'" frameborder="0" allowfullscreen></iframe>':"vimeo"===o.type?i='<iframe src="//player.vimeo.com/video/'+o.id+'?autoplay=1" width="'+r+'" height="'+a+'" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>':"vzaar"===o.type&&(i='<iframe frameborder="0"height="'+a+'"width="'+r+'" allowfullscreen mozallowfullscreen webkitAllowFullScreen src="//view.vzaar.com/'+o.id+'/player?autoplay=true"></iframe>'),t('<div class="owl-video-frame">'+i+"</div>").insertAfter(n.find(".owl-video")),this._playing=n.addClass("owl-video-playing"))},n.prototype.isInFullScreen=function(){var e=i.fullscreenElement||i.mozFullScreenElement||i.webkitFullscreenElement;return e&&t(e).parent().hasClass("owl-video-frame")},n.prototype.destroy=function(){var t,e;this._core.$element.off("click.owl.video");for(t in this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.Video=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this.core=e,this.core.options=t.extend({},n.Defaults,this.core.options),this.swapping=!0,this.previous=s,this.next=s,this.handlers={"change.owl.carousel":t.proxy(function(t){t.namespace&&"position"==t.property.name&&(this.previous=this.core.current(),this.next=t.property.value)},this),"drag.owl.carousel dragged.owl.carousel translated.owl.carousel":t.proxy(function(t){t.namespace&&(this.swapping="translated"==t.type)},this),"translate.owl.carousel":t.proxy(function(t){t.namespace&&this.swapping&&(this.core.options.animateOut||this.core.options.animateIn)&&this.swap()},this)},this.core.$element.on(this.handlers)};n.Defaults={animateOut:!1,animateIn:!1},n.prototype.swap=function(){if(1===this.core.settings.items&&t.support.animation&&t.support.transition){this.core.speed(0);var e,i=t.proxy(this.clear,this),s=this.core.$stage.children().eq(this.previous),n=this.core.$stage.children().eq(this.next),o=this.core.settings.animateIn,r=this.core.settings.animateOut;this.core.current()!==this.previous&&(r&&(e=this.core.coordinates(this.previous)-this.core.coordinates(this.next),s.one(t.support.animation.end,i).css({left:e+"px"}).addClass("animated owl-animated-out").addClass(r)),o&&n.one(t.support.animation.end,i).addClass("animated owl-animated-in").addClass(o))}},n.prototype.clear=function(e){t(e.target).css({left:""}).removeClass("animated owl-animated-out owl-animated-in").removeClass(this.core.settings.animateIn).removeClass(this.core.settings.animateOut),this.core.onTransitionEnd()},n.prototype.destroy=function(){var t,e;for(t in this.handlers)this.core.$element.off(t,this.handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null);
},t.fn.owlCarousel.Constructor.Plugins.Animate=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){var n=function(e){this._core=e,this._timeout=null,this._paused=!1,this._handlers={"changed.owl.carousel":t.proxy(function(t){t.namespace&&"settings"===t.property.name?this._core.settings.autoplay?this.play():this.stop():t.namespace&&"position"===t.property.name&&this._core.settings.autoplay&&this._setAutoPlayInterval()},this),"initialized.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.autoplay&&this.play()},this),"play.owl.autoplay":t.proxy(function(t,e,i){t.namespace&&this.play(e,i)},this),"stop.owl.autoplay":t.proxy(function(t){t.namespace&&this.stop()},this),"mouseover.owl.autoplay":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"mouseleave.owl.autoplay":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.play()},this),"touchstart.owl.core":t.proxy(function(){this._core.settings.autoplayHoverPause&&this._core.is("rotating")&&this.pause()},this),"touchend.owl.core":t.proxy(function(){this._core.settings.autoplayHoverPause&&this.play()},this)},this._core.$element.on(this._handlers),this._core.options=t.extend({},n.Defaults,this._core.options)};n.Defaults={autoplay:!1,autoplayTimeout:5e3,autoplayHoverPause:!1,autoplaySpeed:!1},n.prototype.play=function(t,e){this._paused=!1,this._core.is("rotating")||(this._core.enter("rotating"),this._setAutoPlayInterval())},n.prototype._getNextTimeout=function(s,n){return this._timeout&&e.clearTimeout(this._timeout),e.setTimeout(t.proxy(function(){this._paused||this._core.is("busy")||this._core.is("interacting")||i.hidden||this._core.next(n||this._core.settings.autoplaySpeed)},this),s||this._core.settings.autoplayTimeout)},n.prototype._setAutoPlayInterval=function(){this._timeout=this._getNextTimeout()},n.prototype.stop=function(){this._core.is("rotating")&&(e.clearTimeout(this._timeout),this._core.leave("rotating"))},n.prototype.pause=function(){this._core.is("rotating")&&(this._paused=!0)},n.prototype.destroy=function(){var t,e;this.stop();for(t in this._handlers)this._core.$element.off(t,this._handlers[t]);for(e in Object.getOwnPropertyNames(this))"function"!=typeof this[e]&&(this[e]=null)},t.fn.owlCarousel.Constructor.Plugins.autoplay=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){"use strict";var n=function(e){this._core=e,this._initialized=!1,this._pages=[],this._controls={},this._templates=[],this.$element=this._core.$element,this._overrides={next:this._core.next,prev:this._core.prev,to:this._core.to},this._handlers={"prepared.owl.carousel":t.proxy(function(e){e.namespace&&this._core.settings.dotsData&&this._templates.push('<div class="'+this._core.settings.dotClass+'">'+t(e.content).find("[data-dot]").addBack("[data-dot]").attr("data-dot")+"</div>")},this),"added.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.dotsData&&this._templates.splice(t.position,0,this._templates.pop())},this),"remove.owl.carousel":t.proxy(function(t){t.namespace&&this._core.settings.dotsData&&this._templates.splice(t.position,1)},this),"changed.owl.carousel":t.proxy(function(t){t.namespace&&"position"==t.property.name&&this.draw()},this),"initialized.owl.carousel":t.proxy(function(t){t.namespace&&!this._initialized&&(this._core.trigger("initialize",null,"navigation"),this.initialize(),this.update(),this.draw(),this._initialized=!0,this._core.trigger("initialized",null,"navigation"))},this),"refreshed.owl.carousel":t.proxy(function(t){t.namespace&&this._initialized&&(this._core.trigger("refresh",null,"navigation"),this.update(),this.draw(),this._core.trigger("refreshed",null,"navigation"))},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this.$element.on(this._handlers)};n.Defaults={nav:!1,navText:["prev","next"],navSpeed:!1,navElement:"div",navContainer:!1,navContainerClass:"owl-nav",navClass:["owl-prev","owl-next"],slideBy:1,dotClass:"owl-dot",dotsClass:"owl-dots",dots:!0,dotsEach:!1,dotsData:!1,dotsSpeed:!1,dotsContainer:!1},n.prototype.initialize=function(){var e,i=this._core.settings;this._controls.$relative=(i.navContainer?t(i.navContainer):t("<div>").addClass(i.navContainerClass).appendTo(this.$element)).addClass("disabled"),this._controls.$previous=t("<"+i.navElement+">").addClass(i.navClass[0]).html(i.navText[0]).prependTo(this._controls.$relative).on("click",t.proxy(function(t){this.prev(i.navSpeed)},this)),this._controls.$next=t("<"+i.navElement+">").addClass(i.navClass[1]).html(i.navText[1]).appendTo(this._controls.$relative).on("click",t.proxy(function(t){this.next(i.navSpeed)},this)),i.dotsData||(this._templates=[t("<div>").addClass(i.dotClass).append(t("<span>")).prop("outerHTML")]),this._controls.$absolute=(i.dotsContainer?t(i.dotsContainer):t("<div>").addClass(i.dotsClass).appendTo(this.$element)).addClass("disabled"),this._controls.$absolute.on("click","div",t.proxy(function(e){var s=t(e.target).parent().is(this._controls.$absolute)?t(e.target).index():t(e.target).parent().index();e.preventDefault(),this.to(s,i.dotsSpeed)},this));for(e in this._overrides)this._core[e]=t.proxy(this[e],this)},n.prototype.destroy=function(){var t,e,i,s;for(t in this._handlers)this.$element.off(t,this._handlers[t]);for(e in this._controls)this._controls[e].remove();for(s in this.overides)this._core[s]=this._overrides[s];for(i in Object.getOwnPropertyNames(this))"function"!=typeof this[i]&&(this[i]=null)},n.prototype.update=function(){var t,e,i,s=this._core.clones().length/2,n=s+this._core.items().length,o=this._core.maximum(!0),r=this._core.settings,a=r.center||r.autoWidth||r.dotsData?1:r.dotsEach||r.items;if("page"!==r.slideBy&&(r.slideBy=Math.min(r.slideBy,r.items)),r.dots||"page"==r.slideBy)for(this._pages=[],t=s,e=0,i=0;t<n;t++){if(e>=a||0===e){if(this._pages.push({start:Math.min(o,t-s),end:t-s+a-1}),Math.min(o,t-s)===o)break;e=0,++i}e+=this._core.mergers(this._core.relative(t))}},n.prototype.draw=function(){var e,i=this._core.settings,s=this._core.items().length<=i.items,n=this._core.relative(this._core.current()),o=i.loop||i.rewind;this._controls.$relative.toggleClass("disabled",!i.nav||s),i.nav&&(this._controls.$previous.toggleClass("disabled",!o&&n<=this._core.minimum(!0)),this._controls.$next.toggleClass("disabled",!o&&n>=this._core.maximum(!0))),this._controls.$absolute.toggleClass("disabled",!i.dots||s),i.dots&&(e=this._pages.length-this._controls.$absolute.children().length,i.dotsData&&0!==e?this._controls.$absolute.html(this._templates.join("")):e>0?this._controls.$absolute.append(new Array(e+1).join(this._templates[0])):e<0&&this._controls.$absolute.children().slice(e).remove(),this._controls.$absolute.find(".active").removeClass("active"),this._controls.$absolute.children().eq(t.inArray(this.current(),this._pages)).addClass("active"))},n.prototype.onTrigger=function(e){var i=this._core.settings;e.page={index:t.inArray(this.current(),this._pages),count:this._pages.length,size:i&&(i.center||i.autoWidth||i.dotsData?1:i.dotsEach||i.items)}},n.prototype.current=function(){var e=this._core.relative(this._core.current());return t.grep(this._pages,t.proxy(function(t,i){return t.start<=e&&t.end>=e},this)).pop()},n.prototype.getPosition=function(e){var i,s,n=this._core.settings;return"page"==n.slideBy?(i=t.inArray(this.current(),this._pages),s=this._pages.length,e?++i:--i,i=this._pages[(i%s+s)%s].start):(i=this._core.relative(this._core.current()),s=this._core.items().length,e?i+=n.slideBy:i-=n.slideBy),i},n.prototype.next=function(e){t.proxy(this._overrides.to,this._core)(this.getPosition(!0),e)},n.prototype.prev=function(e){t.proxy(this._overrides.to,this._core)(this.getPosition(!1),e)},n.prototype.to=function(e,i,s){var n;!s&&this._pages.length?(n=this._pages.length,t.proxy(this._overrides.to,this._core)(this._pages[(e%n+n)%n].start,i)):t.proxy(this._overrides.to,this._core)(e,i)},t.fn.owlCarousel.Constructor.Plugins.Navigation=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){"use strict";var n=function(i){this._core=i,this._hashes={},this.$element=this._core.$element,this._handlers={"initialized.owl.carousel":t.proxy(function(i){i.namespace&&"URLHash"===this._core.settings.startPosition&&t(e).trigger("hashchange.owl.navigation")},this),"prepared.owl.carousel":t.proxy(function(e){if(e.namespace){var i=t(e.content).find("[data-hash]").addBack("[data-hash]").attr("data-hash");if(!i)return;this._hashes[i]=e.content}},this),"changed.owl.carousel":t.proxy(function(i){if(i.namespace&&"position"===i.property.name){var s=this._core.items(this._core.relative(this._core.current())),n=t.map(this._hashes,function(t,e){return t===s?e:null}).join();if(!n||e.location.hash.slice(1)===n)return;e.location.hash=n}},this)},this._core.options=t.extend({},n.Defaults,this._core.options),this.$element.on(this._handlers),t(e).on("hashchange.owl.navigation",t.proxy(function(t){var i=e.location.hash.substring(1),n=this._core.$stage.children(),o=this._hashes[i]&&n.index(this._hashes[i]);o!==s&&o!==this._core.current()&&this._core.to(this._core.relative(o),!1,!0)},this))};n.Defaults={URLhashListener:!1},n.prototype.destroy=function(){var i,s;t(e).off("hashchange.owl.navigation");for(i in this._handlers)this._core.$element.off(i,this._handlers[i]);for(s in Object.getOwnPropertyNames(this))"function"!=typeof this[s]&&(this[s]=null)},t.fn.owlCarousel.Constructor.Plugins.Hash=n}(window.Zepto||window.jQuery,window,document),function(t,e,i,s){function n(e,i){var n=!1,o=e.charAt(0).toUpperCase()+e.slice(1);return t.each((e+" "+a.join(o+" ")+o).split(" "),function(t,e){if(r[e]!==s)return n=!i||e,!1}),n}function o(t){return n(t,!0)}var r=t("<support>").get(0).style,a="Webkit Moz O ms".split(" "),h={transition:{end:{WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd",transition:"transitionend"}},animation:{end:{WebkitAnimation:"webkitAnimationEnd",MozAnimation:"animationend",OAnimation:"oAnimationEnd",animation:"animationend"}}},l={csstransforms:function(){return!!n("transform")},csstransforms3d:function(){return!!n("perspective")},csstransitions:function(){return!!n("transition")},cssanimations:function(){return!!n("animation")}};l.csstransitions()&&(t.support.transition=new String(o("transition")),t.support.transition.end=h.transition.end[t.support.transition]),l.cssanimations()&&(t.support.animation=new String(o("animation")),t.support.animation.end=h.animation.end[t.support.animation]),l.csstransforms()&&(t.support.transform=new String(o("transform")),t.support.transform3d=l.csstransforms3d())}(window.Zepto||window.jQuery,window,document);
;/*})'"*/
;/*})'"*/
!function(e,t,i,n){var o=i("html"),a=i(e),r=i(t),s=i.fancybox=function(){s.open.apply(this,arguments)},l=navigator.userAgent.match(/msie/i),c=null,d=t.createTouch!==n,p=function(e){return e&&e.hasOwnProperty&&e instanceof i},h=function(e){return e&&"string"===i.type(e)},f=function(e){return h(e)&&0<e.indexOf("%")},u=function(e,t){var i=parseInt(e,10)||0;return t&&f(e)&&(i*=s.getViewport()[t]/100),Math.ceil(i)},g=function(e,t){return u(e,t)+"px"};i.extend(s,{version:"2.1.5",defaults:{padding:15,margin:20,width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!d,fitToView:!0,aspectRatio:!1,topRatio:.5,leftRatio:.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3e3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+(l?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:i.noop,beforeLoad:i.noop,afterLoad:i.noop,beforeShow:i.noop,afterShow:i.noop,beforeChange:i.noop,beforeClose:i.noop,afterClose:i.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(e,t){return e&&(i.isPlainObject(t)||(t={}),!1!==s.close(!0))?(i.isArray(e)||(e=p(e)?i(e).get():[e]),i.each(e,function(o,a){var r,l,c,d,f,u={};"object"===i.type(a)&&(a.nodeType&&(a=i(a)),p(a)?(u={href:a.data("fancybox-href")||a.attr("href"),title:a.data("fancybox-title")||a.attr("title"),isDom:!0,element:a},i.metadata&&i.extend(!0,u,a.metadata())):u=a),r=t.href||u.href||(h(a)?a:null),l=t.title!==n?t.title:u.title||"",d=(c=t.content||u.content)?"html":t.type||u.type,!d&&u.isDom&&(d=a.data("fancybox-type"),d||(d=(d=a.prop("class").match(/fancybox\.(\w+)/))?d[1]:null)),h(r)&&(d||(s.isImage(r)?d="image":s.isSWF(r)?d="swf":"#"===r.charAt(0)?d="inline":h(a)&&(d="html",c=a)),"ajax"===d&&(f=r.split(/\s+/,2),r=f.shift(),f=f.shift())),c||("inline"===d?r?c=i(h(r)?r.replace(/.*(?=#[^\s]+$)/,""):r):u.isDom&&(c=a):"html"===d?c=r:!d&&!r&&u.isDom&&(d="inline",c=a)),i.extend(u,{href:r,type:d,content:c,title:l,selector:f}),e[o]=u}),s.opts=i.extend(!0,{},s.defaults,t),t.keys!==n&&(s.opts.keys=t.keys?i.extend({},s.defaults.keys,t.keys):!1),s.group=e,s._start(s.opts.index)):void 0},cancel:function(){var e=s.coming;e&&!1!==s.trigger("onCancel")&&(s.hideLoading(),s.ajaxLoad&&s.ajaxLoad.abort(),s.ajaxLoad=null,s.imgPreload&&(s.imgPreload.onload=s.imgPreload.onerror=null),e.wrap&&e.wrap.stop(!0,!0).trigger("onReset").remove(),s.coming=null,s.current||s._afterZoomOut(e))},close:function(e){s.cancel(),!1!==s.trigger("beforeClose")&&(s.unbindEvents(),s.isActive&&(s.isOpen&&!0!==e?(s.isOpen=s.isOpened=!1,s.isClosing=!0,i(".fancybox-item, .fancybox-nav").remove(),s.wrap.stop(!0,!0).removeClass("fancybox-opened"),s.transitions[s.current.closeMethod]()):(i(".fancybox-wrap").stop(!0).trigger("onReset").remove(),s._afterZoomOut())))},play:function(e){var t=function(){clearTimeout(s.player.timer)},i=function(){t(),s.current&&s.player.isActive&&(s.player.timer=setTimeout(s.next,s.current.playSpeed))},n=function(){t(),r.unbind(".player"),s.player.isActive=!1,s.trigger("onPlayEnd")};!0===e||!s.player.isActive&&!1!==e?s.current&&(s.current.loop||s.current.index<s.group.length-1)&&(s.player.isActive=!0,r.bind({"onCancel.player beforeClose.player":n,"onUpdate.player":i,"beforeLoad.player":t}),i(),s.trigger("onPlayStart")):n()},next:function(e){var t=s.current;t&&(h(e)||(e=t.direction.next),s.jumpto(t.index+1,e,"next"))},prev:function(e){var t=s.current;t&&(h(e)||(e=t.direction.prev),s.jumpto(t.index-1,e,"prev"))},jumpto:function(e,t,i){var o=s.current;o&&(e=u(e),s.direction=t||o.direction[e>=o.index?"next":"prev"],s.router=i||"jumpto",o.loop&&(0>e&&(e=o.group.length+e%o.group.length),e%=o.group.length),o.group[e]!==n&&(s.cancel(),s._start(e)))},reposition:function(e,t){var n,o=s.current,a=o?o.wrap:null;a&&(n=s._getPosition(t),e&&"scroll"===e.type?(delete n.position,a.stop(!0,!0).animate(n,200)):(a.css(n),o.pos=i.extend({},o.dim,n)))},update:function(e){var t=e&&e.type,i=!t||"orientationchange"===t;i&&(clearTimeout(c),c=null),s.isOpen&&!c&&(c=setTimeout(function(){var n=s.current;n&&!s.isClosing&&(s.wrap.removeClass("fancybox-tmp"),(i||"load"===t||"resize"===t&&n.autoResize)&&s._setDimension(),"scroll"===t&&n.canShrink||s.reposition(e),s.trigger("onUpdate"),c=null)},i&&!d?0:300))},toggle:function(e){s.isOpen&&(s.current.fitToView="boolean"===i.type(e)?e:!s.current.fitToView,d&&(s.wrap.removeAttr("style").addClass("fancybox-tmp"),s.trigger("onUpdate")),s.update())},hideLoading:function(){r.unbind(".loading"),i("#fancybox-loading").remove()},showLoading:function(){var e,t;s.hideLoading(),e=i('<div id="fancybox-loading"><div></div></div>').click(s.cancel).appendTo("body"),r.bind("keydown.loading",function(e){27===(e.which||e.keyCode)&&(e.preventDefault(),s.cancel())}),s.defaults.fixed||(t=s.getViewport(),e.css({position:"absolute",top:.5*t.h+t.y,left:.5*t.w+t.x}))},getViewport:function(){var t=s.current&&s.current.locked||!1,i={x:a.scrollLeft(),y:a.scrollTop()};return t?(i.w=t[0].clientWidth,i.h=t[0].clientHeight):(i.w=d&&e.innerWidth?e.innerWidth:a.width(),i.h=d&&e.innerHeight?e.innerHeight:a.height()),i},unbindEvents:function(){s.wrap&&p(s.wrap)&&s.wrap.unbind(".fb"),r.unbind(".fb"),a.unbind(".fb")},bindEvents:function(){var e,t=s.current;t&&(a.bind("orientationchange.fb"+(d?"":" resize.fb")+(t.autoCenter&&!t.locked?" scroll.fb":""),s.update),(e=t.keys)&&r.bind("keydown.fb",function(o){var a=o.which||o.keyCode,r=o.target||o.srcElement;return 27===a&&s.coming?!1:void(!o.ctrlKey&&!o.altKey&&!o.shiftKey&&!o.metaKey&&(!r||!r.type&&!i(r).is("[contenteditable]"))&&i.each(e,function(e,r){return 1<t.group.length&&r[a]!==n?(s[e](r[a]),o.preventDefault(),!1):-1<i.inArray(a,r)?(s[e](),o.preventDefault(),!1):void 0}))}),i.fn.mousewheel&&t.mouseWheel&&s.wrap.bind("mousewheel.fb",function(e,n,o,a){for(var r=i(e.target||null),l=!1;r.length&&!l&&!r.is(".fancybox-skin")&&!r.is(".fancybox-wrap");)l=r[0]&&!(r[0].style.overflow&&"hidden"===r[0].style.overflow)&&(r[0].clientWidth&&r[0].scrollWidth>r[0].clientWidth||r[0].clientHeight&&r[0].scrollHeight>r[0].clientHeight),r=i(r).parent();0!==n&&!l&&1<s.group.length&&!t.canShrink&&(a>0||o>0?s.prev(a>0?"down":"left"):(0>a||0>o)&&s.next(0>a?"up":"right"),e.preventDefault())}))},trigger:function(e,t){var n,o=t||s.coming||s.current;if(o){if(i.isFunction(o[e])&&(n=o[e].apply(o,Array.prototype.slice.call(arguments,1))),!1===n)return!1;o.helpers&&i.each(o.helpers,function(t,n){n&&s.helpers[t]&&i.isFunction(s.helpers[t][e])&&s.helpers[t][e](i.extend(!0,{},s.helpers[t].defaults,n),o)}),r.trigger(e)}},isImage:function(e){return h(e)&&e.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(e){return h(e)&&e.match(/\.(swf)((\?|#).*)?$/i)},_start:function(e){var t,n,o={};if(e=u(e),t=s.group[e]||null,!t)return!1;if(o=i.extend(!0,{},s.opts,t),t=o.margin,n=o.padding,"number"===i.type(t)&&(o.margin=[t,t,t,t]),"number"===i.type(n)&&(o.padding=[n,n,n,n]),o.modal&&i.extend(!0,o,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}}),o.autoSize&&(o.autoWidth=o.autoHeight=!0),"auto"===o.width&&(o.autoWidth=!0),"auto"===o.height&&(o.autoHeight=!0),o.group=s.group,o.index=e,s.coming=o,!1===s.trigger("beforeLoad"))s.coming=null;else{if(n=o.type,t=o.href,!n)return s.coming=null,s.current&&s.router&&"jumpto"!==s.router?(s.current.index=e,s[s.router](s.direction)):!1;if(s.isActive=!0,("image"===n||"swf"===n)&&(o.autoHeight=o.autoWidth=!1,o.scrolling="visible"),"image"===n&&(o.aspectRatio=!0),"iframe"===n&&d&&(o.scrolling="scroll"),o.wrap=i(o.tpl.wrap).addClass("fancybox-"+(d?"mobile":"desktop")+" fancybox-type-"+n+" fancybox-tmp "+o.wrapCSS).appendTo(o.parent||"body"),i.extend(o,{skin:i(".fancybox-skin",o.wrap),outer:i(".fancybox-outer",o.wrap),inner:i(".fancybox-inner",o.wrap)}),i.each(["Top","Right","Bottom","Left"],function(e,t){o.skin.css("padding"+t,g(o.padding[e]))}),s.trigger("onReady"),"inline"===n||"html"===n){if(!o.content||!o.content.length)return s._error("content")}else if(!t)return s._error("href");"image"===n?s._loadImage():"ajax"===n?s._loadAjax():"iframe"===n?s._loadIframe():s._afterLoad()}},_error:function(e){i.extend(s.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:e,content:s.coming.tpl.error}),s._afterLoad()},_loadImage:function(){var e=s.imgPreload=new Image;e.onload=function(){this.onload=this.onerror=null,s.coming.width=this.width/s.opts.pixelRatio,s.coming.height=this.height/s.opts.pixelRatio,s._afterLoad()},e.onerror=function(){this.onload=this.onerror=null,s._error("image")},e.src=s.coming.href,!0!==e.complete&&s.showLoading()},_loadAjax:function(){var e=s.coming;s.showLoading(),s.ajaxLoad=i.ajax(i.extend({},e.ajax,{url:e.href,error:function(e,t){s.coming&&"abort"!==t?s._error("ajax",e):s.hideLoading()},success:function(t,i){"success"===i&&(e.content=t,s._afterLoad())}}))},_loadIframe:function(){var e=s.coming,t=i(e.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",d?"auto":e.iframe.scrolling).attr("src",e.href);i(e.wrap).bind("onReset",function(){try{i(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(e){}}),e.iframe.preload&&(s.showLoading(),t.one("load",function(){i(this).data("ready",1),d||i(this).bind("load.fb",s.update),i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(),s._afterLoad()})),e.content=t.appendTo(e.inner),e.iframe.preload||s._afterLoad()},_preloadImages:function(){var e,t,i=s.group,n=s.current,o=i.length,a=n.preload?Math.min(n.preload,o-1):0;for(t=1;a>=t;t+=1)e=i[(n.index+t)%o],"image"===e.type&&e.href&&((new Image).src=e.href)},_afterLoad:function(){var e,t,n,o,a,r=s.coming,l=s.current;if(s.hideLoading(),r&&!1!==s.isActive)if(!1===s.trigger("afterLoad",r,l))r.wrap.stop(!0).trigger("onReset").remove(),s.coming=null;else{switch(l&&(s.trigger("beforeChange",l),l.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()),s.unbindEvents(),e=r.content,t=r.type,n=r.scrolling,i.extend(s,{wrap:r.wrap,skin:r.skin,outer:r.outer,inner:r.inner,current:r,previous:l}),o=r.href,t){case"inline":case"ajax":case"html":r.selector?e=i("<div>").html(e).find(r.selector):p(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",i('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),r.wrap.bind("onReset",function(){i(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case"image":e=r.tpl.image.replace("{href}",o);break;case"swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+o+'"></param>',a="",i.each(r.swf,function(t,i){e+='<param name="'+t+'" value="'+i+'"></param>',a+=" "+t+'="'+i+'"'}),e+='<embed src="'+o+'" type="application/x-shockwave-flash" width="100%" height="100%"'+a+"></embed></object>"}(!p(e)||!e.parent().is(r.inner))&&r.inner.append(e),s.trigger("beforeShow"),r.inner.css("overflow","yes"===n?"scroll":"no"===n?"hidden":n),s._setDimension(),s.reposition(),s.isOpen=!1,s.coming=null,s.bindEvents(),s.isOpened?l.prevMethod&&s.transitions[l.prevMethod]():i(".fancybox-wrap").not(r.wrap).stop(!0).trigger("onReset").remove(),s.transitions[s.isOpened?r.nextMethod:r.openMethod](),s._preloadImages()}},_setDimension:function(){var e,t,n,o,a,r,l,c,d,p=s.getViewport(),h=0,m=!1,y=!1,m=s.wrap,b=s.skin,w=s.inner,v=s.current,y=v.width,x=v.height,k=v.minWidth,C=v.minHeight,O=v.maxWidth,T=v.maxHeight,S=v.scrolling,j=v.scrollOutside?v.scrollbarWidth:0,_=v.margin,P=u(_[1]+_[3]),W=u(_[0]+_[2]);if(m.add(b).add(w).width("auto").height("auto").removeClass("fancybox-tmp"),_=u(b.outerWidth(!0)-b.width()),e=u(b.outerHeight(!0)-b.height()),t=P+_,n=W+e,o=f(y)?(p.w-t)*u(y)/100:y,a=f(x)?(p.h-n)*u(x)/100:x,"iframe"===v.type){if(d=v.content,v.autoHeight&&1===d.data("ready"))try{d[0].contentWindow.document.location&&(w.width(o).height(9999),r=d.contents().find("body"),j&&r.css("overflow-x","hidden"),a=r.outerHeight(!0))}catch(L){}}else(v.autoWidth||v.autoHeight)&&(w.addClass("fancybox-tmp"),v.autoWidth||w.width(o),v.autoHeight||w.height(a),v.autoWidth&&(o=w.width()),v.autoHeight&&(a=w.height()),w.removeClass("fancybox-tmp"));if(y=u(o),x=u(a),c=o/a,k=u(f(k)?u(k,"w")-t:k),O=u(f(O)?u(O,"w")-t:O),C=u(f(C)?u(C,"h")-n:C),T=u(f(T)?u(T,"h")-n:T),r=O,l=T,v.fitToView&&(O=Math.min(p.w-t,O),T=Math.min(p.h-n,T)),t=p.w-P,W=p.h-W,v.aspectRatio?(y>O&&(y=O,x=u(y/c)),x>T&&(x=T,y=u(x*c)),k>y&&(y=k,x=u(y/c)),C>x&&(x=C,y=u(x*c))):(y=Math.max(k,Math.min(y,O)),v.autoHeight&&"iframe"!==v.type&&(w.width(y),x=w.height()),x=Math.max(C,Math.min(x,T))),v.fitToView)if(w.width(y).height(x),m.width(y+_),p=m.width(),P=m.height(),v.aspectRatio)for(;(p>t||P>W)&&y>k&&x>C&&!(19<h++);)x=Math.max(C,Math.min(T,x-10)),y=u(x*c),k>y&&(y=k,x=u(y/c)),y>O&&(y=O,x=u(y/c)),w.width(y).height(x),m.width(y+_),p=m.width(),P=m.height();else y=Math.max(k,Math.min(y,y-(p-t))),x=Math.max(C,Math.min(x,x-(P-W)));j&&"auto"===S&&a>x&&t>y+_+j&&(y+=j),w.width(y).height(x),m.width(y+_),p=m.width(),P=m.height(),m=(p>t||P>W)&&y>k&&x>C,y=v.aspectRatio?r>y&&l>x&&o>y&&a>x:(r>y||l>x)&&(o>y||a>x),i.extend(v,{dim:{width:g(p),height:g(P)},origWidth:o,origHeight:a,canShrink:m,canExpand:y,wPadding:_,hPadding:e,wrapSpace:P-b.outerHeight(!0),skinSpace:b.height()-x}),!d&&v.autoHeight&&x>C&&T>x&&!y&&w.height("auto")},_getPosition:function(e){var t=s.current,i=s.getViewport(),n=t.margin,o=s.wrap.width()+n[1]+n[3],a=s.wrap.height()+n[0]+n[2],n={position:"absolute",top:n[0],left:n[3]};return t.autoCenter&&t.fixed&&!e&&a<=i.h&&o<=i.w?n.position="fixed":t.locked||(n.top+=i.y,n.left+=i.x),n.top=g(Math.max(n.top,n.top+(i.h-a)*t.topRatio)),n.left=g(Math.max(n.left,n.left+(i.w-o)*t.leftRatio)),n},_afterZoomIn:function(){var e=s.current;e&&(s.isOpen=s.isOpened=!0,s.wrap.css("overflow","visible").addClass("fancybox-opened"),s.update(),(e.closeClick||e.nextClick&&1<s.group.length)&&s.inner.css("cursor","pointer").bind("click.fb",function(t){!i(t.target).is("a")&&!i(t.target).parent().is("a")&&(t.preventDefault(),s[e.closeClick?"close":"next"]())}),e.closeBtn&&i(e.tpl.closeBtn).appendTo(s.skin).bind("click.fb",function(e){e.preventDefault(),s.close()}),e.arrows&&1<s.group.length&&((e.loop||0<e.index)&&i(e.tpl.prev).appendTo(s.outer).bind("click.fb",s.prev),(e.loop||e.index<s.group.length-1)&&i(e.tpl.next).appendTo(s.outer).bind("click.fb",s.next)),s.trigger("afterShow"),e.loop||e.index!==e.group.length-1?s.opts.autoPlay&&!s.player.isActive&&(s.opts.autoPlay=!1,s.play()):s.play(!1))},_afterZoomOut:function(e){e=e||s.current,i(".fancybox-wrap").trigger("onReset").remove(),i.extend(s,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null}),s.trigger("afterClose",e)}}),s.transitions={getOrigPosition:function(){var e=s.current,t=e.element,i=e.orig,n={},o=50,a=50,r=e.hPadding,l=e.wPadding,c=s.getViewport();return!i&&e.isDom&&t.is(":visible")&&(i=t.find("img:first"),i.length||(i=t)),p(i)?(n=i.offset(),i.is("img")&&(o=i.outerWidth(),a=i.outerHeight())):(n.top=c.y+(c.h-a)*e.topRatio,n.left=c.x+(c.w-o)*e.leftRatio),("fixed"===s.wrap.css("position")||e.locked)&&(n.top-=c.y,n.left-=c.x),n={top:g(n.top-r*e.topRatio),left:g(n.left-l*e.leftRatio),width:g(o+l),height:g(a+r)}},step:function(e,t){var i,n,o=t.prop;n=s.current;var a=n.wrapSpace,r=n.skinSpace;("width"===o||"height"===o)&&(i=t.end===t.start?1:(e-t.start)/(t.end-t.start),s.isClosing&&(i=1-i),n="width"===o?n.wPadding:n.hPadding,n=e-n,s.skin[o](u("width"===o?n:n-a*i)),s.inner[o](u("width"===o?n:n-a*i-r*i)))},zoomIn:function(){var e=s.current,t=e.pos,n=e.openEffect,o="elastic"===n,a=i.extend({opacity:1},t);delete a.position,o?(t=this.getOrigPosition(),e.openOpacity&&(t.opacity=.1)):"fade"===n&&(t.opacity=.1),s.wrap.css(t).animate(a,{duration:"none"===n?0:e.openSpeed,easing:e.openEasing,step:o?this.step:null,complete:s._afterZoomIn})},zoomOut:function(){var e=s.current,t=e.closeEffect,i="elastic"===t,n={opacity:.1};i&&(n=this.getOrigPosition(),e.closeOpacity&&(n.opacity=.1)),s.wrap.animate(n,{duration:"none"===t?0:e.closeSpeed,easing:e.closeEasing,step:i?this.step:null,complete:s._afterZoomOut})},changeIn:function(){var e,t=s.current,i=t.nextEffect,n=t.pos,o={opacity:1},a=s.direction;n.opacity=.1,"elastic"===i&&(e="down"===a||"up"===a?"top":"left","down"===a||"right"===a?(n[e]=g(u(n[e])-200),o[e]="+=200px"):(n[e]=g(u(n[e])+200),o[e]="-=200px")),"none"===i?s._afterZoomIn():s.wrap.css(n).animate(o,{duration:t.nextSpeed,easing:t.nextEasing,complete:s._afterZoomIn})},changeOut:function(){var e=s.previous,t=e.prevEffect,n={opacity:.1},o=s.direction;"elastic"===t&&(n["down"===o||"up"===o?"top":"left"]=("up"===o||"left"===o?"-":"+")+"=200px"),e.wrap.animate(n,{duration:"none"===t?0:e.prevSpeed,easing:e.prevEasing,complete:function(){i(this).trigger("onReset").remove()}})}},s.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!d,fixed:!0},overlay:null,fixed:!1,el:i("html"),create:function(e){e=i.extend({},this.defaults,e),this.overlay&&this.close(),this.overlay=i('<div class="fancybox-overlay"></div>').appendTo(s.coming?s.coming.parent:e.parent),this.fixed=!1,e.fixed&&s.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(e){var t=this;e=i.extend({},this.defaults,e),this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(e),this.fixed||(a.bind("resize.overlay",i.proxy(this.update,this)),this.update()),e.closeClick&&this.overlay.bind("click.overlay",function(e){return i(e.target).hasClass("fancybox-overlay")?(s.isActive?s.close():t.close(),!1):void 0}),this.overlay.css(e.css).show()},close:function(){var e,t;a.unbind("resize.overlay"),this.el.hasClass("fancybox-lock")&&(i(".fancybox-margin").removeClass("fancybox-margin"),e=a.scrollTop(),t=a.scrollLeft(),this.el.removeClass("fancybox-lock"),a.scrollTop(e).scrollLeft(t)),i(".fancybox-overlay").remove().hide(),i.extend(this,{overlay:null,fixed:!1})},update:function(){var e,i="100%";this.overlay.width(i).height("100%"),l?(e=Math.max(t.documentElement.offsetWidth,t.body.offsetWidth),r.width()>e&&(i=r.width())):r.width()>a.width()&&(i=r.width()),this.overlay.width(i).height(r.height())},onReady:function(e,t){var n=this.overlay;i(".fancybox-overlay").stop(!0,!0),n||this.create(e),e.locked&&this.fixed&&t.fixed&&(n||(this.margin=r.height()>a.height()?i("html").css("margin-right").replace("px",""):!1),t.locked=this.overlay.append(t.wrap),t.fixed=!1),!0===e.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(e,t){var n,o;t.locked&&(!1!==this.margin&&(i("*").filter(function(){return"fixed"===i(this).css("position")&&!i(this).hasClass("fancybox-overlay")&&!i(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),n=a.scrollTop(),o=a.scrollLeft(),this.el.addClass("fancybox-lock"),a.scrollTop(n).scrollLeft(o)),this.open(e)},onUpdate:function(){this.fixed||this.update()},afterClose:function(e){this.overlay&&!s.coming&&this.overlay.fadeOut(e.speedOut,i.proxy(this.close,this))}},s.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(e){var t=s.current,n=t.title,o=e.type;if(i.isFunction(n)&&(n=n.call(t.element,t)),h(n)&&""!==i.trim(n)){switch(t=i('<div class="fancybox-title fancybox-title-'+o+'-wrap">'+n+"</div>"),o){case"inside":o=s.skin;break;case"outside":o=s.wrap;break;case"over":o=s.inner;break;default:o=s.skin,t.appendTo("body"),l&&t.width(t.width()),t.wrapInner('<span class="child"></span>'),s.current.margin[2]+=Math.abs(u(t.css("margin-bottom")))}t["top"===e.position?"prependTo":"appendTo"](o)}}},i.fn.fancybox=function(e){var t,n=i(this),o=this.selector||"",a=function(a){var r,l,c=i(this).blur(),d=t;!a.ctrlKey&&!a.altKey&&!a.shiftKey&&!a.metaKey&&!c.is(".fancybox-wrap")&&(r=e.groupAttr||"data-fancybox-group",l=c.attr(r),l||(r="rel",l=c.get(0)[r]),l&&""!==l&&"nofollow"!==l&&(c=o.length?i(o):n,c=c.filter("["+r+'="'+l+'"]'),d=c.index(this)),e.index=d,!1!==s.open(c,e)&&a.preventDefault())};return e=e||{},t=e.index||0,o&&!1!==e.live?r.undelegate(o,"click.fb-start").delegate(o+":not('.fancybox-item, .fancybox-nav')","click.fb-start",a):n.unbind("click.fb-start").bind("click.fb-start",a),this.filter("[data-fancybox-start=1]").trigger("click"),this},r.ready(function(){var t,a;if(i.scrollbarWidth===n&&(i.scrollbarWidth=function(){var e=i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),t=e.children(),t=t.innerWidth()-t.height(99).innerWidth();return e.remove(),t}),i.support.fixedPosition===n){t=i.support,a=i('<div style="position:fixed;top:20px;"></div>').appendTo("body");var r=20===a[0].offsetTop||15===a[0].offsetTop;a.remove(),t.fixedPosition=r}i.extend(s.defaults,{scrollbarWidth:i.scrollbarWidth(),fixed:i.support.fixedPosition,parent:i("body")}),t=i(e).width(),o.addClass("fancybox-lock-test"),a=i(e).width(),o.removeClass("fancybox-lock-test"),i("<style type='text/css'>.fancybox-margin{margin-right:"+(a-t)+"px;}</style>").appendTo("head")})}(window,document,jQuery),function(e){var t=e.fancybox;t.helpers.buttons={defaults:{skipSingle:!1,position:"top",tpl:'<div id="fancybox-buttons"><ul><li><a class="btnPrev" title="Previous" href="javascript:;"></a></li><li><a class="btnPlay" title="Start slideshow" href="javascript:;"></a></li><li><a class="btnNext" title="Next" href="javascript:;"></a></li><li><a class="btnToggle" title="Toggle size" href="javascript:;"></a></li><li><a class="btnClose" title="Close" href="javascript:;"></a></li></ul></div>'},list:null,buttons:null,beforeLoad:function(e,t){return e.skipSingle&&t.group.length<2?(t.helpers.buttons=!1,void(t.closeBtn=!0)):void(t.margin["bottom"===e.position?2:0]+=30)},onPlayStart:function(){this.buttons&&this.buttons.play.attr("title","Pause slideshow").addClass("btnPlayOn")},onPlayEnd:function(){this.buttons&&this.buttons.play.attr("title","Start slideshow").removeClass("btnPlayOn")},afterShow:function(i,n){var o=this.buttons;o||(this.list=e(i.tpl).addClass(i.position).appendTo("body"),o={prev:this.list.find(".btnPrev").click(t.prev),next:this.list.find(".btnNext").click(t.next),play:this.list.find(".btnPlay").click(t.play),toggle:this.list.find(".btnToggle").click(t.toggle),close:this.list.find(".btnClose").click(t.close)}),n.index>0||n.loop?o.prev.removeClass("btnDisabled"):o.prev.addClass("btnDisabled"),n.loop||n.index<n.group.length-1?(o.next.removeClass("btnDisabled"),o.play.removeClass("btnDisabled")):(o.next.addClass("btnDisabled"),o.play.addClass("btnDisabled")),this.buttons=o,this.onUpdate(i,n)},onUpdate:function(e,t){var i;this.buttons&&(i=this.buttons.toggle.removeClass("btnDisabled btnToggleOn"),t.canShrink?i.addClass("btnToggleOn"):t.canExpand||i.addClass("btnDisabled"))},beforeClose:function(){this.list&&this.list.remove(),this.list=null,this.buttons=null}}}(jQuery),function(e){"use strict";var t=e.fancybox,i=function(t,i,n){return n=n||"","object"===e.type(n)&&(n=e.param(n,!0)),e.each(i,function(e,i){t=t.replace("$"+e,i||"")}),n.length&&(t+=(t.indexOf("?")>0?"&":"?")+n),t};t.helpers.media={defaults:{youtube:{matcher:/(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,params:{autoplay:1,autohide:1,fs:1,rel:0,hd:1,wmode:"opaque",enablejsapi:1},type:"iframe",url:"//www.youtube.com/embed/$3"},vimeo:{matcher:/(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,params:{autoplay:1,hd:1,show_title:1,show_byline:1,show_portrait:0,fullscreen:1},type:"iframe",url:"//player.vimeo.com/video/$1"},metacafe:{matcher:/metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,params:{autoPlay:"yes"},type:"swf",url:function(t,i,n){return n.swf.flashVars="playerVars="+e.param(i,!0),"//www.metacafe.com/fplayer/"+t[1]+"/.swf"}},dailymotion:{matcher:/dailymotion.com\/video\/(.*)\/?(.*)/,params:{additionalInfos:0,autoStart:1},type:"swf",url:"//www.dailymotion.com/swf/video/$1"},twitvid:{matcher:/twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,params:{autoplay:0},type:"iframe",url:"//www.twitvid.com/embed.php?guid=$1"},twitpic:{matcher:/twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,type:"image",url:"//twitpic.com/show/full/$1/"},instagram:{matcher:/(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,type:"image",url:"//$1/p/$2/media/?size=l"},google_maps:{matcher:/maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,type:"iframe",url:function(e){return"//maps.google."+e[1]+"/"+e[3]+e[4]+"&output="+(e[4].indexOf("layer=c")>0?"svembed":"embed")}}},beforeLoad:function(t,n){var o,a,r,s,l=n.href||"",c=!1;for(o in t)if(t.hasOwnProperty(o)&&(a=t[o],r=l.match(a.matcher))){c=a.type,s=e.extend(!0,{},a.params,n[o]||(e.isPlainObject(t[o])?t[o].params:null)),l="function"===e.type(a.url)?a.url.call(this,r,s,n):i(a.url,r,s);break}c&&(n.href=l,n.type=c,n.autoHeight=!1)}}}(jQuery),function(e){var t=e.fancybox;t.helpers.thumbs={defaults:{width:50,height:50,position:"bottom",source:function(t){var i;return t.element&&(i=e(t.element).find("img").attr("src")),!i&&"image"===t.type&&t.href&&(i=t.href),i}},wrap:null,list:null,width:0,init:function(t,i){var n,o=this,a=t.width,r=t.height,s=t.source;n="";for(var l=0;l<i.group.length;l++)n+='<li><a style="width:'+a+"px;height:"+r+'px;" href="javascript:jQuery.fancybox.jumpto('+l+');"></a></li>';this.wrap=e('<div id="fancybox-thumbs"></div>').addClass(t.position).appendTo("body"),this.list=e("<ul>"+n+"</ul>").appendTo(this.wrap),e.each(i.group,function(t){var n=s(i.group[t]);n&&e("<img />").load(function(){var i,n,s,l=this.width,c=this.height;o.list&&l&&c&&(i=l/a,n=c/r,s=o.list.children().eq(t).find("a"),i>=1&&n>=1&&(i>n?(l=Math.floor(l/n),c=r):(l=a,c=Math.floor(c/i))),e(this).css({width:l,height:c,top:Math.floor(r/2-c/2),left:Math.floor(a/2-l/2)}),s.width(a).height(r),e(this).hide().appendTo(s).fadeIn(300))}).attr("src",n)}),this.width=this.list.children().eq(0).outerWidth(!0),this.list.width(this.width*(i.group.length+1)).css("left",Math.floor(.5*e(window).width()-(i.index*this.width+.5*this.width)))},beforeLoad:function(e,t){return t.group.length<2?void(t.helpers.thumbs=!1):void(t.margin["top"===e.position?0:2]+=e.height+15)},afterShow:function(e,t){this.list?this.onUpdate(e,t):this.init(e,t),this.list.children().removeClass("active").eq(t.index).addClass("active")},onUpdate:function(t,i){this.list&&this.list.stop(!0).animate({left:Math.floor(.5*e(window).width()-(i.index*this.width+.5*this.width))},150)},beforeClose:function(){this.wrap&&this.wrap.remove(),this.wrap=null,this.list=null,this.width=0}}}(jQuery);
;/*})'"*/
;/*})'"*/
!function(t,e){"function"==typeof define&&define.amd?define("bloodhound",["jquery"],function(n){return t.Bloodhound=e(n)}):"object"==typeof exports?module.exports=e(require("jquery")):t.Bloodhound=e(jQuery)}(this,function(t){var e=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(t){return!t||/^\s*$/.test(t)},escapeRegExChars:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isArray:t.isArray,isFunction:t.isFunction,isObject:t.isPlainObject,isUndefined:function(t){return"undefined"==typeof t},isElement:function(t){return!(!t||1!==t.nodeType)},isJQuery:function(e){return e instanceof t},toStr:function(t){return e.isUndefined(t)||null===t?"":t+""},bind:t.proxy,each:function(e,n){function i(t,e){return n(e,t)}t.each(e,i)},map:t.map,filter:t.grep,every:function(e,n){var i=!0;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?void 0:!1}),!!i):i},some:function(e,n){var i=!1;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?!1:void 0}),!!i):i},mixin:t.extend,identity:function(t){return t},clone:function(e){return t.extend(!0,{},e)},getIdGenerator:function(){var t=0;return function(){return t++}},templatify:function(e){function n(){return String(e)}return t.isFunction(e)?e:n},defer:function(t){setTimeout(t,0)},debounce:function(t,e,n){var i,r;return function(){var s,o,u=this,a=arguments;return s=function(){i=null,n||(r=t.apply(u,a))},o=n&&!i,clearTimeout(i),i=setTimeout(s,e),o&&(r=t.apply(u,a)),r}},throttle:function(t,e){var n,i,r,s,o,u;return o=0,u=function(){o=new Date,r=null,s=t.apply(n,i)},function(){var a=new Date,c=e-(a-o);return n=this,i=arguments,0>=c?(clearTimeout(r),r=null,o=a,s=t.apply(n,i)):r||(r=setTimeout(u,c)),s}},stringify:function(t){return e.isString(t)?t:JSON.stringify(t)},noop:function(){}}}(),n="0.11.1",i=function(){"use strict";function t(t){return t=e.toStr(t),t?t.split(/\s+/):[]}function n(t){return t=e.toStr(t),t?t.split(/\W+/):[]}function i(t){return function(n){return n=e.isArray(n)?n:[].slice.call(arguments,0),function(i){var r=[];return e.each(n,function(n){r=r.concat(t(e.toStr(i[n])))}),r}}}return{nonword:n,whitespace:t,obj:{nonword:i(n),whitespace:i(t)}}}(),r=function(){"use strict";function n(n){this.maxSize=e.isNumber(n)?n:100,this.reset(),this.maxSize<=0&&(this.set=this.get=t.noop)}function i(){this.head=this.tail=null}function r(t,e){this.key=t,this.val=e,this.prev=this.next=null}return e.mixin(n.prototype,{set:function(t,e){var n,i=this.list.tail;this.size>=this.maxSize&&(this.list.remove(i),delete this.hash[i.key],this.size--),(n=this.hash[t])?(n.val=e,this.list.moveToFront(n)):(n=new r(t,e),this.list.add(n),this.hash[t]=n,this.size++)},get:function(t){var e=this.hash[t];return e?(this.list.moveToFront(e),e.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new i}}),e.mixin(i.prototype,{add:function(t){this.head&&(t.next=this.head,this.head.prev=t),this.head=t,this.tail=this.tail||t},remove:function(t){t.prev?t.prev.next=t.next:this.head=t.next,t.next?t.next.prev=t.prev:this.tail=t.prev},moveToFront:function(t){this.remove(t),this.add(t)}}),n}(),s=function(){"use strict";function n(t,n){this.prefix=["__",t,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+e.escapeRegExChars(this.prefix)),this.ls=n||u,!this.ls&&this._noop()}function i(){return(new Date).getTime()}function r(t){return JSON.stringify(e.isUndefined(t)?null:t)}function s(e){return t.parseJSON(e)}function o(t){var e,n,i=[],r=u.length;for(e=0;r>e;e++)(n=u.key(e)).match(t)&&i.push(n.replace(t,""));return i}var u;try{u=window.localStorage,u.setItem("~~~","!"),u.removeItem("~~~")}catch(a){u=null}return e.mixin(n.prototype,{_prefix:function(t){return this.prefix+t},_ttlKey:function(t){return this._prefix(t)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=e.noop},_safeSet:function(t,e){try{this.ls.setItem(t,e)}catch(n){"QuotaExceededError"===n.name&&(this.clear(),this._noop())}},get:function(t){return this.isExpired(t)&&this.remove(t),s(this.ls.getItem(this._prefix(t)))},set:function(t,n,s){return e.isNumber(s)?this._safeSet(this._ttlKey(t),r(i()+s)):this.ls.removeItem(this._ttlKey(t)),this._safeSet(this._prefix(t),r(n))},remove:function(t){return this.ls.removeItem(this._ttlKey(t)),this.ls.removeItem(this._prefix(t)),this},clear:function(){var t,e=o(this.keyMatcher);for(t=e.length;t--;)this.remove(e[t]);return this},isExpired:function(t){var n=s(this.ls.getItem(this._ttlKey(t)));return e.isNumber(n)&&i()>n?!0:!1}}),n}(),o=function(){"use strict";function n(t){t=t||{},this.cancelled=!1,this.lastReq=null,this._send=t.transport,this._get=t.limiter?t.limiter(this._get):this._get,this._cache=t.cache===!1?new r(0):u}var i=0,s={},o=6,u=new r(10);return n.setMaxPendingRequests=function(t){o=t},n.resetCache=function(){u.reset()},e.mixin(n.prototype,{_fingerprint:function(e){return e=e||{},e.url+e.type+t.param(e.data||{})},_get:function(t,e){function n(t){e(null,t),h._cache.set(a,t)}function r(){e(!0)}function u(){i--,delete s[a],h.onDeckRequestArgs&&(h._get.apply(h,h.onDeckRequestArgs),h.onDeckRequestArgs=null)}var a,c,h=this;a=this._fingerprint(t),this.cancelled||a!==this.lastReq||((c=s[a])?c.done(n).fail(r):o>i?(i++,s[a]=this._send(t).done(n).fail(r).always(u)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(n,i){var r,s;i=i||t.noop,n=e.isString(n)?{url:n}:n||{},s=this._fingerprint(n),this.cancelled=!1,this.lastReq=s,(r=this._cache.get(s))?i(null,r):this._get(n,i)},cancel:function(){this.cancelled=!0}}),n}(),u=window.SearchIndex=function(){"use strict";function n(n){n=n||{},n.datumTokenizer&&n.queryTokenizer||t.error("datumTokenizer and queryTokenizer are both required"),this.identify=n.identify||e.stringify,this.datumTokenizer=n.datumTokenizer,this.queryTokenizer=n.queryTokenizer,this.reset()}function i(t){return t=e.filter(t,function(t){return!!t}),t=e.map(t,function(t){return t.toLowerCase()})}function r(){var t={};return t[a]=[],t[u]={},t}function s(t){for(var e={},n=[],i=0,r=t.length;r>i;i++)e[t[i]]||(e[t[i]]=!0,n.push(t[i]));return n}function o(t,e){var n=0,i=0,r=[];t=t.sort(),e=e.sort();for(var s=t.length,o=e.length;s>n&&o>i;)t[n]<e[i]?n++:t[n]>e[i]?i++:(r.push(t[n]),n++,i++);return r}var u="c",a="i";return e.mixin(n.prototype,{bootstrap:function(t){this.datums=t.datums,this.trie=t.trie},add:function(t){var n=this;t=e.isArray(t)?t:[t],e.each(t,function(t){var s,o;n.datums[s=n.identify(t)]=t,o=i(n.datumTokenizer(t)),e.each(o,function(t){var e,i,o;for(e=n.trie,i=t.split("");o=i.shift();)e=e[u][o]||(e[u][o]=r()),e[a].push(s)})})},get:function(t){var n=this;return e.map(t,function(t){return n.datums[t]})},search:function(t){var n,r,c=this;return n=i(this.queryTokenizer(t)),e.each(n,function(t){var e,n,i,s;if(r&&0===r.length)return!1;for(e=c.trie,n=t.split("");e&&(i=n.shift());)e=e[u][i];return e&&0===n.length?(s=e[a].slice(0),void(r=r?o(r,s):s)):(r=[],!1)}),r?e.map(s(r),function(t){return c.datums[t]}):[]},all:function(){var t=[];for(var e in this.datums)t.push(this.datums[e]);return t},reset:function(){this.datums={},this.trie=r()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),n}(),a=function(){"use strict";function t(t){this.url=t.url,this.ttl=t.ttl,this.cache=t.cache,this.prepare=t.prepare,this.transform=t.transform,this.transport=t.transport,this.thumbprint=t.thumbprint,this.storage=new s(t.cacheKey)}var n;return n={data:"data",protocol:"protocol",thumbprint:"thumbprint"},e.mixin(t.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(t){this.cache&&(this.storage.set(n.data,t,this.ttl),this.storage.set(n.protocol,location.protocol,this.ttl),this.storage.set(n.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var t,e={};return this.cache?(e.data=this.storage.get(n.data),e.protocol=this.storage.get(n.protocol),e.thumbprint=this.storage.get(n.thumbprint),t=e.thumbprint!==this.thumbprint||e.protocol!==location.protocol,e.data&&!t?e.data:null):null},fromNetwork:function(t){function e(){t(!0)}function n(e){t(null,r.transform(e))}var i,r=this;t&&(i=this.prepare(this._settings()),this.transport(i).fail(e).done(n))},clear:function(){return this.storage.clear(),this}}),t}(),c=function(){"use strict";function t(t){this.url=t.url,this.prepare=t.prepare,this.transform=t.transform,this.transport=new o({cache:t.cache,limiter:t.limiter,transport:t.transport})}return e.mixin(t.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(t,e){function n(t,n){e(t?[]:r.transform(n))}var i,r=this;if(e)return t=t||"",i=this.prepare(t,this._settings()),this.transport.get(i,n)},cancelLastRequest:function(){this.transport.cancel()}}),t}(),h=function(){"use strict";function i(i){var r;return i?(r={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:e.identity,transform:e.identity,transport:null},i=e.isString(i)?{url:i}:i,i=e.mixin(r,i),!i.url&&t.error("prefetch requires url to be set"),i.transform=i.filter||i.transform,i.cacheKey=i.cacheKey||i.url,i.thumbprint=n+i.thumbprint,i.transport=i.transport?u(i.transport):t.ajax,i):null}function r(n){var i;if(n)return i={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:e.identity,transport:null},n=e.isString(n)?{url:n}:n,n=e.mixin(i,n),!n.url&&t.error("remote requires url to be set"),n.transform=n.filter||n.transform,n.prepare=s(n),n.limiter=o(n),n.transport=n.transport?u(n.transport):t.ajax,delete n.replace,delete n.wildcard,delete n.rateLimitBy,delete n.rateLimitWait,n}function s(t){function e(t,e){return e.url=s(e.url,t),e}function n(t,e){return e.url=e.url.replace(o,encodeURIComponent(t)),e}function i(t,e){return e}var r,s,o;return r=t.prepare,s=t.replace,o=t.wildcard,r?r:r=s?e:t.wildcard?n:i}function o(t){function n(t){return function(n){return e.debounce(n,t)}}function i(t){return function(n){return e.throttle(n,t)}}var r,s,o;return r=t.limiter,s=t.rateLimitBy,o=t.rateLimitWait,r||(r=/^throttle$/i.test(s)?i(o):n(o)),r}function u(n){return function(i){function r(t){e.defer(function(){o.resolve(t)})}function s(t){e.defer(function(){o.reject(t)})}var o=t.Deferred();return n(i,r,s),o}}return function(n){var s,o;return s={initialize:!0,identify:e.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},n=e.mixin(s,n||{}),!n.datumTokenizer&&t.error("datumTokenizer is required"),!n.queryTokenizer&&t.error("queryTokenizer is required"),o=n.sorter,n.sorter=o?function(t){return t.sort(o)}:e.identity,n.local=e.isFunction(n.local)?n.local():n.local,n.prefetch=i(n.prefetch),n.remote=r(n.remote),n}}(),l=function(){"use strict";function n(t){t=h(t),this.sorter=t.sorter,this.identify=t.identify,this.sufficient=t.sufficient,this.local=t.local,this.remote=t.remote?new c(t.remote):null,this.prefetch=t.prefetch?new a(t.prefetch):null,this.index=new u({identify:this.identify,datumTokenizer:t.datumTokenizer,queryTokenizer:t.queryTokenizer}),t.initialize!==!1&&this.initialize()}var r;return r=window&&window.Bloodhound,n.noConflict=function(){return window&&(window.Bloodhound=r),n},n.tokenizers=i,e.mixin(n.prototype,{__ttAdapter:function(){function t(t,e,i){return n.search(t,e,i)}function e(t,e){return n.search(t,e)}var n=this;return this.remote?t:e},_loadPrefetch:function(){function e(t,e){return t?n.reject():(r.add(e),r.prefetch.store(r.index.serialize()),void n.resolve())}var n,i,r=this;return n=t.Deferred(),this.prefetch?(i=this.prefetch.fromCache())?(this.index.bootstrap(i),n.resolve()):this.prefetch.fromNetwork(e):n.resolve(),n.promise()},_initialize:function(){function t(){e.add(e.local)}var e=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(t),this.initPromise},initialize:function(t){return!this.initPromise||t?this._initialize():this.initPromise},add:function(t){return this.index.add(t),this},get:function(t){return t=e.isArray(t)?t:[].slice.call(arguments),this.index.get(t)},search:function(t,n,i){function r(t){var n=[];e.each(t,function(t){!e.some(s,function(e){return o.identify(t)===o.identify(e)})&&n.push(t)}),i&&i(n)}var s,o=this;return s=this.sorter(this.index.search(t)),n(this.remote?s.slice():s),this.remote&&s.length<this.sufficient?this.remote.get(t,r):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return o.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),n}();return l}),function(t,e){"function"==typeof define&&define.amd?define("typeahead.js",["jquery"],function(t){return e(t)}):"object"==typeof exports?module.exports=e(require("jquery")):e(jQuery)}(this,function(t){var e=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(t){return!t||/^\s*$/.test(t)},escapeRegExChars:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isArray:t.isArray,isFunction:t.isFunction,isObject:t.isPlainObject,isUndefined:function(t){return"undefined"==typeof t},isElement:function(t){return!(!t||1!==t.nodeType)},isJQuery:function(e){return e instanceof t},toStr:function(t){return e.isUndefined(t)||null===t?"":t+""},bind:t.proxy,each:function(e,n){function i(t,e){return n(e,t)}t.each(e,i)},map:t.map,filter:t.grep,every:function(e,n){var i=!0;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?void 0:!1}),!!i):i},some:function(e,n){var i=!1;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?!1:void 0}),!!i):i},mixin:t.extend,identity:function(t){return t},clone:function(e){return t.extend(!0,{},e)},getIdGenerator:function(){var t=0;return function(){return t++}},templatify:function(e){function n(){return String(e)}return t.isFunction(e)?e:n},defer:function(t){setTimeout(t,0)},debounce:function(t,e,n){var i,r;return function(){var s,o,u=this,a=arguments;return s=function(){i=null,n||(r=t.apply(u,a))},o=n&&!i,clearTimeout(i),i=setTimeout(s,e),o&&(r=t.apply(u,a)),r}},throttle:function(t,e){var n,i,r,s,o,u;return o=0,u=function(){o=new Date,r=null,s=t.apply(n,i)},function(){var a=new Date,c=e-(a-o);return n=this,i=arguments,0>=c?(clearTimeout(r),r=null,o=a,s=t.apply(n,i)):r||(r=setTimeout(u,c)),s}},stringify:function(t){return e.isString(t)?t:JSON.stringify(t)},noop:function(){}}}(),n=function(){"use strict";function t(t){var o,u;return u=e.mixin({},s,t),o={css:r(),classes:u,html:n(u),selectors:i(u)},{css:o.css,html:o.html,classes:o.classes,selectors:o.selectors,mixin:function(t){e.mixin(t,o)}}}function n(t){return{wrapper:'<span class="'+t.wrapper+'"></span>',menu:'<div class="'+t.menu+'"></div>'}}function i(t){var n={};return e.each(t,function(t,e){n[e]="."+t}),n}function r(){var t={wrapper:{position:"relative",display:"inline-block"},hint:{position:"absolute",top:"0",left:"0",borderColor:"transparent",boxShadow:"none",opacity:"1"},input:{position:"relative",verticalAlign:"top",backgroundColor:"transparent"},inputWithNoHint:{position:"relative",verticalAlign:"top"},menu:{position:"absolute",top:"100%",left:"0",zIndex:"100",display:"none"},ltr:{left:"0",right:"auto"},rtl:{left:"auto",right:" 0"}};return e.isMsie()&&e.mixin(t.input,{backgroundImage:"url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"}),t}var s={wrapper:"twitter-typeahead",input:"tt-input",hint:"tt-hint",menu:"tt-menu",dataset:"tt-dataset",suggestion:"tt-suggestion",selectable:"tt-selectable",empty:"tt-empty",open:"tt-open",cursor:"tt-cursor",highlight:"tt-highlight"};return t}(),i=function(){"use strict";function n(e){e&&e.el||t.error("EventBus initialized without el"),this.$el=t(e.el)}var i,r;return i="typeahead:",r={render:"rendered",cursorchange:"cursorchanged",select:"selected",autocomplete:"autocompleted"},e.mixin(n.prototype,{_trigger:function(e,n){var r;return r=t.Event(i+e),(n=n||[]).unshift(r),this.$el.trigger.apply(this.$el,n),r},before:function(t){var e,n;return e=[].slice.call(arguments,1),n=this._trigger("before"+t,e),n.isDefaultPrevented()},trigger:function(t){var e;this._trigger(t,[].slice.call(arguments,1)),(e=r[t])&&this._trigger(e,[].slice.call(arguments,1))}}),n}(),r=function(){"use strict";function t(t,e,n,i){var r;if(!n)return this;for(e=e.split(a),n=i?u(n,i):n,this._callbacks=this._callbacks||{};r=e.shift();)this._callbacks[r]=this._callbacks[r]||{sync:[],async:[]},this._callbacks[r][t].push(n);return this}function e(e,n,i){return t.call(this,"async",e,n,i)}function n(e,n,i){return t.call(this,"sync",e,n,i)}function i(t){var e;if(!this._callbacks)return this;for(t=t.split(a);e=t.shift();)delete this._callbacks[e];return this}function r(t){var e,n,i,r,o;if(!this._callbacks)return this;for(t=t.split(a),i=[].slice.call(arguments,1);(e=t.shift())&&(n=this._callbacks[e]);)r=s(n.sync,this,[e].concat(i)),o=s(n.async,this,[e].concat(i)),r()&&c(o);return this}function s(t,e,n){function i(){for(var i,r=0,s=t.length;!i&&s>r;r+=1)i=t[r].apply(e,n)===!1;return!i}return i}function o(){var t;return t=window.setImmediate?function(t){setImmediate(function(){t()})}:function(t){setTimeout(function(){t()},0)}}function u(t,e){return t.bind?t.bind(e):function(){t.apply(e,[].slice.call(arguments,0))}}var a=/\s+/,c=o();return{onSync:n,onAsync:e,off:i,trigger:r}}(),s=function(t){"use strict";function n(t,n,i){for(var r,s=[],o=0,u=t.length;u>o;o++)s.push(e.escapeRegExChars(t[o]));return r=i?"\\b("+s.join("|")+")\\b":"("+s.join("|")+")",n?new RegExp(r):new RegExp(r,"i")}var i={node:null,pattern:null,tagName:"strong",className:null,wordsOnly:!1,caseSensitive:!1};return function(r){function s(e){var n,i,s;return(n=u.exec(e.data))&&(s=t.createElement(r.tagName),r.className&&(s.className=r.className),i=e.splitText(n.index),i.splitText(n[0].length),s.appendChild(i.cloneNode(!0)),e.parentNode.replaceChild(s,i)),!!n}function o(t,e){for(var n,i=3,r=0;r<t.childNodes.length;r++)n=t.childNodes[r],n.nodeType===i?r+=e(n)?1:0:o(n,e)}var u;r=e.mixin({},i,r),r.node&&r.pattern&&(r.pattern=e.isArray(r.pattern)?r.pattern:[r.pattern],u=n(r.pattern,r.caseSensitive,r.wordsOnly),o(r.node,s))}}(window.document),o=function(){"use strict";function n(n,r){n=n||{},n.input||t.error("input is missing"),r.mixin(this),this.$hint=t(n.hint),this.$input=t(n.input),this.query=this.$input.val(),this.queryWhenFocused=this.hasFocus()?this.query:null,this.$overflowHelper=i(this.$input),this._checkLanguageDirection(),0===this.$hint.length&&(this.setHint=this.getHint=this.clearHint=this.clearHintIfInvalid=e.noop)}function i(e){return t('<pre aria-hidden="true"></pre>').css({position:"absolute",visibility:"hidden",whiteSpace:"pre",fontFamily:e.css("font-family"),fontSize:e.css("font-size"),fontStyle:e.css("font-style"),fontVariant:e.css("font-variant"),fontWeight:e.css("font-weight"),wordSpacing:e.css("word-spacing"),letterSpacing:e.css("letter-spacing"),textIndent:e.css("text-indent"),textRendering:e.css("text-rendering"),textTransform:e.css("text-transform")}).insertAfter(e)}function s(t,e){return n.normalizeQuery(t)===n.normalizeQuery(e)}function o(t){return t.altKey||t.ctrlKey||t.metaKey||t.shiftKey}var u;return u={9:"tab",27:"esc",37:"left",39:"right",13:"enter",38:"up",40:"down"},n.normalizeQuery=function(t){return e.toStr(t).replace(/^\s*/g,"").replace(/\s{2,}/g," ")},e.mixin(n.prototype,r,{_onBlur:function(){this.resetInputValue(),this.trigger("blurred")},_onFocus:function(){this.queryWhenFocused=this.query,this.trigger("focused")},_onKeydown:function(t){var e=u[t.which||t.keyCode];this._managePreventDefault(e,t),e&&this._shouldTrigger(e,t)&&this.trigger(e+"Keyed",t)},_onInput:function(){this._setQuery(this.getInputValue()),this.clearHintIfInvalid(),this._checkLanguageDirection()},_managePreventDefault:function(t,e){var n;switch(t){case"up":case"down":n=!o(e);break;default:n=!1}n&&e.preventDefault()},_shouldTrigger:function(t,e){var n;switch(t){case"tab":n=!o(e);break;default:n=!0}return n},_checkLanguageDirection:function(){var t=(this.$input.css("direction")||"ltr").toLowerCase();this.dir!==t&&(this.dir=t,this.$hint.attr("dir",t),this.trigger("langDirChanged",t))},_setQuery:function(t,e){var n,i;n=s(t,this.query),i=n?this.query.length!==t.length:!1,this.query=t,e||n?!e&&i&&this.trigger("whitespaceChanged",this.query):this.trigger("queryChanged",this.query)},bind:function(){var t,n,i,r,s=this;return t=e.bind(this._onBlur,this),n=e.bind(this._onFocus,this),i=e.bind(this._onKeydown,this),r=e.bind(this._onInput,this),this.$input.on("blur.tt",t).on("focus.tt",n).on("keydown.tt",i),!e.isMsie()||e.isMsie()>9?this.$input.on("input.tt",r):this.$input.on("keydown.tt keypress.tt cut.tt paste.tt",function(t){u[t.which||t.keyCode]||e.defer(e.bind(s._onInput,s,t))}),this},focus:function(){this.$input.focus()},blur:function(){this.$input.blur()},getLangDir:function(){return this.dir},getQuery:function(){return this.query||""},setQuery:function(t,e){this.setInputValue(t),this._setQuery(t,e)},hasQueryChangedSinceLastFocus:function(){return this.query!==this.queryWhenFocused},getInputValue:function(){return this.$input.val()},setInputValue:function(t){this.$input.val(t),this.clearHintIfInvalid(),this._checkLanguageDirection()},resetInputValue:function(){this.setInputValue(this.query)},getHint:function(){return this.$hint.val()},setHint:function(t){this.$hint.val(t)},clearHint:function(){this.setHint("")},clearHintIfInvalid:function(){var t,e,n,i;t=this.getInputValue(),e=this.getHint(),n=t!==e&&0===e.indexOf(t),i=""!==t&&n&&!this.hasOverflow(),!i&&this.clearHint()},hasFocus:function(){return this.$input.is(":focus")},hasOverflow:function(){var t=this.$input.width()-2;return this.$overflowHelper.text(this.getInputValue()),this.$overflowHelper.width()>=t},isCursorAtEnd:function(){var t,n,i;return t=this.$input.val().length,n=this.$input[0].selectionStart,e.isNumber(n)?n===t:document.selection?(i=document.selection.createRange(),i.moveStart("character",-t),t===i.text.length):!0},destroy:function(){this.$hint.off(".tt"),this.$input.off(".tt"),this.$overflowHelper.remove(),this.$hint=this.$input=this.$overflowHelper=t("<div>")}}),n}(),u=function(){"use strict";function n(n,r){n=n||{},n.templates=n.templates||{},n.templates.notFound=n.templates.notFound||n.templates.empty,n.source||t.error("missing source"),n.node||t.error("missing node"),n.name&&!u(n.name)&&t.error("invalid dataset name: "+n.name),r.mixin(this),this.highlight=!!n.highlight,this.name=n.name||c(),this.limit=n.limit||5,this.displayFn=i(n.display||n.displayKey),this.templates=o(n.templates,this.displayFn),this.source=n.source.__ttAdapter?n.source.__ttAdapter():n.source,this.async=e.isUndefined(n.async)?this.source.length>2:!!n.async,this._resetLastSuggestion(),this.$el=t(n.node).addClass(this.classes.dataset).addClass(this.classes.dataset+"-"+this.name)}function i(t){function n(e){return e[t]}return t=t||e.stringify,e.isFunction(t)?t:n}function o(n,i){function r(e){return t("<div>").text(i(e))}return{notFound:n.notFound&&e.templatify(n.notFound),pending:n.pending&&e.templatify(n.pending),header:n.header&&e.templatify(n.header),footer:n.footer&&e.templatify(n.footer),suggestion:n.suggestion||r}}function u(t){return/^[_a-zA-Z0-9-]+$/.test(t)}var a,c;return a={val:"tt-selectable-display",obj:"tt-selectable-object"},c=e.getIdGenerator(),n.extractData=function(e){var n=t(e);return n.data(a.obj)?{val:n.data(a.val)||"",obj:n.data(a.obj)||null}:null},e.mixin(n.prototype,r,{_overwrite:function(t,e){e=e||[],e.length?this._renderSuggestions(t,e):this.async&&this.templates.pending?this._renderPending(t):!this.async&&this.templates.notFound?this._renderNotFound(t):this._empty(),this.trigger("rendered",this.name,e,!1)},_append:function(t,e){e=e||[],e.length&&this.$lastSuggestion.length?this._appendSuggestions(t,e):e.length?this._renderSuggestions(t,e):!this.$lastSuggestion.length&&this.templates.notFound&&this._renderNotFound(t),this.trigger("rendered",this.name,e,!0)},_renderSuggestions:function(t,e){var n;n=this._getSuggestionsFragment(t,e),this.$lastSuggestion=n.children().last(),this.$el.html(n).prepend(this._getHeader(t,e)).append(this._getFooter(t,e))},_appendSuggestions:function(t,e){var n,i;n=this._getSuggestionsFragment(t,e),i=n.children().last(),this.$lastSuggestion.after(n),this.$lastSuggestion=i},_renderPending:function(t){var e=this.templates.pending;this._resetLastSuggestion(),e&&this.$el.html(e({query:t,dataset:this.name}))},_renderNotFound:function(t){var e=this.templates.notFound;this._resetLastSuggestion(),e&&this.$el.html(e({query:t,dataset:this.name}))},_empty:function(){this.$el.empty(),this._resetLastSuggestion()},_getSuggestionsFragment:function(n,i){var r,o=this;return r=document.createDocumentFragment(),e.each(i,function(e){var i,s;s=o._injectQuery(n,e),i=t(o.templates.suggestion(s)).data(a.obj,e).data(a.val,o.displayFn(e)).addClass(o.classes.suggestion+" "+o.classes.selectable),r.appendChild(i[0])}),this.highlight&&s({className:this.classes.highlight,node:r,pattern:n}),t(r)},_getFooter:function(t,e){return this.templates.footer?this.templates.footer({query:t,suggestions:e,dataset:this.name}):null},_getHeader:function(t,e){return this.templates.header?this.templates.header({query:t,suggestions:e,dataset:this.name}):null},_resetLastSuggestion:function(){this.$lastSuggestion=t()},_injectQuery:function(t,n){return e.isObject(n)?e.mixin({_query:t},n):n},update:function(e){function n(t){o||(o=!0,t=(t||[]).slice(0,r.limit),u=t.length,r._overwrite(e,t),u<r.limit&&r.async&&r.trigger("asyncRequested",e))}function i(n){n=n||[],!s&&u<r.limit&&(r.cancel=t.noop,u+=n.length,r._append(e,n.slice(0,r.limit-u)),r.async&&r.trigger("asyncReceived",e))}var r=this,s=!1,o=!1,u=0;this.cancel(),this.cancel=function(){s=!0,r.cancel=t.noop,r.async&&r.trigger("asyncCanceled",e)},this.source(e,n,i),!o&&n([])},cancel:t.noop,clear:function(){this._empty(),this.cancel(),this.trigger("cleared")},isEmpty:function(){return this.$el.is(":empty")},destroy:function(){this.$el=t("<div>")}}),n}(),a=function(){"use strict";function n(n,i){function r(e){var n=s.$node.find(e.node).first();return e.node=n.length?n:t("<div>").appendTo(s.$node),new u(e,i)}var s=this;n=n||{},n.node||t.error("node is required"),i.mixin(this),this.$node=t(n.node),this.query=null,this.datasets=e.map(n.datasets,r)}return e.mixin(n.prototype,r,{_onSelectableClick:function(e){this.trigger("selectableClicked",t(e.currentTarget))},_onRendered:function(t,e,n,i){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetRendered",e,n,i)},_onCleared:function(){this.$node.toggleClass(this.classes.empty,this._allDatasetsEmpty()),this.trigger("datasetCleared")},_propagate:function(){this.trigger.apply(this,arguments)},_allDatasetsEmpty:function(){function t(t){return t.isEmpty()}return e.every(this.datasets,t)},_getSelectables:function(){return this.$node.find(this.selectors.selectable)},_removeCursor:function(){var t=this.getActiveSelectable();t&&t.removeClass(this.classes.cursor)},_ensureVisible:function(t){var e,n,i,r;e=t.position().top,n=e+t.outerHeight(!0),i=this.$node.scrollTop(),r=this.$node.height()+parseInt(this.$node.css("paddingTop"),10)+parseInt(this.$node.css("paddingBottom"),10),0>e?this.$node.scrollTop(i+e):n>r&&this.$node.scrollTop(i+(n-r))},bind:function(){var t,n=this;return t=e.bind(this._onSelectableClick,this),this.$node.on("click.tt",this.selectors.selectable,t),e.each(this.datasets,function(t){t.onSync("asyncRequested",n._propagate,n).onSync("asyncCanceled",n._propagate,n).onSync("asyncReceived",n._propagate,n).onSync("rendered",n._onRendered,n).onSync("cleared",n._onCleared,n)}),this},isOpen:function(){return this.$node.hasClass(this.classes.open)},open:function(){this.$node.addClass(this.classes.open)},close:function(){this.$node.removeClass(this.classes.open),this._removeCursor()},setLanguageDirection:function(t){this.$node.attr("dir",t)},selectableRelativeToCursor:function(t){var e,n,i,r;return n=this.getActiveSelectable(),e=this._getSelectables(),i=n?e.index(n):-1,r=i+t,r=(r+1)%(e.length+1)-1,r=-1>r?e.length-1:r,-1===r?null:e.eq(r)},setCursor:function(t){this._removeCursor(),(t=t&&t.first())&&(t.addClass(this.classes.cursor),this._ensureVisible(t))},getSelectableData:function(t){return t&&t.length?u.extractData(t):null},getActiveSelectable:function(){var t=this._getSelectables().filter(this.selectors.cursor).first();return t.length?t:null},getTopSelectable:function(){var t=this._getSelectables().first();return t.length?t:null},update:function(t){function n(e){e.update(t)}var i=t!==this.query;return i&&(this.query=t,e.each(this.datasets,n)),i},empty:function(){function t(t){t.clear()}e.each(this.datasets,t),this.query=null,this.$node.addClass(this.classes.empty)},destroy:function(){function n(t){t.destroy()}this.$node.off(".tt"),this.$node=t("<div>"),e.each(this.datasets,n)}}),n}(),c=function(){"use strict";function t(){a.apply(this,[].slice.call(arguments,0))}var n=a.prototype;return e.mixin(t.prototype,a.prototype,{open:function(){return!this._allDatasetsEmpty()&&this._show(),n.open.apply(this,[].slice.call(arguments,0))},close:function(){return this._hide(),n.close.apply(this,[].slice.call(arguments,0))},_onRendered:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),n._onRendered.apply(this,[].slice.call(arguments,0))},_onCleared:function(){return this._allDatasetsEmpty()?this._hide():this.isOpen()&&this._show(),n._onCleared.apply(this,[].slice.call(arguments,0))},setLanguageDirection:function(t){return this.$node.css("ltr"===t?this.css.ltr:this.css.rtl),n.setLanguageDirection.apply(this,[].slice.call(arguments,0))},_hide:function(){this.$node.hide()},_show:function(){this.$node.css("display","block")}}),t}(),h=function(){"use strict";function n(n,r){var s,o,u,a,c,h,l,f,d,p,m;n=n||{},n.input||t.error("missing input"),n.menu||t.error("missing menu"),n.eventBus||t.error("missing event bus"),r.mixin(this),this.eventBus=n.eventBus,this.minLength=e.isNumber(n.minLength)?n.minLength:1,this.input=n.input,this.menu=n.menu,this.enabled=!0,this.active=!1,this.input.hasFocus()&&this.activate(),this.dir=this.input.getLangDir(),this._hacks(),this.menu.bind().onSync("selectableClicked",this._onSelectableClicked,this).onSync("asyncRequested",this._onAsyncRequested,this).onSync("asyncCanceled",this._onAsyncCanceled,this).onSync("asyncReceived",this._onAsyncReceived,this).onSync("datasetRendered",this._onDatasetRendered,this).onSync("datasetCleared",this._onDatasetCleared,this),s=i(this,"activate","open","_onFocused"),o=i(this,"deactivate","_onBlurred"),u=i(this,"isActive","isOpen","_onEnterKeyed"),a=i(this,"isActive","isOpen","_onTabKeyed"),c=i(this,"isActive","_onEscKeyed"),h=i(this,"isActive","open","_onUpKeyed"),l=i(this,"isActive","open","_onDownKeyed"),f=i(this,"isActive","isOpen","_onLeftKeyed"),d=i(this,"isActive","isOpen","_onRightKeyed"),p=i(this,"_openIfActive","_onQueryChanged"),m=i(this,"_openIfActive","_onWhitespaceChanged"),this.input.bind().onSync("focused",s,this).onSync("blurred",o,this).onSync("enterKeyed",u,this).onSync("tabKeyed",a,this).onSync("escKeyed",c,this).onSync("upKeyed",h,this).onSync("downKeyed",l,this).onSync("leftKeyed",f,this).onSync("rightKeyed",d,this).onSync("queryChanged",p,this).onSync("whitespaceChanged",m,this).onSync("langDirChanged",this._onLangDirChanged,this)}function i(t){var n=[].slice.call(arguments,1);return function(){var i=[].slice.call(arguments);e.each(n,function(e){return t[e].apply(t,i)})}}return e.mixin(n.prototype,{_hacks:function(){var n,i;n=this.input.$input||t("<div>"),
i=this.menu.$node||t("<div>"),n.on("blur.tt",function(t){var r,s,o;r=document.activeElement,s=i.is(r),o=i.has(r).length>0,e.isMsie()&&(s||o)&&(t.preventDefault(),t.stopImmediatePropagation(),e.defer(function(){n.focus()}))}),i.on("mousedown.tt",function(t){t.preventDefault()})},_onSelectableClicked:function(t,e){this.select(e)},_onDatasetCleared:function(){this._updateHint()},_onDatasetRendered:function(t,e,n,i){this._updateHint(),this.eventBus.trigger("render",n,i,e)},_onAsyncRequested:function(t,e,n){this.eventBus.trigger("asyncrequest",n,e)},_onAsyncCanceled:function(t,e,n){this.eventBus.trigger("asynccancel",n,e)},_onAsyncReceived:function(t,e,n){this.eventBus.trigger("asyncreceive",n,e)},_onFocused:function(){this._minLengthMet()&&this.menu.update(this.input.getQuery())},_onBlurred:function(){this.input.hasQueryChangedSinceLastFocus()&&this.eventBus.trigger("change",this.input.getQuery())},_onEnterKeyed:function(t,e){var n;(n=this.menu.getActiveSelectable())&&this.select(n)&&e.preventDefault()},_onTabKeyed:function(t,e){var n;(n=this.menu.getActiveSelectable())?this.select(n)&&e.preventDefault():(n=this.menu.getTopSelectable())&&this.autocomplete(n)&&e.preventDefault()},_onEscKeyed:function(){this.close()},_onUpKeyed:function(){this.moveCursor(-1)},_onDownKeyed:function(){this.moveCursor(1)},_onLeftKeyed:function(){"rtl"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onRightKeyed:function(){"ltr"===this.dir&&this.input.isCursorAtEnd()&&this.autocomplete(this.menu.getTopSelectable())},_onQueryChanged:function(t,e){this._minLengthMet(e)?this.menu.update(e):this.menu.empty()},_onWhitespaceChanged:function(){this._updateHint()},_onLangDirChanged:function(t,e){this.dir!==e&&(this.dir=e,this.menu.setLanguageDirection(e))},_openIfActive:function(){this.isActive()&&this.open()},_minLengthMet:function(t){return t=e.isString(t)?t:this.input.getQuery()||"",t.length>=this.minLength},_updateHint:function(){var t,n,i,r,s,u,a;t=this.menu.getTopSelectable(),n=this.menu.getSelectableData(t),i=this.input.getInputValue(),!n||e.isBlankString(i)||this.input.hasOverflow()?this.input.clearHint():(r=o.normalizeQuery(i),s=e.escapeRegExChars(r),u=new RegExp("^(?:"+s+")(.+$)","i"),a=u.exec(n.val),a&&this.input.setHint(i+a[1]))},isEnabled:function(){return this.enabled},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},isActive:function(){return this.active},activate:function(){return this.isActive()?!0:!this.isEnabled()||this.eventBus.before("active")?!1:(this.active=!0,this.eventBus.trigger("active"),!0)},deactivate:function(){return this.isActive()?this.eventBus.before("idle")?!1:(this.active=!1,this.close(),this.eventBus.trigger("idle"),!0):!0},isOpen:function(){return this.menu.isOpen()},open:function(){return this.isOpen()||this.eventBus.before("open")||(this.menu.open(),this._updateHint(),this.eventBus.trigger("open")),this.isOpen()},close:function(){return this.isOpen()&&!this.eventBus.before("close")&&(this.menu.close(),this.input.clearHint(),this.input.resetInputValue(),this.eventBus.trigger("close")),!this.isOpen()},setVal:function(t){this.input.setQuery(e.toStr(t))},getVal:function(){return this.input.getQuery()},select:function(t){var e=this.menu.getSelectableData(t);return e&&!this.eventBus.before("select",e.obj)?(this.input.setQuery(e.val,!0),this.eventBus.trigger("select",e.obj),this.close(),!0):!1},autocomplete:function(t){var e,n,i;return e=this.input.getQuery(),n=this.menu.getSelectableData(t),i=n&&e!==n.val,i&&!this.eventBus.before("autocomplete",n.obj)?(this.input.setQuery(n.val),this.eventBus.trigger("autocomplete",n.obj),!0):!1},moveCursor:function(t){var e,n,i,r,s;return e=this.input.getQuery(),n=this.menu.selectableRelativeToCursor(t),i=this.menu.getSelectableData(n),r=i?i.obj:null,s=this._minLengthMet()&&this.menu.update(e),s||this.eventBus.before("cursorchange",r)?!1:(this.menu.setCursor(n),i?this.input.setInputValue(i.val):(this.input.resetInputValue(),this._updateHint()),this.eventBus.trigger("cursorchange",r),!0)},destroy:function(){this.input.destroy(),this.menu.destroy()}}),n}();!function(){"use strict";function r(e,n){e.each(function(){var e,i=t(this);(e=i.data(m.typeahead))&&n(e,i)})}function s(t,e){return t.clone().addClass(e.classes.hint).removeData().css(e.css.hint).css(l(t)).prop("readonly",!0).removeAttr("id name placeholder required").attr({autocomplete:"off",spellcheck:"false",tabindex:-1})}function u(t,e){t.data(m.attrs,{dir:t.attr("dir"),autocomplete:t.attr("autocomplete"),spellcheck:t.attr("spellcheck"),style:t.attr("style")}),t.addClass(e.classes.input).attr({autocomplete:"off",spellcheck:!1});try{!t.attr("dir")&&t.attr("dir","auto")}catch(n){}return t}function l(t){return{backgroundAttachment:t.css("background-attachment"),backgroundClip:t.css("background-clip"),backgroundColor:t.css("background-color"),backgroundImage:t.css("background-image"),backgroundOrigin:t.css("background-origin"),backgroundPosition:t.css("background-position"),backgroundRepeat:t.css("background-repeat"),backgroundSize:t.css("background-size")}}function f(t){var n,i;n=t.data(m.www),i=t.parent().filter(n.selectors.wrapper),e.each(t.data(m.attrs),function(n,i){e.isUndefined(n)?t.removeAttr(i):t.attr(i,n)}),t.removeData(m.typeahead).removeData(m.www).removeData(m.attr).removeClass(n.classes.input),i.length&&(t.detach().insertAfter(i),i.remove())}function d(n){var i,r;return i=e.isJQuery(n)||e.isElement(n),r=i?t(n).first():[],r.length?r:null}var p,m,g;p=t.fn.typeahead,m={www:"tt-www",attrs:"tt-attrs",typeahead:"tt-typeahead"},g={initialize:function(r,l){function f(){var n,f,g,y,v,_,b,x,w,S,k;e.each(l,function(t){t.highlight=!!r.highlight}),n=t(this),f=t(p.html.wrapper),g=d(r.hint),y=d(r.menu),v=r.hint!==!1&&!g,_=r.menu!==!1&&!y,v&&(g=s(n,p)),_&&(y=t(p.html.menu).css(p.css.menu)),g&&g.val(""),n=u(n,p),(v||_)&&(f.css(p.css.wrapper),n.css(v?p.css.input:p.css.inputWithNoHint),n.wrap(f).parent().prepend(v?g:null).append(_?y:null)),k=_?c:a,b=new i({el:n}),x=new o({hint:g,input:n},p),w=new k({node:y,datasets:l},p),S=new h({input:x,menu:w,eventBus:b,minLength:r.minLength},p),n.data(m.www,p),n.data(m.typeahead,S)}var p;return l=e.isArray(l)?l:[].slice.call(arguments,1),r=r||{},p=n(r.classNames),this.each(f)},isEnabled:function(){var t;return r(this.first(),function(e){t=e.isEnabled()}),t},enable:function(){return r(this,function(t){t.enable()}),this},disable:function(){return r(this,function(t){t.disable()}),this},isActive:function(){var t;return r(this.first(),function(e){t=e.isActive()}),t},activate:function(){return r(this,function(t){t.activate()}),this},deactivate:function(){return r(this,function(t){t.deactivate()}),this},isOpen:function(){var t;return r(this.first(),function(e){t=e.isOpen()}),t},open:function(){return r(this,function(t){t.open()}),this},close:function(){return r(this,function(t){t.close()}),this},select:function(e){var n=!1,i=t(e);return r(this.first(),function(t){n=t.select(i)}),n},autocomplete:function(e){var n=!1,i=t(e);return r(this.first(),function(t){n=t.autocomplete(i)}),n},moveCursor:function(t){var e=!1;return r(this.first(),function(n){e=n.moveCursor(t)}),e},val:function(t){var e;return arguments.length?(r(this,function(e){e.setVal(t)}),this):(r(this.first(),function(t){e=t.getVal()}),e)},destroy:function(){return r(this,function(t,e){f(e),t.destroy()}),this}},t.fn.typeahead=function(t){return g[t]?g[t].apply(this,[].slice.call(arguments,1)):g.initialize.apply(this,arguments)},t.fn.typeahead.noConflict=function(){return t.fn.typeahead=p,this}}()}),function(t,e){"function"==typeof define&&define.amd?define("bloodhound",["jquery"],function(n){return t.Bloodhound=e(n)}):"object"==typeof exports?module.exports=e(require("jquery")):t.Bloodhound=e(jQuery)}(this,function(t){var e=function(){"use strict";return{isMsie:function(){return/(msie|trident)/i.test(navigator.userAgent)?navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]:!1},isBlankString:function(t){return!t||/^\s*$/.test(t)},escapeRegExChars:function(t){return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")},isString:function(t){return"string"==typeof t},isNumber:function(t){return"number"==typeof t},isArray:t.isArray,isFunction:t.isFunction,isObject:t.isPlainObject,isUndefined:function(t){return"undefined"==typeof t},isElement:function(t){return!(!t||1!==t.nodeType)},isJQuery:function(e){return e instanceof t},toStr:function(t){return e.isUndefined(t)||null===t?"":t+""},bind:t.proxy,each:function(e,n){function i(t,e){return n(e,t)}t.each(e,i)},map:t.map,filter:t.grep,every:function(e,n){var i=!0;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?void 0:!1}),!!i):i},some:function(e,n){var i=!1;return e?(t.each(e,function(t,r){return(i=n.call(null,r,t,e))?!1:void 0}),!!i):i},mixin:t.extend,identity:function(t){return t},clone:function(e){return t.extend(!0,{},e)},getIdGenerator:function(){var t=0;return function(){return t++}},templatify:function(e){function n(){return String(e)}return t.isFunction(e)?e:n},defer:function(t){setTimeout(t,0)},debounce:function(t,e,n){var i,r;return function(){var s,o,u=this,a=arguments;return s=function(){i=null,n||(r=t.apply(u,a))},o=n&&!i,clearTimeout(i),i=setTimeout(s,e),o&&(r=t.apply(u,a)),r}},throttle:function(t,e){var n,i,r,s,o,u;return o=0,u=function(){o=new Date,r=null,s=t.apply(n,i)},function(){var a=new Date,c=e-(a-o);return n=this,i=arguments,0>=c?(clearTimeout(r),r=null,o=a,s=t.apply(n,i)):r||(r=setTimeout(u,c)),s}},stringify:function(t){return e.isString(t)?t:JSON.stringify(t)},noop:function(){}}}(),n="0.11.1",i=function(){"use strict";function t(t){return t=e.toStr(t),t?t.split(/\s+/):[]}function n(t){return t=e.toStr(t),t?t.split(/\W+/):[]}function i(t){return function(n){return n=e.isArray(n)?n:[].slice.call(arguments,0),function(i){var r=[];return e.each(n,function(n){r=r.concat(t(e.toStr(i[n])))}),r}}}return{nonword:n,whitespace:t,obj:{nonword:i(n),whitespace:i(t)}}}(),r=function(){"use strict";function n(n){this.maxSize=e.isNumber(n)?n:100,this.reset(),this.maxSize<=0&&(this.set=this.get=t.noop)}function i(){this.head=this.tail=null}function r(t,e){this.key=t,this.val=e,this.prev=this.next=null}return e.mixin(n.prototype,{set:function(t,e){var n,i=this.list.tail;this.size>=this.maxSize&&(this.list.remove(i),delete this.hash[i.key],this.size--),(n=this.hash[t])?(n.val=e,this.list.moveToFront(n)):(n=new r(t,e),this.list.add(n),this.hash[t]=n,this.size++)},get:function(t){var e=this.hash[t];return e?(this.list.moveToFront(e),e.val):void 0},reset:function(){this.size=0,this.hash={},this.list=new i}}),e.mixin(i.prototype,{add:function(t){this.head&&(t.next=this.head,this.head.prev=t),this.head=t,this.tail=this.tail||t},remove:function(t){t.prev?t.prev.next=t.next:this.head=t.next,t.next?t.next.prev=t.prev:this.tail=t.prev},moveToFront:function(t){this.remove(t),this.add(t)}}),n}(),s=function(){"use strict";function n(t,n){this.prefix=["__",t,"__"].join(""),this.ttlKey="__ttl__",this.keyMatcher=new RegExp("^"+e.escapeRegExChars(this.prefix)),this.ls=n||u,!this.ls&&this._noop()}function i(){return(new Date).getTime()}function r(t){return JSON.stringify(e.isUndefined(t)?null:t)}function s(e){return t.parseJSON(e)}function o(t){var e,n,i=[],r=u.length;for(e=0;r>e;e++)(n=u.key(e)).match(t)&&i.push(n.replace(t,""));return i}var u;try{u=window.localStorage,u.setItem("~~~","!"),u.removeItem("~~~")}catch(a){u=null}return e.mixin(n.prototype,{_prefix:function(t){return this.prefix+t},_ttlKey:function(t){return this._prefix(t)+this.ttlKey},_noop:function(){this.get=this.set=this.remove=this.clear=this.isExpired=e.noop},_safeSet:function(t,e){try{this.ls.setItem(t,e)}catch(n){"QuotaExceededError"===n.name&&(this.clear(),this._noop())}},get:function(t){return this.isExpired(t)&&this.remove(t),s(this.ls.getItem(this._prefix(t)))},set:function(t,n,s){return e.isNumber(s)?this._safeSet(this._ttlKey(t),r(i()+s)):this.ls.removeItem(this._ttlKey(t)),this._safeSet(this._prefix(t),r(n))},remove:function(t){return this.ls.removeItem(this._ttlKey(t)),this.ls.removeItem(this._prefix(t)),this},clear:function(){var t,e=o(this.keyMatcher);for(t=e.length;t--;)this.remove(e[t]);return this},isExpired:function(t){var n=s(this.ls.getItem(this._ttlKey(t)));return e.isNumber(n)&&i()>n?!0:!1}}),n}(),o=function(){"use strict";function n(t){t=t||{},this.cancelled=!1,this.lastReq=null,this._send=t.transport,this._get=t.limiter?t.limiter(this._get):this._get,this._cache=t.cache===!1?new r(0):u}var i=0,s={},o=6,u=new r(10);return n.setMaxPendingRequests=function(t){o=t},n.resetCache=function(){u.reset()},e.mixin(n.prototype,{_fingerprint:function(e){return e=e||{},e.url+e.type+t.param(e.data||{})},_get:function(t,e){function n(t){e(null,t),h._cache.set(a,t)}function r(){e(!0)}function u(){i--,delete s[a],h.onDeckRequestArgs&&(h._get.apply(h,h.onDeckRequestArgs),h.onDeckRequestArgs=null)}var a,c,h=this;a=this._fingerprint(t),this.cancelled||a!==this.lastReq||((c=s[a])?c.done(n).fail(r):o>i?(i++,s[a]=this._send(t).done(n).fail(r).always(u)):this.onDeckRequestArgs=[].slice.call(arguments,0))},get:function(n,i){var r,s;i=i||t.noop,n=e.isString(n)?{url:n}:n||{},s=this._fingerprint(n),this.cancelled=!1,this.lastReq=s,(r=this._cache.get(s))?i(null,r):this._get(n,i)},cancel:function(){this.cancelled=!0}}),n}(),u=window.SearchIndex=function(){"use strict";function n(n){n=n||{},n.datumTokenizer&&n.queryTokenizer||t.error("datumTokenizer and queryTokenizer are both required"),this.identify=n.identify||e.stringify,this.datumTokenizer=n.datumTokenizer,this.queryTokenizer=n.queryTokenizer,this.reset()}function i(t){return t=e.filter(t,function(t){return!!t}),t=e.map(t,function(t){return t.toLowerCase()})}function r(){var t={};return t[a]=[],t[u]={},t}function s(t){for(var e={},n=[],i=0,r=t.length;r>i;i++)e[t[i]]||(e[t[i]]=!0,n.push(t[i]));return n}function o(t,e){var n=0,i=0,r=[];t=t.sort(),e=e.sort();for(var s=t.length,o=e.length;s>n&&o>i;)t[n]<e[i]?n++:t[n]>e[i]?i++:(r.push(t[n]),n++,i++);return r}var u="c",a="i";return e.mixin(n.prototype,{bootstrap:function(t){this.datums=t.datums,this.trie=t.trie},add:function(t){var n=this;t=e.isArray(t)?t:[t],e.each(t,function(t){var s,o;n.datums[s=n.identify(t)]=t,o=i(n.datumTokenizer(t)),e.each(o,function(t){var e,i,o;for(e=n.trie,i=t.split("");o=i.shift();)e=e[u][o]||(e[u][o]=r()),e[a].push(s)})})},get:function(t){var n=this;return e.map(t,function(t){return n.datums[t]})},search:function(t){var n,r,c=this;return n=i(this.queryTokenizer(t)),e.each(n,function(t){var e,n,i,s;if(r&&0===r.length)return!1;for(e=c.trie,n=t.split("");e&&(i=n.shift());)e=e[u][i];return e&&0===n.length?(s=e[a].slice(0),void(r=r?o(r,s):s)):(r=[],!1)}),r?e.map(s(r),function(t){return c.datums[t]}):[]},all:function(){var t=[];for(var e in this.datums)t.push(this.datums[e]);return t},reset:function(){this.datums={},this.trie=r()},serialize:function(){return{datums:this.datums,trie:this.trie}}}),n}(),a=function(){"use strict";function t(t){this.url=t.url,this.ttl=t.ttl,this.cache=t.cache,this.prepare=t.prepare,this.transform=t.transform,this.transport=t.transport,this.thumbprint=t.thumbprint,this.storage=new s(t.cacheKey)}var n;return n={data:"data",protocol:"protocol",thumbprint:"thumbprint"},e.mixin(t.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},store:function(t){this.cache&&(this.storage.set(n.data,t,this.ttl),this.storage.set(n.protocol,location.protocol,this.ttl),this.storage.set(n.thumbprint,this.thumbprint,this.ttl))},fromCache:function(){var t,e={};return this.cache?(e.data=this.storage.get(n.data),e.protocol=this.storage.get(n.protocol),e.thumbprint=this.storage.get(n.thumbprint),t=e.thumbprint!==this.thumbprint||e.protocol!==location.protocol,e.data&&!t?e.data:null):null},fromNetwork:function(t){function e(){t(!0)}function n(e){t(null,r.transform(e))}var i,r=this;t&&(i=this.prepare(this._settings()),this.transport(i).fail(e).done(n))},clear:function(){return this.storage.clear(),this}}),t}(),c=function(){"use strict";function t(t){this.url=t.url,this.prepare=t.prepare,this.transform=t.transform,this.transport=new o({cache:t.cache,limiter:t.limiter,transport:t.transport})}return e.mixin(t.prototype,{_settings:function(){return{url:this.url,type:"GET",dataType:"json"}},get:function(t,e){function n(t,n){e(t?[]:r.transform(n))}var i,r=this;if(e)return t=t||"",i=this.prepare(t,this._settings()),this.transport.get(i,n)},cancelLastRequest:function(){this.transport.cancel()}}),t}(),h=function(){"use strict";function i(i){var r;return i?(r={url:null,ttl:864e5,cache:!0,cacheKey:null,thumbprint:"",prepare:e.identity,transform:e.identity,transport:null},i=e.isString(i)?{url:i}:i,i=e.mixin(r,i),!i.url&&t.error("prefetch requires url to be set"),i.transform=i.filter||i.transform,i.cacheKey=i.cacheKey||i.url,i.thumbprint=n+i.thumbprint,i.transport=i.transport?u(i.transport):t.ajax,i):null}function r(n){var i;if(n)return i={url:null,cache:!0,prepare:null,replace:null,wildcard:null,limiter:null,rateLimitBy:"debounce",rateLimitWait:300,transform:e.identity,transport:null},n=e.isString(n)?{url:n}:n,n=e.mixin(i,n),!n.url&&t.error("remote requires url to be set"),n.transform=n.filter||n.transform,n.prepare=s(n),n.limiter=o(n),n.transport=n.transport?u(n.transport):t.ajax,delete n.replace,delete n.wildcard,delete n.rateLimitBy,delete n.rateLimitWait,n}function s(t){function e(t,e){return e.url=s(e.url,t),e}function n(t,e){return e.url=e.url.replace(o,encodeURIComponent(t)),e}function i(t,e){return e}var r,s,o;return r=t.prepare,s=t.replace,o=t.wildcard,r?r:r=s?e:t.wildcard?n:i}function o(t){function n(t){return function(n){return e.debounce(n,t)}}function i(t){return function(n){return e.throttle(n,t)}}var r,s,o;return r=t.limiter,s=t.rateLimitBy,o=t.rateLimitWait,r||(r=/^throttle$/i.test(s)?i(o):n(o)),r}function u(n){return function(i){function r(t){e.defer(function(){o.resolve(t)})}function s(t){e.defer(function(){o.reject(t)})}var o=t.Deferred();return n(i,r,s),o}}return function(n){var s,o;return s={initialize:!0,identify:e.stringify,datumTokenizer:null,queryTokenizer:null,sufficient:5,sorter:null,local:[],prefetch:null,remote:null},n=e.mixin(s,n||{}),!n.datumTokenizer&&t.error("datumTokenizer is required"),!n.queryTokenizer&&t.error("queryTokenizer is required"),o=n.sorter,n.sorter=o?function(t){return t.sort(o)}:e.identity,n.local=e.isFunction(n.local)?n.local():n.local,n.prefetch=i(n.prefetch),n.remote=r(n.remote),n}}(),l=function(){"use strict";function n(t){t=h(t),this.sorter=t.sorter,this.identify=t.identify,this.sufficient=t.sufficient,this.local=t.local,this.remote=t.remote?new c(t.remote):null,this.prefetch=t.prefetch?new a(t.prefetch):null,this.index=new u({identify:this.identify,datumTokenizer:t.datumTokenizer,queryTokenizer:t.queryTokenizer}),t.initialize!==!1&&this.initialize()}var r;return r=window&&window.Bloodhound,n.noConflict=function(){return window&&(window.Bloodhound=r),n},n.tokenizers=i,e.mixin(n.prototype,{__ttAdapter:function(){function t(t,e,i){return n.search(t,e,i)}function e(t,e){return n.search(t,e)}var n=this;return this.remote?t:e},_loadPrefetch:function(){function e(t,e){return t?n.reject():(r.add(e),r.prefetch.store(r.index.serialize()),void n.resolve())}var n,i,r=this;return n=t.Deferred(),this.prefetch?(i=this.prefetch.fromCache())?(this.index.bootstrap(i),n.resolve()):this.prefetch.fromNetwork(e):n.resolve(),n.promise()},_initialize:function(){function t(){e.add(e.local)}var e=this;return this.clear(),(this.initPromise=this._loadPrefetch()).done(t),this.initPromise},initialize:function(t){return!this.initPromise||t?this._initialize():this.initPromise},add:function(t){return this.index.add(t),this},get:function(t){return t=e.isArray(t)?t:[].slice.call(arguments),this.index.get(t)},search:function(t,n,i){function r(t){var n=[];e.each(t,function(t){!e.some(s,function(e){return o.identify(t)===o.identify(e)})&&n.push(t)}),i&&i(n)}var s,o=this;return s=this.sorter(this.index.search(t)),n(this.remote?s.slice():s),this.remote&&s.length<this.sufficient?this.remote.get(t,r):this.remote&&this.remote.cancelLastRequest(),this},all:function(){return this.index.all()},clear:function(){return this.index.reset(),this},clearPrefetchCache:function(){return this.prefetch&&this.prefetch.clear(),this},clearRemoteCache:function(){return o.resetCache(),this},ttAdapter:function(){return this.__ttAdapter()}}),n}();return l});
;/*})'"*/
;/*})'"*/
if("undefined"==typeof jQuery)throw new Error("Bootstrap's JavaScript requires jQuery");!function(t){"use strict";var e=jQuery.fn.jquery.split(" ")[0].split(".");if(e[0]<2&&e[1]<9||1==e[0]&&9==e[1]&&e[2]<1||e[0]>3)throw new Error("Bootstrap's JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4")}(),function(t){"use strict";t.fn.emulateTransitionEnd=function(e){var i=!1,n=this;t(this).one("bsTransitionEnd",function(){i=!0});return setTimeout(function(){i||t(n).trigger(t.support.transition.end)},e),this},t(function(){t.support.transition=function(){var t=document.createElement("bootstrap"),e={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"oTransitionEnd otransitionend",transition:"transitionend"};for(var i in e)if(void 0!==t.style[i])return{end:e[i]};return!1}(),t.support.transition&&(t.event.special.bsTransitionEnd={bindType:t.support.transition.end,delegateType:t.support.transition.end,handle:function(e){if(t(e.target).is(this))return e.handleObj.handler.apply(this,arguments)}})})}(jQuery),function(t){"use strict";var e='[data-dismiss="alert"]',i=function(i){t(i).on("click",e,this.close)};i.VERSION="3.4.1",i.TRANSITION_DURATION=150,i.prototype.close=function(e){var n=t(this),o=n.attr("data-target");o||(o=(o=n.attr("href"))&&o.replace(/.*(?=#[^\s]*$)/,"")),o="#"===o?[]:o;var s=t(document).find(o);function r(){s.detach().trigger("closed.bs.alert").remove()}e&&e.preventDefault(),s.length||(s=n.closest(".alert")),s.trigger(e=t.Event("close.bs.alert")),e.isDefaultPrevented()||(s.removeClass("in"),t.support.transition&&s.hasClass("fade")?s.one("bsTransitionEnd",r).emulateTransitionEnd(i.TRANSITION_DURATION):r())};var n=t.fn.alert;t.fn.alert=function(e){return this.each(function(){var n=t(this),o=n.data("bs.alert");o||n.data("bs.alert",o=new i(this)),"string"==typeof e&&o[e].call(n)})},t.fn.alert.Constructor=i,t.fn.alert.noConflict=function(){return t.fn.alert=n,this},t(document).on("click.bs.alert.data-api",e,i.prototype.close)}(jQuery),function(t){"use strict";var e=function(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,n),this.isLoading=!1};function i(i){return this.each(function(){var n=t(this),o=n.data("bs.button"),s="object"==typeof i&&i;o||n.data("bs.button",o=new e(this,s)),"toggle"==i?o.toggle():i&&o.setState(i)})}e.VERSION="3.4.1",e.DEFAULTS={loadingText:"loading..."},e.prototype.setState=function(e){var i="disabled",n=this.$element,o=n.is("input")?"val":"html",s=n.data();e+="Text",null==s.resetText&&n.data("resetText",n[o]()),setTimeout(t.proxy(function(){n[o](null==s[e]?this.options[e]:s[e]),"loadingText"==e?(this.isLoading=!0,n.addClass(i).attr(i,i).prop(i,!0)):this.isLoading&&(this.isLoading=!1,n.removeClass(i).removeAttr(i).prop(i,!1))},this),0)},e.prototype.toggle=function(){var t=!0,e=this.$element.closest('[data-toggle="buttons"]');if(e.length){var i=this.$element.find("input");"radio"==i.prop("type")?(i.prop("checked")&&(t=!1),e.find(".active").removeClass("active"),this.$element.addClass("active")):"checkbox"==i.prop("type")&&(i.prop("checked")!==this.$element.hasClass("active")&&(t=!1),this.$element.toggleClass("active")),i.prop("checked",this.$element.hasClass("active")),t&&i.trigger("change")}else this.$element.attr("aria-pressed",!this.$element.hasClass("active")),this.$element.toggleClass("active")};var n=t.fn.button;t.fn.button=i,t.fn.button.Constructor=e,t.fn.button.noConflict=function(){return t.fn.button=n,this},t(document).on("click.bs.button.data-api",'[data-toggle^="button"]',function(e){var n=t(e.target).closest(".btn");i.call(n,"toggle"),t(e.target).is('input[type="radio"], input[type="checkbox"]')||(e.preventDefault(),n.is("input,button")?n.trigger("focus"):n.find("input:visible,button:visible").first().trigger("focus"))}).on("focus.bs.button.data-api blur.bs.button.data-api",'[data-toggle^="button"]',function(e){t(e.target).closest(".btn").toggleClass("focus",/^focus(in)?$/.test(e.type))})}(jQuery),function(t){"use strict";var e=function(e,i){this.$element=t(e),this.$indicators=this.$element.find(".carousel-indicators"),this.options=i,this.paused=null,this.sliding=null,this.interval=null,this.$active=null,this.$items=null,this.options.keyboard&&this.$element.on("keydown.bs.carousel",t.proxy(this.keydown,this)),"hover"==this.options.pause&&!("ontouchstart"in document.documentElement)&&this.$element.on("mouseenter.bs.carousel",t.proxy(this.pause,this)).on("mouseleave.bs.carousel",t.proxy(this.cycle,this))};function i(i){return this.each(function(){var n=t(this),o=n.data("bs.carousel"),s=t.extend({},e.DEFAULTS,n.data(),"object"==typeof i&&i),r="string"==typeof i?i:s.slide;o||n.data("bs.carousel",o=new e(this,s)),"number"==typeof i?o.to(i):r?o[r]():s.interval&&o.pause().cycle()})}e.VERSION="3.4.1",e.TRANSITION_DURATION=600,e.DEFAULTS={interval:5e3,pause:"hover",wrap:!0,keyboard:!0},e.prototype.keydown=function(t){if(!/input|textarea/i.test(t.target.tagName)){switch(t.which){case 37:this.prev();break;case 39:this.next();break;default:return}t.preventDefault()}},e.prototype.cycle=function(e){return e||(this.paused=!1),this.interval&&clearInterval(this.interval),this.options.interval&&!this.paused&&(this.interval=setInterval(t.proxy(this.next,this),this.options.interval)),this},e.prototype.getItemIndex=function(t){return this.$items=t.parent().children(".item"),this.$items.index(t||this.$active)},e.prototype.getItemForDirection=function(t,e){var i=this.getItemIndex(e);if(("prev"==t&&0===i||"next"==t&&i==this.$items.length-1)&&!this.options.wrap)return e;var n=(i+("prev"==t?-1:1))%this.$items.length;return this.$items.eq(n)},e.prototype.to=function(t){var e=this,i=this.getItemIndex(this.$active=this.$element.find(".item.active"));if(!(t>this.$items.length-1||t<0))return this.sliding?this.$element.one("slid.bs.carousel",function(){e.to(t)}):i==t?this.pause().cycle():this.slide(t>i?"next":"prev",this.$items.eq(t))},e.prototype.pause=function(e){return e||(this.paused=!0),this.$element.find(".next, .prev").length&&t.support.transition&&(this.$element.trigger(t.support.transition.end),this.cycle(!0)),this.interval=clearInterval(this.interval),this},e.prototype.next=function(){if(!this.sliding)return this.slide("next")},e.prototype.prev=function(){if(!this.sliding)return this.slide("prev")},e.prototype.slide=function(i,n){var o=this.$element.find(".item.active"),s=n||this.getItemForDirection(i,o),r=this.interval,a="next"==i?"left":"right",l=this;if(s.hasClass("active"))return this.sliding=!1;var h=s[0],d=t.Event("slide.bs.carousel",{relatedTarget:h,direction:a});if(this.$element.trigger(d),!d.isDefaultPrevented()){if(this.sliding=!0,r&&this.pause(),this.$indicators.length){this.$indicators.find(".active").removeClass("active");var p=t(this.$indicators.children()[this.getItemIndex(s)]);p&&p.addClass("active")}var c=t.Event("slid.bs.carousel",{relatedTarget:h,direction:a});return t.support.transition&&this.$element.hasClass("slide")?(s.addClass(i),"object"==typeof s&&s.length&&s[0].offsetWidth,o.addClass(a),s.addClass(a),o.one("bsTransitionEnd",function(){s.removeClass([i,a].join(" ")).addClass("active"),o.removeClass(["active",a].join(" ")),l.sliding=!1,setTimeout(function(){l.$element.trigger(c)},0)}).emulateTransitionEnd(e.TRANSITION_DURATION)):(o.removeClass("active"),s.addClass("active"),this.sliding=!1,this.$element.trigger(c)),r&&this.cycle(),this}};var n=t.fn.carousel;t.fn.carousel=i,t.fn.carousel.Constructor=e,t.fn.carousel.noConflict=function(){return t.fn.carousel=n,this};var o=function(e){var n=t(this),o=n.attr("href");o&&(o=o.replace(/.*(?=#[^\s]+$)/,""));var s=n.attr("data-target")||o,r=t(document).find(s);if(r.hasClass("carousel")){var a=t.extend({},r.data(),n.data()),l=n.attr("data-slide-to");l&&(a.interval=!1),i.call(r,a),l&&r.data("bs.carousel").to(l),e.preventDefault()}};t(document).on("click.bs.carousel.data-api","[data-slide]",o).on("click.bs.carousel.data-api","[data-slide-to]",o),t(window).on("load",function(){t('[data-ride="carousel"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),function(t){"use strict";var e=function(i,n){this.$element=t(i),this.options=t.extend({},e.DEFAULTS,n),this.$trigger=t('[data-toggle="collapse"][href="#'+i.id+'"],[data-toggle="collapse"][data-target="#'+i.id+'"]'),this.transitioning=null,this.options.parent?this.$parent=this.getParent():this.addAriaAndCollapsedClass(this.$element,this.$trigger),this.options.toggle&&this.toggle()};function i(e){var i,n=e.attr("data-target")||(i=e.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"");return t(document).find(n)}function n(i){return this.each(function(){var n=t(this),o=n.data("bs.collapse"),s=t.extend({},e.DEFAULTS,n.data(),"object"==typeof i&&i);!o&&s.toggle&&/show|hide/.test(i)&&(s.toggle=!1),o||n.data("bs.collapse",o=new e(this,s)),"string"==typeof i&&o[i]()})}e.VERSION="3.4.1",e.TRANSITION_DURATION=350,e.DEFAULTS={toggle:!0},e.prototype.dimension=function(){return this.$element.hasClass("width")?"width":"height"},e.prototype.show=function(){if(!this.transitioning&&!this.$element.hasClass("in")){var i,o=this.$parent&&this.$parent.children(".panel").children(".in, .collapsing");if(!(o&&o.length&&(i=o.data("bs.collapse"))&&i.transitioning)){var s=t.Event("show.bs.collapse");if(this.$element.trigger(s),!s.isDefaultPrevented()){o&&o.length&&(n.call(o,"hide"),i||o.data("bs.collapse",null));var r=this.dimension();this.$element.removeClass("collapse").addClass("collapsing")[r](0).attr("aria-expanded",!0),this.$trigger.removeClass("collapsed").attr("aria-expanded",!0),this.transitioning=1;var a=function(){this.$element.removeClass("collapsing").addClass("collapse in")[r](""),this.transitioning=0,this.$element.trigger("shown.bs.collapse")};if(!t.support.transition)return a.call(this);var l=t.camelCase(["scroll",r].join("-"));this.$element.one("bsTransitionEnd",t.proxy(a,this)).emulateTransitionEnd(e.TRANSITION_DURATION)[r](this.$element[0][l])}}}},e.prototype.hide=function(){if(!this.transitioning&&this.$element.hasClass("in")){var i=t.Event("hide.bs.collapse");if(this.$element.trigger(i),!i.isDefaultPrevented()){var n=this.dimension();this.$element[n](this.$element[n]())[0].offsetHeight,this.$element.addClass("collapsing").removeClass("collapse in").attr("aria-expanded",!1),this.$trigger.addClass("collapsed").attr("aria-expanded",!1),this.transitioning=1;var o=function(){this.transitioning=0,this.$element.removeClass("collapsing").addClass("collapse").trigger("hidden.bs.collapse")};if(!t.support.transition)return o.call(this);this.$element[n](0).one("bsTransitionEnd",t.proxy(o,this)).emulateTransitionEnd(e.TRANSITION_DURATION)}}},e.prototype.toggle=function(){this[this.$element.hasClass("in")?"hide":"show"]()},e.prototype.getParent=function(){return t(document).find(this.options.parent).find('[data-toggle="collapse"][data-parent="'+this.options.parent+'"]').each(t.proxy(function(e,n){var o=t(n);this.addAriaAndCollapsedClass(i(o),o)},this)).end()},e.prototype.addAriaAndCollapsedClass=function(t,e){var i=t.hasClass("in");t.attr("aria-expanded",i),e.toggleClass("collapsed",!i).attr("aria-expanded",i)};var o=t.fn.collapse;t.fn.collapse=n,t.fn.collapse.Constructor=e,t.fn.collapse.noConflict=function(){return t.fn.collapse=o,this},t(document).on("click.bs.collapse.data-api",'[data-toggle="collapse"]',function(e){var o=t(this);o.attr("data-target")||e.preventDefault();var s=i(o),r=s.data("bs.collapse")?"toggle":o.data();n.call(s,r)})}(jQuery),function(t){"use strict";var e=".dropdown-backdrop",i='[data-toggle="dropdown"]',n=function(e){t(e).on("click.bs.dropdown",this.toggle)};function o(e){var i=e.attr("data-target");i||(i=(i=e.attr("href"))&&/#[A-Za-z]/.test(i)&&i.replace(/.*(?=#[^\s]*$)/,""));var n="#"!==i?t(document).find(i):null;return n&&n.length?n:e.parent()}function s(n){n&&3===n.which||(t(e).remove(),t(i).each(function(){var e=t(this),i=o(e),s={relatedTarget:this};i.hasClass("open")&&(n&&"click"==n.type&&/input|textarea/i.test(n.target.tagName)&&t.contains(i[0],n.target)||(i.trigger(n=t.Event("hide.bs.dropdown",s)),n.isDefaultPrevented()||(e.attr("aria-expanded","false"),i.removeClass("open").trigger(t.Event("hidden.bs.dropdown",s)))))}))}n.VERSION="3.4.1",n.prototype.toggle=function(e){var i=t(this);if(!i.is(".disabled, :disabled")){var n=o(i),r=n.hasClass("open");if(s(),!r){"ontouchstart"in document.documentElement&&!n.closest(".navbar-nav").length&&t(document.createElement("div")).addClass("dropdown-backdrop").insertAfter(t(this)).on("click",s);var a={relatedTarget:this};if(n.trigger(e=t.Event("show.bs.dropdown",a)),e.isDefaultPrevented())return;i.trigger("focus").attr("aria-expanded","true"),n.toggleClass("open").trigger(t.Event("shown.bs.dropdown",a))}return!1}},n.prototype.keydown=function(e){if(/(38|40|27|32)/.test(e.which)&&!/input|textarea/i.test(e.target.tagName)){var n=t(this);if(e.preventDefault(),e.stopPropagation(),!n.is(".disabled, :disabled")){var s=o(n),r=s.hasClass("open");if(!r&&27!=e.which||r&&27==e.which)return 27==e.which&&s.find(i).trigger("focus"),n.trigger("click");var a=s.find(".dropdown-menu li:not(.disabled):visible a");if(a.length){var l=a.index(e.target);38==e.which&&l>0&&l--,40==e.which&&l<a.length-1&&l++,~l||(l=0),a.eq(l).trigger("focus")}}}};var r=t.fn.dropdown;t.fn.dropdown=function(e){return this.each(function(){var i=t(this),o=i.data("bs.dropdown");o||i.data("bs.dropdown",o=new n(this)),"string"==typeof e&&o[e].call(i)})},t.fn.dropdown.Constructor=n,t.fn.dropdown.noConflict=function(){return t.fn.dropdown=r,this},t(document).on("click.bs.dropdown.data-api",s).on("click.bs.dropdown.data-api",".dropdown form",function(t){t.stopPropagation()}).on("click.bs.dropdown.data-api",i,n.prototype.toggle).on("keydown.bs.dropdown.data-api",i,n.prototype.keydown).on("keydown.bs.dropdown.data-api",".dropdown-menu",n.prototype.keydown)}(jQuery),function(t){"use strict";var e=function(e,i){this.options=i,this.$body=t(document.body),this.$element=t(e),this.$dialog=this.$element.find(".modal-dialog"),this.$backdrop=null,this.isShown=null,this.originalBodyPad=null,this.scrollbarWidth=0,this.ignoreBackdropClick=!1,this.fixedContent=".navbar-fixed-top, .navbar-fixed-bottom",this.options.remote&&this.$element.find(".modal-content").load(this.options.remote,t.proxy(function(){this.$element.trigger("loaded.bs.modal")},this))};function i(i,n){return this.each(function(){var o=t(this),s=o.data("bs.modal"),r=t.extend({},e.DEFAULTS,o.data(),"object"==typeof i&&i);s||o.data("bs.modal",s=new e(this,r)),"string"==typeof i?s[i](n):r.show&&s.show(n)})}e.VERSION="3.4.1",e.TRANSITION_DURATION=300,e.BACKDROP_TRANSITION_DURATION=150,e.DEFAULTS={backdrop:!0,keyboard:!0,show:!0},e.prototype.toggle=function(t){return this.isShown?this.hide():this.show(t)},e.prototype.show=function(i){var n=this,o=t.Event("show.bs.modal",{relatedTarget:i});this.$element.trigger(o),this.isShown||o.isDefaultPrevented()||(this.isShown=!0,this.checkScrollbar(),this.setScrollbar(),this.$body.addClass("modal-open"),this.escape(),this.resize(),this.$element.on("click.dismiss.bs.modal",'[data-dismiss="modal"]',t.proxy(this.hide,this)),this.$dialog.on("mousedown.dismiss.bs.modal",function(){n.$element.one("mouseup.dismiss.bs.modal",function(e){t(e.target).is(n.$element)&&(n.ignoreBackdropClick=!0)})}),this.backdrop(function(){var o=t.support.transition&&n.$element.hasClass("fade");n.$element.parent().length||n.$element.appendTo(n.$body),n.$element.show().scrollTop(0),n.adjustDialog(),o&&n.$element[0].offsetWidth,n.$element.addClass("in"),n.enforceFocus();var s=t.Event("shown.bs.modal",{relatedTarget:i});o?n.$dialog.one("bsTransitionEnd",function(){n.$element.trigger("focus").trigger(s)}).emulateTransitionEnd(e.TRANSITION_DURATION):n.$element.trigger("focus").trigger(s)}))},e.prototype.hide=function(i){i&&i.preventDefault(),i=t.Event("hide.bs.modal"),this.$element.trigger(i),this.isShown&&!i.isDefaultPrevented()&&(this.isShown=!1,this.escape(),this.resize(),t(document).off("focusin.bs.modal"),this.$element.removeClass("in").off("click.dismiss.bs.modal").off("mouseup.dismiss.bs.modal"),this.$dialog.off("mousedown.dismiss.bs.modal"),t.support.transition&&this.$element.hasClass("fade")?this.$element.one("bsTransitionEnd",t.proxy(this.hideModal,this)).emulateTransitionEnd(e.TRANSITION_DURATION):this.hideModal())},e.prototype.enforceFocus=function(){t(document).off("focusin.bs.modal").on("focusin.bs.modal",t.proxy(function(t){document===t.target||this.$element[0]===t.target||this.$element.has(t.target).length||this.$element.trigger("focus")},this))},e.prototype.escape=function(){this.isShown&&this.options.keyboard?this.$element.on("keydown.dismiss.bs.modal",t.proxy(function(t){27==t.which&&this.hide()},this)):this.isShown||this.$element.off("keydown.dismiss.bs.modal")},e.prototype.resize=function(){this.isShown?t(window).on("resize.bs.modal",t.proxy(this.handleUpdate,this)):t(window).off("resize.bs.modal")},e.prototype.hideModal=function(){var t=this;this.$element.hide(),this.backdrop(function(){t.$body.removeClass("modal-open"),t.resetAdjustments(),t.resetScrollbar(),t.$element.trigger("hidden.bs.modal")})},e.prototype.removeBackdrop=function(){this.$backdrop&&this.$backdrop.remove(),this.$backdrop=null},e.prototype.backdrop=function(i){var n=this,o=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var s=t.support.transition&&o;if(this.$backdrop=t(document.createElement("div")).addClass("modal-backdrop "+o).appendTo(this.$body),this.$element.on("click.dismiss.bs.modal",t.proxy(function(t){this.ignoreBackdropClick?this.ignoreBackdropClick=!1:t.target===t.currentTarget&&("static"==this.options.backdrop?this.$element[0].focus():this.hide())},this)),s&&this.$backdrop[0].offsetWidth,this.$backdrop.addClass("in"),!i)return;s?this.$backdrop.one("bsTransitionEnd",i).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION):i()}else if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");var r=function(){n.removeBackdrop(),i&&i()};t.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one("bsTransitionEnd",r).emulateTransitionEnd(e.BACKDROP_TRANSITION_DURATION):r()}else i&&i()},e.prototype.handleUpdate=function(){this.adjustDialog()},e.prototype.adjustDialog=function(){var t=this.$element[0].scrollHeight>document.documentElement.clientHeight;this.$element.css({paddingLeft:!this.bodyIsOverflowing&&t?this.scrollbarWidth:"",paddingRight:this.bodyIsOverflowing&&!t?this.scrollbarWidth:""})},e.prototype.resetAdjustments=function(){this.$element.css({paddingLeft:"",paddingRight:""})},e.prototype.checkScrollbar=function(){var t=window.innerWidth;if(!t){var e=document.documentElement.getBoundingClientRect();t=e.right-Math.abs(e.left)}this.bodyIsOverflowing=document.body.clientWidth<t,this.scrollbarWidth=this.measureScrollbar()},e.prototype.setScrollbar=function(){var e=parseInt(this.$body.css("padding-right")||0,10);this.originalBodyPad=document.body.style.paddingRight||"";var i=this.scrollbarWidth;this.bodyIsOverflowing&&(this.$body.css("padding-right",e+i),t(this.fixedContent).each(function(e,n){var o=n.style.paddingRight,s=t(n).css("padding-right");t(n).data("padding-right",o).css("padding-right",parseFloat(s)+i+"px")}))},e.prototype.resetScrollbar=function(){this.$body.css("padding-right",this.originalBodyPad),t(this.fixedContent).each(function(e,i){var n=t(i).data("padding-right");t(i).removeData("padding-right"),i.style.paddingRight=n||""})},e.prototype.measureScrollbar=function(){var t=document.createElement("div");t.className="modal-scrollbar-measure",this.$body.append(t);var e=t.offsetWidth-t.clientWidth;return this.$body[0].removeChild(t),e};var n=t.fn.modal;t.fn.modal=i,t.fn.modal.Constructor=e,t.fn.modal.noConflict=function(){return t.fn.modal=n,this},t(document).on("click.bs.modal.data-api",'[data-toggle="modal"]',function(e){var n=t(this),o=n.attr("href"),s=n.attr("data-target")||o&&o.replace(/.*(?=#[^\s]+$)/,""),r=t(document).find(s),a=r.data("bs.modal")?"toggle":t.extend({remote:!/#/.test(o)&&o},r.data(),n.data());n.is("a")&&e.preventDefault(),r.one("show.bs.modal",function(t){t.isDefaultPrevented()||r.one("hidden.bs.modal",function(){n.is(":visible")&&n.trigger("focus")})}),i.call(r,a,this)})}(jQuery),function(t){"use strict";var e=["sanitize","whiteList","sanitizeFn"],i=["background","cite","href","itemtype","longdesc","poster","src","xlink:href"],n={"*":["class","dir","id","lang","role",/^aria-[\w-]*$/i],a:["target","href","title","rel"],area:[],b:[],br:[],col:[],code:[],div:[],em:[],hr:[],h1:[],h2:[],h3:[],h4:[],h5:[],h6:[],i:[],img:["src","alt","title","width","height"],li:[],ol:[],p:[],pre:[],s:[],small:[],span:[],sub:[],sup:[],strong:[],u:[],ul:[]},o=/^(?:(?:https?|mailto|ftp|tel|file):|[^&:\/?#]*(?:[\/?#]|$))/gi,s=/^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[a-z0-9+\/]+=*$/i;function r(e,n){var r=e.nodeName.toLowerCase();if(-1!==t.inArray(r,n))return-1===t.inArray(r,i)||Boolean(e.nodeValue.match(o)||e.nodeValue.match(s));for(var a=t(n).filter(function(t,e){return e instanceof RegExp}),l=0,h=a.length;l<h;l++)if(r.match(a[l]))return!0;return!1}function a(e,i,n){if(0===e.length)return e;if(n&&"function"==typeof n)return n(e);if(!document.implementation||!document.implementation.createHTMLDocument)return e;var o=document.implementation.createHTMLDocument("sanitization");o.body.innerHTML=e;for(var s=t.map(i,function(t,e){return e}),a=t(o.body).find("*"),l=0,h=a.length;l<h;l++){var d=a[l],p=d.nodeName.toLowerCase();if(-1!==t.inArray(p,s))for(var c=t.map(d.attributes,function(t){return t}),f=[].concat(i["*"]||[],i[p]||[]),u=0,g=c.length;u<g;u++)r(c[u],f)||d.removeAttribute(c[u].nodeName);else d.parentNode.removeChild(d)}return o.body.innerHTML}var l=function(t,e){this.type=null,this.options=null,this.enabled=null,this.timeout=null,this.hoverState=null,this.$element=null,this.inState=null,this.init("tooltip",t,e)};l.VERSION="3.4.1",l.TRANSITION_DURATION=150,l.DEFAULTS={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover focus",title:"",delay:0,html:!1,container:!1,viewport:{selector:"body",padding:0},sanitize:!0,sanitizeFn:null,whiteList:n},l.prototype.init=function(e,i,n){if(this.enabled=!0,this.type=e,this.$element=t(i),this.options=this.getOptions(n),this.$viewport=this.options.viewport&&t(document).find(t.isFunction(this.options.viewport)?this.options.viewport.call(this,this.$element):this.options.viewport.selector||this.options.viewport),this.inState={click:!1,hover:!1,focus:!1},this.$element[0]instanceof document.constructor&&!this.options.selector)throw new Error("`selector` option must be specified when initializing "+this.type+" on the window.document object!");for(var o=this.options.trigger.split(" "),s=o.length;s--;){var r=o[s];if("click"==r)this.$element.on("click."+this.type,this.options.selector,t.proxy(this.toggle,this));else if("manual"!=r){var a="hover"==r?"mouseenter":"focusin",l="hover"==r?"mouseleave":"focusout";this.$element.on(a+"."+this.type,this.options.selector,t.proxy(this.enter,this)),this.$element.on(l+"."+this.type,this.options.selector,t.proxy(this.leave,this))}}this.options.selector?this._options=t.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},l.prototype.getDefaults=function(){return l.DEFAULTS},l.prototype.getOptions=function(i){var n=this.$element.data();for(var o in n)n.hasOwnProperty(o)&&-1!==t.inArray(o,e)&&delete n[o];return(i=t.extend({},this.getDefaults(),n,i)).delay&&"number"==typeof i.delay&&(i.delay={show:i.delay,hide:i.delay}),i.sanitize&&(i.template=a(i.template,i.whiteList,i.sanitizeFn)),i},l.prototype.getDelegateOptions=function(){var e={},i=this.getDefaults();return this._options&&t.each(this._options,function(t,n){i[t]!=n&&(e[t]=n)}),e},l.prototype.enter=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusin"==e.type?"focus":"hover"]=!0),i.tip().hasClass("in")||"in"==i.hoverState)i.hoverState="in";else{if(clearTimeout(i.timeout),i.hoverState="in",!i.options.delay||!i.options.delay.show)return i.show();i.timeout=setTimeout(function(){"in"==i.hoverState&&i.show()},i.options.delay.show)}},l.prototype.isInStateTrue=function(){for(var t in this.inState)if(this.inState[t])return!0;return!1},l.prototype.leave=function(e){var i=e instanceof this.constructor?e:t(e.currentTarget).data("bs."+this.type);if(i||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i)),e instanceof t.Event&&(i.inState["focusout"==e.type?"focus":"hover"]=!1),!i.isInStateTrue()){if(clearTimeout(i.timeout),i.hoverState="out",!i.options.delay||!i.options.delay.hide)return i.hide();i.timeout=setTimeout(function(){"out"==i.hoverState&&i.hide()},i.options.delay.hide)}},l.prototype.show=function(){var e=t.Event("show.bs."+this.type);if(this.hasContent()&&this.enabled){this.$element.trigger(e);var i=t.contains(this.$element[0].ownerDocument.documentElement,this.$element[0]);if(e.isDefaultPrevented()||!i)return;var n=this,o=this.tip(),s=this.getUID(this.type);this.setContent(),o.attr("id",s),this.$element.attr("aria-describedby",s),this.options.animation&&o.addClass("fade");var r="function"==typeof this.options.placement?this.options.placement.call(this,o[0],this.$element[0]):this.options.placement,a=/\s?auto?\s?/i,h=a.test(r);h&&(r=r.replace(a,"")||"top"),o.detach().css({top:0,left:0,display:"block"}).addClass(r).data("bs."+this.type,this),this.options.container?o.appendTo(t(document).find(this.options.container)):o.insertAfter(this.$element),this.$element.trigger("inserted.bs."+this.type);var d=this.getPosition(),p=o[0].offsetWidth,c=o[0].offsetHeight;if(h){var f=r,u=this.getPosition(this.$viewport);r="bottom"==r&&d.bottom+c>u.bottom?"top":"top"==r&&d.top-c<u.top?"bottom":"right"==r&&d.right+p>u.width?"left":"left"==r&&d.left-p<u.left?"right":r,o.removeClass(f).addClass(r)}var g=this.getCalculatedOffset(r,d,p,c);this.applyPlacement(g,r);var m=function(){var t=n.hoverState;n.$element.trigger("shown.bs."+n.type),n.hoverState=null,"out"==t&&n.leave(n)};t.support.transition&&this.$tip.hasClass("fade")?o.one("bsTransitionEnd",m).emulateTransitionEnd(l.TRANSITION_DURATION):m()}},l.prototype.applyPlacement=function(e,i){var n=this.tip(),o=n[0].offsetWidth,s=n[0].offsetHeight,r=parseInt(n.css("margin-top"),10),a=parseInt(n.css("margin-left"),10);isNaN(r)&&(r=0),isNaN(a)&&(a=0),e.top+=r,e.left+=a,t.offset.setOffset(n[0],t.extend({using:function(t){n.css({top:Math.round(t.top),left:Math.round(t.left)})}},e),0),n.addClass("in");var l=n[0].offsetWidth,h=n[0].offsetHeight;"top"==i&&h!=s&&(e.top=e.top+s-h);var d=this.getViewportAdjustedDelta(i,e,l,h);d.left?e.left+=d.left:e.top+=d.top;var p=/top|bottom/.test(i),c=p?2*d.left-o+l:2*d.top-s+h,f=p?"offsetWidth":"offsetHeight";n.offset(e),this.replaceArrow(c,n[0][f],p)},l.prototype.replaceArrow=function(t,e,i){this.arrow().css(i?"left":"top",50*(1-t/e)+"%").css(i?"top":"left","")},l.prototype.setContent=function(){var t=this.tip(),e=this.getTitle();this.options.html?(this.options.sanitize&&(e=a(e,this.options.whiteList,this.options.sanitizeFn)),t.find(".tooltip-inner").html(e)):t.find(".tooltip-inner").text(e),t.removeClass("fade in top bottom left right")},l.prototype.hide=function(e){var i=this,n=t(this.$tip),o=t.Event("hide.bs."+this.type);function s(){"in"!=i.hoverState&&n.detach(),i.$element&&i.$element.removeAttr("aria-describedby").trigger("hidden.bs."+i.type),e&&e()}if(this.$element.trigger(o),!o.isDefaultPrevented())return n.removeClass("in"),t.support.transition&&n.hasClass("fade")?n.one("bsTransitionEnd",s).emulateTransitionEnd(l.TRANSITION_DURATION):s(),this.hoverState=null,this},l.prototype.fixTitle=function(){var t=this.$element;(t.attr("title")||"string"!=typeof t.attr("data-original-title"))&&t.attr("data-original-title",t.attr("title")||"").attr("title","")},l.prototype.hasContent=function(){return this.getTitle()},l.prototype.getPosition=function(e){var i=(e=e||this.$element)[0],n="BODY"==i.tagName,o=i.getBoundingClientRect();null==o.width&&(o=t.extend({},o,{width:o.right-o.left,height:o.bottom-o.top}));var s=window.SVGElement&&i instanceof window.SVGElement,r=n?{top:0,left:0}:s?null:e.offset(),a={scroll:n?document.documentElement.scrollTop||document.body.scrollTop:e.scrollTop()},l=n?{width:t(window).width(),height:t(window).height()}:null;return t.extend({},o,a,l,r)},l.prototype.getCalculatedOffset=function(t,e,i,n){return"bottom"==t?{top:e.top+e.height,left:e.left+e.width/2-i/2}:"top"==t?{top:e.top-n,left:e.left+e.width/2-i/2}:"left"==t?{top:e.top+e.height/2-n/2,left:e.left-i}:{top:e.top+e.height/2-n/2,left:e.left+e.width}},l.prototype.getViewportAdjustedDelta=function(t,e,i,n){var o={top:0,left:0};if(!this.$viewport)return o;var s=this.options.viewport&&this.options.viewport.padding||0,r=this.getPosition(this.$viewport);if(/right|left/.test(t)){var a=e.top-s-r.scroll,l=e.top+s-r.scroll+n;a<r.top?o.top=r.top-a:l>r.top+r.height&&(o.top=r.top+r.height-l)}else{var h=e.left-s,d=e.left+s+i;h<r.left?o.left=r.left-h:d>r.right&&(o.left=r.left+r.width-d)}return o},l.prototype.getTitle=function(){var t=this.$element,e=this.options;return t.attr("data-original-title")||("function"==typeof e.title?e.title.call(t[0]):e.title)},l.prototype.getUID=function(t){do{t+=~~(1e6*Math.random())}while(document.getElementById(t));return t},l.prototype.tip=function(){if(!this.$tip&&(this.$tip=t(this.options.template),1!=this.$tip.length))throw new Error(this.type+" `template` option must consist of exactly 1 top-level element!");return this.$tip},l.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".tooltip-arrow")},l.prototype.enable=function(){this.enabled=!0},l.prototype.disable=function(){this.enabled=!1},l.prototype.toggleEnabled=function(){this.enabled=!this.enabled},l.prototype.toggle=function(e){var i=this;e&&((i=t(e.currentTarget).data("bs."+this.type))||(i=new this.constructor(e.currentTarget,this.getDelegateOptions()),t(e.currentTarget).data("bs."+this.type,i))),e?(i.inState.click=!i.inState.click,i.isInStateTrue()?i.enter(i):i.leave(i)):i.tip().hasClass("in")?i.leave(i):i.enter(i)},l.prototype.destroy=function(){var t=this;clearTimeout(this.timeout),this.hide(function(){t.$element.off("."+t.type).removeData("bs."+t.type),t.$tip&&t.$tip.detach(),t.$tip=null,t.$arrow=null,t.$viewport=null,t.$element=null})},l.prototype.sanitizeHtml=function(t){return a(t,this.options.whiteList,this.options.sanitizeFn)};var h=t.fn.tooltip;t.fn.tooltip=function(e){return this.each(function(){var i=t(this),n=i.data("bs.tooltip"),o="object"==typeof e&&e;!n&&/destroy|hide/.test(e)||(n||i.data("bs.tooltip",n=new l(this,o)),"string"==typeof e&&n[e]())})},t.fn.tooltip.Constructor=l,t.fn.tooltip.noConflict=function(){return t.fn.tooltip=h,this}}(jQuery),function(t){"use strict";var e=function(t,e){this.init("popover",t,e)};if(!t.fn.tooltip)throw new Error("Popover requires tooltip.js");e.VERSION="3.4.1",e.DEFAULTS=t.extend({},t.fn.tooltip.Constructor.DEFAULTS,{placement:"right",trigger:"click",content:"",template:'<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'}),e.prototype=t.extend({},t.fn.tooltip.Constructor.prototype),e.prototype.constructor=e,e.prototype.getDefaults=function(){return e.DEFAULTS},e.prototype.setContent=function(){var t=this.tip(),e=this.getTitle(),i=this.getContent();if(this.options.html){var n=typeof i;this.options.sanitize&&(e=this.sanitizeHtml(e),"string"===n&&(i=this.sanitizeHtml(i))),t.find(".popover-title").html(e),t.find(".popover-content").children().detach().end()["string"===n?"html":"append"](i)}else t.find(".popover-title").text(e),t.find(".popover-content").children().detach().end().text(i);t.removeClass("fade top bottom left right in"),t.find(".popover-title").html()||t.find(".popover-title").hide()},e.prototype.hasContent=function(){return this.getTitle()||this.getContent()},e.prototype.getContent=function(){var t=this.$element,e=this.options;return t.attr("data-content")||("function"==typeof e.content?e.content.call(t[0]):e.content)},e.prototype.arrow=function(){return this.$arrow=this.$arrow||this.tip().find(".arrow")};var i=t.fn.popover;t.fn.popover=function(i){return this.each(function(){var n=t(this),o=n.data("bs.popover"),s="object"==typeof i&&i;!o&&/destroy|hide/.test(i)||(o||n.data("bs.popover",o=new e(this,s)),"string"==typeof i&&o[i]())})},t.fn.popover.Constructor=e,t.fn.popover.noConflict=function(){return t.fn.popover=i,this}}(jQuery),function(t){"use strict";function e(i,n){this.$body=t(document.body),this.$scrollElement=t(i).is(document.body)?t(window):t(i),this.options=t.extend({},e.DEFAULTS,n),this.selector=(this.options.target||"")+" .nav li > a",this.offsets=[],this.targets=[],this.activeTarget=null,this.scrollHeight=0,this.$scrollElement.on("scroll.bs.scrollspy",t.proxy(this.process,this)),this.refresh(),this.process()}function i(i){return this.each(function(){var n=t(this),o=n.data("bs.scrollspy"),s="object"==typeof i&&i;o||n.data("bs.scrollspy",o=new e(this,s)),"string"==typeof i&&o[i]()})}e.VERSION="3.4.1",e.DEFAULTS={offset:10},e.prototype.getScrollHeight=function(){return this.$scrollElement[0].scrollHeight||Math.max(this.$body[0].scrollHeight,document.documentElement.scrollHeight)},e.prototype.refresh=function(){var e=this,i="offset",n=0;this.offsets=[],this.targets=[],this.scrollHeight=this.getScrollHeight(),t.isWindow(this.$scrollElement[0])||(i="position",n=this.$scrollElement.scrollTop()),this.$body.find(this.selector).map(function(){var e=t(this),o=e.data("target")||e.attr("href"),s=/^#./.test(o)&&t(o);return s&&s.length&&s.is(":visible")&&[[s[i]().top+n,o]]||null}).sort(function(t,e){return t[0]-e[0]}).each(function(){e.offsets.push(this[0]),e.targets.push(this[1])})},e.prototype.process=function(){var t,e=this.$scrollElement.scrollTop()+this.options.offset,i=this.getScrollHeight(),n=this.options.offset+i-this.$scrollElement.height(),o=this.offsets,s=this.targets,r=this.activeTarget;if(this.scrollHeight!=i&&this.refresh(),e>=n)return r!=(t=s[s.length-1])&&this.activate(t);if(r&&e<o[0])return this.activeTarget=null,this.clear();for(t=o.length;t--;)r!=s[t]&&e>=o[t]&&(void 0===o[t+1]||e<o[t+1])&&this.activate(s[t])},e.prototype.activate=function(e){this.activeTarget=e,this.clear();var i=this.selector+'[data-target="'+e+'"],'+this.selector+'[href="'+e+'"]',n=t(i).parents("li").addClass("active");n.parent(".dropdown-menu").length&&(n=n.closest("li.dropdown").addClass("active")),n.trigger("activate.bs.scrollspy")},e.prototype.clear=function(){t(this.selector).parentsUntil(this.options.target,".active").removeClass("active")};var n=t.fn.scrollspy;t.fn.scrollspy=i,t.fn.scrollspy.Constructor=e,t.fn.scrollspy.noConflict=function(){return t.fn.scrollspy=n,this},t(window).on("load.bs.scrollspy.data-api",function(){t('[data-spy="scroll"]').each(function(){var e=t(this);i.call(e,e.data())})})}(jQuery),function(t){"use strict";var e=function(e){this.element=t(e)};function i(i){return this.each(function(){var n=t(this),o=n.data("bs.tab");o||n.data("bs.tab",o=new e(this)),"string"==typeof i&&o[i]()})}e.VERSION="3.4.1",e.TRANSITION_DURATION=150,e.prototype.show=function(){var e=this.element,i=e.closest("ul:not(.dropdown-menu)"),n=e.data("target");if(n||(n=(n=e.attr("href"))&&n.replace(/.*(?=#[^\s]*$)/,"")),!e.parent("li").hasClass("active")){var o=i.find(".active:last a"),s=t.Event("hide.bs.tab",{relatedTarget:e[0]}),r=t.Event("show.bs.tab",{relatedTarget:o[0]});if(o.trigger(s),e.trigger(r),!r.isDefaultPrevented()&&!s.isDefaultPrevented()){var a=t(document).find(n);this.activate(e.closest("li"),i),this.activate(a,a.parent(),function(){o.trigger({type:"hidden.bs.tab",relatedTarget:e[0]}),e.trigger({type:"shown.bs.tab",relatedTarget:o[0]})})}}},e.prototype.activate=function(i,n,o){var s=n.find("> .active"),r=o&&t.support.transition&&(s.length&&s.hasClass("fade")||!!n.find("> .fade").length);function a(){s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!1),i.addClass("active").find('[data-toggle="tab"]').attr("aria-expanded",!0),r?(i[0].offsetWidth,i.addClass("in")):i.removeClass("fade"),i.parent(".dropdown-menu").length&&i.closest("li.dropdown").addClass("active").end().find('[data-toggle="tab"]').attr("aria-expanded",!0),o&&o()}s.length&&r?s.one("bsTransitionEnd",a).emulateTransitionEnd(e.TRANSITION_DURATION):a(),s.removeClass("in")};var n=t.fn.tab;t.fn.tab=i,t.fn.tab.Constructor=e,t.fn.tab.noConflict=function(){return t.fn.tab=n,this};var o=function(e){e.preventDefault(),i.call(t(this),"show")};t(document).on("click.bs.tab.data-api",'[data-toggle="tab"]',o).on("click.bs.tab.data-api",'[data-toggle="pill"]',o)}(jQuery),function(t){"use strict";var e=function(i,n){this.options=t.extend({},e.DEFAULTS,n);var o=this.options.target===e.DEFAULTS.target?t(this.options.target):t(document).find(this.options.target);this.$target=o.on("scroll.bs.affix.data-api",t.proxy(this.checkPosition,this)).on("click.bs.affix.data-api",t.proxy(this.checkPositionWithEventLoop,this)),this.$element=t(i),this.affixed=null,this.unpin=null,this.pinnedOffset=null,this.checkPosition()};function i(i){return this.each(function(){var n=t(this),o=n.data("bs.affix"),s="object"==typeof i&&i;o||n.data("bs.affix",o=new e(this,s)),"string"==typeof i&&o[i]()})}e.VERSION="3.4.1",e.RESET="affix affix-top affix-bottom",e.DEFAULTS={offset:0,target:window},e.prototype.getState=function(t,e,i,n){var o=this.$target.scrollTop(),s=this.$element.offset(),r=this.$target.height();if(null!=i&&"top"==this.affixed)return o<i&&"top";if("bottom"==this.affixed)return null!=i?!(o+this.unpin<=s.top)&&"bottom":!(o+r<=t-n)&&"bottom";var a=null==this.affixed,l=a?o:s.top;return null!=i&&o<=i?"top":null!=n&&l+(a?r:e)>=t-n&&"bottom"},e.prototype.getPinnedOffset=function(){if(this.pinnedOffset)return this.pinnedOffset;this.$element.removeClass(e.RESET).addClass("affix");var t=this.$target.scrollTop(),i=this.$element.offset();return this.pinnedOffset=i.top-t},e.prototype.checkPositionWithEventLoop=function(){setTimeout(t.proxy(this.checkPosition,this),1)},e.prototype.checkPosition=function(){if(this.$element.is(":visible")){var i=this.$element.height(),n=this.options.offset,o=n.top,s=n.bottom,r=Math.max(t(document).height(),t(document.body).height());"object"!=typeof n&&(s=o=n),"function"==typeof o&&(o=n.top(this.$element)),"function"==typeof s&&(s=n.bottom(this.$element));var a=this.getState(r,i,o,s);if(this.affixed!=a){null!=this.unpin&&this.$element.css("top","");var l="affix"+(a?"-"+a:""),h=t.Event(l+".bs.affix");if(this.$element.trigger(h),h.isDefaultPrevented())return;this.affixed=a,this.unpin="bottom"==a?this.getPinnedOffset():null,this.$element.removeClass(e.RESET).addClass(l).trigger(l.replace("affix","affixed")+".bs.affix")}"bottom"==a&&this.$element.offset({top:r-i-s})}};var n=t.fn.affix;t.fn.affix=i,t.fn.affix.Constructor=e,t.fn.affix.noConflict=function(){return t.fn.affix=n,this},t(window).on("load",function(){t('[data-spy="affix"]').each(function(){var e=t(this),n=e.data();n.offset=n.offset||{},null!=n.offsetBottom&&(n.offset.bottom=n.offsetBottom),null!=n.offsetTop&&(n.offset.top=n.offsetTop),i.call(e,n)})})}(jQuery),function(t,e){"function"==typeof define&&define.amd?define("ev-emitter/ev-emitter",e):"object"==typeof module&&module.exports?module.exports=e():t.EvEmitter=e()}("undefined"!=typeof window?window:this,function(){function t(){}var e=t.prototype;return e.on=function(t,e){if(t&&e){var i=this._events=this._events||{},n=i[t]=i[t]||[];return-1==n.indexOf(e)&&n.push(e),this}},e.once=function(t,e){if(t&&e){this.on(t,e);var i=this._onceEvents=this._onceEvents||{};return(i[t]=i[t]||{})[e]=!0,this}},e.off=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=i.indexOf(e);return-1!=n&&i.splice(n,1),this}},e.emitEvent=function(t,e){var i=this._events&&this._events[t];if(i&&i.length){var n=0,o=i[n];e=e||[];for(var s=this._onceEvents&&this._onceEvents[t];o;){var r=s&&s[o];r&&(this.off(t,o),delete s[o]),o.apply(this,e),o=i[n+=r?0:1]}return this}},t}),function(t,e){"use strict";"function"==typeof define&&define.amd?define(["ev-emitter/ev-emitter"],function(i){return e(t,i)}):"object"==typeof module&&module.exports?module.exports=e(t,require("ev-emitter")):t.imagesLoaded=e(t,t.EvEmitter)}(window,function(t,e){var i=t.jQuery,n=t.console;function o(t,e){for(var i in e)t[i]=e[i];return t}function s(t,e,n){if(!(this instanceof s))return new s(t,e,n);"string"==typeof t&&(t=document.querySelectorAll(t)),this.elements=function(t){var e=[];if(Array.isArray(t))e=t;else if("number"==typeof t.length)for(var i=0;i<t.length;i++)e.push(t[i]);else e.push(t);return e}(t),this.options=o({},this.options),"function"==typeof e?n=e:o(this.options,e),n&&this.on("always",n),this.getImages(),i&&(this.jqDeferred=new i.Deferred),setTimeout(function(){this.check()}.bind(this))}s.prototype=Object.create(e.prototype),s.prototype.options={},s.prototype.getImages=function(){this.images=[],this.elements.forEach(this.addElementImages,this)},s.prototype.addElementImages=function(t){"IMG"==t.nodeName&&this.addImage(t),!0===this.options.background&&this.addElementBackgroundImages(t);var e=t.nodeType;if(e&&r[e]){for(var i=t.querySelectorAll("img"),n=0;n<i.length;n++){var o=i[n];this.addImage(o)}if("string"==typeof this.options.background){var s=t.querySelectorAll(this.options.background);for(n=0;n<s.length;n++){var a=s[n];this.addElementBackgroundImages(a)}}}};var r={1:!0,9:!0,11:!0};function a(t){this.img=t}function l(t,e){this.url=t,this.element=e,this.img=new Image}return s.prototype.addElementBackgroundImages=function(t){var e=getComputedStyle(t);if(e)for(var i=/url\((['"])?(.*?)\1\)/gi,n=i.exec(e.backgroundImage);null!==n;){var o=n&&n[2];o&&this.addBackground(o,t),n=i.exec(e.backgroundImage)}},s.prototype.addImage=function(t){var e=new a(t);this.images.push(e)},s.prototype.addBackground=function(t,e){var i=new l(t,e);this.images.push(i)},s.prototype.check=function(){var t=this;function e(e,i,n){setTimeout(function(){t.progress(e,i,n)})}this.progressedCount=0,this.hasAnyBroken=!1,this.images.length?this.images.forEach(function(t){t.once("progress",e),t.check()}):this.complete()},s.prototype.progress=function(t,e,i){this.progressedCount++,this.hasAnyBroken=this.hasAnyBroken||!t.isLoaded,this.emitEvent("progress",[this,t,e]),this.jqDeferred&&this.jqDeferred.notify&&this.jqDeferred.notify(this,t),this.progressedCount==this.images.length&&this.complete(),this.options.debug&&n&&n.log("progress: "+i,t,e)},s.prototype.complete=function(){var t=this.hasAnyBroken?"fail":"done";if(this.isComplete=!0,this.emitEvent(t,[this]),this.emitEvent("always",[this]),this.jqDeferred){var e=this.hasAnyBroken?"reject":"resolve";this.jqDeferred[e](this)}},a.prototype=Object.create(e.prototype),a.prototype.check=function(){this.getIsImageComplete()?this.confirm(0!==this.img.naturalWidth,"naturalWidth"):(this.proxyImage=new Image,this.proxyImage.addEventListener("load",this),this.proxyImage.addEventListener("error",this),this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.proxyImage.src=this.img.src)},a.prototype.getIsImageComplete=function(){return this.img.complete&&void 0!==this.img.naturalWidth},a.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.img,e])},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.onload=function(){this.confirm(!0,"onload"),this.unbindEvents()},a.prototype.onerror=function(){this.confirm(!1,"onerror"),this.unbindEvents()},a.prototype.unbindEvents=function(){this.proxyImage.removeEventListener("load",this),this.proxyImage.removeEventListener("error",this),this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype=Object.create(a.prototype),l.prototype.check=function(){this.img.addEventListener("load",this),this.img.addEventListener("error",this),this.img.src=this.url,this.getIsImageComplete()&&(this.confirm(0!==this.img.naturalWidth,"naturalWidth"),this.unbindEvents())},l.prototype.unbindEvents=function(){this.img.removeEventListener("load",this),this.img.removeEventListener("error",this)},l.prototype.confirm=function(t,e){this.isLoaded=t,this.emitEvent("progress",[this,this.element,e])},s.makeJQueryPlugin=function(e){(e=e||t.jQuery)&&((i=e).fn.imagesLoaded=function(t,e){return new s(this,t,e).jqDeferred.promise(i(this))})},s.makeJQueryPlugin(),s});
;/*})'"*/
;/*})'"*/
!function(){"use strict";function t(i){if(!i)throw new Error("No options passed to Waypoint constructor");if(!i.element)throw new Error("No element option passed to Waypoint constructor");if(!i.handler)throw new Error("No handler option passed to Waypoint constructor");this.key="waypoint-"+e,this.options=t.Adapter.extend({},t.defaults,i),this.element=this.options.element,this.adapter=new t.Adapter(this.element),this.callback=i.handler,this.axis=this.options.horizontal?"horizontal":"vertical",this.enabled=this.options.enabled,this.triggerPoint=null,this.group=t.Group.findOrCreate({name:this.options.group,axis:this.axis}),this.context=t.Context.findOrCreateByElement(this.options.context),t.offsetAliases[this.options.offset]&&(this.options.offset=t.offsetAliases[this.options.offset]),this.group.add(this),this.context.add(this),o[this.key]=this,e+=1}var e=0,o={};t.prototype.queueTrigger=function(t){this.group.queueTrigger(this,t)},t.prototype.trigger=function(t){this.enabled&&this.callback&&this.callback.apply(this,t)},t.prototype.destroy=function(){this.context.remove(this),this.group.remove(this),delete o[this.key]},t.prototype.disable=function(){return this.enabled=!1,this},t.prototype.enable=function(){return this.context.refresh(),this.enabled=!0,this},t.prototype.next=function(){return this.group.next(this)},t.prototype.previous=function(){return this.group.previous(this)},t.invokeAll=function(t){var e=[];for(var i in o)e.push(o[i]);for(var n=0,r=e.length;r>n;n++)e[n][t]()},t.destroyAll=function(){t.invokeAll("destroy")},t.disableAll=function(){t.invokeAll("disable")},t.enableAll=function(){t.invokeAll("enable")},t.refreshAll=function(){t.Context.refreshAll()},t.viewportHeight=function(){return window.innerHeight||document.documentElement.clientHeight},t.viewportWidth=function(){return document.documentElement.clientWidth},t.adapters=[],t.defaults={context:window,continuous:!0,enabled:!0,group:"default",horizontal:!1,offset:0},t.offsetAliases={"bottom-in-view":function(){return this.context.innerHeight()-this.adapter.outerHeight()},"right-in-view":function(){return this.context.innerWidth()-this.adapter.outerWidth()}},window.Waypoint=t}(),function(){"use strict";function t(t){window.setTimeout(t,1e3/60)}function e(t){this.element=t,this.Adapter=n.Adapter,this.adapter=new this.Adapter(t),this.key="waypoint-context-"+o,this.didScroll=!1,this.didResize=!1,this.oldScroll={x:this.adapter.scrollLeft(),y:this.adapter.scrollTop()},this.waypoints={vertical:{},horizontal:{}},t.waypointContextKey=this.key,i[t.waypointContextKey]=this,o+=1,this.createThrottledScrollHandler(),this.createThrottledResizeHandler()}var o=0,i={},n=window.Waypoint,r=window.onload;e.prototype.add=function(t){var e=t.options.horizontal?"horizontal":"vertical";this.waypoints[e][t.key]=t,this.refresh()},e.prototype.checkEmpty=function(){var t=this.Adapter.isEmptyObject(this.waypoints.horizontal),e=this.Adapter.isEmptyObject(this.waypoints.vertical);t&&e&&(this.adapter.off(".waypoints"),delete i[this.key])},e.prototype.createThrottledResizeHandler=function(){function t(){e.handleResize(),e.didResize=!1}var e=this;this.adapter.on("resize.waypoints",function(){e.didResize||(e.didResize=!0,n.requestAnimationFrame(t))})},e.prototype.createThrottledScrollHandler=function(){function t(){e.handleScroll(),e.didScroll=!1}var e=this;this.adapter.on("scroll.waypoints",function(){(!e.didScroll||n.isTouch)&&(e.didScroll=!0,n.requestAnimationFrame(t))})},e.prototype.handleResize=function(){n.Context.refreshAll()},e.prototype.handleScroll=function(){var t={},e={horizontal:{newScroll:this.adapter.scrollLeft(),oldScroll:this.oldScroll.x,forward:"right",backward:"left"},vertical:{newScroll:this.adapter.scrollTop(),oldScroll:this.oldScroll.y,forward:"down",backward:"up"}};for(var o in e){var i=e[o],n=i.newScroll>i.oldScroll,r=n?i.forward:i.backward;for(var s in this.waypoints[o]){var a=this.waypoints[o][s],l=i.oldScroll<a.triggerPoint,u=i.newScroll>=a.triggerPoint,p=l&&u,h=!l&&!u;(p||h)&&(a.queueTrigger(r),t[a.group.id]=a.group)}}for(var c in t)t[c].flushTriggers();this.oldScroll={x:e.horizontal.newScroll,y:e.vertical.newScroll}},e.prototype.innerHeight=function(){return this.element==this.element.window?n.viewportHeight():this.adapter.innerHeight()},e.prototype.remove=function(t){delete this.waypoints[t.axis][t.key],this.checkEmpty()},e.prototype.innerWidth=function(){return this.element==this.element.window?n.viewportWidth():this.adapter.innerWidth()},e.prototype.destroy=function(){var t=[];for(var e in this.waypoints)for(var o in this.waypoints[e])t.push(this.waypoints[e][o]);for(var i=0,n=t.length;n>i;i++)t[i].destroy()},e.prototype.refresh=function(){var t,e=this.element==this.element.window,o=e?void 0:this.adapter.offset(),i={};this.handleScroll(),t={horizontal:{contextOffset:e?0:o.left,contextScroll:e?0:this.oldScroll.x,contextDimension:this.innerWidth(),oldScroll:this.oldScroll.x,forward:"right",backward:"left",offsetProp:"left"},vertical:{contextOffset:e?0:o.top,contextScroll:e?0:this.oldScroll.y,contextDimension:this.innerHeight(),oldScroll:this.oldScroll.y,forward:"down",backward:"up",offsetProp:"top"}};for(var r in t){var s=t[r];for(var a in this.waypoints[r]){var l,u,p,h,c,d=this.waypoints[r][a],f=d.options.offset,w=d.triggerPoint,y=0,g=null==w;d.element!==d.element.window&&(y=d.adapter.offset()[s.offsetProp]),"function"==typeof f?f=f.apply(d):"string"==typeof f&&(f=parseFloat(f),d.options.offset.indexOf("%")>-1&&(f=Math.ceil(s.contextDimension*f/100))),l=s.contextScroll-s.contextOffset,d.triggerPoint=y+l-f,u=w<s.oldScroll,p=d.triggerPoint>=s.oldScroll,h=u&&p,c=!u&&!p,!g&&h?(d.queueTrigger(s.backward),i[d.group.id]=d.group):!g&&c?(d.queueTrigger(s.forward),i[d.group.id]=d.group):g&&s.oldScroll>=d.triggerPoint&&(d.queueTrigger(s.forward),i[d.group.id]=d.group)}}return n.requestAnimationFrame(function(){for(var t in i)i[t].flushTriggers()}),this},e.findOrCreateByElement=function(t){return e.findByElement(t)||new e(t)},e.refreshAll=function(){for(var t in i)i[t].refresh()},e.findByElement=function(t){return i[t.waypointContextKey]},window.onload=function(){r&&r(),e.refreshAll()},n.requestAnimationFrame=function(e){var o=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||t;o.call(window,e)},n.Context=e}(),function(){"use strict";function t(t,e){return t.triggerPoint-e.triggerPoint}function e(t,e){return e.triggerPoint-t.triggerPoint}function o(t){this.name=t.name,this.axis=t.axis,this.id=this.name+"-"+this.axis,this.waypoints=[],this.clearTriggerQueues(),i[this.axis][this.name]=this}var i={vertical:{},horizontal:{}},n=window.Waypoint;o.prototype.add=function(t){this.waypoints.push(t)},o.prototype.clearTriggerQueues=function(){this.triggerQueues={up:[],down:[],left:[],right:[]}},o.prototype.flushTriggers=function(){for(var o in this.triggerQueues){var i=this.triggerQueues[o],n="up"===o||"left"===o;i.sort(n?e:t);for(var r=0,s=i.length;s>r;r+=1){var a=i[r];(a.options.continuous||r===i.length-1)&&a.trigger([o])}}this.clearTriggerQueues()},o.prototype.next=function(e){this.waypoints.sort(t);var o=n.Adapter.inArray(e,this.waypoints),i=o===this.waypoints.length-1;return i?null:this.waypoints[o+1]},o.prototype.previous=function(e){this.waypoints.sort(t);var o=n.Adapter.inArray(e,this.waypoints);return o?this.waypoints[o-1]:null},o.prototype.queueTrigger=function(t,e){this.triggerQueues[e].push(t)},o.prototype.remove=function(t){var e=n.Adapter.inArray(t,this.waypoints);e>-1&&this.waypoints.splice(e,1)},o.prototype.first=function(){return this.waypoints[0]},o.prototype.last=function(){return this.waypoints[this.waypoints.length-1]},o.findOrCreate=function(t){return i[t.axis][t.name]||new o(t)},n.Group=o}(),function(){"use strict";function t(t){this.$element=e(t)}var e=window.jQuery,o=window.Waypoint;e.each(["innerHeight","innerWidth","off","offset","on","outerHeight","outerWidth","scrollLeft","scrollTop"],function(e,o){t.prototype[o]=function(){var t=Array.prototype.slice.call(arguments);return this.$element[o].apply(this.$element,t)}}),e.each(["extend","inArray","isEmptyObject"],function(o,i){t[i]=e[i]}),o.adapters.push({name:"jquery",Adapter:t}),o.Adapter=t}(),function(){"use strict";function t(t){return function(){var o=[],i=arguments[0];return t.isFunction(arguments[0])&&(i=t.extend({},arguments[1]),i.handler=arguments[0]),this.each(function(){var n=t.extend({},i,{element:this});"string"==typeof n.context&&(n.context=t(this).closest(n.context)[0]),o.push(new e(n))}),o}}var e=window.Waypoint;window.jQuery&&(window.jQuery.fn.waypoint=t(window.jQuery)),window.Zepto&&(window.Zepto.fn.waypoint=t(window.Zepto))}(),function(t){"use strict";t.fn.countUp=function(e){var o=t.extend({time:2e3,delay:10},e);return this.each(function(){var e=t(this),i=o,n=function(){e.data("counterupTo")||e.data("counterupTo",e.text());var t=parseInt(e.data("counter-time"))>0?parseInt(e.data("counter-time")):i.time,o=parseInt(e.data("counter-delay"))>0?parseInt(e.data("counter-delay")):i.delay,n=t/o,r=e.data("counterupTo"),s=[r],a=/[0-9]+,[0-9]+/.test(r);r=r.replace(/,/g,"");for(var l=(/^[0-9]+$/.test(r),/^[0-9]+\.[0-9]+$/.test(r)),u=l?(r.split(".")[1]||[]).length:0,p=n;p>=1;p--){var h=parseInt(Math.round(r/n*p));if(l&&(h=parseFloat(r/n*p).toFixed(u)),a)for(;/(\d+)(\d{3})/.test(h.toString());)h=h.toString().replace(/(\d+)(\d{3})/,"$1,$2");s.unshift(h)}e.data("counterup-nums",s),e.text("0");var c=function(){e.text(e.data("counterup-nums").shift()),e.data("counterup-nums").length?setTimeout(e.data("counterup-func"),o):(delete e.data("counterup-nums"),e.data("counterup-nums",null),e.data("counterup-func",null))};e.data("counterup-func",c),setTimeout(e.data("counterup-func"),o)};e.waypoint(n,{offset:"100%",triggerOnce:!0})})}}(jQuery);
;/*})'"*/
;/*})'"*/
!function(t){var e={init:function(e){return this.each(function(){var n=t(this),r=n.data("lazyLinePainter");if(n.addClass("lazylinepainter"),!r){var o=(r=t.extend({strokeWidth:2,strokeDash:null,strokeColor:"#000",strokeOverColor:null,strokeCap:"round",strokeJoin:"round",strokeOpacity:1,onComplete:null,onUpdate:null,onStart:null,onStrokeStart:null,onStrokeComplete:null,delay:0,ease:null,overrideKey:null,drawSequential:!0,speedMultiplier:1,reverse:!1,paused:!1,progress:0,longestDuration:0,playhead:0},e)).overrideKey?r.overrideKey:n.attr("id").replace("#","");r.width=r.svgData[o].dimensions.width,r.height=r.svgData[o].dimensions.height,r.paths=t.extend(!0,[],r.svgData[o].strokepath);o="0 0 "+r.width+" "+r.height;var a=document.createElementNS("http://www.w3.org/2000/svg","svg");a.setAttributeNS(null,"viewBox",o),a.setAttribute("xmlns","http://www.w3.org/2000/svg"),o=t(a),r.svg=o;o=r.delay;for(var s=r.paths,l=a=0;l<s.length;l++)a+=s[l].duration+(s[l].delay||0);s=r.delay,l=r.paths;for(var h=0,p=0;p<l.length;p++){var c=l[p].delay||0;l[p].duration+c>h&&(h=l[p].duration+c)}for(r.totalDuration=r.drawSequential?o+a:s+h,o=r.reverse?r.totalDuration:0,a=0;a<r.paths.length;a++){(s=r.paths[a]).progress=0,s.index=a;l=s,h=r,p=a,c=document.createElementNS("http://www.w3.org/2000/svg","path");var d=t(c);for(h.svg.append(d),d.attr(i(h,h.paths[p])),l.el=c,s.length=Math.ceil(s.el.getTotalLength()),s.delay=s.delay||0,s.duration=s.duration,l=s,h=s.el,p=s.length,c=[],d=0;d<p;d++){var f=h.getPointAtLength(d);c.push({x:f.x,y:f.y})}l.positions=c,s.ease=s.ease||null,l=s.el.style,h=r,p=s.length,c=void 0,c=s.strokeDash?u(s.strokeDash,p):h.strokeDash?u(h.strokeDash,p):p+" "+p,l.strokeDasharray=c,s.el.style.strokeDashoffset=s.length,s.el.style.display="block",s.el.getBoundingClientRect(),s.onStrokeStart=s.onStrokeStart||null,s.onStrokeComplete=s.onStrokeComplete||null,s.onStrokeStartDone=!1,s.onStrokeCompleteDone=!1,s.onStrokeUpdate=s.onStrokeUpdate||null,h=s.duration/r.totalDuration,l=(o=r.reverse?o-s.duration:r.drawSequential?r.playhead+r.delay:s.delay+r.delay)/r.totalDuration,s.startTime=o,s.startProgress=l,s.durationProgress=h,r.playhead+=s.duration+s.delay}r.totalDuration*=r.speedMultiplier,n.append(r.svg),n.data("lazyLinePainter",r),n.lazylinepainter("resize")}})},paint:function(){return this.each(function(){var e=t(this),n=e.data("lazyLinePainter");e.lazylinepainter("erase"),n.rAF=requestAnimationFrame(function(t){r(t,n)}),null!==n.onStart&&n.onStart()})},pause:function(){return this.each(function(){var e=t(this).data("lazyLinePainter");e.paused||(e.paused=!0,cancelAnimationFrame(e.rAF))})},resume:function(){return this.each(function(){var e=t(this).data("lazyLinePainter");e.paused&&(requestAnimationFrame(function(t){n(t,e)}),e.paused=!1)})},erase:function(){return this.each(function(){var e=t(this).data("lazyLinePainter");e.startTime=null,e.elapsedTime=null,cancelAnimationFrame(e.rAF),e.onStrokeCompleteDone=!1,e.paused=!1;for(var n=0;n<e.paths.length;n++){var r=e.paths[n];r.el.style.strokeDashoffset=r.length,r.onStrokeCompleteDone=!1,r.onStrokeStartDone=!1}})},destroy:function(){return this.each(function(){var e=t(this);e.removeData("lazyLinePainter"),e.empty(),e.removeClass("lazylinepainter")})},set:function(e){return this.each(function(){var n=t(this).data("lazyLinePainter");n.progress=e,o(n)})},get:function(){return t(this).data("lazyLinePainter")},resize:function(){this.each(function(){var e=t(this),n=e.data("lazyLinePainter");for(n.offset=e.offset(),e=0;e<n.paths.length;e++)s(n,n.paths[e])})}},n=function(t,e){e.startTime=t-e.elapsedTime,requestAnimationFrame(function(t){r(t,e)})},r=function(t,e){e.startTime||(e.startTime=t),null!==e.onUpdate&&e.onUpdate(),e.elapsedTime=t-e.startTime,e.progress=a(e.totalDuration,e.startTime,e.elapsedTime,e.ease),o(e),1>e.progress?e.rAF=requestAnimationFrame(function(t){r(t,e)}):null!==e.onComplete&&e.onComplete()},o=function(t){for(var e=0;e<t.paths.length;e++){var n=t.paths[e],r=void 0;t.progress>n.startProgress&&t.progress<n.startProgress+n.durationProgress?r=(t.progress-n.startProgress)/n.durationProgress:t.progress>=n.startProgress+n.durationProgress?r=1:t.progress<=n.startProgress&&(r=0),n.progress=a(1,0,r,n.ease);var o=(r=n).progress*r.length;r.el.style.strokeDashoffset=t.reverse||r.reverse?-r.length+o:r.length-o,s(t,n),r=t,1===n.progress?(r.onStrokeComplete&&!n.onStrokeCompleteDone&&(r.onStrokeComplete(n),n.onStrokeComplete||(n.onStrokeCompleteDone=!0)),n.onStrokeComplete&&!n.onStrokeCompleteDone&&(n.onStrokeComplete(n),n.onStrokeCompleteDone=!0)):1e-5<n.progress&&(r.onStrokeStart&&!n.onStrokeStartDone&&(r.onStrokeStart(n),n.onStrokeStart||(n.onStrokeStartDone=!0)),n.onStrokeStart&&!n.onStrokeStartDone&&(n.onStrokeStart(n),n.onStrokeStartDone=!0),n.onStrokeUpdate)&&n.onStrokeUpdate(n)}},a=function(t,e,n,r){var o;return 0<n&&n<t?o=r?l[r](n,0,1,t):n/t:n>=t?o=1:n<=e&&(o=0),o},s=function(t,e){var n=Math.round(e.progress*(e.length-1));n=e.positions[n];e.position={x:t.offset.left+n.x,y:t.offset.top+n.y}},i=function(t,e){return{d:e.path,stroke:e.strokeColor?e.strokeColor:t.strokeColor,"fill-opacity":0,"stroke-opacity":e.strokeOpacity?e.strokeOpacity:t.strokeOpacity,"stroke-width":e.strokeWidth?e.strokeWidth:t.strokeWidth,"stroke-linecap":e.strokeCap?e.strokeCap:t.strokeCap,"stroke-linejoin":e.strokeJoin?e.strokeJoin:t.strokeJoin}},u=function(t,e){for(var n="",r=t.split(","),o=0,a=r.length-1;0<=a;a--)o+=Number(r[a]);for(a=(r=Math.floor(e/o))-1;0<=a;a--)n+=t+", ";return(n+(e-r*o)+", "+e).split(",").join("px,")+"px"};t.fn.lazylinepainter=function(t){return e[t]?e[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void console.log("opps - issue finding method"):e.init.apply(this,arguments)};var l={easeLinear:function(t,e,n,r){return n*t/r+e},easeInQuad:function(t,e,n,r){return n*(t/=r)*t+e},easeOutQuad:function(t,e,n,r){return-n*(t/=r)*(t-2)+e},easeInOutQuad:function(t,e,n,r){return 1>(t/=r/2)?n/2*t*t+e:-n/2*(--t*(t-2)-1)+e},easeInCubic:function(t,e,n,r){return n*(t/=r)*t*t+e},easeOutCubic:function(t,e,n,r){return n*((t=t/r-1)*t*t+1)+e},easeInOutCubic:function(t,e,n,r){return 1>(t/=r/2)?n/2*t*t*t+e:n/2*((t-=2)*t*t+2)+e},easeInQuart:function(t,e,n,r){return n*(t/=r)*t*t*t+e},easeOutQuart:function(t,e,n,r){return-n*((t=t/r-1)*t*t*t-1)+e},easeInOutQuart:function(t,e,n,r){return 1>(t/=r/2)?n/2*t*t*t*t+e:-n/2*((t-=2)*t*t*t-2)+e},easeInQuint:function(t,e,n,r){return n*(t/=r)*t*t*t*t+e},easeOutQuint:function(t,e,n,r){return n*((t=t/r-1)*t*t*t*t+1)+e},easeInOutQuint:function(t,e,n,r){return 1>(t/=r/2)?n/2*t*t*t*t*t+e:n/2*((t-=2)*t*t*t*t+2)+e},easeInSine:function(t,e,n,r){return-n*Math.cos(t/r*(Math.PI/2))+n+e},easeOutSine:function(t,e,n,r){return n*Math.sin(t/r*(Math.PI/2))+e},easeInOutSine:function(t,e,n,r){return-n/2*(Math.cos(Math.PI*t/r)-1)+e},easeInExpo:function(t,e,n,r){return 0==t?e:n*Math.pow(2,10*(t/r-1))+e},easeOutExpo:function(t,e,n,r){return t==r?e+n:n*(1-Math.pow(2,-10*t/r))+e},easeInOutExpo:function(t,e,n,r){return 0==t?e:t==r?e+n:1>(t/=r/2)?n/2*Math.pow(2,10*(t-1))+e:n/2*(2-Math.pow(2,-10*--t))+e},easeInCirc:function(t,e,n,r){return-n*(Math.sqrt(1-(t/=r)*t)-1)+e},easeOutCirc:function(t,e,n,r){return n*Math.sqrt(1-(t=t/r-1)*t)+e},easeInOutCirc:function(t,e,n,r){return 1>(t/=r/2)?-n/2*(Math.sqrt(1-t*t)-1)+e:n/2*(Math.sqrt(1-(t-=2)*t)+1)+e},easeInElastic:function(t,e,n,r){var o=1.70158,a=0,s=n;return 0==t?e:1==(t/=r)?e+n:(a||(a=.3*r),s<Math.abs(n)?(s=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/s),-s*Math.pow(2,10*--t)*Math.sin(2*(t*r-o)*Math.PI/a)+e)},easeOutElastic:function(t,e,n,r){var o=1.70158,a=0,s=n;return 0==t?e:1==(t/=r)?e+n:(a||(a=.3*r),s<Math.abs(n)?(s=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/s),s*Math.pow(2,-10*t)*Math.sin(2*(t*r-o)*Math.PI/a)+n+e)},easeInOutElastic:function(t,e,n,r){var o=1.70158,a=0,s=n;return 0==t?e:2==(t/=r/2)?e+n:(a||(a=.3*r*1.5),s<Math.abs(n)?(s=n,o=a/4):o=a/(2*Math.PI)*Math.asin(n/s),1>t?-.5*s*Math.pow(2,10*--t)*Math.sin(2*(t*r-o)*Math.PI/a)+e:s*Math.pow(2,-10*--t)*Math.sin(2*(t*r-o)*Math.PI/a)*.5+n+e)},easeInBack:function(t,e,n,r,o){return null==o&&(o=1.70158),n*(t/=r)*t*((o+1)*t-o)+e},easeOutBack:function(t,e,n,r,o){return null==o&&(o=1.70158),n*((t=t/r-1)*t*((o+1)*t+o)+1)+e},easeInOutBack:function(t,e,n,r,o){return null==o&&(o=1.70158),1>(t/=r/2)?n/2*t*t*((1+(o*=1.525))*t-o)+e:n/2*((t-=2)*t*((1+(o*=1.525))*t+o)+2)+e},easeInBounce:function(t,e,n,r){return n-l.easeOutBounce(r-t,0,n,r)+e},easeOutBounce:function(t,e,n,r){return(t/=r)<1/2.75?7.5625*n*t*t+e:t<2/2.75?n*(7.5625*(t-=1.5/2.75)*t+.75)+e:t<2.5/2.75?n*(7.5625*(t-=2.25/2.75)*t+.9375)+e:n*(7.5625*(t-=2.625/2.75)*t+.984375)+e},easeInOutBounce:function(t,e,n,r){return t<r/2?.5*l.easeInBounce(2*t,0,n,r)+e:.5*l.easeOutBounce(2*t-r,0,n,r)+.5*n+e}}}(jQuery);
;/*})'"*/
;/*})'"*/
!function(t,e){var n=e(t,t.document);t.lazySizes=n,"object"==typeof module&&module.exports&&(module.exports=n)}(window,function(t,e){"use strict";if(e.getElementsByClassName){var n,a=e.documentElement,i=t.Date,r=t.HTMLPictureElement,o="addEventListener",s="getAttribute",l=t[o],c=t.setTimeout,u=t.requestAnimationFrame||c,d=t.requestIdleCallback,f=/^picture$/i,m=["load","error","lazyincluded","_lazyloaded"],z={},v=Array.prototype.forEach,g=function(t,e){return z[e]||(z[e]=new RegExp("(\\s|^)"+e+"(\\s|$)")),z[e].test(t[s]("class")||"")&&z[e]},y=function(t,e){g(t,e)||t.setAttribute("class",(t[s]("class")||"").trim()+" "+e)},h=function(t,e){var n;(n=g(t,e))&&t.setAttribute("class",(t[s]("class")||"").replace(n," "))},p=function(t,e,n){var a=n?o:"removeEventListener";n&&p(t,e),m.forEach(function(n){t[a](n,e)})},C=function(t,n,a,i,r){var o=e.createEvent("CustomEvent");return o.initCustomEvent(n,!i,!r,a||{}),t.dispatchEvent(o),o},b=function(e,a){var i;!r&&(i=t.picturefill||n.pf)?i({reevaluate:!0,elements:[e]}):a&&a.src&&(e.src=a.src)},A=function(t,e){return(getComputedStyle(t,null)||{})[e]},E=function(t,e,a){for(a=a||t.offsetWidth;a<n.minSize&&e&&!t._lazysizesWidth;)a=e.offsetWidth,e=e.parentNode;return a},N=function(){var t,n,a=[],i=function(){var e;for(t=!0,n=!1;a.length;)e=a.shift(),e[0].apply(e[1],e[2]);t=!1},r=function(r){t?r.apply(this,arguments):(a.push([r,this,arguments]),n||(n=!0,(e.hidden?c:u)(i)))};return r._lsFlush=i,r}(),w=function(t,e){return e?function(){N(t)}:function(){var e=this,n=arguments;N(function(){t.apply(e,n)})}},M=function(t){var e,n=0,a=125,r=666,o=r,s=function(){e=!1,n=i.now(),t()},l=d?function(){d(s,{timeout:o}),o!==r&&(o=r)}:w(function(){c(s)},!0);return function(t){var r;(t=t===!0)&&(o=44),e||(e=!0,r=a-(i.now()-n),r<0&&(r=0),t||r<9&&d?l():c(l,r))}},_=function(t){var e,n,a=99,r=function(){e=null,t()},o=function(){var t=i.now()-n;t<a?c(o,a-t):(d||r)(r)};return function(){n=i.now(),e||(e=c(o,a))}},x=function(){var r,u,d,m,z,E,x,B,S,F,L,R,k,O,P,T=/^img$/i,$=/^iframe$/i,D="onscroll"in t&&!/glebot/.test(navigator.userAgent),H=0,I=0,q=0,j=-1,G=function(t){q--,t&&t.target&&p(t.target,G),(!t||q<0||!t.target)&&(q=0)},J=function(t,n){var i,r=t,o="hidden"==A(e.body,"visibility")||"hidden"!=A(t,"visibility");for(S-=n,R+=n,F-=n,L+=n;o&&(r=r.offsetParent)&&r!=e.body&&r!=a;)o=(A(r,"opacity")||1)>0,o&&"visible"!=A(r,"overflow")&&(i=r.getBoundingClientRect(),o=L>i.left&&F<i.right&&R>i.top-1&&S<i.bottom+1);return o},K=function(){var t,i,o,l,c,f,m,v,g;if((z=n.loadMode)&&q<8&&(t=r.length)){i=0,j++,null==O&&("expand"in n||(n.expand=a.clientHeight>500&&a.clientWidth>500?500:370),k=n.expand,O=k*n.expFactor),I<O&&q<1&&j>2&&z>2&&!e.hidden?(I=O,j=0):I=z>1&&j>1&&q<6?k:H;for(;i<t;i++)if(r[i]&&!r[i]._lazyRace)if(D)if((v=r[i][s]("data-expand"))&&(f=1*v)||(f=I),g!==f&&(x=innerWidth+f*P,B=innerHeight+f,m=f*-1,g=f),o=r[i].getBoundingClientRect(),(R=o.bottom)>=m&&(S=o.top)<=B&&(L=o.right)>=m*P&&(F=o.left)<=x&&(R||L||F||S)&&(d&&q<3&&!v&&(z<3||j<4)||J(r[i],f))){if(et(r[i]),c=!0,q>9)break}else!c&&d&&!l&&q<4&&j<4&&z>2&&(u[0]||n.preloadAfterLoad)&&(u[0]||!v&&(R||L||F||S||"auto"!=r[i][s](n.sizesAttr)))&&(l=u[0]||r[i]);else et(r[i]);l&&!c&&et(l)}},Q=M(K),U=function(t){y(t.target,n.loadedClass),h(t.target,n.loadingClass),p(t.target,X)},V=w(U),X=function(t){V({target:t.target})},Y=function(t,e){try{t.contentWindow.location.replace(e)}catch(n){t.src=e}},Z=function(t){var e,a,i=t[s](n.srcsetAttr);(e=n.customMedia[t[s]("data-media")||t[s]("media")])&&t.setAttribute("media",e),i&&t.setAttribute("srcset",i),e&&(a=t.parentNode,a.insertBefore(t.cloneNode(),t),a.removeChild(t))},tt=w(function(t,e,a,i,r){var o,l,u,d,z,g;(z=C(t,"lazybeforeunveil",e)).defaultPrevented||(i&&(a?y(t,n.autosizesClass):t.setAttribute("sizes",i)),l=t[s](n.srcsetAttr),o=t[s](n.srcAttr),r&&(u=t.parentNode,d=u&&f.test(u.nodeName||"")),g=e.firesLoad||"src"in t&&(l||o||d),z={target:t},g&&(p(t,G,!0),clearTimeout(m),m=c(G,2500),y(t,n.loadingClass),p(t,X,!0)),d&&v.call(u.getElementsByTagName("source"),Z),l?t.setAttribute("srcset",l):o&&!d&&($.test(t.nodeName)?Y(t,o):t.src=o),(l||d)&&b(t,{src:o})),N(function(){t._lazyRace&&delete t._lazyRace,h(t,n.lazyClass),g&&!t.complete||(g?G(z):q--,U(z))})}),et=function(t){var e,a=T.test(t.nodeName),i=a&&(t[s](n.sizesAttr)||t[s]("sizes")),r="auto"==i;(!r&&d||!a||!t.src&&!t.srcset||t.complete||g(t,n.errorClass))&&(e=C(t,"lazyunveilread").detail,r&&W.updateElem(t,!0,t.offsetWidth),t._lazyRace=!0,q++,tt(t,e,r,i,a))},nt=function(){if(!d){if(i.now()-E<999)return void c(nt,999);var t=_(function(){n.loadMode=3,Q()});d=!0,n.loadMode=3,Q(),l("scroll",function(){3==n.loadMode&&(n.loadMode=2),t()},!0)}};return{_:function(){E=i.now(),r=e.getElementsByClassName(n.lazyClass),u=e.getElementsByClassName(n.lazyClass+" "+n.preloadClass),P=n.hFac,l("scroll",Q,!0),l("resize",Q,!0),t.MutationObserver?new MutationObserver(Q).observe(a,{childList:!0,subtree:!0,attributes:!0}):(a[o]("DOMNodeInserted",Q,!0),a[o]("DOMAttrModified",Q,!0),setInterval(Q,999)),l("hashchange",Q,!0),["focus","mouseover","click","load","transitionend","animationend","webkitAnimationEnd"].forEach(function(t){e[o](t,Q,!0)}),/d$|^c/.test(e.readyState)?nt():(l("load",nt),e[o]("DOMContentLoaded",Q),c(nt,2e4)),r.length?K():Q()},checkElems:Q,unveil:et}}(),W=function(){var t,a=w(function(t,e,n,a){var i,r,o;if(t._lazysizesWidth=a,a+="px",t.setAttribute("sizes",a),f.test(e.nodeName||""))for(i=e.getElementsByTagName("source"),r=0,o=i.length;r<o;r++)i[r].setAttribute("sizes",a);n.detail.dataAttr||b(t,n.detail)}),i=function(t,e,n){var i,r=t.parentNode;r&&(n=E(t,r,n),i=C(t,"lazybeforesizes",{width:n,dataAttr:!!e}),i.defaultPrevented||(n=i.detail.width,n&&n!==t._lazysizesWidth&&a(t,r,i,n)))},r=function(){var e,n=t.length;if(n)for(e=0;e<n;e++)i(t[e])},o=_(r);return{_:function(){t=e.getElementsByClassName(n.autosizesClass),l("resize",o)},checkElems:o,updateElem:i}}(),B=function(){B.i||(B.i=!0,W._(),x._())};return function(){var e,a={lazyClass:"lazyload",loadedClass:"lazyloaded",loadingClass:"lazyloading",preloadClass:"lazypreload",errorClass:"lazyerror",autosizesClass:"lazyautosizes",srcAttr:"data-src",srcsetAttr:"data-srcset",sizesAttr:"data-sizes",minSize:40,customMedia:{},init:!0,expFactor:1.5,hFac:.8,loadMode:2};n=t.lazySizesConfig||t.lazysizesConfig||{};for(e in a)e in n||(n[e]=a[e]);t.lazySizesConfig=n,c(function(){n.init&&B()})}(),{cfg:n,autoSizer:W,loader:x,init:B,uP:b,aC:y,rC:h,hC:g,fire:C,gW:E,rAF:N}}});
;/*})'"*/
;/*})'"*/
(function(e){e(document).ready(function(){var i=e('.programs-box .conter').height();e('.programs-box .conter .tog_cont').height(i+2);e('.slider-keyperson .owl-carousel').owlCarousel({loop:!0,margin:13,items:3,dots:!1,nav:!0,responsiveClass:!0,scrolling:'no',responsive:{0:{items:2,margin:5,dots:!0,nav:!1},768:{items:3}},navText:['<i class=\'fa fa-arrow-left\'></i>','<i class=\'fa fa-arrow-right\'></i>']});e('.slider-keyperson-4 .owl-carousel').owlCarousel({loop:!0,margin:13,items:4,dots:!1,nav:!0,responsiveClass:!0,scrolling:'no',responsive:{0:{items:2,margin:5,dots:!0,nav:!1},768:{items:4}},navText:['<i class=\'fa fa-arrow-left\'></i>','<i class=\'fa fa-arrow-right\'></i>']});e('.slider-keyperson-4').addClass('slider-keyperson');e('.slider-keyperson-new .owl-carousel').owlCarousel({loop:!1,margin:13,items:3,dots:!1,nav:!0,responsiveClass:!0,scrolling:'no',responsive:{0:{items:2,margin:5,dots:!0,nav:!1},768:{items:3,}},navText:['<i class=\'fa fa-arrow-left\'></i>','<i class=\'fa fa-arrow-right\'></i>'],});e('[class^="popup-keyperson-"]').fancybox({autoWidth:'true',autoHeight:'false',padding:0,margin:0,wrapCSS:'key-person-popup',tpl:{closeBtn:'<a title="Close" class="fancybox-close" href="javascript:;"><i class="fa fa-times"></i></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><i class="fa fa-arrow-right"></i></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><i class="fa fa-arrow-left"></i></a>'},loop:!1,afterShow:function(){'ontouchstart' in document.documentElement&&(e('.fancybox-nav').css('display','none'),e('.fancybox-wrap').swipe({swipe:function(a,t){'left'===t||'up'===t?e.fancybox.prev(t):e.fancybox.next(t)}}))}});e('#auto-complete-search .jsw_typeahead').typeahead({hint:!0,highlight:!0,minLength:2},{name:'states',source:function(a,t,s){a=e('<div/>').html(a).text();e.get(e('#base_url').val()+'/apachesolr_autocomplete_callback/apachesolr_search_page%3Acore_search?term='+a,function(a){var t;t=[];e.each(a,function(e,a){if(a.value!=undefined){t.push(a.value)}});s(t)})},templates:{notFound:['<div class="not-found-message">','Not Found','</div>'].join('\n'),suggestion:function(e){return'<div>'+e+'</div>'},footer:['<div class="datalist">','<div class="top-search">','<div class="title-top-search">TOP SEARCHES</div>','<ul class="link-top-search">','<li><a href="'+e('#base_url').val()+'/search/site/steel">Steel</a></li>','<li><a href="'+e('#base_url').val()+'/search/site/career">Career</a></li>','<li><a href="'+e('#base_url').val()+'/search/site/partnership">Partnership</a></li>','</ul>','<ul class="link-top-search">','<li><a href="'+e('#base_url').val()+'/search/site/investors">Investors</a></li>','<li><a href="'+e('#base_url').val()+'/search/site/sports">Sports</a></li>','<li><a href="'+e('#base_url').val()+'/search/site/foundation">Foundation</a></li>','</ul>','</div>','</div>'].join('\n'),}});e('#auto-complete-search .jsw_typeahead').bind('typeahead:selected',function(a,t,s){t=e('<div/>').html(t).text();e('.header-search #search-block-form').find('input[type=text]').val(t);e('#search-block-form').submit();return!1});e('a#void-menu').click(function(a){a.preventDefault();var t=e(this).attr('href');e('html, body').animate({scrollTop:e(t).offset().top-140},1000,'linear')});e('#select_business_go').click(function(a){a.preventDefault();var t=e('#select_business_go_url').text();if(t){window.location=t}});e('.dropdown-item').click(function(a){var t=e(this).text();if(t.length>15){t=t.substring(0,15)+'...'};e('#lookingforpage').text(t);e('#select_business_go_url').html(e(this).attr('data-href'))});if(e('.hero-banner').length>0||e('.hero-banner-steel').length>0){var s=e('#users-device-size').find('div:visible').first().attr('id'),a='';switch(s){case'sm':a='img.visible-sm';break;case'xs':a='img.visible-xs';break;default:a='img.visible-desk'};e(a).each(function(){var a=e(this).attr('data-src');if(typeof a!=='undefined'){e(this).attr('src',a)}})};e('.tog_cont').hide();e('h2.trgr:eq(0)').addClass('act').next().show();e('h2.trgr').click(function(){if(e(this).next().is(':hidden')){e('h2.trgr').removeClass('act').next().fadeOut('slow');e(this).addClass('act').next().fadeIn('slow')}
else{if(!e(this).hasClass('act')){e(this).removeClass('act').next().fadeOut('slow')}};return!1});var t=e('.team-carousel');t.trigger('destroy.owl.carousel');t.owlCarousel({loop:!1,margin:13,items:3,dots:!1,nav:!0,responsiveClass:!0,scrolling:'no',responsive:{0:{items:2,margin:5,dots:!0,nav:!1},768:{items:3},1000:{items:4}},navText:['<i class=\'fa fa-arrow-left\'></i>','<i class=\'fa fa-arrow-right\'></i>']});e('.popup-keyperson').fancybox({autoWidth:'true',autoHeight:'false',padding:0,margin:0,wrapCSS:'key-person-popup',tpl:{closeBtn:'<a title="Close" class="fancybox-close" href="javascript:;"><i class="fa fa-times"></i></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><i class="fa fa-arrow-right"></i></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><i class="fa fa-arrow-left"></i></a>'},loop:!1,afterShow:function(){if('ontouchstart' in document.documentElement){e('.fancybox-nav').css('display','none');e('.fancybox-wrap').swipe({swipe:function(a,t){if(t==='left'||t==='up'){e.fancybox.prev(t)}
else{e.fancybox.next(t)}}})}}});if(e('.steel-video').length>0||e('.hero-steel').length>0){if(e('.hero-steel').hasClass('op1')){e('.steel-video').addClass('op1')}};if(e('.hero-banner').length==0&&e('.hero-steel').length==0){e('.row-1').css('margin-top','150px');if(e('.row-1').length==0){e('.row-2').css('margin-top','150px')}};if(e('audio').length){audiojs.events.ready(function(){audiojs.createAll()})}});e(window).on('load',function(){var a=function(a,t){if(!e(t).length){console.log(t+' not found');return};var s=e('<div />'),i=e('<a />').attr('class','twitter-timeline').attr('href','https://twitter.com/'+a).text('Tweets').attr('height','500px'),r=e('<script />').attr('async','true').attr('src','https://platform.twitter.com/widgets.js').attr('charset','utf-8');s.append(i);s.append(r);e(t).html(s.html())};setTimeout(function(){if(e('.tweet_url').length>0){var t=e('.tweet_url').html();a(t,'.tweet_url');e('.tweet_url').show()}},2000)})})(jQuery);;/*})'"*/
!function($) {
  "use strict";

  (function($, sr) {
    var debounce = function(func, threshold, execAsap) {
      var timeout;
      return function debounced() {
        var obj = this,
          args = arguments;

        function delayed() {
          if (!execAsap) func.apply(obj, args);
          timeout = null;
        }
        if (timeout) clearTimeout(timeout);
        else if (execAsap) func.apply(obj, args);
        timeout = setTimeout(delayed, threshold || 100);
      };
    };
    // smartresize
    jQuery.fn[sr] = function(fn) {
      return fn ? this.bind("resize", debounce(fn)) : this.trigger(sr);
    };
  })(jQuery, "smartresize");

  setTimeout(function() {
    /* Waypoint script*/
    $(function() {
      function onScrollInit(items, trigger) {
        items.each(function() {
          var osElement = $(this),
            osAnimationClass = osElement.attr("data-os-animation"),
            osAnimationDelay = osElement.attr("data-os-animation-delay");

          osElement.css({
            "-webkit-animation-delay": osAnimationDelay,
            "-moz-animation-delay": osAnimationDelay,
            "animation-delay": osAnimationDelay
          });

          var osTrigger = trigger ? trigger : osElement;

          osTrigger.waypoint(
            function() {
              osElement.addClass("animated").addClass(osAnimationClass);
            }, {
              triggerOnce: true,
              offset: "90%"
            }
          );
        });
      }
      onScrollInit($(".os-animation"));
      onScrollInit(
        $(".staggered-animation"),
        $(".staggered-animation-container")
      );
    });
  }, 100);

  $(".tog_cont").hide();
  $("h2.trgr:eq(0)")
    .addClass("act")
    .next()
    .show();

  $("h2.trgr").click(function() {
    if (
      $(this)
      .next()
      .is(":hidden")
    ) {
      $("h2.trgr")
        .removeClass("act")
        .next()
        .fadeOut("slow");
      $(this)
        .addClass("act")
        .next()
        .fadeIn("slow");
    } else {
      if (!$(this).hasClass("act")) {
        $(this)
          .removeClass("act")
          .next()
          .fadeOut("slow");
      }
    }
    return false;
  });

  //=======================================================================================================================
  var jsw;
  jsw = {
    init: function() {
      var WidthWindow = $(window).width();
      var HeightWindow = $(window).height();

      // effect slider for other slider
      jsw.heroBanner.init(".sliderBanner .owl-carousel");
      jsw.heroBanner.init(".sliderPartner .owl-carousel");

      // effect only big banner homepage

      if ($(".hero-banner").length) {
        jsw.homeBanner.init(
          ".hero-banner .owl-carousel",
          ".hero-banner .dots-container"
        );
      }

      if ($(".slider-keyperson-new .owl-carousel").length) {
        jsw.keyPersonNew();
      }
      if ($(".slider-keyperson .owl-carousel").length) {
        jsw.keyPerson();
      }
      if ($(".fancybox-video").length) {
        jsw.videoPopup();
      }
      if ($(".btn-scroll-down a").length) {
        jsw.scrollDown();
      }
      if ($(".btn-scroll-up a").length) {
        jsw.scrollTop();
      }
      if ($(".block-contact-us").length) {
        jsw.dockContact();
        jsw.dockSteelContact();
      }

      if ($(".pagination-banner.owl-carousel").length) {
        jsw.paginationBanner.init();
      }

      if ($(".persons-carousel.owl-carousel").length) {
        jsw.personsCarousel.init();
      }
      // Have check length in function

      jsw.hasSubMenu();

      jsw.sameHeightMenuTop();
      jsw.sameHeight(".block-same-height");
      jsw.sameHeight(".about-block1 .same-height-about1");

      // Same height investors

      jsw.sameHeightInvestors();

      // Same height mobile
      jsw.setSameHeightMobile();

      //show search when click
      jsw.showSearchMenu();

      //show link social when hover icon
      jsw.showLinkSocial();

      //filter google maps
      if ($("#map").length) {
        jsw.filterGoogleMaps();
      }

      //Video background play

      if ($(".video-block video").length) {
        jsw.bgVideoHTML5();
      }

      //Campain Height
      if ($(".main-container").length) {
        jsw.campainHeight();
      }

      //page About us - block award recognition
      if ($("a.award-recognition").length) {
        jsw.awardRecognitionFn();
      }

      // Auto complete

      if ($(".box-search .form-search").length) {
        jsw.autoComplete();
      }

      //Swiper Mobile Navigation Page foe About us
      jsw.swipeNaviPageAbout();

      //Accourdion Award Mobile for page about us
      jsw.accordionAwardsMobile();

      //Accourdion Award Mobile for page about us
      jsw.accordionPortFeature();

      jsw.datepicker();

      if ($(".nokeyboard").length) {
        jsw.preventSoftkeyboard();
      }
    },

    setSameHeightFn: function(target) {
      var heights = $(target)
        .map(function() {
          $(this).height("100%");
          return $(this).height();
        })
        .get(),
        maxHeight = Math.max.apply(null, heights);
      $(target).height(maxHeight);
    },

    setSameHeightMobile: function() {
      var _setSameHeight = function(target) {
        var heights = $(target)
          .map(function() {
            $(this).height("100%");
            return $(this).height();
          })
          .get(),
          maxHeight = Math.max.apply(null, heights);
        $(target).height(maxHeight);
      };

      // Same height block Number of page about us worldwide
      if ($(window).width() <= 768) {
        _setSameHeight(".sameHeightWorldWide");
      }
    },

    heroBanner: {
      init: function(tagert, dotsID, enableNav) {
        "use strict";
        var dotsOpt = dotsID;
        var navOpt = enableNav;

        if (navOpt !== undefined && navOpt !== false) {
          navOpt = true;
        } else {
          navOpt = false;
        }

        if (dotsOpt === undefined && dotsOpt === false) {
          dotsOpt = false;
        }

        var slider = $(tagert).owlCarousel({
          items: 1,
          margin: 0,
          nav: navOpt,
          dots: true,
          loop: true,
          autoplay: false,
          smartSpeed: 1000,
          dotsContainer: dotsOpt,
          responsiveClass: true
        });

        if ($(tagert).siblings(".carousel-nav").length) {
          $(tagert)
            .siblings(".carousel-nav")
            .find(".prev")
            .on("click", function() {
              slider.trigger("prev.owl.carousel");
            });
          $(tagert)
            .siblings(".carousel-nav")
            .find(".next")
            .on("click", function() {
              slider.trigger("next.owl.carousel");
            });
        }

        if ($(tagert).find(".item-nav").length) {
          $(tagert)
            .find(".item-nav.prev-slide")
            .on("click", function() {
              slider.trigger("prev.owl.carousel");
            });
          $(tagert)
            .find(".item-nav.next-slide")
            .on("click", function() {
              slider.trigger("next.owl.carousel");
            });
        }
      }
    },

    // effect only big banner homepage

    homeBanner: {
      init: function(tagert, dotsID, enableNav) {
        "use strict";
        var dotsOpt = dotsID;
        var navOpt = enableNav;

        if (navOpt !== undefined && navOpt !== false) {
          navOpt = true;
        } else {
          navOpt = false;
        }

        if (dotsOpt === undefined && dotsOpt === false) {
          dotsOpt = false;
        }

        var slider = $(tagert).owlCarousel({
          items: 1,
          margin: 0,
          nav: navOpt,
          dots: true,
          loop: true,
          autoplay: false,
          smartSpeed: 1000,
          dotsContainer: dotsOpt,
          responsiveClass: true,
          animateOut: "fadeOut",
          animateIn: "fadeIn"
        });

        if ($(tagert).siblings(".carousel-nav").length) {
          $(tagert)
            .siblings(".carousel-nav")
            .find(".prev")
            .on("click", function() {
              slider.trigger("prev.owl.carousel");
            });
          $(tagert)
            .siblings(".carousel-nav")
            .find(".next")
            .on("click", function() {
              slider.trigger("next.owl.carousel");
            });
        }

        if ($(tagert).find(".item-nav").length) {
          $(tagert)
            .find(".item-nav.prev-slide")
            .on("click", function() {
              slider.trigger("prev.owl.carousel");
            });
          $(tagert)
            .find(".item-nav.next-slide")
            .on("click", function() {
              slider.trigger("next.owl.carousel");
            });
        }
      }
    },

    paginationBanner: {
      init: function() {
        var owl = $(".pagination-banner.owl-carousel");

        owl.owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          items: 1,
          smartSpeed: 700
        });

        $(".pbannerPrev").on("click", function() {
          owl.trigger("prev.owl.carousel");
        });

        $(".pbannerNext").on("click", function() {
          owl.trigger("next.owl.carousel");
        });
      }
    },

    personsCarousel: {
      init: function() {
        var owl = $(".persons-carousel.owl-carousel");

        owl.owlCarousel({
          loop: true,
          margin: 0,
          nav: false,
          items: 1,
          smartSpeed: 700
        });
      }
    },

    //end

    videoPopup: function() {
      $(".fancybox-video").fancybox({
        openEffect: "none",
        closeEffect: "none",
        helpers: {
          media: {}
        }
      });
    },

    scrollDown: function() {
      $(".btn-scroll-down a").on("click", function() {
        // var parentPos = $(this).closest('.btn-scroll-down').parent().offset().top;
        // var parentHeight = $(this).closest('.btn-scroll-down').parent().height();
        // $('html,body').animate({scrollTop: parentHeight + parentPos}, 1000);
        var pos = $(".hero-banner").height();
        $("html,body").animate({
            scrollTop: pos
          },
          1000
        );
      });
    },

    scrollTop: function() {
      $(".btn-scroll-up a").on("click", function() {
        $("html,body").animate({
            scrollTop: 0
          },
          2000
        );
      });
    },

    bgVideoHTML5: function() {
      $("#video").YTPlayer({
        fitToBackground: true,
        videoId: "LSmgKRx5pBo",
        playerVars: {
          modestbranding: 0,
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          branding: 0,
          pauseOnScroll: true,
          rel: 0,
          autohide: 0
        }
      });

      // Get media - with autoplay disabled (audio or video)
      var heightVideo = $(".video-block video").outerHeight();

      if ($(window).width() < 768) {
        $(".block-video .video-block video").height(heightVideo);
      }

      var media = $("video").not("[autoplay='autoplay']");

      if ($(window).width() >= 768) {
        var tolerancePixel = 500;
      } else if ($(window).width() < 768) {
        var tolerancePixel = 150;
      }

      function checkMedia() {
        // Get current browser top and bottom
        var scrollTop = $(window).scrollTop() + tolerancePixel;
        var scrollBottom =
          $(window).scrollTop() + $(window).height() - tolerancePixel;

        //if ($(window).scrollTop() > $(window).height() - 10) {
        media.each(function(index, el) {
          var yTopMedia = $(this).offset().top;
          var yBottomMedia = $(this).height() + yTopMedia;

          if (scrollTop < yBottomMedia && scrollBottom > yTopMedia) {
            $(this)
              .get(0)
              .play();
          } else {
            $(this)
              .get(0)
              .pause();
          }
        });

        //}
      }

      $(document).on("scroll", checkMedia);

      // Attach event handler
      $("video").on("click", function(event) {
        event.preventDefault();
        $("video")[0].play();
      });

      // Trigger click event
      $("video").trigger("click");
    },

    sameHeight: function(target, disOnMobile) {
      function sameHeightInit() {
        if ($(target).length) {
          if (disOnMobile !== undefined && disOnMobile !== false) {
            $(target).height("auto");
            jsw.setSameHeightFn(target);
          } else {
            if ($(window).width() >= 768) {
              $(target).height("auto");
              jsw.setSameHeightFn(target);
            } else {
              $(target).height("auto");
            }
          }
        }
      }

      setTimeout(function() {
        sameHeightInit();
      }, 500);

      $(window).smartresize(function() {
        sameHeightInit();
      });
    },

    sameHeightInvestors: function() {
      function sameHeightInvest() {
        var heightInvest = $(".invest-1 .img-background").height();
        $(".sameHeightInvest").css("height", heightInvest);
      }
      sameHeightInvest();
      $(window).smartresize(function() {
        sameHeightInvest();
      });
    },

    sameHeightMenuTop: function() {
      if ($(window).width() >= 992) {
        var heightRightMenu = $(
          ".main-menu-right .sub-menu .left-block"
        ).outerHeight();
        $(".main-menu-right .sub-menu .right-block").css(
          "height",
          heightRightMenu
        );
      }
    },

    hasSubMenu: function() {
      if ($(".main-menu-left .title-link, .main-menu-right .title-link").length) {
        $(".main-menu-left .title-link, .main-menu-right .title-link").each(
          function() {
            if ($(this).siblings(".sub-menu").length) {
              $(this)
                .parent()
                .addClass("has-submenu");
            }
          }
        );
      }
      $(".has-submenu .title-link").on("click", function() {
        if ($(window).width() < 992) {
          if ($(this).hasClass("active-submenu")) {
            $(this).removeClass("active-submenu");
            $(this)
              .find("i")
              .removeClass("fa-arrow-down");
          } else {
            $(".has-submenu .title-link").removeClass("active-submenu");
            $(".has-submenu .title-link i").removeClass("fa-arrow-down");
            $(this).addClass("active-submenu");
            $(this)
              .find("i")
              .addClass("fa-arrow-down");
          }
        }
      });
      //set height menu overflow-y when click humber

      function setHeightMenuMobile() {
        $("#nav-icon1,#nav-icon2,#nav-icon3,#nav-icon4").click(function() {
          $(this).toggleClass("open");
          var heightMenu = $(window).height();
          $(".menu-container").toggleClass("block-sub-menu");
          if ($(".menu-container").hasClass("block-sub-menu")) {
            $(".menu-container").css("max-height", heightMenu);

            if ($(window).width() < 768) {
              $(".overlay-menu-mobile").css("opacity", 1);
              $(".overlay-menu-mobile").css("max-height", "100%");
            }
          } else {
            $(".menu-container").removeAttr("style");
            if ($(window).width() < 768) {
              $(".overlay-menu-mobile").removeAttr("style");
            }
          }
        });
      }
      setHeightMenuMobile();
    },

    filterGoogleMaps: function() {
      var map;
      var dataObj;
      var markers;
      initMap();

      function initMap() {
        // dataObj = [
        //     {"lat": -33.397, "lng": 110.644, "filter1": "SG", "filter2": "US", "class": "blue"},
        //     {"lat": -32.497, "lng": 120.744, "filter1": "VN", "filter2": "US", "class": "gray"},
        //     {"lat": -34.597, "lng": 150.844, "filter1": "VN", "filter2": "UK", "class": "yellow-drak"},
        //     {"lat": -37.697, "lng": 137.944, "filter1": "SG", "filter2": "US", "class": "green"},
        //     {"lat": -31.297, "lng": 155.544, "filter1": "SG", "filter2": "US", "class": "blue"},
        //     {"lat": -34.197, "lng": 140.444, "filter1": "VN", "filter2": "US", "class": "pink"},
        //     {"lat": -33.097, "lng": 150.344, "filter1": "VN", "filter2": "UK", "class": "yellow-drak"},
        //     {"lat": -33.997, "lng": 150.244, "filter1": "SG", "filter2": "UK", "class": "cadet-blue4"},
        //     {"lat": -36.997, "lng": 160.244, "filter1": "SG", "filter2": "US", "class": "green"},
        //     {"lat": -31.397, "lng": 110.644, "filter1": "SG", "filter2": "US", "class": "blue"},
        //     {"lat": -32.437, "lng": 165.744, "filter1": "VN", "filter2": "US", "class": "gray"},
        //     {"lat": -34.67, "lng": 176.844, "filter1": "VN", "filter2": "UK", "class": "yellow-drak"},
        //     {"lat": -37.347, "lng": 131.944, "filter1": "SG", "filter2": "US", "class": "green"},
        //     {"lat": -31.77, "lng": 112.544, "filter1": "SG", "filter2": "US", "class": "blue"},
        //     {"lat": -34.237, "lng": 134.444, "filter1": "VN", "filter2": "US", "class": "pink"},

        // ];
        // markers = [];
        // map = new google.maps.Map(document.getElementById('map'), {
        //     center: {lat: -34.397, lng: 150.644},
        //     zoom: 8,
        //     zoomControl: false,
        //     streetViewControl: false
        // });
        // var zoomIn = document.getElementById('zoomIn');
        // var zoomOut = document.getElementById('zoomOut');

        // google.maps.event.addDomListener(zoomIn, 'click', function() {
        //     map.setZoom(map.getZoom() + 1);
        // });

        // // Setup the click event listener - zoomOut
        // google.maps.event.addDomListener(zoomOut, 'click', function() {
        //     map.setZoom(map.getZoom() - 1);
        // });

        // for (var i = 0; i < dataObj.length; i++) {
        //     var marker = new MarkerWithLabel({
        //         position: {lat: dataObj[i].lat, lng: dataObj[i].lng},
        //         map: map,
        //         raiseOnDrag: true,
        //         icon: ' ',
        //         labelContent: '<i class="fa fa-circle ' + dataObj[i].class +'"></i>',
        //         labelAnchor: new google.maps.Point(dataObj[i].lat, dataObj[i].lng),
        //         labelClass: "labels" // the CSS class for the label
        //     });
        //     markers.push(marker);
        // }
        // $('#filter1, #filter2').on('change',function(){
        //     var selected1 = $('#filter1').val();
        //     var selected2 = $('#filter2').val();
        //     if (selected1 == '' && selected2 == '') {
        //         resetFilter();
        //     } else {
        //         showMarkerByLocation(selected1, selected2);
        //     }
        // });

        // function resetFilter(){
        //     for (var i = 0; i < dataObj.length; i++) {
        //         markers[i].setMap(map);
        //     }
        // }

        // function showMarkerByLocation(location1, location2){
        //     for (var i = 0; i < dataObj.length; i++) {
        //         if (
        //             (location1 == '' && dataObj[i].filter2 == location2) ||
        //             (dataObj[i].filter1 == location1 && location2 == '') ||
        //             (dataObj[i].filter1 == location1 && dataObj[i].filter2 == location2)
        //         ) {
        //             markers[i].setMap(map);
        //         } else {
        //             markers[i].setMap(null);
        //         }
        //     }
        // }

        $(".header-filter.bg-filter").on("click", function() {
          $(".show-filter.bg-filter")
            .show()
            .addClass("show");
          $(".header-filter.bg-filter").hide();
        });

        $(".close-popup").on("click", function() {
          $(".show-filter.bg-filter")
            .hide()
            .removeClass("show");
          $(".header-filter.bg-filter").show();
        });
      }
    },

    showSearchMenu: function() {
      var wRightMenu = $(".mobile-header .menu-right").width();
      $(".search-animation .box-search").css("max-width", wRightMenu);

      $(".search-animation .btn-search").on("click", function() {
        $(".search-animation .box-search").toggleClass("show");

        if ($(".search-animation .box-search").hasClass("show")) {
          $(".search-animation .box-search")
            .siblings()
            .find("i")
            .addClass("fa-times");
          $(".search-animation .box-search .search-header").focus();
        } else {
          $(".search-animation .box-search")
            .siblings()
            .find("i")
            .removeClass("fa-times");
          $(".search-animation .box-search .search-header").focusout();
        }
      });
    },

    campainHeight: function() {
      function setHMenuTop() {
        setTimeout(function() {
          var heightMenu = $(".container-menu-top").outerHeight();
          $(".main-container").css("margin-top", heightMenu);
        }, 200);
      }

      setHMenuTop();
      $(window).smartresize(function() {
        setHMenuTop();
      });
    },

    awardRecognitionFn: function() {
      var heightTxtAward = $(".award-recognition .txt-award").outerHeight() + 50;
      $("a.award-recognition").hover(
        function() {
          $(this)
            .find(".txt-title")
            .css("bottom", heightTxtAward);
        },
        function() {
          $(this)
            .find(".txt-title")
            .removeAttr("style");
        }
      );
    },



    keyPersonNew: function() {
      $(".slider-keyperson-new .owl-carousel").owlCarousel({
        loop: false,
        margin: 13,
        items: 3,
        dots: false,
        nav: true,
        responsiveClass: true,
        scrolling: "no",
        responsive: {
          0: {
            items: 2,
            margin: 5,
            dots: true,
            nav: false
          },
          768: {
            items: 3
          }
        },
        navText: [
          "<i class='fa fa-arrow-left'></i>",
          "<i class='fa fa-arrow-right'></i>"
        ]
      });

    },

    keyPerson: function() {
      $(".slider-keyperson .owl-carousel").owlCarousel({
        loop: true,
        margin: 13,
        items: 3,
        dots: false,
        nav: true,
        responsiveClass: true,
        scrolling: "no",
        responsive: {
          0: {
            items: 2,
            margin: 5,
            dots: true,
            nav: false
          },
          768: {
            items: 3
          }
        },
        navText: [
          "<i class='fa fa-arrow-left'></i>",
          "<i class='fa fa-arrow-right'></i>"
        ]
      });

      // Add new class key-person-popup for popup

      $(".popup-keyperson").fancybox({
        autoWidth: "true",
        autoHeight: "false",
        padding: 0,
        margin: 0,
        wrapCSS: "key-person-popup",
        //nextMethod : 'resizeIn',
        //nextSpeed  : 0,
        //prevMethod : false,
        tpl: {
          closeBtn: '<a title="Close" class="fancybox-close" href="javascript:;"><i class="fa fa-times"></i></a>',
          next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><i class="fa fa-arrow-right"></i></a>',
          prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><i class="fa fa-arrow-left"></i></a>'
        },
        loop: false,
        afterShow: function() {
          if ("ontouchstart" in document.documentElement) {
            $(".fancybox-nav").css("display", "none");
            $(".fancybox-wrap").swipe({
              swipe: function(event, direction) {
                if (direction === "left" || direction === "up") {
                  $.fancybox.prev(direction);
                } else {
                  $.fancybox.next(direction);
                }
              }
            });
          }
        }
      });

      // Add new class key-person-popup for popup

      $(".popup-img-grid").fancybox({
        autoWidth: "true",
        autoHeight: "false",
        padding: 0,
        margin: 0,
        wrapCSS: "img-grid-popup",
        //nextMethod : 'resizeIn',
        //nextSpeed  : 0,
        //prevMethod : false,
        tpl: {
          closeBtn: '<a title="Close" class="fancybox-close" href="javascript:;"><i class="fa fa-times"></i></a>',
          next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><i class="fa fa-arrow-right"></i></a>',
          prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><i class="fa fa-arrow-left"></i></a>'
        },
        loop: false,
        afterShow: function() {
          if ("ontouchstart" in document.documentElement) {
            $(".fancybox-nav").css("display", "none");
            $(".fancybox-wrap").swipe({
              swipe: function(event, direction) {
                if (direction === "left" || direction === "up") {
                  $.fancybox.prev(direction);
                } else {
                  $.fancybox.next(direction);
                }
              }
            });
          }
        }
      });

      // Add new class key-person-popup for popup

      $(".popup-port").fancybox({
        autoWidth: "true",
        autoHeight: "false",
        padding: 0,
        margin: 0,
        wrapCSS: "popup-port",
        //nextMethod : 'resizeIn',
        //nextSpeed  : 0,
        //prevMethod : false,
        tpl: {
          closeBtn: '<a title="Close" class="fancybox-close" href="javascript:;"><i class="fa fa-times"></i></a>',
          next: '<a title="Next" class="fancybox-nav fancybox-next hide" href="javascript:;"><i class="fa fa-arrow-right"></i></a>',
          prev: '<a title="Previous" class="fancybox-nav fancybox-prev hide" href="javascript:;"><i class="fa fa-arrow-left"></i></a>'
        },
        loop: false,
        afterShow: function() {
          if ("ontouchstart" in document.documentElement) {
            $(".fancybox-nav").css("display", "none");
            $(".fancybox-wrap").swipe({
              swipe: function(event, direction) {
                if (direction === "left" || direction === "up") {
                  $.fancybox.prev(direction);
                } else {
                  $.fancybox.next(direction);
                }
              }
            });
          }
        }
      });
    },

    autoComplete: function() {
      var substringMatcher = function(strs) {
        return function findMatches(q, cb) {
          var matches, substrRegex;

          // an array that will be populated with substring matches
          matches = [];

          // regex used to determine if a string contains the substring `q`
          substrRegex = new RegExp(q, "i");

          // iterate through the pool of strings and for any string that
          // contains the substring `q`, add it to the `matches` array
          $.each(strs, function(i, str) {
            if (substrRegex.test(str)) {
              matches.push(str);
            }
          });

          cb(matches);
        };
      };

      var states = [
        "Automotive",
        "Automotive industry",
        "Automotive engineering",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
      ];

      $("#auto-complete-search .typeahead").typeahead({
        hint: true,
        highlight: true,
        minLength: 2
      }, {
        name: "states",
        // source: substringMatcher(states),
        source: function(query, syncResults, asyncResults) {
          $.get(
            $("#base_url").val() +
            "/apachesolr_autocomplete_callback/apachesolr_search_page%3Acore_search?term=" +
            query,
            function(data) {
              // asyncResults(data.value);
              var matches;
              matches = [];

              $.each(data, function(key, value) {
                if (value.value != undefined) {
                  matches.push(value.value);
                }
              });
              asyncResults(matches);
            }
          );
        },
        templates: {
          notFound: [
            '<div class="not-found-message">',
            "Not Found",
            "</div>"
          ].join("\n"),
          suggestion: function(data) {
            return "<div>" + data + "</div>";
          },
          footer: [
            '<div class="datalist">',
            '<div class="top-search">',
            '<div class="title-top-search">TOP SEARCHES</div>',
            '<ul class="link-top-search">',
            '<li><a href="#nogo">Steel</a></li>',
            '<li><a href="#nogo">Career</a></li>',
            '<li><a href="#nogo">Partnership</a></li>',
            "</ul>",
            '<ul class="link-top-search">',
            '<li><a href="#nogo">Investors</a></li>',
            '<li><a href="#nogo">Football Club</a></li>',
            '<li><a href="#nogo">Foundation</a></li>',
            "</ul>",
            "</div>",
            "</div>"
          ].join("\n")
        }
      });
    },

    swipeNaviPageAbout: function() {
      if ($(window).width() < 768) {
        if ($('.swiper-container').length) {
          var swiper = new Swiper(".swiper-container", {
            spaceBetween: 0,
            slidesPerView: "auto",
            freeMode: true,
            paginationClickable: true
          });
        }
      }
    },

    //show link social fb, tw, google+ when hover icon

    showLinkSocial: function() {
      $(".share-link .icon-link").hover(
        function() {
          $(this).addClass("removeBackground");
          $(this)
            .find("i")
            .removeClass("fa-share-alt");
        },
        function() {
          $(this).removeClass("removeBackground");
          $(this)
            .find("i")
            .addClass("fa-share-alt");
        }
      );
    },

    accordionAwardsMobile: function() {
      $(".accordion-about-us .panel-heading").on("click", function() {
        $(".accordion-about-us .panel-heading .icon-accordion i")
          .addClass("fa-plus-square-o")
          .removeClass("fa-minus-square-o");
        if (
          !$(this)
          .parents(".panel")
          .find(".panel-collapse")
          .hasClass("in")
        ) {
          $(this)
            .find(".icon-accordion i")
            .addClass("fa-minus-square-o")
            .removeClass("fa-plus-square-o");
        }
      });
    },

    accordionPortFeature: function() {
      $(".accordion-port-feature .panel-heading").on("click", function() {
        $(".accordion-port-feature .panel-heading .icon-accordion i")
          .addClass("fa-angle-right")
          .removeClass("fa-angle-down");
        if (
          !$(this)
          .parents(".panel")
          .find(".panel-collapse")
          .hasClass("in")
        ) {
          $(this)
            .find(".icon-accordion i")
            .addClass("fa-angle-down")
            .removeClass("fa-angle-right");
        }
      });
    },

    datepicker: function() {
      if ($("#dtpicker-from").length || $("#dtpicker-to").length) {
        $("#dtpicker-from").datetimepicker({
          format: "DD/MM/YYYY",
          ignoreReadonly: true
        });
        $("#dtpicker-to").datetimepicker({
          useCurrent: false, //Important! See issue #1075
          format: "DD/MM/YYYY",
          ignoreReadonly: true
        });
        $("#dtpicker-from").on("dp.change", function(e) {
          var today = new Date();
          $("#dtpicker-from")
            .data("DateTimePicker")
            .maxDate(today);
          $("#dtpicker-to")
            .data("DateTimePicker")
            .maxDate(today);
          $("#dtpicker-to")
            .data("DateTimePicker")
            .minDate(e.date);
        });
        $("#dtpicker-to").on("dp.change", function(e) {
          $("#dtpicker-from")
            .data("DateTimePicker")
            .maxDate(e.date);
        });
      }
    },

    dockContact: function() {
      $(window).scroll(function(e) {
        var heroPosition; //navigation height
        heroPosition = $(".hero-banner").height();
        if ($(document).scrollTop() > heroPosition) {
          $(".block-contact-us").addClass("docked");
        } else {
          $(".block-contact-us").removeClass("docked");
        }
      });
    },

    dockSteelContact: function() {
      $(window).scroll(function(e) {
        var heroPosition; //navigation height
        heroPosition = $(".hero-steel").height();
        if ($(document).scrollTop() > heroPosition) {
          $(".block-contact-us").addClass("docked");
        } else {
          $(".block-contact-us").removeClass("docked");
        }
      });
    },

    preventSoftkeyboard: function() {
      // if mobile
      if (detectmob()) {
        $(".nokeyboard").attr("readonly", "readonly");
      }
    }
  };
  // Detect Mobile
  function detectmob() {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      return true;
    } else {
      return false;
    }
  }

  //	Generic FAQs Accordion
  function toggleChevron(e) {
    $(e.target)
      .prev(".accordion-faq .panel-heading")
      .find("i.indicator")
      .toggleClass("fa-arrow-down fa-arrow-up");
  }

  $(document).ready(function() {

    var procnt = $('.programs-box .conter').height();
    $('.programs-box .conter .tog_cont').height(procnt + 2);

    $('.hero-banner-carousel').owlCarousel({
      margin: 0,
      loop: false,
      nav: false,
      dots: true,
      items: 1,
      autoWidth: false,
      rewind: false
    });

    // for contact us page
    $(".radio_list li.radioBtn").fancyRadio();
    $(".radio_list li.radioBtn").on("click", function() {
      var pos = $(".hero-banner").height();
      $("html,body").animate({
          scrollTop: pos
        },
        1000
      );
    });
    $(".drop-down-radio-list").change(function() {
      var pos = $(".hero-banner").height();
      $("html,body").animate({
          scrollTop: pos
        },
        1000
      );
    });
    // for contact us page  end
    jsw.init();
    $('[data-toggle="tooltip"]').tooltip();
  });

  $(window).load(function() {
    "use strict";
    //------------------------------------------------------------------------
    //						MASONRY SETTINGS
    //------------------------------------------------------------------------
    if ($(".wall-grid").length) {
      $(".wall-grid").masonry({
        itemSelector: ".box",
        isFitWidth: true,
        columnWidth: 1,
        isAnimated: true
      });


      var $grid = $(".col-4-grid").imagesLoaded(function() {
        $grid.masonry({
          itemSelector: ".col-4-item",
          percentPosition: true,
          columnWidth: ".col-4-sizer"
        });
      });

      if ($(document).width() < 640) {
        $(".citizen-profit .wall-grid img").each(function() {
          var widthSize = parseInt($(this).width() / 1.1);
          var heightSize = parseInt($(this).height() / 1.1);
          $(this).attr("width", widthSize);
          $(this).attr("height", heightSize);
        });
        $(".wall-grid").masonry({
          itemSelector: ".box",
          isFitWidth: true,
          columnWidth: 1,
          isAnimated: true
        });
      }

      if ($(document).width() < 640) {
        $(".insta-block .wall-grid img").each(function() {
          var widthSize = parseInt($(this).width());
          var heightSize = parseInt($(this).height());
          $(this).attr("width", widthSize);
          $(this).attr("height", heightSize);
        });
        $(".wall-grid").masonry({
          itemSelector: ".box",
          isFitWidth: true,
          columnWidth: 1,
          isAnimated: true
        });
      }

      if ($(document).width() < 1024) {
        $(".wall-grid img").each(function() {
          var widthSize = parseInt($(this).width() / 1.6);
          var heightSize = parseInt($(this).height() / 1.6);
          $(this).attr("width", widthSize);
          $(this).attr("height", heightSize);
        });
        $(".wall-grid").masonry({
          itemSelector: ".box",
          isFitWidth: true,
          columnWidth: 1,
          isAnimated: true
        });
      }
    }

    // $("#bloglist").append(data).masonry('reload');
    // $(".wallgrid").masonry('reload');
    // $(".wallgrid").masonry('reloadItems');
    // $(".wallgrid").masonry('layout');

    //------------------------------------------------------------------------
    //						MASONRY SETTINGS
    //------------------------------------------------------------------------

    $(".milestones-slider .owl-carousel").owlCarousel({
      //loop: true,
      //margin: 13,
      items: 5,
      dots: false,
      nav: true,
      responsiveClass: true,
      scrolling: "no",
      responsive: {
        0: {
          items: 1,
          nav: false
        },
        640: {
          items: 3
        },
        1024: {
          items: 5
        }
      },
      navText: [
        "<i class='fa fa-arrow-left'></i>",
        "<i class='fa fa-arrow-right'></i>"
      ]
    });
    $(".accordion-faq").on("hidden.bs.collapse", toggleChevron);
    $(".accordion-faq").on("shown.bs.collapse", toggleChevron);
  });

  // for contact us page
  $.fn.fancyRadio = function() {
    this.click(function() {
      $(this)
        .parents(".radio_list")
        .find(".radioBtn")
        .removeClass("checked");
      $(this).addClass("checked");
      $("input:radio").attr("checked", false);
      $("input:radio", this).attr("checked", true);
      var el = $(this);
    });
  };
  // for contact us page end

  $(document).on("mouseleave", ".dropdown", function() {
    $(".dropdown").tooltip("hide");
  });

  $(document).on("mouseenter", ".dropdown", function() {
    var myval = $(this).find(".link");
    var dropdownMenuwidth = $(this)
      .find(".dropdown-menu")
      .width();
    var rightDistance = $(window).width() - (myval.offset().left + myval.width());
    var leftDistance = myval.offset().left + myval.outerWidth();
    var leftMargin = leftDistance - parseInt(20);

    if ($(window).width() < 1170 && $(window).width() > 767) {
      if (rightDistance < 350) {
        $(this)
          .closest(".milestones-point")
          .find(".tooltip")
          .addClass("overflowing");
        $(this)
          .find(".dropdown-menu")
          .addClass("overflowing");
      }
    } else if ($(window).width() < 640) {
      $(this)
        .closest(".milestones-point")
        .find(".tooltip")
        .addClass("overflowing");
      $(this)
        .find(".dropdown-menu")
        .css("margin-left", -Math.abs(leftMargin));
    } else {
      if (rightDistance < 434) {
        $(this)
          .closest(".milestones-point")
          .find(".tooltip")
          .addClass("overflowing");
        $(this)
          .find(".dropdown-menu")
          .addClass("overflowing");
      }
      if (rightDistance < 590) {
        $(this)
          .find(".dropdown-menu")
          .addClass("overflowing");
      }
    }
  });

  $(function() {
    if ($(".star-ratings").length) {
      $(".star-ratings").barrating({
        theme: "fontawesome-stars"
      });
    }
  });

  $(document).ready(function() {
    $("input[name$='ratings']").click(function() {
      var radioBox = $(this).val();

      $("div.descRating").hide();
      $("#ratingContainer" + radioBox).show();
    });

    $(".steel-products .owl-carousel").owlCarousel({
      items: 5,
      dots: true,
      nav: false,
      responsiveClass: true,
      scrolling: "no",
      responsive: {
        0: {
          items: 1
        },
        640: {
          items: 2
        },
        1024: {
          items: 3
        }
      }
    });

    //new homepage carousel start
    /*$('.banner-carousel').owlCarousel({
          loop:true,
          margin:10,
          nav:true,
          responsive:{
              0:{
                  items:1
              },
              600:{
                  items:3
              },
              1000:{
                  items:5
              }
          }
      });*/
    //new homepage carousel end
  });

  $(function() {
    $("#ratingStep1 a.btn-cust-white").click(function() {
      $("#ratingStep2").show();
      $("#ratingStep1").hide();
    });

    $("#ratingStep2 a.btn-cust-white").click(function() {
      $("#ratingStep3").show();
      $("#ratingStep2").hide();
    });
  });

  $("#menu-navigation a").click(function(e) {
    e.preventDefault();
    var tabId = $(this).attr("href");
    $("html, body").animate({
        scrollTop: $(tabId).offset().top - 80
      },
      1000,
      "linear"
    );
  });

  // for story Animation 14/07/2017
  if ($(".js-tilt").length) {
    $(".js-tilt").tilt({
      glare: true,
      maxGlare: 0.5
    });
  }

  $(".link-cert a").click(function() {
    $(this)
      .parent()
      .next()
      .slideToggle();
    $(this).toggleClass("active");
    // $(this).toggle();
  });

  function goToByScroll(id) {
    var off = $(id).offset().top - 50;
    $("html,body").animate({
        scrollTop: off
      },
      "slow"
    );
  }

  $(".hero-list li a").click(function(e) {
    e.preventDefault();
    var href = $(this).attr("href");
    goToByScroll(href);
  });

  if ($(".counter").length) {
    $(".counter").countUp();
  }

  $('.pr-carousel').owlCarousel({
    margin: 32,
    loop: false,
    dots: true,
    items: 1,
    autoWidth: false,
    rewind: false,
    nav: true,
    navText: [
      '<img src="/sites/all/themes/jsw_theme/images/arrow-right.png" aria-hidden="true">',
      '<img src="/sites/all/themes/jsw_theme/images/arrow-left.png" aria-hidden="true">'
    ],
    navContainer: ".main-content .custom-nav"
  });


  $('.select-style a').click(function() {
    $('#lookingforpage').text($(this).text());

  });

  //
  //$('.team-carousel').owlCarousel({
  //    loop: false,
  //    margin: 13,
  //    items: 4,
  //    dots: false,
  //    nav: true,
  //    responsiveClass: true,
  //    scrolling: "no",
  //    responsive:{
  //        0:{
  //            items:1
  //        },
  //        600:{
  //            items:3
  //        },
  //        1000:{
  //            items:4
  //        }
  //    },
  //    navText: [
  //        "<i class='fa fa-arrow-left'></i>",
  //        "<i class='fa fa-arrow-right'></i>"
  //      ]
  //});


  //
  $(".team-carousel").owlCarousel({
    loop: false,
    margin: 13,
    items: 3,
    dots: false,
    nav: true,
    responsiveClass: true,
    scrolling: "no",
    responsive: {
      0: {
        items: 2,
        margin: 5,
        dots: true,
        nav: false
      },
      768: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    navText: [
      "<i class='fa fa-arrow-left'></i>",
      "<i class='fa fa-arrow-right'></i>"
    ]
  });


  //impacting world carousel start

  /*$(".impacting-world-outer-paggination .item").click(function() {
    if (window.screen.width > 1199) {
      $(this)
        .parent()
        .siblings()
        .removeClass("activeSlide")
        .end()
        .addClass("activeSlide");
    } else {
      $(this)
        .addClass("activeSlide")
        .siblings()
        .removeClass("activeSlide");
    }
  });

  if ($(".siema").length) {
    const mySiema = new Siema({
      selector: '.siema',
    });

  $(".impacting-world-outer-paggination")
    .find(".item")
    .each(function(i, e) {
      $(this).click(function() {
        mySiema.goTo(i);
      });
    });
  }*/

  /*class SiemaWithDots extends Siema {
    addDots() {
      // create a contnier for all dots
      // add a class 'dots' for styling reason
      this.dots = document.createElement("div");
      this.dots.classList.add("dots");
      ///////////////////
      this.innerPaggingDiv = document.createElement("div");
      this.innerPaggingDiv.classList.add("sideBtnbox");
      ///////////////////
      // loop through slides to create a number of dots
      for (let i = 0; i < this.innerElements.length; i++) {

        // create a dot
        const dot = document.createElement("button");
        const innerPagging = document.createElement("div");
        innerPagging.classList.add("box");
        const innerPagging_img = document.createElement("img");
        innerPagging_img.src = this.innerElements[i].getAttribute(
          "data-thumb-img"
        );
        innerPagging.appendChild(innerPagging_img);
        const innerPagging_span = document.createElement("span");
        var innerPagging_txt = document.createTextNode(
          this.innerElements[i].getAttribute("data-thumb-text")
        );
        innerPagging_span.appendChild(innerPagging_txt);
        innerPagging.appendChild(innerPagging_span);

        // add a class to dot
        dot.classList.add("dots__item");

        // add an event handler to each of them
        dot.addEventListener("click", () => {
          this.goTo(i);
        });
        innerPagging.addEventListener("click", () => {
          this.goTo(i);
        });

        // append dot to a container for all of them
        this.dots.appendChild(dot);
        this.innerPaggingDiv.appendChild(innerPagging);

      }

      // add the container full of dots after selector
      this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
      this.selector.parentNode.insertBefore(
        this.innerPaggingDiv,
        this.selector.nextSibling
      );
    }

    updateDots() {
      // loop through all dots
      for (let i = 0; i < this.dots.querySelectorAll("button").length; i++) {
        // if current dot matches currentSlide prop, add a class to it, remove otherwise
        const addOrRemove = this.currentSlide === i ? "add" : "remove";
        this.dots
          .querySelectorAll("button")
          [i].classList[addOrRemove]("dots__item--active");
        this.innerPaggingDiv.querySelectorAll(".box")
        [i].classList[addOrRemove]("active");
      }
    }
  }*/
  "use strict";

  function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
      return !!right[Symbol.hasInstance](left);
    } else {
      return left instanceof right;
    }
  }

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof(obj) {
        return typeof obj;
      };
    } else {
      _typeof = function _typeof(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }
    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
      return call;
    }
    return _assertThisInitialized(self);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return self;
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
    return _setPrototypeOf(o, p);
  }

  if ($('.impactingWorld').length) {
    var SiemaWithDots =
      /*#__PURE__*/
      function(_Siema) {
        _inherits(SiemaWithDots, _Siema);

        function SiemaWithDots() {
          _classCallCheck(this, SiemaWithDots);

          return _possibleConstructorReturn(this, _getPrototypeOf(SiemaWithDots).apply(this, arguments));
        }

        _createClass(SiemaWithDots, [{
          key: "addDots",
          value: function addDots() {
            var _this = this;

            // create a contnier for all dots
            // add a class 'dots' for styling reason
            this.dots = document.createElement("div");
            this.dots.classList.add("dots"); ///////////////////

            this.innerPaggingDiv = document.createElement("div");
            this.innerPaggingDiv.classList.add("sideBtnbox"); ///////////////////
            // loop through slides to create a number of dots

            var _loop = function _loop(i) {
              // create a dot
              var dot = document.createElement("button");
              var innerPagging = document.createElement("div");
              innerPagging.classList.add("box");
              var innerPagging_img = document.createElement("img");
              innerPagging_img.src = _this.innerElements[i].getAttribute("data-thumb-img");
              innerPagging.appendChild(innerPagging_img);
              var innerPagging_span = document.createElement("span");
              innerPagging_txt = document.createTextNode(_this.innerElements[i].getAttribute("data-thumb-text"));
              innerPagging_span.appendChild(innerPagging_txt);
              innerPagging.appendChild(innerPagging_span);
              // add a class to dot

              dot.classList.add("dots__item"); // add an event handler to each of them

              dot.addEventListener("click", function() {
                _this.goTo(i);
              });
              innerPagging.addEventListener("click", function() {
                _this.goTo(i);
              }); // append dot to a container for all of them

              _this.dots.appendChild(dot);

              _this.innerPaggingDiv.appendChild(innerPagging);
            };

            for (var i = 0; i < this.innerElements.length; i++) {
              var innerPagging_txt;

              _loop(i);
            } // add the container full of dots after selector


            this.selector.parentNode.insertBefore(this.dots, this.selector.nextSibling);
            this.selector.parentNode.insertBefore(this.innerPaggingDiv, this.selector.nextSibling);
          }
        }, {
          key: "updateDots",
          value: function updateDots() {
            // loop through all dots
            for (var i = 0; i < this.dots.querySelectorAll("button").length; i++) {
              // if current dot matches currentSlide prop, add a class to it, remove otherwise
              var addOrRemove = this.currentSlide === i ? "add" : "remove";
              this.dots.querySelectorAll("button")[i].classList[addOrRemove]("dots__item--active");
              this.innerPaggingDiv.querySelectorAll(".box")[i].classList[addOrRemove]("active");
            }
          }
        }]);

        return SiemaWithDots;
      }(Siema);
    // instantiate new extended Siema
    var innerCarouselArr = [];
    $(".impactingWorld")
      .find(".inner-carousel")
      .each(function(i, e) {

        var innerCarouselNum = i + 1;
        innerCarouselArr[i] = new SiemaWithDots({
          selector: ".inner-carousel" + innerCarouselNum,
          perPage: 1,
          // on init trigger method created above
          onInit: function() {
            this.addDots();
            this.updateDots();
          },

          // on change trigger method created above
          onChange: function() {
            this.updateDots();
          }
        });
      });
  }

  function impacting_world_outer_pagg_func() {
    if (window.screen.width > 1199) {
      var owl = $(".impacting-world-outer-paggination");
      owl.on('initialized.owl.carousel', function(event) {
        addClassOnFirst();
      });

      function addClassOnFirst() {
        owl.find('.owl-item').eq(0).addClass('activeSlide');
        var currentWidth = owl.find('.owl-stage').width();
        owl.find('.owl-stage').width(currentWidth + 5);
      }
      owl.owlCarousel({
        margin: 32,
        loop: false,
        dots: false,
        items: 4,
        autoWidth: false,
        rewind: false,
        nav: true,
        navText: [
          '<img src="/sites/all/themes/jsw_theme/images/arrow-right.png" aria-hidden="true">',
          '<img src="/sites/all/themes/jsw_theme/images/arrow-left.png" aria-hidden="true">'
        ],
        navContainer: ".main-content .custom-nav"
      });

    } else {
      var owl = $(".impacting-world-outer-paggination");
      owl.trigger("destroy.owl.carousel");
      owl.addClass("off").removeClass("owl-carousel owl-theme");
      $(".impacting-world-outer-paggination .item").eq(0).addClass('activeSlide');
    }
  }
  impacting_world_outer_pagg_func();
  $(window).resize(function() {
    impacting_world_outer_pagg_func();
  });

  //impacting world carousel end
/* if($('body').hasClass('page-node-1554')){
  
  var hash = $(location).prop('hash');
  console.log(hash);
if (hash !== "")
{
    
    console.log('test drupal dv2')
   
    $('[href="'+hash+'"]').trigger('click');
    $('.tab-content .tab-pane').removeClass('active')
    $('.tab-content .tab-pane').removeClass('in')
    $(hash).addClass('active')
    $(hash).addClass('in')
}



} */

}(jQuery);

;/*})'"*/
;/*})'"*/
(function(a){a(document).ready(function(){function e(e,n){e.each(function(){var e=a(this),i=e.attr("data-os-animation"),t=e.attr("data-os-animation-delay");e.css({"-webkit-animation-delay":t,"-moz-animation-delay":t,"animation-delay":t});var s=(n)?n:e;s.waypoint(function(){e.addClass("animated").addClass(i)},{triggerOnce:!0,offset:"90%"})})};e(a(".os-animation"));e(a(".staggered-animation"),a(".staggered-animation-container"));a(".btn-bars").click(function(){a("body").toggleClass("ohidden")});a(".stories-carousel").owlCarousel({items:1,dots:!1,nav:!0,responsiveClass:!0,navText:["<span class='prev'>Prev</span>","<span class='next'>Next</span>"]});a(".trending-carousel").owlCarousel({loop:!1,margin:50,items:3,dots:!0,nav:!1,stagePadding:100,responsive:{0:{items:1,stagePadding:0},768:{items:2,stagePadding:0,margin:30,},1000:{items:2,stagePadding:0,},1200:{items:2,stagePadding:80,},}});var i=a(".key-products-carousel");i.owlCarousel({items:1,dots:!1,nav:!0,responsiveClass:!0,autoplayHoverPause:!0,autoplaySpeed:1500,smartSpeed:1500,navText:["<span class='prev'>Prev</span>","<span class='next'>Next</span>"],onInitialized:n,onTranslated:n});function n(e){var s=e.target,t=e.item.count,n=e.item.index+1;if(n>t){n=n-t};a("#counterKye").html(+n+" / "+t)};var s=a(".project-carousel");s.owlCarousel({items:1,dots:!0,nav:!0,autoplaySpeed:1500,smartSpeed:1500,margin:140,stagePadding:290,loop:!1,responsive:{0:{stagePadding:40,margin:25,},768:{stagePadding:120,margin:80,},1000:{},},navText:["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],onInitialized:t,onTranslated:t});function t(e){var s=e.target,t=e.item.count,n=e.item.index+1;if(n>t){n=n-t};a("#counterProject").html("<span>"+n+"</span> / "+t)};a(".leader-card").click(function(){a(".leader-details").hide();a(this).find(".leader-details").fadeIn()});a(".ld-close").click(function(){a(".leader-details").fadeOut();return!1});a(".download-section .show-more").click(function(){a(".download-list li").removeClass("hide");a(this).hide();return!1})})})(jQuery);;/*})'"*/
jQuery(document).ready(function () {
	jQuery(".page-search").find('.search-form').addClass('container');
	jQuery(".page-search").find('#edit-keys').hide();
	var search_term = jQuery(".page-search").find('#edit-keys').val();
	jQuery(".page-search").find('#edit-keys').after('<input type="text" class="form-control form-text" name="keys" value="'+search_term+'" autocomplete="off">');
	if(jQuery('.hero-banner').find('.breadcrumbs').html() == '') {
		jQuery('.hero-banner').find('.breadcrumbs').hide();
	}
	if (jQuery(".counter").length) {
		jQuery(".counter").countUp();
	}
});
;/*})'"*/
;/*})'"*/
