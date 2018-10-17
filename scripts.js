function Animations(){}function loadJSON(e,t){var n=new XMLHttpRequest;n.overrideMimeType("application/json"),n.open("GET",e,!0),n.onreadystatechange=function(){4==n.readyState&&"200"==n.status&&t(JSON.parse(n.responseText))},n.send(null)}function onYouTubeIframeAPIReady(){YouTubeManager.apiready=!0,YouTubeManager.initialized&&YouTubeManager.sealed&&YouTubeManager.createPlayers()}function YouTubeAPIManager(){}String.prototype.hashCode=function(){var e,t=0;if(0===this.length)return t;for(e=0;e<this.length;e++)t=(t<<5)-t+this.charCodeAt(e),t|=0;return t},Animations.prototype={triggers:[],constructor:Animations,applyLiveCSSAnimations:function(){for(var u=this,e=document.getElementsByTagName("*"),t=e.length;t--;){var n=e[t],a=window.getComputedStyle(n);if(b=a.getPropertyValue("--anim-play")){for(var i=a.getPropertyValue("--anim-init"),o=a.getPropertyValue("--anim-class"),r=a.getPropertyValue("--anim-trigger"),s=a.getPropertyValue("--anim-edge"),l=a.getPropertyValue("--anim-delay-min"),d=a.getPropertyValue("--anim-delay-max"),c=!1,g=0;g<u.triggers.length;g++){if((_=u.triggers[g]).target.contains(n)&&_.anim_play===b&&_.anim_init===i&&_.anim_class===o&&_.anim_trigger===r&&_.anim_edge===s&&_.anim_delay_min===l&&_.anim_delay_max===d){c=!0;break}if(n.contains(_.target)&&_.anim_play===b&&_.anim_init===i&&_.anim_class===o&&_.anim_trigger===r&&_.anim_edge===s&&_.anim_delay_min===l&&_.anim_delay_max===d){u.triggers.splice(g,1);break}}c||u.triggers.push({target:n,anim_play:b,anim_init:i,anim_class:o,anim_trigger:r,anim_edge:s,anim_delay_min:l,anim_delay_max:d})}}function m(){for(var e=[],t=0;t<u.triggers.length;t++){var n=u.triggers[t],a=n.target,i=n.anim_trigger,o=n.anim_init,r=n.anim_class,s=n.anim_play,l=n.anim_edge;isInViewport(i,l)?(o&&a.classList.remove(o),r?a.classList.add(r):a.style.setProperty("animation-name",s)):e.push(n)}u.triggers=e}for(t=0;t<u.triggers.length;t++){var _,h=(_=u.triggers[t]).target,b=_.anim_play;i=_.anim_init,o=_.anim_class,r=_.anim_trigger,s=_.anim_edge,l=_.anim_delay_min,d=_.anim_delay_max;i&&h.classList.add(i),l&&d&&(l=parseFloat(l),d=parseFloat(d),h.style.setProperty("animation-delay",l+(d-l)*Math.random()+"s")),_.anim_trigger=r="self"===r?h:document.getElementById(r),_.anim_edge=s=s?parseFloat(s):0}m(),window.addEventListener("resize",m),window.addEventListener("scroll",m),this.applyLiveCSSAnimations=null},isInViewport:function(e,t){var n=window.innerHeight,a=e.getBoundingClientRect(),i=n*Math.min(t,.4),o=a.top-i,r=a.bottom-i;return!((n-=2*i)<o||r<0)}},YouTubeAPIManager.prototype={constructor:YouTubeAPIManager,initialized:!1,sealed:!1,apiready:!1,queue:[],players:[],init:function(){if(0==this.initialized){this.initialized=!0;var e=document.createElement("script");e.id="iframe-api",e.src="https://www.youtube.com/iframe_api";var t=document.getElementsByTagName("script")[0];t.parentNode.insertBefore(e,t)}},addPlayer:function(e){this.queue.push(e)},createPlayers:function(){var a=this;if(a.sealed=!0,a.initialized&&a.apiready){!function t(){if(0<a.queue.length){var e=a.queue.shift(),n=new YT.Player(e.id,e.params);a.players.push(n),n.addEventListener("onStateChange",function(e){e.data===YT.PlayerState.PLAYING&&(e.target.removeEventListener(e.type,arguments.callee),setTimeout(t,1e3))})}}()}}};var YouTubeManager=new YouTubeAPIManager;function Gallery(a,t,e){var o=this;YouTubeManager.init();var n=document.querySelector("#description-block");function i(){var e=document.querySelectorAll(".gallery-block");if(e)for(var t=0;t<e.length;t++){var n=e[t];0==n.classList.contains("button-hover")&&(n.classList.add("button-hover"),n.classList.add("hidden"),n.setAttribute("button-target","<this> #description-block"),n.setAttribute("button-clear",".gallery-block"),n.addEventListener("onvisible",function(e){var t,n=null,a=e.target.id;if((t=o.json.images[a])?n=t.description:(t=o.json.videos[a])&&(n=t.description),n)if(n=o.json.descriptions[n]){if(o.desc_header.innerHTML=n.name+"<br> ("+n.year+")",o.desc_oneliner.innerHTML=n.oneliner,o.desc_tags.innerHTML="",n.tags)for(var i=0;i<n.tags.length;i++)0<i&&(o.desc_tags.innerHTML+=" - "),o.desc_tags.innerHTML+=n.tags[i]}else o.desc_header.innerHTML="",o.desc_oneliner.innerHTML="",o.desc_tags.innerHTML=""}),n.___callback_open_lightbox=function(e){"gallery-images"===e.target.parentNode.id?o.manager_images.showLightbox(e.target.querySelector("img")):e.target.parentNode.id})}a.updateButtons()}o.desc_header=n.querySelector("h1"),o.desc_oneliner=n.querySelector("p"),o.desc_tags=n.querySelector("h3"),loadJSON(e,function(e){o.json=e,o.manager_videos=new GalleryVideos(document.getElementById("gallery-videos"),e,t,0),o.manager_images=new GalleryImages(document.getElementById("gallery-images"),e,function(){i()}),i()})}function GalleryVideos(e,t,l,u){this.container=e,YouTubeManager.init();var n=-1;for(var a in t.videos)if(n++,t.videos.hasOwnProperty(a)){var i=t.videos[a],o=document.createElement("div"),r=document.createElement("div"),s=document.createElement("div"),d=document.createElement("img"),c=document.createElement("div"),g=document.createElement("img");c.setAttribute("index",n),o.id=a,r.id="YouTube-"+a,o.className="video-wrapper gallery-block",r.className="youtube-player",s.className="video-cover visible",c.className="video-progressbar",d.src=t.filebase_covers+i.cover,g.src=t.filebase_covers+i.cover,s.appendChild(d),s.appendChild(c),c.appendChild(g),o.appendChild(s),o.appendChild(r),this.container.appendChild(o),g.addEventListener("load",function(e){var t=e.target.parentNode,n=parseFloat(t.getAttribute("index"));t.style.width="98%",t.style.transitionDelay=(1+Math.random())*n+"s",t.style.transitionDuration=20+10*Math.random()+"s"}),YouTubeManager.addPlayer({id:r.id,params:{width:640,height:360,videoId:a,playerVars:{enablejsapi:1,loop:1,start:i.start,playlist:a,autoplay:1,controls:0,showinfo:0,fs:0,rel:0,disablekb:1,modestbranding:1,playsinline:1},events:{onReady:function(e){var n=e.target,t=n.getIframe(),a=t.parentNode.querySelector(".video-cover"),i=t.parentNode.querySelector(".video-progressbar");function o(e){l.isInViewport(e.getIframe().parentNode,u)&&e.playVideo()}function r(){a.classList.contains("hidden")&&(l.isInViewport(t.parentNode,u)?(void 0===n.timer&&(n.timer=null),null!=n.timer&&clearTimeout(n.timer),n.timer=setTimeout(function(){o(n)},500)):n.pauseVideo())}function s(){if(!0===a.classList.contains("visible")){function t(){a.classList.add("hidden")}i.style.width="100%",i.style.transitionDuration="0.5s",a.classList.remove("visible"),n&&n.pauseVideo(),i.addEventListener("transitionend",function(e){e.target.removeEventListener(e.type,arguments.callee),o(n),setTimeout(t,100)})}}n.mute(),n.setPlaybackQuality("small"),setTimeout(function(){n.playVideo()},100),window.addEventListener("resize",r),window.addEventListener("scroll",r),n.addEventListener("onStateChange",function(e){e.data===YT.PlayerState.PLAYING&&(e.target.removeEventListener(e.type,arguments.callee),s())})},onStateChange:function(e){e.target.getIframe();switch(e.data){case YT.PlayerState.BUFFERING:case YT.PlayerState.PLAYING:}},onError:function(e){switch(e.data){case 2:console.log("YouTube API error 2");break;case 5:console.log("YouTube API error 5");break;case 100:console.log("YouTube API error 100");break;case 101:console.log("YouTube API error 101");break;case 150:console.log("YouTube API error 150")}}}}})}YouTubeManager.createPlayers()}function GalleryImages(e,l,u){var d=this;for(var t in d.container=e,d.lightbox=e.querySelector("#lightbox"),d.lightbox_img=e.querySelector("#lightbox-image"),d.lightbox_visible=!1,d.lightbox.onclick=function(e){d.hideLightbox()},d.hideLightbox(),d.layout=new Masonry("#gallery-images",{itemSelector:".gallery-block",columnWidth:".gallery-block",percentPosition:!0,transitionDuration:0,stagger:0,resize:!0}),d.loadstack=[],l.images)l.images.hasOwnProperty(t)&&d.loadstack.push({id:t,data:l.images[t]});!function e(t){if(t<d.loadstack.length){var n=d.loadstack[t].id,a=l.filebase_images+n,i=a.split(".").slice(0,-1).join("."),o=a.substring(i.length,a.length),r=i+"_tumbnail"+o,s=a;d.addImage(n,r,s,function(){u(),e(++t)})}}(0)}function UI(){var t=this;t.ui=document.getElementById("ui"),t.body=document.getElementsByTagName("BODY")[0],window.addEventListener("touchstart",function e(){t.touch=!0,t.updateButtons(),window.removeEventListener("touchstart",e,!1)},!1),t.updateButtons();var e=t.ui.querySelector("#contact-button"),n=t.ui.querySelector("#contact-email"),a="szontagh";e.href="mailto:andrej."+a+"@gmail.com",n.innerHTML="andrej​.​"+a+" ​@ ​gmail​.​com";var i=document.getElementById("overlay");i.addEventListener("onvisible",function(e){t.ui.classList.add("overlay"),t.body.classList.add("noscroll")},!1),i.addEventListener("onhidden",function(e){t.ui.classList.remove("overlay"),t.body.classList.remove("noscroll")},!1)}Gallery.prototype={constructor:Gallery,manager_videos:null,manager_images:null,desc_header:null,desc_oneliner:null,desc_tags:null,showLightbox:function(e){},hideLightbox:function(){}},GalleryVideos.prototype={constructor:GalleryVideos},GalleryImages.prototype={constructor:GalleryImages,loadstack:[],addImage:function(t,n,a,i){var o=this,r=document.createElement("div"),s=document.createElement("img");r.id=t,r.className="gallery-block",s.setAttribute("src",n),s.setAttribute("src-lightbox",a),r.appendChild(s),o.container.appendChild(r),s.addEventListener("load",function(e){o.layout.appended(e.target.parentNode),o.layout.layout(),i()}),s.addEventListener("error",function(){e.target.remove(),o.layout.layout(),i()})},showLightbox:function(e){this.lightbox.classList.remove("lightbox-hidden"),this.lightbox.classList.add("lightbox-visible"),this.lightbox_img.setAttribute("src",e.getAttribute("src")),this.lightbox_img.setAttribute("src-lazy",e.getAttribute("src-lightbox")),this.lightbox_img.onload=function(e){var t=e.target;t.src=t.getAttribute("src-lazy")},this.lightbox_visible=!0},hideLightbox:function(){this.lightbox.classList.remove("lightbox-visible"),this.lightbox.classList.add("lightbox-hidden"),this.lightbox_visible=!1}},UI.prototype={constructor:UI,touch:!1,body:null,ui:null,parseButtonStateRef:function(e){var t={value:null,value_ext:null,value_readonly:!1},n=e.getAttribute("button-state");return n&&((n=n.trim())&&0<n.length&&"["===n.charAt(0)&&"]"===n.charAt(n.length-1)&&(n=n.substring(1,n.length-1),t.value_readonly=!0),"on"===n&&(t.value="on"),"off"!==n&&""!==n||(t.value="off"),n&&0<n.length&&"{"===n.charAt(0)&&"}"===n.charAt(n.length-1)&&(n=n.substring(1,n.length-1),t.value_ext=n)),t},setButtonState:function(e,t,n){n=void 0===n||n;var a=this;if(e.classList.contains("button-hover")||e.classList.contains("button-press")){if(a.parseButtonStateRef(e).value_readonly||e.setAttribute("button-state",t),!0===n){var i=e.getAttribute("button-clear");if(null!==i)for(var o=a.body.querySelectorAll(i),r=0;r<o.length;r++)o[r]!==e&&"on"===a.getButtonState(o[r])&&a.setButtonState(o[r],"off",!1)}if("on"===t){if(!0===n)if(null!==(s=e.getAttribute("button-set-on")))for(o=a.body.querySelectorAll(s),r=0;r<o.length;r++)o[r]!==e&&a.setButtonState(o[r],t,!1);a.showButtonTargets(e,"button-target",!0)}if("off"===t){var s;if(!0===n)if(null!==(s=e.getAttribute("button-set-off")))for(o=a.body.querySelectorAll(s),r=0;r<o.length;r++)o[r]!==e&&a.setButtonState(o[r],t,!1);a.showButtonTargets(e,"button-target",!1)}}},getButtonState:function(e){var t=this.parseButtonStateRef(e);if("on"===t.value||"off"===t.value)return t.value;if(null!==t.value_ext){var n=this.body.querySelector(attr);if(n){var a=this.parseButtonStateRef(n);if("on"===a.value||"off"===a.value)return a.value}}return"off"},showButtonTargets:function(e,t,n){var a=e.getAttribute(t);if(a){var i=[],o=(a=a.trim()).indexOf("<this>");if(0<=o&&(a=(a=a.substr(0,o)+a.substr(o+"<this>".length)).trim(),i.push(e)),a){var r=this.body.querySelectorAll(a);r&&(i=i.concat(Array.prototype.slice.call(r)))}if(null!=i)for(var s=0;s<i.length;s++){var l=i[s];n?(l.classList.remove("hidden"),l.classList.add("visible"),l.dispatchEvent(new Event("onvisible"))):(l.classList.remove("visible"),l.classList.add("hidden"),l.dispatchEvent(new Event("onhidden")))}}},clearButtonEvents:function(e){e.removeEventListener("mouseenter",e.___button_listener_mouseenter),e.removeEventListener("mouseleave",e.___button_listener_mouseleave),e.removeEventListener("mousedown",e.___button_listener_mousedown),e.removeEventListener("mouseup",e.___button_listener_mouseup)},initButton:function(e){var a=this;a.clearButtonEvents(e),null===e.getAttribute("button-state")&&e.setAttribute("button-state","off"),!1===e.classList.contains("hidden")&&!1===e.classList.contains("visible")&&e.classList.add("visible"),e.classList.contains("button-hover")?(e.___button_listener_mouseleave=function(e){a.setButtonState(e.target,"off")},e.___button_listener_mouseenter=function(e){a.setButtonState(e.target,"on"),a.transformButtonByScrolls(e.target)},e.___button_listener_mousedown=function(e){e.target.___callback_open_lightbox&&e.target.___callback_open_lightbox(e)},e.addEventListener("mouseenter",e.___button_listener_mouseenter),e.addEventListener("mouseleave",e.___button_listener_mouseleave),e.addEventListener("mousedown",e.___button_listener_mousedown)):e.classList.contains("button-press")&&(e.___button_listener_mousedown=function(e){var t=e.target,n=a.getButtonState(t);"on"===n?a.setButtonState(t,"off"):"off"===n&&a.setButtonState(t,"on")},e.___button_listener_mouseup=function(e){var t=(new Date).getTime();if(e.target.___button_listener_mouseup_time){var n=t-e.target.___button_listener_mouseup_time;100<n&&n<500&&e.target.___callback_open_lightbox&&e.target.___callback_open_lightbox(e)}e.target.___button_listener_mouseup_time=t},e.addEventListener("mousedown",e.___button_listener_mousedown),e.addEventListener("mouseup",e.___button_listener_mouseup)),e.___callback_open_lightbox||(e.___callback_open_lightbox=function(e){})},transformButton:function(e){e.classList.contains("button-hover")&&(this.clearButtonEvents(e),e.classList.remove("button-hover"),e.classList.add("button-press"),this.initButton(e))},transformButtonByScrolls:function(e){if(e.classList.contains("button-hover")){var t=e.getAttribute("button-scroll");if(null!==t)for(var n=window.innerHeight,a=this.body.querySelectorAll(t),i=0;i<a.length;i++){var o=a[i].getBoundingClientRect();if(o.top+o.height>n){this.transformButton(e);break}}}},updateButtons:function(){for(var e=this.body.querySelectorAll(".button-hover, .button-press"),t=0;t<e.length;t++){var n=e[t];this.touch?this.transformButton(n):this.initButton(n)}}};var manager_ui=null,manager_animations=null,manager_gallery=null;window.onload=function(e){manager_ui=new UI,manager_animations=new Animations,manager_gallery=new Gallery(manager_ui,manager_animations,"data/gallery.json")};