$(document).ready(function(){
  var localStorage = window.localStorage;
	var url_string = window.location.href;
	var url = new URL(url_string);
	var product = url.searchParams.get("p");
  // localStorage.clear();
	setCartItems();

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
        var price;
				if(result.discount > 0){
          price = result.price - (result.price*(result.discount/100));
          // Sets product price
          $("#product-price").html(`&euro; ${price} <span class="g-color-gray-light-v1 g-text-strike g-font-weight-300 ml-2">&euro; ${result.price}</span>`);
        }
        else {
					price = result.price;
          $("#product-price").html("&euro;" + price);
				}
        $("ul#size-list").attr("data-product", result.category.name);
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

	  // Sets sizes if Rings
		if(product.category.name === 'Rings'){
			$('#size-list').append(`
          <div class="d-inline-block btn-group g-line-height-1_2">
            <button type="button" id="selected-size" class="btn btn-secondary dropdown-toggle h6
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
		else { // Set sizes if other than Rings
			for(var i = 0; i < product.sizes.length; i++){
				$('#size-list').append(`
					<li class="list-inline-item g-mx-15">
	          <label id="selected-size" class="form-check-inline u-check">
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

	$('#add-to-cart').click(function(){

	  var entries = getOrCreateEntries();

	  // Pushes new entry to entries
    if(createEntry(entries) != undefined)
	   entries.push(createEntry(entries));

	  // Updates icon
    $('#cart-items').text(entries.length);

    // Sets entries to localStorage updated

	  localStorage.setItem('entries', JSON.stringify(entries));
    console.log(localStorage.getItem('entries'));
  });

	function createEntry(entries){
    if($("#size-list").attr("data-product") == "Rings"){
        var size = parseInt($("#selected-size").text());
    }else{
        var size = $(".select #selected-size input").attr("name");
    }
	  var qty = parseInt($('.js-quantity input').val());
	  var name_elem = $('#product-name').text();
    var element_entrie = getElement(entries, size);

    if(element_entrie.length > 0){
      entries[element_entrie[0]].quantity += qty;
      return undefined;
    }

	  var entry = {
	    product_id: product,
      name: name_elem,
      quantity: qty,
      selectedSize: size
    };

    return entry;
  }

  function getElement(data, size) {
      var index_item = [];
      data.forEach(function(item, index){
        if(item.product_id == product  && item.selectedSize == size)
          index_item.push(index);
      });
      return index_item;
  }

	function getOrCreateEntries(){
    // Gets entries from localStorage if exists
    var entries;
    if(localStorage.getItem('entries')){
      entries = JSON.parse(localStorage.getItem('entries'));
    }
    else { // if not, it creates the array
      entries = [];
    }
	  return entries;
  }

  function setCartItems() {
    if(localStorage.getItem('entries') != null)
      var entries = JSON.parse(localStorage.getItem('entries'));

    if(entries)
      $('#cart-items').text(entries.length);
  }

  $(document).on("click", ".list-inline-item", function(){
    $(this).addClass("select");
    $(this).siblings().removeClass("select");
  });

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
