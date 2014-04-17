// on clicking a button:
// 1) check whether the button can go up or down, i.e top mod height of carousel item = 0
// 2) if so proceed, if not return false
// 3) if button clicked is up and top != 0 animate top by - height of carousel item
// 4) if button clicked is down and top != (height of carousel item) * (total carousel items - number of carousel items showing) animate top by + height of carousel item
(function($) {
    "use strict";
    $.fn.carousel = function(options) {
        // options
        var settings = $.extend({
            // defaults.
            color: "blue",
            // carousel item height
            itemHeight: 80,
            // amount of carousel items to show
            itemsToShow: 4
            // (set the height of the container based on these)
        }, options);

        // run carousel code
        return this.each(function() {
            var carouselContainer = $(this);
            begin(carouselContainer);
        });

        // run the code
        function begin(carouselContainer) {
            // specific variables
            var carouselContent = carouselContainer.find('.carousel-content'),
                carouselItem = carouselContent.find('.carousel-item'),
                numberOfItems = carouselItem.length,
                buttons = carouselContainer.find('.slide-button');
            // set container height
            setContainerHeight(settings.itemHeight, settings.itemsToShow, carouselContainer);
            setItemHeight(carouselContainer, settings.itemHeight);
            // handle clicking on the buttons
            buttons.on('click', function() {
                var button = $(this);
                if (canAnimate(carouselContent, button, carouselItem, settings.itemsToShow, numberOfItems)) {
                    animate(carouselContent, button, carouselItem);
                }
            });
        }

        // set the height of the carousel-items
        function setItemHeight(carouselContainer, itemHeight) {
            carouselContainer.find('.carousel-item').height(itemHeight);
        }

        // set the height of carousel-content-container based on the carousel-item height and number of items to show
        function setContainerHeight(itemHeight, itemsToShow, carouselContainer) {
            carouselContainer.find('.carousel-content-container').height(itemHeight * itemsToShow);
        }

        // check if the slider is in a position to animate
        function canAnimate(carouselContent, button, carouselItem, itemsToShow, numberOfItems) {
            // check if the carousel is mid animation or not
            if ((carouselContent.position().top % carouselItem.height()) === 0) {
                // check whether the slider can move up
                if (button.hasClass('up') && (carouselContent.position().top === 0)) {
                    return false;
                } 
                else if (button.hasClass('down') && (carouselContent.position().top === -(carouselItem.height() * (numberOfItems - itemsToShow)))) {
                    return false;
                }
                // return true if the slider can move
                else {
                    return true;
                }
            } else {
                return false;
            }
        }

        // move the carousel based on the button clicked
        function animate(carouselContent, button, carouselItem) {
            var carouselContentTop = carouselContent.position().top,
                animationSpeed = 500;
            if (button.hasClass('up')) {
                carouselContent.animate({
                    top: (carouselContentTop + carouselItem.height())
                }, animationSpeed);
            } else if (button.hasClass('down')) {
                carouselContent.animate({
                    top: (carouselContentTop - carouselItem.height())
                }, animationSpeed);
            }
        }
    };
}(jQuery));