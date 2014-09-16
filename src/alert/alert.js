var klass = require("hsp/klass");

exports.AlertController = new klass({
    attributes : {
        "closebutton" : {
            type : "boolean",
            defaultValue : true,
            binding : "1-way"
        },
        "fade" : {
            type : "boolean",
            defaultValue : true
        },
        "type" : {
            type : "string",
            defaultValue : "danger",
            binding : "1-way"
        },
        "content" : {
            type : "template",
            defaultContent : true
        },
        "closed" : {
            type : "boolean",
            defaultValue : false,
            binding : "2-way"
        }, // used to bind the onclose method
        "onclosestart" : {
            type : "callback"
        },
        "oncloseend" : {
            type : "callback"
        }
    },
    $init : function () {
        this._closed = false;
        this._eventListener = null;
        this.transitionEnd = this.getTransitionEnd();
        this._hasTransitions = (this.transitionEnd && this.fade);
        this.fadeClass = (this._hasTransitions) ? 'fade in' : '';
    },
    $refresh : function () {},
    _onclose : function () {
        this.closed = true;
    },
    onClosedChange : function () {
        if (this.closed) {
            this.onclose();
        } else {
            this._closed = false;
            if (this._hasTransitions) {
                this.fadeClass = 'fade';
                var that = this;
                setTimeout(function () {
                    that.fadeClass = 'fade in';
                }, 30);
            }
        }
    },
    onclose : function () {
        this.onclosestart();
        if (this._hasTransitions) {
            this.fadeClass = 'fade';
            var domElement = this.$getElement(0);
            this._eventListener = {
                fn : this.onTransitionEnd.bind(this),
                element : domElement
            };
            domElement.addEventListener(this.transitionEnd, this._eventListener.fn, false);
        } else {
            this._closeEnd();
        }
    },
    onTransitionEnd : function () {
        this._closeEnd();
    },
    _closeEnd : function () {
        this._closed = true;
        if (this._eventListener) {
            var that = this;
            this._eventListener.element.removeEventListener(this.transitionEnd, this._eventListener.fn, false);
            this._eventListener = null;
        }
        this.oncloseend();
    },
    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================
    getTransitionEnd : function () {
        var el = document.createElement('hashspace-bootstrap');
        var transEndEventNames = {
            WebkitTransition : 'webkitTransitionEnd',
            MozTransition : 'transitionend',
            OTransition : 'oTransitionEnd otransitionend',
            transition : 'transitionend'
        };
        for (var name in transEndEventNames) {
            if (transEndEventNames.hasOwnProperty(name) && el.style[name] !== undefined) {
                return transEndEventNames[name];
            }
        }
        return false;
    }
});
