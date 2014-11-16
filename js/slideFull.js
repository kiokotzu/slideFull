/*---------------------------------------------
 Autor: Esteban Vera
 Twitter : @kiokotzu
 Github : https://github.com/kiokotzu/slideFull
 Correo : esteban.vg@outlook.com
 version : 1.0.1
 ---------------------------------------------*/


 $(function(){
	jQuery.fn.slideFull = function(settings){

		/*CONFIGURATIONS DEFAULT */
		var settingsDefault = jQuery.extend({
			speed : 5000,
			auto  : true,
			nav   : true
		}, settings);

		this.each(function(){

			var el =  $(this),
			    items =  el.find('li'),
			    i  =  0,
          refreshIntervalId;

      $(items[0]).addClass('current');

      if(settingsDefault.auto == true){
      	speed();
      }

      if(settingsDefault.nav == true){
      	nextPrev();
      }


      /* FUNCTIONS */
      function speed(){
      	refreshIntervalId = setInterval(auto, settingsDefault.speed);
      }


      function auto(){
        $(items[i]).addClass('slideOutNext');
        $(items[i+1]).addClass('slideInNext');
        $(items[0]).addClass((i == items.length - 1) ? 'slideInNext': '');

        setTimeout(function(){
          $(items).removeClass('slideOutNext slideInNext current');
          $(items[i]).addClass('current')
        },1000)
        
        i = (i + 1) % items.length;   
      }

      function nextPrev(){
      	el.append('<div class="slide-nav"><div class="slide-prev">Prev</div><div class="slide-next">Next</div></div>');
        var next = el.find('.slide-next'),
			      prev = el.find('.slide-prev');

      	$(next).click(function(){
      		// clearInterval(refreshIntervalId);
          auto();
      	});

      	$(prev).click(function(){
          $(items[i]).addClass('slideOutNext');
	        $(items[i-1]).addClass('slideInNext');
	        $(items[items.length - 1]).addClass((i == 0) ? 'slideInNext': '');

	        setTimeout(function(){
	          $(items).removeClass('slideOutNext slideInNext current');
	          $(items[i]).addClass('current');
	        },1000)
          i = (i == 0 ) ? items.length - 1 : i - 1; 
      	});
      }

		});
	}
});