var CarouselController = require('../../src/carousel/carousel.js').CarouselController;

describe('Carousel controller', function() {

    var ctrl;
    beforeEach(function(){
        ctrl = new CarouselController();
        //Sets attributes
        ctrl.interval = -1;
        ctrl.pause = "hover";
        ctrl.wrap = true;
        ctrl.index = 0;
        ctrl.noTransition = true;
        //Set elements
        ctrl.content = ["Slide1", "Slide2", "Slide3"];
        //Execute $init
        ctrl.$init();
    });

    afterEach(function(){
        ctrl.$dispose();
        ctrl = null;
    });

    it('should cycle index when wrap=true', function() {
        expect(ctrl.index).to.be(0);
        ctrl.next();
        expect(ctrl.index).to.be(1);
        ctrl.next();
        expect(ctrl.index).to.be(2);
        ctrl.next();
        expect(ctrl.index).to.be(0);
        ctrl.prev();
        expect(ctrl.index).to.be(2);
        ctrl.prev();
        expect(ctrl.index).to.be(1);
        ctrl.prev();
        expect(ctrl.index).to.be(0);
        ctrl.prev();
        expect(ctrl.index).to.be(2);
    });

    it('should not cycle index when wrap=flase', function() {
        ctrl.wrap = false;
        expect(ctrl.index).to.be(0);
        ctrl.next();
        expect(ctrl.index).to.be(1);
        ctrl.next();
        expect(ctrl.index).to.be(2);
        ctrl.next();
        expect(ctrl.index).to.be(2);
        ctrl.prev();
        expect(ctrl.index).to.be(1);
        ctrl.prev();
        expect(ctrl.index).to.be(0);
        ctrl.prev();
        expect(ctrl.index).to.be(0);
    });

    it('should not update index if out of range', function() {
        expect(ctrl.index).to.be(0);
        ctrl.index = 4;
        ctrl.onIndexChange(4, 0);
        expect(ctrl.index).to.be(0);
        ctrl.index = -1;
        ctrl.onIndexChange(-1, 0);
        expect(ctrl.index).to.be(0);
    });

    it('should not change if next is called while transitioning', function() {
        expect(ctrl.index).to.be(0);
        ctrl.isTransitioning = true;
        ctrl.next();
        expect(ctrl.queue.action).to.be("next");
        expect(ctrl.index).to.be(0);

        ctrl.queue = null;
        ctrl.isTransitioning = false;
        ctrl.next();
        expect(ctrl.queue).to.be(null);
        expect(ctrl.index).to.be(1);
    });

    function addSlideAndValidate(currentIndex, newSlideIndex, expectedIndex) {
        ctrl.index = ctrl.internalIndex = currentIndex;
        var newContent = JSON.parse(JSON.stringify(ctrl.content));
        newContent.splice(newSlideIndex, 0, "NewSlide");
        ctrl.onContentChange(newContent, ctrl.content);
        expect(ctrl.index).to.be(expectedIndex);
    }

    it('should update index when adding slide', function() {
        addSlideAndValidate(0, 0, 1);
        addSlideAndValidate(0, 1, 0);
        addSlideAndValidate(0, 2, 0);
        addSlideAndValidate(0, 3, 0);
        addSlideAndValidate(1, 0, 2);
        addSlideAndValidate(1, 1, 2);
        addSlideAndValidate(1, 2, 1);
        addSlideAndValidate(1, 3, 1);
        addSlideAndValidate(2, 0, 3);
        addSlideAndValidate(2, 1, 3);
        addSlideAndValidate(2, 2, 3);
        addSlideAndValidate(2, 3, 2);
    });

    function removeSlideAndValidate(currentIndex, removedSlideIndex, expectedIndex) {
        ctrl.index = ctrl.internalIndex = currentIndex;
        var newContent = JSON.parse(JSON.stringify(ctrl.content));
        newContent.splice(removedSlideIndex, 1);
        ctrl.onContentChange(newContent, ctrl.content);
        expect(ctrl.index).to.be(expectedIndex);
    }

    it('should update index when removing slides', function() {
        removeSlideAndValidate(0, 0, 0);
        removeSlideAndValidate(0, 1, 0);
        removeSlideAndValidate(0, 2, 0);
        removeSlideAndValidate(1, 0, 0);
        removeSlideAndValidate(1, 1, 1);
        removeSlideAndValidate(1, 2, 1);
        removeSlideAndValidate(2, 0, 1);
        removeSlideAndValidate(2, 1, 1);
        removeSlideAndValidate(2, 2, 1);
    });
});