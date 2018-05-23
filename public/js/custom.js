  $(document).ready(function(){
    $('.favorites').slick({
    	infinite: true,
    	slidesToShow: 3,
    	slidesToScroll: 3,
    	arrows: true
    });


    $(window).scroll(function(){
    	if($(window).scrollTop()>$("#heroText").offset().top){
    		$("#inner-header").removeClass("bg-black-transp").addClass("bg-black");
    	}
    	else {
    		$("#inner-header").removeClass("bg-black").addClass("bg-black-transp");
    	}
    });

  });