
String.prototype.hashCode = function () {

    // https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript

    var hash = 0, i, chr;

    if (this.length === 0) return hash;

    for (i = 0; i < this.length; i++) {

        chr   = this.charCodeAt (i);
        hash  = ((hash << 5) - hash) + chr;

        // Convert to 32bit integer
        hash |= 0;
    }

    return hash;
};


function Animations () {
    
    // empty ..
}

Animations.prototype = {
    
    triggers: [],
    
    constructor: Animations,
        
    applyLiveCSSAnimations : function () {
        
        var t = this;
        
        // this is a nasty part that needs to be done once ..
        
        var items = document.getElementsByTagName ("*");
        
        // collect elements ..
        
        for (var i = items.length; i--;) {
            
            var el = items [i];
            
            var cs = window.getComputedStyle (el);
            
            var anim_play = cs.getPropertyValue ('--anim-play');
            
            if (anim_play) {
                
                // OPTIMIZE: we do this for every element that has the same animation, but we can process it once and reuse data !
                
                var anim_init       = cs.getPropertyValue ('--anim-init');
                var anim_class      = cs.getPropertyValue ('--anim-class');
                var anim_trigger    = cs.getPropertyValue ('--anim-trigger');
                var anim_edge       = cs.getPropertyValue ('--anim-edge');
                var anim_delay_min  = cs.getPropertyValue ('--anim-delay-min');
                var anim_delay_max  = cs.getPropertyValue ('--anim-delay-max');
                
                //console.log ("----------------------------------------------------------------------------------");
                //console.log ("element           : " + el.nodeName);
                //console.log ("element.id        : " + el.id);
                //console.log ("--anim-play       : " + anim_play);
                //console.log ("--anim-init       : " + anim_init);
                //console.log ("--anim-class      : " + anim_class);
                //console.log ("--anim-trigger    : " + anim_trigger);
                //console.log ("--anim-edge       : " + anim_edge);
                //console.log ("--anim-delay-min  : " + anim_delay_min);
                //console.log ("--anim-delay-max  : " + anim_delay_max);
                                    
                var skip = false;
                
                for (var j = 0; j < t.triggers.length; j ++) {
                    
                    var l = t.triggers [j];
                    
                    if (l ["target"]			.contains (el)		&&
                        l ["anim_play"] 		=== anim_play		&&
                        l ["anim_init"] 		=== anim_init		&&
                        l ["anim_class"] 		=== anim_class		&&
                        l ["anim_trigger"]		=== anim_trigger	&&
                        l ["anim_edge"] 		=== anim_edge		&&
                        l ["anim_delay_min"] 	=== anim_delay_min	&&
                        l ["anim_delay_max"] 	=== anim_delay_max
                    ) {
                        
                        skip = true; 
                        break;
                        
                    } else 
                    if (el.contains (l ["target"]) 					&& 
                        l ["anim_play"] 		=== anim_play		&&
                        l ["anim_init"] 		=== anim_init		&&
                        l ["anim_class"] 		=== anim_class		&&
                        l ["anim_trigger"]		=== anim_trigger	&&
                        l ["anim_edge"] 		=== anim_edge		&&
                        l ["anim_delay_min"] 	=== anim_delay_min	&&
                        l ["anim_delay_max"] 	=== anim_delay_max
                    ) {
                        
                        t.triggers.splice (j, 1);						
                        break;
                    }
                }
                
                if (!skip) {
                    
                    t.triggers.push ({
                        
                        "target" 			: el, 
                        "anim_play" 		: anim_play, 
                        "anim_init"			: anim_init, 
                        "anim_class" 		: anim_class, 
                        "anim_trigger"		: anim_trigger, 
                        "anim_edge" 		: anim_edge,
                        "anim_delay_min"	: anim_delay_min,
                        "anim_delay_max"	: anim_delay_max
                    });
                }
            }
        }
        
        //console.log ("t.triggers.length : " + t.triggers.length);
        
        function onScroll () {
            
            var triggers_new = [];
            
            for (var i = 0; i < t.triggers.length; i ++) {
                
                var l = t.triggers [i];

                var target 			= l ["target"];
                var anim_trigger	= l ["anim_trigger"];
                var anim_init 		= l ["anim_init"];
                var anim_class 		= l ["anim_class"];
                var anim_play 		= l ["anim_play"];
                var anim_edge 		= l ["anim_edge"];
                            
                //console.log ("onScroll >> trigger : " + trigger.id + " target : " + target.id + " anim_play : " + anim_play);
                
                if (isInViewport (anim_trigger, anim_edge)) {
                    
                    // remove init class from the element
                    if (anim_init) {
                        
                        target.classList.remove (anim_init);
                    }
                    
                    if (anim_class) {
                    
                        target.classList.add (anim_class);
                        
                        //console.log ("isInViewport >> trigger : " + trigger.id + " target : " + target.id + " anim_class : " + anim_class);
                        
                    } else {
                        
                        target.style.setProperty ("animation-name", anim_play);
                        
                        //console.log ("isInViewport >> trigger : " + trigger.id + " target : " + target.id + " anim_play : " + anim_play);
                    }
                    
                } else {
                    
                    // try next time
                    triggers_new.push (l);
                }
            }
            
            // remove triggered elements (one shot invocation)
            t.triggers = triggers_new;
        }

        // Initialize
        for (var i = 0; i < t.triggers.length; i ++) {
            
            var l = t.triggers [i];
            
            var target 			= l ["target"];
            var anim_play 		= l ["anim_play"];
            var anim_init 		= l ["anim_init"];
            var anim_class 		= l ["anim_class"];
            var anim_trigger	= l ["anim_trigger"];
            var anim_edge 		= l ["anim_edge"];
            var anim_delay_min 	= l ["anim_delay_min"];
            var anim_delay_max 	= l ["anim_delay_max"];
            
            //console.log ("----------------------------------------------------------------------------------");
            //console.log ("element           : " + el.nodeName);
            //console.log ("element.id        : " + el.id);
            //console.log ("--anim-play       : " + anim_play);
            //console.log ("--anim-init       : " + anim_init);
            //console.log ("--anim-class      : " + anim_class);
            //console.log ("--anim-trigger    : " + anim_trigger);
            //console.log ("--anim-edge       : " + anim_edge);
            //console.log ("--anim-delay-min  : " + anim_delay_min);
            //console.log ("--anim-delay-max  : " + anim_delay_max);
            
            // initialization (to avoid additional loops)
            
            if (anim_init) {

                target.classList.add (anim_init);
            }

            if (anim_delay_min && anim_delay_max) {
                
                anim_delay_min  = parseFloat (anim_delay_min);
                anim_delay_max  = parseFloat (anim_delay_max);
                
                target.style.setProperty ("animation-delay", (anim_delay_min + (anim_delay_max - anim_delay_min) * Math.random ()) + "s");
            }
            
            l ["anim_trigger"] 	= anim_trigger = (anim_trigger === "self") ? target : document.getElementById (anim_trigger);
            l ["anim_edge"] 	= anim_edge    = (anim_edge) ? parseFloat (anim_edge) : 0.0;
        }	
        
        // in the case object is already in the viewport
        onScroll ();
                
        window.addEventListener ("resize", onScroll);
        window.addEventListener ("scroll", onScroll);
        
        // to make sure that this is not called twice !
        this.applyLiveCSSAnimations = null;
    },
    
    isInViewport : function (element, edge) {

        var h = window.innerHeight;             	// viewport height
        var r = element.getBoundingClientRect ();   // elements bounding rect in viewport coordinates
        
        // console.log ("top    : " + r.top);
        // console.log ("bottom : " + r.bottom);
        // console.log ("height : " + h);
        
        // add extra margin to the viewport to ensure that 
        // big enough portion of the object is already visible
        
        var e = h * Math.min (edge, 0.4); // relative viewport factor, max 40%
                    
        var top     = r.top     - e;
        var bottom  = r.bottom  - e;
        
        h = h - e*2;
                    
        return (!((top > h) || (bottom < 0)));
    },
}


function loadJSON (filepath, callback) {

    var xobj = new XMLHttpRequest ();
    
    xobj.overrideMimeType ("application/json");
    
    // Replace 'appDataServices' with the path to your file
    xobj.open ('GET', filepath, true);
    
    xobj.onreadystatechange = function () {
        
        if (xobj.readyState == 4 && xobj.status == "200") {
              
            // Required use of an anonymous callback as .open will NOT return a value 
            // but simply returns undefined in asynchronous mode

            callback (JSON.parse (xobj.responseText));
        }
    };
    
    xobj.send (null);
}


// YouTube API ..

// we keep things global since that is how 
// the API works anyways (by calling 'onYouTubeIframeAPIReady')

var YouTubeAPIInitialized   = false;
var YouTubeAPIPlayersQueue  = [];
var YouTubeAPIPlayers       = [];

function YouTubeAPIAddPlayer (player_desc) {
    
    /*
    YouTubeAPIAddPlayer ({ 
    
        id:     <element-id>,
        params: <youtube-api-parameters>
    });
    */
    
    YouTubeAPIPlayersQueue.push (player_desc);
}

function YouTubeAPIInit () {
    
    // initialize YouTube API
    // https://developers.google.com/youtube/iframe_api_reference#top_of_page
    if (YouTubeAPIInitialized ==    false) {
        YouTubeAPIInitialized =     true;
        
        var tag = document.createElement ('script');

        tag.id  = 'iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';

        var firstScriptTag = document.getElementsByTagName ('script')[0];

        firstScriptTag.parentNode.insertBefore (tag, firstScriptTag);
    }
}

function onYouTubeIframeAPIReady () {

    // after the API code downloads ..
    
    for (var i = 0; i < YouTubeAPIPlayersQueue.length; i ++) {

        var player_desc = YouTubeAPIPlayersQueue [i];
    
        var player = new YT.Player (player_desc.id, player_desc.params);
                
        YouTubeAPIPlayers.push (player);
    }
}



function Gallery (manager_ui, manager_animations) {

    var t = this;

    t.manager_videos = new GalleryVideos (

        document.getElementById ("gallery-videos"), "data/gallery-videos.json", manager_animations, 0.0,

        function () {

            console.log ("Video Gallery Initialized");
        }
    );

    t.manager_images = new GalleryImages (

        document.getElementById ("gallery-images"), "data/gallery-images.json",

        function () {

            console.log ("Image Gallery Initialized");
        },

        function () {

            console.log ("Image Gallery Update");

            updateButtons ();
        }
    );

    updateButtons ();

    function updateButtons () {

        var gallery_blocks = document.querySelectorAll (".gallery-block");

        if (gallery_blocks) {

            for (var i = 0; i < gallery_blocks.length; i ++) {

                var el = gallery_blocks [i];

                if (el.classList.contains   ("button-hover") == false) {
                    el.classList.add        ("button-hover");

                    el.setAttribute ("button-target",  "<this>");
                    el.setAttribute ("button-clear",   ".gallery-block");

                    el.___callback_open_lightbox = function (e) {

                        if (e.target.parentNode.id === "gallery-images") {

                            // console.log ("LIGHTBOX >> OPEN >> IMAGE LIGHTBOX");

                            t.manager_images.showLightbox (e.target.querySelector ("img"));

                        } else
                        if (e.target.parentNode.id === "gallery-videos") {

                            // console.log ("LIGHTBOX >> OPEN >> VIDEO LIGHTBOX");
                        }
                    }
                }
            }
        }

        manager_ui.updateButtons ();
    }
};

Gallery.prototype = {

    constructor:        Gallery,

    manager_videos:     null,
    manager_images:     null,

    showLightbox: function (img) {

        console.log ("showLightbox");

        /*
        this.lightbox.classList.remove  ("lightbox-hidden");
        this.lightbox.classList.add     ("lightbox-visible");

        // Set low-res image first (which suppose to be already loaded)
        // and after showing up start loading actuall hi-res image

        this.lightbox_img.setAttribute ("src",      img.getAttribute ("src"));
        this.lightbox_img.setAttribute ("src-lazy", img.getAttribute ("src-lightbox"));

        this.lightbox_img.onload = function (e) {

            var img = e.target;

            img.src = img.getAttribute ("src-lazy");
        }

        this.lightbox_visible = true;
        */
    },

    hideLightbox: function () {

        console.log ("hideLightbox");

        /*
        this.lightbox.classList.remove  ("lightbox-visible");
        this.lightbox.classList.add     ("lightbox-hidden");

        this.lightbox_visible = false;
        */
    },

}


function GalleryVideos (container, filepath_json, animations, edge, callback) {

    var t = this;

    t.container = container;

    YouTubeAPIInit ();

    loadJSON (filepath_json, function (json) {

        var index = -1;

        for (var vid in json.videos) {

            index ++;

            // check if the property/key is defined in the object itself, not in parent
            if (json.videos.hasOwnProperty (vid)) {

                var video = json.videos [vid]

                // console.log (key, json.videos [vid]);

                var wrapper = document.createElement ('div');
                var cover   = document.createElement ('img');
                var player  = document.createElement ('div');

                cover   .id         = "youtube-cover-"  + index;
                player  .id         = "youtube-player-" + index;

                cover   .src        = video.cover;
                cover   .className  = "video-cover";

                wrapper .className  = "video-wrapper gallery-block";

                wrapper     .appendChild (cover);
                wrapper     .appendChild (player);
                t.container .appendChild (wrapper);

                YouTubeAPIAddPlayer ({

                    id:     player.id,
                    params: {

                        width:      640,    // 720p half-res
                        height:     360,    // 720p half-res
                        videoId:    vid,

                        playerVars: {

                            // https://developers.google.com/youtube/player_parameters

                            'enablejsapi'       : 1,
                            'loop'              : 1,
                            'start'             : video.start,
                            'playlist'          : vid,  // this is necessary for 'loop' to work
                            'autoplay'          : 0,
                            'controls'          : 0,
                            'showinfo'          : 0,
                            'fs'                : 0,
                            'rel'               : 0,
                            'disablekb'         : 1,
                            'modestbranding'    : 1,
                            'playsinline'       : 1,
                          //'origin'            : "https://www.andrejszontagh.com/",
                        },

                        events: {

                            'onReady': function (e) {

                                // https://developers.google.com/youtube/iframe_api_reference#Operations

                                var player = e.target;
                                var iframe = player.getIframe ();

                                // makes sure it's muted
                                player.mute ();

                                // starts low quality to make the buffering fast ..
                                player.setPlaybackQuality ("small");  // small, medium, large, hd720 ..

                                // this starts buffering but do not play yet
                                // we want to start buffering as soon as possible ..
                                player.playVideo    ();
                                player.pauseVideo   ();

                                function onScroll () {

                                    if (animations.isInViewport (iframe.parentNode, edge)) {

                                        // this helps with loading spikes when user scrolls wildly ..

                                        if (player.timer === undefined) player.timer = null;

                                        if (player.timer != null) clearTimeout (player.timer);

                                        player.timer = setTimeout (function () {

                                            // make sure still in viewport !
                                            if (animations.isInViewport (iframe.parentNode, edge)) {

                                                player.playVideo ();
                                            }

                                        }, 500);

                                    } else {

                                        player.pauseVideo ();
                                    }
                                }

                                // in the case object is already in the viewport
                                onScroll ();

                                window.addEventListener ("resize", onScroll);
                                window.addEventListener ("scroll", onScroll);
                            },

                            'onStateChange': function (e) {

                                var player  = e.target;
                                var iframe  = player.getIframe ();
                                var cover   = iframe.parentNode.querySelector (".video-cover");

                                switch (e.data) {

                                    case YT.PlayerState.BUFFERING:

                                        // console.log ("BUFFERING >> " + iframe.id);

                                        // show cover
                                        cover.classList.remove  ("cover-hidden");
                                        cover.classList.add     ("cover-visible");

                                        break;

                                    case YT.PlayerState.PLAYING:

                                        // console.log ("PLAYING   >> " + iframe.id);

                                        // hide cover
                                        cover.classList.remove  ("cover-visible");
                                        cover.classList.add     ("cover-hidden");

                                        break;
                                }
                            },

                            'onError': function (e) {

                                // TODO: handle errors !

                                switch (e.data) {

                                    case 2:     break;  // The request contains an invalid parameter value
                                    case 5:     break;  // The requested content cannot be played in an HTML5 player
                                    case 100:   break;  // The video requested was not found
                                    case 101:   break;  // The owner of the requested video does not allow it to be played in embedded players
                                    case 150:   break;  // This error is the same as 101. It's just a 101 error in disguise!
                                    default:
                                }
                            }
                        }
                    }
                });
            }
        }

        callback ();
    });
}

GalleryVideos.prototype = {

    constructor: GalleryVideos,
}


function GalleryImages (container, filepath_json, callback_init, callback_update) {

    var t = this;

    t.container         = container;
    t.lightbox          = container.querySelector ("#lightbox");
    t.lightbox_img      = container.querySelector ("#lightbox-image");
    t.lightbox_visible  = false;

    t.lightbox.onclick = function (e) {

        t.hideLightbox ();
    };

    t.hideLightbox ();

    // Mansonry column layour

    // https://github.com/desandro/masonry
    // No simple solution for this ..

    t.layout = new Masonry ('#gallery-images', {

        itemSelector:       '.gallery-block',
        columnWidth:        '.gallery-block',
        percentPosition:    true,
        transitionDuration: 0,
        stagger:            0,
        resize:             true,
    });

    loadJSON (filepath_json, function (json) {

        for (var i = 0; i < json.images.length; i ++) {

            // console.log ("json.images [i] >> " + json.images [i]);

            var wrapper     = document.createElement ('div');
            var img         = document.createElement ('img');

            // https://stackoverflow.com/questions/4250364/how-to-trim-a-file-extension-from-a-string-in-javascript

            var filename    = json.images [i];

            var base        = filename.split ('.').slice (0, -1).join ('.');
            var extension   = filename.substring (base.length, filename.length);

            // console.log ("FILE : " + base + " EXTENSION : " + extension);

            wrapper.className = "gallery-block";
            
            img.src = base + "_tumbnail" + extension;

            // store full res image filename for lightbox (loads when opening lightbox)
            img.setAttribute ("src-lightbox", filename);

            wrapper     .appendChild (img);
            t.container .appendChild (wrapper);

            // as soon as image is loaded update the layout ..

            img.addEventListener ('load', function (e) {

                // console.log ("Image loaded > " + e.target);

                t.layout.appended (e.target.parentNode);
                t.layout.layout (); // !!

                callback_update ();
            });

            img.addEventListener ('error', function () {

                // console.log ("Image load error > " + e.target);

                e.target.remove ();
                t.layout.layout (); // !!

                callback_update ();
            });
        }

        // images might not be loaded yet and layout not ready !
        callback_init ();
    });
};

GalleryImages.prototype = {

    constructor: GalleryImages,

    showLightbox: function (img) {

        this.lightbox.classList.remove  ("lightbox-hidden");
        this.lightbox.classList.add     ("lightbox-visible");

        // Set low-res image first (which suppose to be already loaded)
        // and after showing up start loading actuall hi-res image

        this.lightbox_img.setAttribute ("src",      img.getAttribute ("src"));
        this.lightbox_img.setAttribute ("src-lazy", img.getAttribute ("src-lightbox"));

        this.lightbox_img.onload = function (e) {

            var img = e.target;

            img.src = img.getAttribute ("src-lazy");
        }

        this.lightbox_visible = true;
    },

    hideLightbox: function () {

        this.lightbox.classList.remove  ("lightbox-visible");
        this.lightbox.classList.add     ("lightbox-hidden");

        this.lightbox_visible = false;
    },
}


function UI () {

    // console.log ("init UI");

    var t = this;

    t.ui    = document.getElementById ("ui");
    t.body  = document.getElementsByTagName ("BODY")[0];

    // detect touch device !

    // https://codeburst.io/the-only-way-to-detect-touch-with-javascript-7791a3346685

    // this seems to be the only realiable method since you still can have devices supporting and
    // actively using both touch and other pointer devices so the only way to know for sure that the user is
    // going to touch is to use listen for actual touch events.

    // problem with this method is that we don't know until user touches ..

    window.addEventListener ('touchstart', function onFirstTouch () {

        console.log ("User touched !");

        t.touch = true;

        t.updateButtons ();

        // we only need to know once that a human touched the screen, so we can stop listening now
        window.removeEventListener ('touchstart', onFirstTouch, false);

    }, false);

    t.updateButtons ();

    // build the email
    {
        var email_button    = t.ui.querySelector ("#contact-button");
        var email_banner    = t.ui.querySelector ("#contact-email");

        var email_name_1    = "andrej";
        var email_name_2    = "szontagh";
        var email_serv_1    = "gmail";
        var email_serv_2    = "com";

        email_button.href = "mailto:" +
            email_name_1 + "." + email_name_2 + "@" +
            email_serv_1 + "." + email_serv_2;

        // \u200B is zero width space that will allow desired work breaking behaviour
        email_banner.innerHTML =
            email_name_1 + "\u200B.\u200B" + email_name_2 + " \u200B@ \u200B" +
            email_serv_1 + "\u200B.\u200B" + email_serv_2;
    }

    // set css classes on overlay
    {
        var el = document.getElementById ("overlay");

        el.addEventListener ('onvisible', function (e) {

            t.ui    .classList.add ("overlay");
            t.body  .classList.add ("noscroll");

        }, false);

        el.addEventListener ('onhidden', function (e) {

            t.ui    .classList.remove ("overlay");
            t.body  .classList.remove ("noscroll");

        }, false);
    }
}

UI.prototype = {

    constructor:    UI,

    touch:          false,  // touch device ?

    body:           null,
    ui:             null,

    parseButtonStateRef: function (el) {

        var out = {

            value:              null,
            value_ext:          null,
            value_readonly:     false,
        };

        var attr = el.getAttribute ("button-state");

        if (attr) {
            attr = attr.trim ();

            if (attr && attr.length > 0 &&
                (attr.charAt (0)                === '[') &&
                (attr.charAt (attr.length - 1)  === ']')
            ){
                attr = attr.substring (1, attr.length - 1);

                out.value_readonly = true;
            }

            if (attr === "on")                  out.value = "on";
            if (attr === "off" || attr === "")  out.value = "off";

            if (attr && attr.length > 0 &&
                (attr.charAt (0)                === '{') &&
                (attr.charAt (attr.length - 1)  === '}')
            ){
                attr = attr.substring (1, attr.length - 1);

                out.value_ext = attr;
            }
        }

        return out;
    },

    setButtonState: function (el, state, propagate = true) {

        var t = this;

        // safety check
        if (el.classList.contains ("button-hover") ||
            el.classList.contains ("button-press")) {

            var button_state = t.parseButtonStateRef (el);

            if (!button_state.value_readonly) {

                /*
                if (propagate === true) {

                    if (button_state.value_ext) {

                        var targets = t.body.querySelectorAll (button_state.value_ext);

                        for (var i = 0; i < targets.length; i ++) {

                            t.setButtonState (targets [i], state, false);
                        }
                    }
                }
                */

                // console.log ("Button : " + el.id + " State > " + state);

                el.setAttribute ("button-state", state);
            }

            // clear buttons selected by "button-clear" attribute

            if (propagate === true) {

                var button_clear = el.getAttribute ("button-clear");

                if (button_clear !== null) {

                    var targets = t.body.querySelectorAll (button_clear);

                    for (var i = 0; i < targets.length; i ++) {

                        if (targets [i] !== el) {

                            if (t.getButtonState (targets [i]) === "on") {
                                t.setButtonState (targets [i], "off", false);
                            }
                        }
                    }
                }
            }

            if (state === "on") {

                if (propagate === true) {

                    var button_set = el.getAttribute ("button-set-on");

                    if (button_set !== null) {

                        var targets = t.body.querySelectorAll (button_set);

                        for (var i = 0; i < targets.length; i ++) {

                            if (targets [i] !== el) {

                                t.setButtonState (targets [i], state, false);
                            }
                        }
                    }
                }

                t.showButtonTargets (el, "button-target", true);
            }

            if (state === "off") {

                if (propagate === true) {

                    var button_set = el.getAttribute ("button-set-off");

                    if (button_set !== null) {

                        var targets = t.body.querySelectorAll (button_set);

                        for (var i = 0; i < targets.length; i ++) {

                            if (targets [i] !== el) {

                                t.setButtonState (targets [i], state, false);
                            }
                        }
                    }
                }

                t.showButtonTargets (el, "button-target", false);
            }
        }
    },

    getButtonState: function (el) {

        var t = this;

        var button_state = this.parseButtonStateRef (el);

        // console.log ("getButtonState > parseButtonStateRef > " + attr);

        if (button_state.value === "on" ||
            button_state.value === "off") {

            return button_state.value;

        } else
        if (button_state.value_ext !== null) {

            var target = t.body.querySelector (attr);

            if (target) {

                var button_state_ext = this.parseButtonStateRef (target);

                if (button_state_ext.value === "on" ||
                    button_state_ext.value === "off") {

                    return button_state_ext.value;
                }
            }
        }

        return "off";
    },

    showButtonTargets: function (el, attr, on) {

        var t = this;

        var sel = el.getAttribute (attr);

        if (sel) {

            var targets;

            if (sel.trim () === "<this>") {

                targets = [el]; } else {
                targets = t.body.querySelectorAll (sel);
            }

            if (targets != null) {

                for (var i = 0; i < targets.length; i ++) {

                    var target = targets [i];

                    if (on) {

                        target.classList.remove ("hidden");
                        target.classList.add    ("visible");

                        target.dispatchEvent (new Event ('onvisible'));

                    } else {

                        target.classList.remove ("visible");
                        target.classList.add    ("hidden");

                        target.dispatchEvent (new Event ('onhidden'));
                    }
                }
            }
        }
    },

    clearButtonEvents: function (b) {

        b.removeEventListener ("mouseenter",    b.___button_listener_mouseenter);
        b.removeEventListener ("mouseleave",    b.___button_listener_mouseleave);
        b.removeEventListener ("mousedown",     b.___button_listener_mousedown);
        b.removeEventListener ("mouseup",       b.___button_listener_mouseup);
    },

    initButton: function (b) {

        var t = this;

        t.clearButtonEvents (b);

        if (b.classList.contains ("button-hover")) {

            b.___button_listener_mouseleave = function (e) { t.setButtonState (e.target, "off"); }
            b.___button_listener_mouseenter = function (e) {

                t.setButtonState            (e.target, "on");
                t.transformButtonByScrolls  (e.target);
            }

            b.___button_listener_mousedown = function (e) {

                if (e.target.___callback_open_lightbox) {
                    e.target.___callback_open_lightbox (e);
                }
            }

            b.addEventListener ("mouseenter",   b.___button_listener_mouseenter);
            b.addEventListener ("mouseleave",   b.___button_listener_mouseleave);
            b.addEventListener ("mousedown",    b.___button_listener_mousedown);

        } else
        if (b.classList.contains ("button-press")) {

            b.___button_listener_mousedown = function (e) {

                var el = e.target;

                var state = t.getButtonState (el);

                if (state === "on")     { t.setButtonState (el, "off"); } else
                if (state === "off")    { t.setButtonState (el, "on");  }
            }

            b.___button_listener_mouseup = function (e) {

                var time = new Date ().getTime ();

                if (e.target.___button_listener_mouseup_time) {

                    var delta = time - e.target.___button_listener_mouseup_time;

                    if (delta > 100 && delta < 500) {

                        // e.preventDefault ();

                        if (e.target.___callback_open_lightbox) {
                            e.target.___callback_open_lightbox (e);
                        }
                    }
                }

                e.target.___button_listener_mouseup_time = time;
            }

            b.addEventListener ("mousedown",        b.___button_listener_mousedown);
            b.addEventListener ("mouseup",          b.___button_listener_mouseup);
        }

        if (!b.___callback_open_lightbox) {
            b.___callback_open_lightbox = function (e) {

                // console.log ("LIGHTBOX >> OPEN");
            }
        }
    },

    transformButton: function (b) {

        var t = this;

        // transforms hover button to press button
        if (b.classList.contains ("button-hover")) {

            // console.log ("transformButton >> " + b.id);

            t.clearButtonEvents (b);

            b.classList.remove  ("button-hover");
            b.classList.add     ("button-press");

            t.initButton (b);
        }
    },

    transformButtonByScrolls: function (b) {

        var t = this;

        if (b.classList.contains ("button-hover")) {

            var attr = b.getAttribute ("button-scroll");

            if (attr !== null) {

                var h = window.innerHeight;

                var scrolls = t.body.querySelectorAll (attr);

                for (var i = 0; i < scrolls.length; i ++) {

                    var s = scrolls [i];

                    var r = s.getBoundingClientRect ();

                    if ((r.top + r.height) > h) {

                        t.transformButton (b);

                        break;
                    }
                }
            }
        }
    },

    updateButtons: function () {

        var t = this;

        var buttons = t.body.querySelectorAll (".button-hover, .button-press");

        for (var i = 0; i < buttons.length; i ++) {

            var b = buttons [i];

            // console.log ("button : " + b.id + " class : " + b.className);

            if (t.touch) {
                t.transformButton   (b); } else {
                t.initButton        (b);
            }
        }
    },
}


var manager_ui          = null;
var manager_animations  = null;
var manager_gallery     = null;

window.onload = function (e) {

    // console.log ("window.location.href      : " + window.location.href);
    // console.log ("window.location.hostname  : " + window.location.hostname);
    // console.log ("window.location.pathname  : " + window.location.pathname);
    // console.log ("window.location.protocol  : " + window.location.protocol);
    // console.log ("window.location.port      : " + window.location.port);

    manager_ui          = new UI            ();
    manager_animations  = new Animations    ();
    manager_gallery     = new Gallery       (manager_ui, manager_animations);
}
