$(function(){

	var colors = [
		'26e000','2fe300','37e700','45ea00','51ef00',
		'61f800','6bfb00','77ff02','80ff05','8cff09',
		'93ff0b','9eff09','a9ff07','c2ff03','d7ff07',
		'f2ff0a','fff30a','ffdc09','ffce0a','ffc30a',
		'ffb509','ffa808','ff9908','ff8607','ff7005',
		'ff5f04','ff4f03','f83a00','ee2b00','e52000'
	];

	var rad2deg = 180/Math.PI;
	var deg = 0;
	var bars = $('#bars');

	for(var i=0;i<colors.length;i++){

		deg = i*12 - 36;

		// Create the colorbars

		$('<div class="colorBar">').css({
			backgroundColor: '#'+colors[i],
			transform:'rotate('+deg+'deg) translateZ(0)',
			'-webkit-perspective': 1000,
			'-webkit-backface-visibility' : 'hidden',
			top: -Math.sin(deg/rad2deg)*90+90,
			left: Math.cos((180 - deg)/rad2deg)*90+90,
		}).appendTo(bars);
	}

	var colorBars = bars.find('.colorBar');
	var numBars = 0, lastNum = -1;

	$('#control').knobKnob({
		snap : 0,
		value: 120,
		turn : function(ratio){
			numBars = Math.round(colorBars.length*ratio);

			// Update the dom only when the number of active bars
			// changes, instead of on every move

			if(numBars == lastNum){
				return false;
			}
			lastNum = numBars;

			colorBars.removeClass('active').slice(0, numBars).addClass('active');
		}
	});

	$('#toggles a').on('touchstart', function(e){
	  e.preventDefault();
	  $(this).toggleClass('active');
	})

	$('#go').on('touchstart', function(e){
		e.preventDefault();

		$(this).addClass('selected');
	}).on('touchend', function(e){
		e.preventDefault();

		$(this).removeClass('selected');
	})

});

(function($){
  $(document).ready(function(){
    var lastX;
    var lastY;

    function isGhostClick(e){
      var result = (lastX && lastY && lastX === e.eventX && lastY === e.eventY);
      lastX = e.eventX;
      lastY = e.eventY;
      return result;
    }

    function removeAllCactive(){
      $('.cactive').removeClass('cactive');
    }

    $('#add-button').bind('click', function(e){
      console.log('add button');
      if(!isGhostClick(e)){
        if($(this).hasClass('cactive')) {
          removeAllCactive();
        }else{
          $(this).addClass('cactive');
          $('#magic-container .magic-widget').addClass('cactive');
        }
      }
      return false;
    });

    $('.magic-content-wrapper').bind('click', function(e){
      if(!isGhostClick(e)){
        $('.magic-content-wrapper').removeClass('cactive');
        $(this).addClass('cactive');
      }

      return false;
    });

    $('body').bind('click', function(e){
      console.log('body');
      if(!isGhostClick(e)){
        removeAllCactive();
      }
    });

  });
})(jQuery);
