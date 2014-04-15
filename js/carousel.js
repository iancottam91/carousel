// on clicking a button:

// 1) check whether the button can go up or down, i.e top mod height of carousel item = 0
// 2) if so proceed, if not return false
// 3) if button clicked is up and top != 0 animate top by - height of carousel item
// 4) if button clicked is down and top != (height of carousel item) * (total carousel items - number of carousel items showing) animate top by + height of carousel item
(function ( $ ) {
 
    $.fn.carousel = function( options ) {
 
 		// options
        var settings = $.extend({
            // defaults.
            color: "blue"
        }, options ),
        	carouselContainer = $(this),
        	carouselContent = carouselContainer.find('.carousel-content');
        	buttons = carouselContainer.find('.slide-button');
 
        // run carousel code
        return carouselContainer.each(function(){
        	begin();
        });

        function begin(){
        	console.log('begin animation');
        	buttons.on('click',function(){
        		console.log('button clicked');
        		var button = $(this);
        		canAnimate();
        		// if(canAnimate()){
        		// 	animate(button);
        		// }
        	})
        }

        function canAnimate(button){
        	console.log(carouselContent.css('top'));
        }

        function animate(button){

        }

 
    };
 
}( jQuery ));

$('.carousel-container').carousel();