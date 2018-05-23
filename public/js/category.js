$(document).ready(function(){
  var localStorage = window.localStorage;
	var url_string = window.location.href;
	var url = new URL(url_string);
	var category = url.searchParams.get("c");
	var last_loaded_page = 1;

	setCartItems();

	if (url.pathname.indexOf("category") >= 0){
		setCategory();
		loadProducts();
	}

	function setCategory(){
		$.ajax({
			url: "/categories/" + category,
			type: "GET",
			success: function(result, status, xhr){
				$("#category-title").text(result.name);
			},
			error: function(result, status, xhr){
				window.location.replace("index.html");
			}
		});
	}


	function loadProducts(page){
		page = typeof page !== 'undefined' ? page : 1;

		$.ajax({
			url: "/categories/" + category + "/products?page=" + page,
			type: "GET",
			success: function(result, status, xhr){
				var pages = parseInt(xhr.getResponseHeader('X-TotalPages'));
				var current_page = parseInt(xhr.getResponseHeader('X-CurrentPage'));

				for(var i = 0; i < result.length; i++){
					$("#products").append(`
							<div class="col-6 col-lg-4 g-mb-30">
			          <!-- Product -->
			          <figure class="g-pos-rel g-mb-20">
			            <img class="img-fluid" src="${result[i].url}" alt="${result[i].name}">
			          </figure>

			          <div class="media">
			            <!-- Product Info -->
			            <div class="d-flex flex-column">
			              <h4 class="h6 g-color-black mb-1">
			                <a class="u-link-v5 g-color-black g-color-primary--hover text-capitalize" href="product?p=${result[i].id}">
			                  ${result[i].name}
			                </a>
			              </h4>
			              <span class="d-block g-color-black g-font-size-17 text-left">&euro;${result[i].price}</span>
			            </div>
			            <!-- End Product Info -->
			          </div>
			          <!-- End Product -->
			        </div>`);
				}

				setLoadMoreButton(pages, current_page);
			}
		});
	}

	// Sets Load more products button visibility
	function setLoadMoreButton(number_of_pages, current_page){
		if((number_of_pages > 1)&&(number_of_pages != current_page)){
			$('#more').css('visibility', 'visible');
		}
		else if(number_of_pages == current_page){
			$('#more').css('visibility', 'hidden');
		}
		else {
			$('#more').css('visibility', 'hidden');
		}
	}

	// Load more products button
	$('#more').on('click', function(){
		last_loaded_page += 1;
		loadProducts(last_loaded_page);
	});

	function setCartItems() {
	  var entries = JSON.parse(localStorage.getItem('entries'));
    $('#cart-items').text(entries.length);
  }

});

window.onload = function(event) {
	var url_string = window.location.href;
	var url = new URL(url_string);
	if ((url.pathname.indexOf("category") >= 0) && (url.searchParams.get("c"))) {
		document.getElementsByTagName("html")[0].style.visibility = "visible";
	}
	else {
		event.stopPropagation(true);
    	window.location.href="index.html";
	}
};