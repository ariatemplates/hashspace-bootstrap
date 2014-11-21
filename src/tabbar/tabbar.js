var klass = require("hsp/klass");

var TabController = klass({
    $attributes : {
        label : {
            type : "template"
        },
        disabled : {
            type : "boolean",
            defaultValue : false
        },
        content : {
            type : "template",
            defaultContent : true
        }
    },
    $init : function (parent) {
        if (this.active == null) {
            this.active = false;
        }
        this._fade = parent.actuallyHasTransitions;
        if (this.active && this._fade) {
            this._in = true;
        }
    },
    setVisibility : function (status) {
        this.active = status;
        if (this._fade) {
            if (status) {
                var that = this;
                setTimeout(function () {
                    that._in = true;
                }, 30);
            } else {
                this._in = false;
            }
        }
    }
});

exports.TabbarController = klass({
    $attributes : {
        index : {
            type : "int",
            defaultValue : 0,
            binding : "2-way"
        },
        noTransition : {
            type : "boolean",
            defaultValue : false
        },
        display : {
            type : "string",
            defaultValue : "tabs"
        },
        justified : {
            type : "boolean",
            defaultValue : false
        },
        // BS events
        "onshow" : {
            type : "callback"
        },
        "onshown" : {
            type : "callback"
        }
    },
    $elements : {
        "tab" : {
            type : "component",
            controller : TabController
        }
    },
    $init : function () {
        var display = this.display;
        this.tabsClass = !display || display == "tabs";
        this.pillsClass = display == "pills";
        this.stackedClass = display == "vertical";
        this._tabsCount = this._getNumberOfTabs();

        this._domReady = false;
        this._onshown = null;

        this.transitionEnd = getTransitionEnd();
        this.actuallyHasTransitions = !this.noTransition && !!this.transitionEnd;
        this._eventListener = null;

        this._currentIndex = null;
        // Initialize
        this._setIndex(this.index);
    },
    $refresh : function () {
        if (!this._domReady) {
            this._domReady = true;
            if (this.actuallyHasTransitions) {
                var tabContentDiv = this.$getElement(1);
                var that = this;
                this._eventListener = {
                    fn : function () {
                        that.onshown({
                            index : that._currentIndex
                        });
                    },
                    element : tabContentDiv
                };
                tabContentDiv.addEventListener(this.transitionEnd, this._eventListener.fn, false);
            }
        }
    },
    $dispose : function () {
        if (this._eventListener) {
            this._eventListener.element.removeEventListener(this.transitionEnd, this._eventListener.fn, false);
            this._eventListener = null;
        }
    },

    activate : function (event, idx) {
        if (!this.$content[idx].disabled) {
            this._setIndex(idx);
        }
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },
    _getNumberOfTabs : function () {
        return this.$content ? this.$content.length : 0;
    },

    $onIndexChange : function (newIndex) {
        this._setIndex(newIndex);
    },

    _normalizeIndex : function (newIndex) {

        var content = this.$content;
        var nbTabs = this._tabsCount;
        if (!content || nbTabs === 0) {
            return -1;
        }
        oldIndex = this._currentIndex;

        if (newIndex < 0) {
            newIndex = 0;
        } else if (newIndex >= nbTabs) {
            newIndex = nbTabs - 1;
        }

        if (content[newIndex].disabled && oldIndex !== null && oldIndex >= 0 && oldIndex < nbTabs) {
            newIndex = oldIndex;
        }
        if (content[newIndex].disabled) {
            var i = 0, available = false;
            while (i < content.length) {
                if (!content[i].disabled) {
                    newIndex = i;
                    available = true;
                    break;
                }
                i++;
            }
            if (!available) {
                return -1;
            }
        }
        return newIndex;

    },

    _setIndex : function (newIndex) {
        newIndex = this._normalizeIndex(newIndex);

        if (this.index != newIndex) {
            this.index = newIndex;
        }

        this._updateActivation(newIndex);
    },

    _updateActivation : function (newIndex) {
        if (newIndex == this._currentIndex) {
            return;
        }
        var oldIndex = this._currentIndex;
        this._currentIndex = newIndex;
        oldIndex = (oldIndex === null || oldIndex < 0 || oldIndex >= this._tabsCount) ? null : oldIndex;
        newIndex = newIndex == -1 ? null : newIndex;
        this.toggleActivation(oldIndex, newIndex);
    },
    $on$contentChange : function (newContent, oldContent) {
        this._tabsCount = this._getNumberOfTabs();
        this._setIndex(this._currentIndex);
    },
    toggleActivation : function (oldIndex, newIndex) {
        if (newIndex === null) {
            return;
        }
        var content = this.$content;
        this.onshow({
            index : newIndex
        });
        if (oldIndex !== null) {
            content[oldIndex].setVisibility(false);
        }
        content[newIndex].setVisibility(true);
        if (this.actuallyHasTransitions && this._domReady) {
            this._onshown = newIndex;
        } else {
            this.onshown({
                index : newIndex
            });
        }
    }
});

// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================
function getTransitionEnd () {
    var el = document.createElement('hashspace-bootstrap');
    var transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition : 'transitionend',
        OTransition : 'oTransitionEnd otransitionend',
        transition : 'transitionend'
    };
    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }
    return false;
}
