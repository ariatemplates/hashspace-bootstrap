var klass = require("hsp/klass");

var queue = new klass({
    $constructor: function() {
        this._queue = [];
    },

    add : function(obj, property, value, duration) {
        var queue = this._queue;
        queue.push({
            obj: obj,
            property: property,
            value: value,
            duration: duration
        });
        if (queue.length === 1) {
            // Nothing in the queue before, we can process the queue right now
            this.next();
        }
    },

    next : function() {
        var queue = this._queue;
        if (queue.length) {
            var that = this;
            setTimeout(function() {
                // Animation is done by changing a class on the html, i.e. changing a property in the model
                var animation = queue.shift();
                animation.obj[animation.property] = animation.value;
                var duration = animation.duration;
                // If duration is not defined, the queue must be managed by javascrit events (transition end, ...)
                // and next() must be called externally
                if (duration) {
                    setTimeout(function() {that.next();}, duration);
                }
            }, 1);
        }
    },
    getLength : function() {
        return this._queue.length;
    }
});
var _animationQueue = new queue();

var _tabId = 0;
var TabController = new klass({
    attributes: {
        label: {type: "template"},
        disabled: {type: "boolean", defaultValue: false},
        content: {type: "template", defaultContent: true}
    },

    $init: function() {
        if (this._isActive == null) {
            this._isActive = false;
        }
        this._id = _tabId;
        _tabId++;

    },

    toggleActivation : function(status) {
        status = status == null ?
                !this._isActive :
                status;
        if (this._fade) {
            if (status) {
                _animationQueue.add(this, "_isActive", true, 1);
                _animationQueue.add(this, "_in", true);
            } else {
                _animationQueue.add(this, "_in", false);
                _animationQueue.add(this, "_isActive", false, 1);
            }
         } else {
            this._isActive = status;
         }
    },

    isActive : function() {
        return this._isActive;
    },

    toggleFading : function(isEnable) {
        this._fade = isEnable;
    }
});

exports.TabbarController = new klass({
    attributes: {
        index: {type: "int", defaultValue: 0, binding: "2-way"},
        noTransition: {type: "boolean", defaultValue: false},
        display: {type: "string", defaultValue: "tabs"},
        justified: {type: "boolean", defaultValue: false},
        //BS events
        "onshow": { type: "callback" },
        "onshown": { type: "callback" },
    },
    elements: {
        "tab": {type: "component", controller: TabController}
    },
    $init: function() {

        var display = this.display;
        if (display == "pills") {
            this._tabsClass = false;
            this._pillsClass = true;
            this._stackedClass = false;
        } else if (display == "vertical") {
            this._tabsClass = false;
            this._pillsClass = true;
            this._stackedClass = true;
        } else {
            // default 'tabs'
            this._tabsClass = true;
            this._pillsClass = false;
            this._stackedClass = false;
        }

        if (!this.noTransition) {
            var transitionEnd = getTransitionEnd();
            if (transitionEnd) {
                // Initialize the tabs for fading
                var tabs = this.content;
                for(var i = 0; i < tabs.length; i++) {
                    tabs[i].toggleFading(true);
                }

                var that = this;
                //TODO: Remove the setTimeout, the uggly DOM access and the listener part ...
                setTimeout(function() {
                    var tabContentDiv = that.$getElement(1);
                    // Required for disposal
                    this._event = {
                        dom: tabContentDiv,
                        name: transitionEnd,
                        fn: function() {
                            if (!_animationQueue.getLength() && that.onshown) {
                                // Callback after content show
                                that.onshown();
                            }
                            _animationQueue.next();
                        }
                    };
                    tabContentDiv.addEventListener(transitionEnd, this._event.fn, false);
                }, 25);
            } else {
                // Animations not supported
                this.noTransition = true;
            }
        }

        // Initialize
        this.content[this.index].toggleActivation(true);

    },
    $dispose: function() {
        if (this._event) {
            var event = this._event;
            event.dom.removeEventListener(event.name, event.fn);
        }
    },
    activate: function(event, idx) {
        if (!this.content[idx].disabled) {
            this.index = idx;
        }
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    _getNumberOfTabs: function() {
        return this.content ? this.content.length: 0;
    },
    onIndexChange: function(newIndex, oldIndex) {
        var nbTabs = this._getNumberOfTabs();
        if (newIndex < 0) {
            newIndex = 0;
        }
        if (newIndex >= nbTabs) {
            newIndex = nbTabs - 1;
        }

        if (this.index != newIndex) {
            this.index = newIndex;
        }

        // Manage the case where nothing change
        if (newIndex == oldIndex) {
            return;
        }

        // Callback before content show
        if (this.onshow) {
            this.onshow();
        }

        // Toggle the contents
        this.content[oldIndex].toggleActivation(false);
        this.content[newIndex].toggleActivation(true);

        if (this.noTransition && this.onshown) {
            // Callback after content show, directly called when no animation
            this.onshown();
        }


    },
    onContentChange: function(newContent, oldContent) {

        // Look for the active tab, and set the index, in order to be sure that the old active tab is still selected
        var found = false;
        var newLength = newContent.length;
        for(var i = 0; i < newLength; i++) {
            if (newContent[i].isActive()) {
                found = true;
                break;
            }
        }
        if (found) {
            this.index = i;
        } else {
            if (this.index >= newLength) {
                this.index = newLength - 1;
            }
        }
    }
});

//CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
//============================================================
function getTransitionEnd() {
 var el = document.createElement('hashspace-bootstrap');
 var transEndEventNames = {
     WebkitTransition : 'webkitTransitionEnd',
     MozTransition    : 'transitionend',
     OTransition      : 'oTransitionEnd otransitionend',
     transition       : 'transitionend'
 };
 for (var name in transEndEventNames) {
     if (el.style[name] !== undefined) {
         return transEndEventNames[name];
     }
 }
 return false;
}
