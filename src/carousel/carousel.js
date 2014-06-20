var klass = require("hsp/klass");

exports.CarouselController = new klass({
    $constructor: function () {
        this.slide = 0;
    }
});
