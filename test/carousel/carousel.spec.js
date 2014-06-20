var CarouselController = require('../../src/carousel/carousel.js').CarouselController;

describe('Carousel controller', function() {

    var ctrl;
    beforeEach(function(){
        ctrl = new CarouselController();
    });

    it('should have the index 0 slide by default', function() {
        expect(ctrl.slide).to.equal(0);
    });
});
