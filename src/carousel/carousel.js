var klass = require("hsp/klass");

var SlideController = new klass({
    attributes: {
        body: { type: "template", defaultContent: true },
        caption: {type: "template"}
    }
});

exports.CarouselController = new klass({
    attributes:{
        //BS options
        "interval": {type: "int", defaultValue:5000, binding: "1-way"},
        "pause": {type: "string", defaultValue: "hover"},
        "wrap": {type: "boolean", defaultValue: true},
        //BS methods equivalent
        "index": {type: "int", defaultValue: 0, binding: "2-way"},
        //BS events
        "onslidestart": { type: "callback" },
        "onslideend": { type: "callback" },
        //Additionals
        "noTransition": {type: "boolean", defaultValue: false}
    },
    elements: {
        "slide": {type: "component", controller: SlideController}
    },
    $init: function() {
        this.ongoingNavigation = null; //null, "prev" or "next"
        this.navigationDirection = null; //null, "left" or "right"
        this.internalIndex = this.index;
        this.nextIndex = null;
        this.isTransitioning = false;
        this.queue = null;
        this.transitionEnd = this.noTransition ? false : getTransitionEnd();
        this._startCycling();
    },
    $dispose: function() {
        this._stopCycling();
    },
    $refresh: function() {
        if (this.ongoingNavigation && this.navigationDirection === null) {
            var _this = this;
            //TODO: Remove the setTimeout, the uggly DOM access and the listener part ...
            setTimeout(function() {
                _this.navigationDirection = _this.ongoingNavigation === "next" ? "left": "right";
                if (_this.transitionEnd) {
                    var activeElement = _this.$getElement(0).querySelectorAll(".item.active")[0];
                    var that = _this;
                    activeElement.addEventListener(that.transitionEnd, function(event) {
                        this.removeEventListener(that.transitionEnd, arguments.callee, false);
                        that._finalizeTransition.call(that);
                    }, false);
                }                
            }, 50);
        }
    },
    _getNumberOfSlides: function() {
        return this.content ? this.content.length: 0;
    },
    _finalizeTransition: function() {
        if (this.nextIndex !== null) {
            this.index = this.internalIndex = this.nextIndex;
            this.ongoingNavigation = null;
            this.navigationDirection = null;
            this.nextIndex = null;
            this.isTransitioning = false;
            if (this.onslideend) {
                this.onslideend({});
            }
            if (this.queue) {
                var queueContent = this.queue;
                this.queue = null;
                switch (queueContent.action) {
                    case "next":
                        this.next();
                        break;
                    case "prev":
                        this.prev();
                        break;
                    case "slide":
                        this._navigateTo(queueContent.index);
                        break;
                }
            }
        }
    },
    _navigateTo: function(nextIndex, isToRight) {
        if (nextIndex != this.internalIndex && !this.isTransitioning) {
            this.isTransitioning = true;
            if (this.onslidestart) {
                this.onslidestart({});
            }
            if (this.transitionEnd) {
                this.nextIndex = nextIndex;
                this.ongoingNavigation = (isToRight || typeof isToRight === "undefined" && nextIndex > this.internalIndex)? "next" : "prev";    
            }
            else {
                this.internalIndex = this.nextIndex = nextIndex;
                this._finalizeTransition();
            }
        }
    },
    prev: function() {
        if (this.isTransitioning) {
            this.queue = {action: "prev"};
        }
        else if (!(!this.wrap && this.internalIndex === 0)) {
            var nextIndex = this.internalIndex - 1 < 0 ? this._getNumberOfSlides() - 1 : this.internalIndex - 1;
            this._navigateTo(nextIndex, false);
        }
    },
    next: function() {
        if (this.isTransitioning) {
            this.queue = {action: "next"};
        }
        else if (!(!this.wrap && this.internalIndex === (this._getNumberOfSlides() - 1))) {
            var nextIndex = (this.internalIndex + 1) % this._getNumberOfSlides();
            this._navigateTo(nextIndex, true);
        }
    },
    navigate: function(index) {
        if (this.isTransitioning) {
            this.queue = {action: "slide", index: index};
        }
        else {
            this._navigateTo(index);
        }
    },
    _startCycling: function() {
        if (this.interval >= 0) {
            var _this = this;
            this.timerId = setInterval(function() {
                _this.next();    
            }, this.interval > 600 ? this.interval: 600); //600ms is the transition duration defined in BS css
        }
    },
    _stopCycling: function() {
        if (this.timerId) {
            clearInterval(this.timerId);
        }
        this.timerId = null;
    },
    toggleOnHover: function() {
        if (this.pause === "hover") {
            if (this.timerId) {
                this._stopCycling();
            } else {
                this._startCycling();  
            }
        }
    },
    handleSwipe: function(event) {
        if (event.detail) {
            if (event.detail.direction === "left") {
                this.prev();
            }
            if (event.detail.direction === "right") {
                this.next();
            }
        }
    },
    onIndexChange: function() {
        if (this.index >= 0 && this.index < this._getNumberOfSlides()) {
            this._navigateTo(this.index);
        }
    },
    onIntervalChange: function(newValue, oldValue) {
        if (newValue !== oldValue) {
            this._stopCycling();
            this._startCycling();
        }
    },
    onContentChange: function(newContent, oldContent) {
        if (newContent.length !== oldContent.length) {
            var newIndex = newContent.indexOf(oldContent[this.internalIndex]);
            if (newIndex != this.internalIndex && newIndex > -1) {
                this.index = this.internalIndex = newIndex;
            }
            if (this.internalIndex >= newContent.length) {
                this.index = this.internalIndex = newContent.length - 1;
            }
        }
    }
});

// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================
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
