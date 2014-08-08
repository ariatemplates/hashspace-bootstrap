var klass = require("hsp/klass");
var hsp = require("hsp/rt");

var DropdownHandler = klass({
    $constructor : function (nodeInstance) {
        this.nodeInstance = nodeInstance;
        this.node = nodeInstance.node;
    },

    $setValue : function(name, value) {
        if (name == "bootstrap-dropdown-isopen") {
            if (this.toggleHandler && !this.toggleHandler.isDisabled() || typeof this.toggleHandler === "undefined") {
                if (value) {
                    this._open();
                }
                else {
                    this._close();
                }
                if (this.callback) {
                    this.callback(!value);
                }
            }
        }
        else if (name == "bootstrap-dropdown-ontoggle") {
            this.callback = value;
        }
    },

    $dispose : function() {
        this._detachDocumentListeners();
        this.nodeInstance = null;
        this.node = null;
        this.toggleHandler = null;
        this.callback = null;
    },

    setToggleHandler: function(toggleHandler) {
        this.toggleHandler = toggleHandler;
    },

    isOpen: function() {
        return this.node.className.indexOf("open") > -1;
    },

    toggle: function() {
        var isOpen = this.isOpen();
        var success = this.nodeInstance.setAttributeValueInModel("bootstrap-dropdown-isopen", !isOpen);
        if (!success) {
            //setValue not executed through data model update, so let's execute it manually
            this.$setValue("bootstrap-dropdown-isopen", !isOpen);
        }
    },

    _open: function() {
        var newClassName = this.node.className.split(' ');
        newClassName.push("open");
        this.node.className = newClassName.join(' ');
        this._attachDocumentListeners();
        if (this.toggleHandler) {
            this.toggleHandler.focus();    
        }
    },

    _close: function() {
        var newClassName = this.node.className.split(' ');
        var index = newClassName.indexOf("open");
        if (index > -1) {
            newClassName.splice(index, 1);
        }
        this.node.className = newClassName.join(' ');
        this._detachDocumentListeners();
    },

    _handleDocumentEvent: function(event) {
        if (event.type === "click") {
            this.toggle();
        }
        else if (event.type === "keydown" && event.keyCode === 27) {
            this.toggle();
            this.toggleHandler.focus();
        }
        else if (event.type === "keydown" && (event.keyCode === 38 || event.keyCode ===40)) {
            if (this.isOpen()) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    event.returnValue = false;
                }
                var items = this.node.querySelectorAll('[role="menuitem"]');
                if (items && items.length > 0) {
                    if (this.focusedItem == null) {
                        this.focusedItem = 0;
                    }
                    else {
                        if (event.keyCode === 38 && this.focusedItem > 0) {
                            this.focusedItem--;
                        }
                        else if (event.keyCode === 40 && this.focusedItem < items.length - 1) {
                            this.focusedItem++;
                        }
                    }
                    items[this.focusedItem].focus();
                }
            }
        }
    },

    _attachDocumentListeners: function() {
        this.documentHandler = this._handleDocumentEvent.bind(this);
        var _this = this;
        setTimeout (function() {
            if (document.addEventListener) {
                document.addEventListener("click", _this.documentHandler, false);
                document.addEventListener("keydown", _this.documentHandler, false);
            } else {
                document.attachEvent("onclick", _this.documentHandler);
                document.attachEvent("onkeydown", _this.documentHandler);
            }
        }, 0);
    },

    _detachDocumentListeners: function() {
        if (this.documentHandler) {
            if (document.removeEventListener) {
                document.removeEventListener("click", this.documentHandler, false);
                document.removeEventListener("keydown", this.documentHandler, false);
            } else {
                document.detachEvent("onclick", this.documentHandler);
                document.detachEvent("onkeydown", this.documentHandler);
            }
        }
        this.documentHandler = null;
    }
});
hsp.registerCustomAttributes(["bootstrap-dropdown", "bootstrap-dropdown-isopen", "bootstrap-dropdown-ontoggle"], DropdownHandler, 1);

var ToggleHandler = klass({
    $constructor : function (nodeInstance) {
        this.node = nodeInstance.node;
        nodeInstance.addEventListeners(["click", "keydown"]);
        var ancestor = nodeInstance.getAncestorByCustomAttribute("bootstrap-dropdown");
        if (ancestor) {
            this.dropdown = ancestor.getCustomAttributeHandlers("bootstrap-dropdown")[0];
            this.dropdown.setToggleHandler(this);
        }
    },

    isDisabled: function() {
        return this.node.className.indexOf("disabled") > -1 || this.node.disabled;
    },

    focus: function() {
        this.node.focus();
    },

    $handleEvent: function(event) {
        if (!this.isDisabled() && this.dropdown) {
            if (event.type === "click" || !this.dropdown.isOpen() && event.type === "keydown" && (event.keyCode === 38 || event.keyCode === 40)) {
                if (event.preventDefault) {
                    event.preventDefault();
                }
                else {
                    event.returnValue = false;
                }
                this.dropdown.toggle();
                if (event.type === "keydown") {
                    if (document.body.click) {
                        document.body.click();
                    } else {
                        var evObj = document.createEvent('MouseEvents');
                        evObj.initEvent( 'click', true, false );
                        document.body.dispatchEvent( evObj );
                    }
                }
            }
            
        }
    },

    $dispose: function() {
        this.node = null;
        this.dropdown = null;
    }    
});
hsp.registerCustomAttributes("bootstrap-dropdown-toggle", ToggleHandler, 1);
