var klass = require("hsp/klass");

exports.AlertController = new klass({
    onclosestart : function (args) {
        console.log("onclosestart has been called.");
    },
    oncloseend : function (args) {
        console.log("oncloseend has been called.");
    },
    onclose : function (event) {
        event.preventDefault();
        this.alertClosed = true;
    },
    toggle : function () {
        this.alertClosed = (!this.alertClosed);
    }
});