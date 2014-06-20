var carouselTpl = require('../../src/carousel/carousel.hsp').carousel;

describe('Carousel', function() {

    it('should say Hello carousel', function() {
        var n = carouselTpl();
        expect(n.node.firstChild.textContent).to.equal('Hello carousel');
        var a = 1;
    });
});
