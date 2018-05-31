$(document).ready(function(){
  var ws = new WebSocket('ws://doz-api.herokuapp.com/cable');
  ws.onopen = function(event){
    data = {
      command: "subscribe",
      identifier: JSON.stringify({channel: "DiscountChannel"})
    };
    ws.send(JSON.stringify(data));
  };

  ws.onmessage = function(event){

      if(JSON.parse(event.data).message){
        var product = JSON.parse(event.data).message.product;
        if((product)&&(product.discount > 0)){
          $('.discount-notification').remove();
          $('body').prepend(`
              <a class="discount-notification" href="/product?p=${product.id}">
                <div class="bg-white-transparent alert fade show u-shadow-v1-3 g-pa-20 g-pos-fix g-top-100 g-right-30 g-width-380 g-z-index-9999" role="alert">
                  <button type="button" class="close u-alert-close--light g-ml-10 g-mt-1" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">×</span>
                  </button>
    
                  <div class="media">
                    <div class="d-flex g-mr-10">
                      <img class="g-width-45 g-height-45" src="${product.url}" alt="${product.name}">
                    </div>
                    <div class="media-body">
                      <div class="d-flex justify-content-between">
                        <p class="m-0 g-fon-size-12 line-height-24">Get it while it lasts
                        </p>
                        <span class="float-right small g-mx-10">Just now</span>
                      </div>
                      <p class="m-0 g-font-size-15 line-height-12"><strong>${product.name.toUpperCase()} - ${product.discount}% OFF!</strong></p>
                    </div>
                  </div>
                </div>
              </a>
            `);
        }
      }
  };
});