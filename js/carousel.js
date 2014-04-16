// on clicking a button:

// 1) check whether the button can go up or down, i.e top mod height of carousel item = 0
// 2) if so proceed, if not return false
// 3) if button clicked is up and top != 0 animate top by - height of carousel item
// 4) if button clicked is down and top != (height of carousel item) * (total carousel items - number of carousel items showing) animate top by + height of carousel item
(function ( $ ) {
 
    $.fn.carousel = function( options ) {

        var carouselContainer = $(this);
 
 		// options
        var settings = $.extend({
            // defaults.
            color: "blue"
            // carousel item height
            // amount of carousel items to show
            // (set the height of the container based on these)
        }, options );
 
        // run carousel code
        return carouselContainer.each(function(){
        	begin(carouselContainer);
        });

        function begin(carouselContainer){

            //specific variables
            var carouselContent = carouselContainer.find('.carousel-content'),
                carouselItem = carouselContent.find('.carousel-item'),
                buttons = carouselContainer.find('.slide-button');

        	buttons.on('click',function(){
        		var button = $(this);
        		if(canAnimate(carouselContent, button, carouselItem)){
        			animate(carouselContent, button, carouselItem);
        		}
        	})
        }

        // check if the slider is in a position to animate
        function canAnimate(carouselContent, button, carouselItem){
            // check if the carousel is mid animation or not
            if((carouselContent.position().top % carouselItem.height())==0){
                // check whether the slider can move up
                if(button.hasClass('up') && (carouselContent.position().top == 0)){
                    return false
                }
                // check whether the slider can move up
                else if (button.hasClass('down') && (carouselContent.position().top == -(carouselItem.height()*(6-4)))){
                    return false
                } 
                // return true if the slider can move
                else {
                    return true
                }
            } else {
                return false
            }
        }

        // move the carousel based on the button clicked
        function animate(carouselContent, button, carouselItem){
            var carouselContentTop = carouselContent.position().top,
                animationSpeed = 500;
            if(button.hasClass('up')){
                carouselContent.animate({top: (carouselContentTop + carouselItem.height())}, animationSpeed);
            } else if (button.hasClass('down')){
                carouselContent.animate({top: (carouselContentTop - carouselItem.height())}, animationSpeed);
            }
        }

 
    };
 
}( jQuery ));

$('.carousel-container').carousel();