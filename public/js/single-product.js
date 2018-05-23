$(document).ready(function(){
	var url_string = window.location.href;
	var url = new URL(url_string);
	var product = url.searchParams.get("p");

	if (url.pathname.indexOf("product") >= 0){
		setProduct();
		initQtySelector();
		initSizeSelection();
	}

	function setProduct(){
		$.ajax({
			url: "/products/" + product,
			type: "GET",
			success: function(result, status, xhr){
				// Sets page breadcrumbs
				$('#breadcrumbs-product, #product-name').text(result.name);
				$('#breadcrumbs-category').html(`<a class="u-link-v5 g-color-text" href="category?c=${result.category_id}">
					${result.category.name}</a>
          <i class="g-color-gray-light-v2 g-ml-5 fa fa-angle-right"></i>`);

				// Sets product price
				$("#product-price").html("&euro;" + result.price);

				// Sets product sizes
				setSizes(result);

				// Sets product image
				$("#product-image").attr('src',result.url);
			}
		});
	}

	function setSizes(product) {
	  var initSize = parseInt(product.sizes[0]);
	  var lastSize = parseInt(product.sizes[1]);
		if(product.category.name === 'Rings'){
			$('#size-list').append(`
          <div class="d-inline-block btn-group g-line-height-1_2">
            <button type="button" class="btn btn-secondary dropdown-toggle h6 
              align-middle g-brd-none g-color-gray-dark-v5 g-color-black--hover 
              g-bg-transparent text-uppercase g-font-weight-300 g-font-size-16 g-pa-0 
              g-pl-10 g-ma-0" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              ${initSize}
            </button>
            <div id="ring-sizes" class="dropdown-menu rounded-0">
            </div>
          </div>`);
			for(var i = initSize; i < (lastSize + 1); i+=2){
				$("#ring-sizes").append(`<a class="dropdown-item g-color-gray-dark-v4 g-font-weight-300" 
					href="javascript:void(0)">${i}</a>`);
			}
		}
		else {
			for(var i = 0; i < product.sizes.length; i++){
				$('#size-list').append(`
					<li class="list-inline-item g-mx-15">
	          <label class="form-check-inline u-check">
	            <input class="g-hidden-xs-up g-pos-abs g-top-0 g-left-0" name="${product.sizes[i]}" type="radio">
	            <span class="d-block u-check-icon-checkbox-v4 g-brd-none g-absolute-centered--y g-left-0">
	              ${product.sizes[i]}
	            </span>
	          </label>
	        </li>`);
			}
		}
	}

	function initQtySelector(){
		var plus = $('.js-plus');
		var minus = $('.js-minus');
		var result = $('.js-result');
		var value = parseInt(result.val());

		plus.click(function(){
			value = parseInt(result.val());
			result.val(value+1);
		});		

		minus.click(function(){
			value = parseInt(result.val());
			if(value > 1){
				result.val(value-1);
			}
		});
	}

	function initSizeSelection(){
		$('#size-list').on('click', '#ring-sizes a', function(){
			$('#size-list button').text($(this).text());
		});
	}

});


window.onload = function(event) {
  var url_string = window.location.href;
  var url = new URL(url_string);
  if ((url.pathname.indexOf("product") >= 0) && (url.searchParams.get("p"))) {
    document.getElementsByTagName("html")[0].style.visibility = "visible";
  }
  else {
    event.stopPropagation(true);
    window.location.href="index.html";
  }
};