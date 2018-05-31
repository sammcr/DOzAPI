var localStorage = window.localStorage;
var e = JSON.parse(localStorage.getItem('entries'));
$(document).ready(function(){
  loadProducts(e);
  setCartItems();
});

$('body').on('click', 'i.js-plus', function(){
  var qty = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  var name = $(this).parents('tr').children('td:first').children('div:first').children('h4').text();

  qty += 1;
  $(this).parents('td:first').children('div:first').children("input:first").val(qty);

  updateQuantity(e, name, qty);
  updateTotal();

});

$('body').on('click', 'i.js-minus', function(){
  var qty = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  var name = $(this).parents('tr').children('td:first').children('div:first').children('h4').text();

  if (qty > 1){
    qty -= 1;
  }
  $(this).parents('td:first').children('div:first').children("input:first").val(qty);

  updateQuantity(e, name, qty);
  updateTotal();

});

$('body').on('click', 'i.trash', function(){
  // Remove row of entry
  $(this).parents('td:first').parents('tr:first').remove();

  var name = $(this).parents('tr:first').children('td:first').children('div:first').children('h4').text();
  deleteItemEntries(getIndexToRemove(e, name));

  updateNumberCart();

  updateTotal();
});

$('body').on('click', '#make-order', function(){
  if (e) {

    var subtotal = parseFloat($('#subtotal').text().substr(2));
    var total = parseFloat($('#total').text().substr(2));
    var notes = $('#inputGroup7').val();
    var nombre = $('#inputGroup4').val();
    var apellido = $('#inputGroup5').val();
    var email = $('#inputGroup6').val();
    var state = $('#inputGroup8').val();
    var zip = $('#inputGroup9').val();
    var adress = $('#inputGroup10').val();
    var telefono = $('#inputGroup11').val();

    var shipping_address = {
      nombre: nombre,
      apellido: apellido,
      email: email,
      state: state,
      zip: zip,
      adress: adress,
      telefono: telefono
    };

    var shopping_cart = {
      shopping_cart: {
        subtotal: subtotal,
        total: total,
        notes: notes,
        shipping_address: JSON.stringify(shipping_address)
      }
    };

    $.ajax({
      url: "/shopping_carts",
      type: "POST",
      data: shopping_cart,
      success: function(result, status, xhr) {
        for (var i = 0; i < e.length; i++) {
          var totalEntry = e[i].price * e[i].quantity;

          var entry = {
            entry: {
              product_id: e[i].product_id,
              quantity: e[i].quantity,
              total: totalEntry,
              selectedSize: e[i].selectedSize
            }
          };

          $.ajax({
            url: "/shopping_carts/" + result.id + "/entries",
            type: "POST",
            data: entry,
            success: function(result, status, xhr){
              localStorage.clear();
              window.location.href = "/thank_you";
            },
            error: function(err, status, xhr){
              console.log(err);
            }
          });
        }
      }
    });

  }

});

function deleteItemEntries(indexItem){
  var items = 0;
  e.forEach(function(item, index){
    items++;
  });

  e.splice(indexItem, 1);
  localStorage.setItem('entries', JSON.stringify(e));
  if (items == 1) {
    localStorage.clear();
  }

}

function updateNumberCart(){
  var number = parseInt($('#cart-items').text());
  if (number < 2)
    $('#cart-items').text("");
  else
    $('#cart-items').text(number-1);
}

function updateQuantity(data, name, qty) {
    data.forEach(function(item, index){
      if(item.name ==  name)
        item.quantity = qty;
    });
    localStorage.setItem('entries', JSON.stringify(data));
}

function getIndexToRemove(data, name) {
  var indexToRemove;
  data.forEach(function(item, index){
    if(item.name ==  name)
      indexToRemove = index;
  });
  return indexToRemove;
}

function setCartItems() {
  if(localStorage.getItem('entries') != null)
    var e = JSON.parse(localStorage.getItem('entries'));

  if(e)
    $('#cart-items').text(e.length);
}

function loadProducts(entries){
  if (entries) {
    for (var i = 0; i < entries.length; i++) {
      lp(entries[i], entries[i].quantity);
    }
  }
}

function lp(e, qty){
  var selected_size;
  $.ajax({
    url: "/products/" + e.product_id,
    type: "GET",
    success: function(result, status, xhr){
      if(e.selectedSize){
        selected_size = e.selectedSize;
      }
      else {
        selected_size = "not selected";
      }
      $('#prods').append(`
            <tr class="g-brd-bottom g-brd-gray-light-v3">
              <td class="text-left g-py-25">
                <img class="d-inline-block g-width-100 mr-4" src="${result.url}" alt="${result.name}">
                <div class="d-inline-block align-middle">
                  <h4 class="name h6 g-color-black">${result.name.toUpperCase()}</h4>
                  <ul id="product-info-${result.id}" class="list-unstyled g-color-gray-dark-v4 g-font-size-12 g-line-height-1_6 mb-0">
                    <li>Size: ${selected_size}</li>
                  </ul>
                </div>
              </td>
              <td class="g-color-gray-dark-v2 g-font-size-13 price">&euro; ${e.price}</td>
              <td class="qty">
                <div id="div-input" class="js-quantity input-group u-quantity-v1 g-width-80 g-brd-primary--focus">
                  <input id="input" class="js-result form-control text-center g-font-size-13 rounded-0 g-pa-0" type="text" value="${qty}" readonly>

                  <div class="input-group-addon d-flex align-items-center g-width-30 g-brd-gray-light-v2 g-bg-white g-font-size-12 rounded-0 g-px-5 g-py-6">
                    <i class="js-plus g-color-gray g-color-primary--hover fa fa-angle-up"></i>
                    <i class="js-minus g-color-gray g-color-primary--hover fa fa-angle-down"></i>
                  </div>
                </div>
              </td>
              <td id="last-column" class="text-right g-color-black">
                <span id="span" class="g-color-gray-dark-v2 g-font-size-13 mr-4">&euro; ${result.price}</span>
                <span class="g-color-gray-dark-v4 g-color-black--hover g-cursor-pointer">
                  <i class="trash mt-auto fa fa-trash"></i>
                </span>
              </td>
            </tr>
          `);
    },
    complete: function(){
      updateTotal();
    }
  });
}


function fillQuantity(){
  var i = 0;
  var name;
  var  qty;

  $('#prods tr').each(function() {
    if (i++ != 0) {
      qty = $(this).children("#qty").children("#div-input").children("#input");
      name = $(this).children('td:first').children('div:first').children('h4').text();

      e.forEach(function(item, index){
        if(item.name ==  name)
          qty.val(item.quantity);
      });

    }
  });

}

function updateTotal(){
  var qty;
  var price;
  var i = 0;
  var total = 0;

  $('#prods tr').each(function() {
    if (i++ != 0) {
      price = parseFloat($(this).children('.price').text().substr(2));
      console.log(price);
      qty = parseInt($(this).children(".qty").children("#div-input").children("#input").val());
      total += price*qty;
      $(this).children("#last-column").children("#span").html("&euro; " + price*qty);
    }
  });

  $('.subtotal').html("&euro; "+total);
  $('.total').html("&euro; "+(Math.round(total*1.16 * 100) / 100));

}
