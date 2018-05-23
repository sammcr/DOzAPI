  $(document).ready(function(){
    var localStorage = window.localStorage;
    setCartItems();

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

    function setCartItems() {
      var entries = JSON.parse(localStorage.getItem('entries'));
      if(entries)
        $('#cart-items').text(entries.length);
    }

  });