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
            // defaults
            // carousel item height
            itemHeight: 80,
            // spacing,
            spacing: 3,
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
            setContainerHeight(carouselContainer);
            setItemHeight(carouselContainer);
            // handle clicking on the buttons
            buttons.on('click', function() {
                var button = $(this);
                if (canAnimate(carouselContent, button, carouselItem, numberOfItems)) {
                    animate(carouselContent, button, carouselItem);
                }
            });
        }

        // set the height of the carousel-items
        function setItemHeight(carouselContainer) {
            carouselContainer.find('.carousel-item').height(settings.itemHeight);
        }

        // set the height of carousel-window based on the carousel-item height and number of items to show
        function setContainerHeight(carouselContainer) {
            carouselContainer.find('.carousel-window').height(settings.itemHeight * settings.itemsToShow);
        }

        // // set necessary padding and margins for spacing
        // function setSpacing(carouselContainer) {
        //     carouselContainer.find('.carousel-window').height(settings.itemHeight * settings.itemsToShow);
        //     carouselContainer.find('.carousel-item div').height(settings.itemHeight - settings.spacing);
        // }

        // check if the slider is in a position to animate
        function canAnimate(carouselContent, button, carouselItem, numberOfItems) {
            // check if the carousel is mid animation or not
            if ((carouselContent.position().top % carouselItem.height()) === 0) {
                // check whether the slider can move up
                if (button.hasClass('up') && (carouselContent.position().top === 0)) {
                    return false;
                } 
                else if (button.hasClass('down') && (carouselContent.position().top === -(carouselItem.height() * (numberOfItems - settings.itemsToShow)))) {
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
                    top: (carouselContentTop + carouselItem.height() + "px")
                }, animationSpeed);
            } else if (button.hasClass('down')) {
                carouselContent.animate({
                    top: (carouselContentTop - carouselItem.height() + "px")
                }, animationSpeed);
            }
        }
    };
}(jQuery));