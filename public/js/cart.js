var localStorage = window.localStorage;
var entries = JSON.parse(localStorage.getItem('entries'));

$(document).ready(function(){

  console.log(entries);
  loadProducts();
  setCartItems();

})

$('body').on('click', 'i.js-plus', function(){
  var qty = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  var name = $(this).parents('tr').children('td:first').children('div:first').children('h4').text();

  qty += 1;
  $(this).parents('td:first').children('div:first').children("input:first").val(qty);

  updateQuantity(entries, name, qty)

  updateTotal();
});

$('body').on('click', 'i.js-minus', function(){
  var qty = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  var name = $(this).parents('tr').children('td:first').children('div:first').children('h4').text();

  if (qty > 1){
    qty -= 1;
  }
  $(this).parents('td:first').children('div:first').children("input:first").val(qty);

  updateQuantity(entries, name, qty);

  updateTotal();
});

$('body').on('click', 'i.trash', function(){
  // Remove row of entry
  $(this).parents('td:first').parents('tr:first').remove();

  var name = $(this).parents('tr:first').children('td:first').children('div:first').children('h4').text();
  deleteItemEntries(getIndexToRemove(entries, name));

  updateNumberCart();

  updateTotal();
});

$('body').on('click', '#make-order', function(){
  if (entries) {

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

    var shopping_cart = {
      subtotal: subtotal,
      total: total,
      notes: notes,
      shipping_address: {
        nombre: nombre,
        apellido: apellido,
        email: email,
        state: state,
        zip: zip,
        adress: adress,
        telefono: telefono
      }
    };

    shopping_cart = {shopping_cart: shopping_cart};

    $.ajax({
      url: "/shopping_carts",
      type: "POST",
      data: shopping_cart,
      success: function(result, status, xhr) {
        for (var i = 0; i < entries.length; i++) {

          var totalEntry = entries[i].price * entries[i].quantity;

          var entry = {
            product_id: entries[i].product_id,
            quantity: entries[i].quantity,
            total: totalEntry,
            selectedSize: entries[i].selectedSize
          }

          entry = {entry: entry};

          $.ajax({

            url: "/shopping_carts/" + result.id + "/entries",
            type: "POST",
            data: entry
          });
        }
        window.location.href = "/";
      }
    });

  }

});

function deleteItemEntries(indexItem){
  var items = 0;
  entries.forEach(function(item, index){
    items++;
  });

  entries.splice(indexItem, 1);
  localStorage.setItem('entries', JSON.stringify(entries));

  if (items == 1)
    localStorage.clear();

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
    localStorage.setItem('entries', JSON.stringify(entries));
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
    var entries = JSON.parse(localStorage.getItem('entries'));

  if(entries)
    $('#cart-items').text(entries.length);
}

function loadProducts(){

  if (entries) {

    for (var i = 0; i < entries.length; i++) {

      $.ajax({
        url: "/products/" + entries[i].product_id,
        type: "GET",
        success: function(result, status, xhr, quantity){

          $("#prods").append(`
            <tr class="g-brd-bottom g-brd-gray-light-v3">
              <td class="text-left g-py-25">
                <img class="d-inline-block g-width-100 mr-4" src="${result.url}" alt="${result.name}">
                <div class="d-inline-block align-middle">
                  <h4 class="name h6 g-color-black">${result.name}</h4>
                  <ul class="list-unstyled g-color-gray-dark-v4 g-font-size-12 g-line-height-1_6 mb-0">
                    <li>Width: ${result.width}</li>
                    <li>Size: Nose</li>
                  </ul>
                </div>
              </td>
              <td id="price" class="g-color-gray-dark-v2 g-font-size-13">$ ${result.price}</td>
              <td id="qty">
                <div id="div-input" class="js-quantity input-group u-quantity-v1 g-width-80 g-brd-primary--focus">
                  <input id="input" class="js-result form-control text-center g-font-size-13 rounded-0 g-pa-0" type="text" value="1" readonly>

                  <div class="input-group-addon d-flex align-items-center g-width-30 g-brd-gray-light-v2 g-bg-white g-font-size-12 rounded-0 g-px-5 g-py-6">
                    <i class="js-plus g-color-gray g-color-primary--hover fa fa-angle-up"></i>
                    <i class="js-minus g-color-gray g-color-primary--hover fa fa-angle-down"></i>
                  </div>
                </div>
              </td>
              <td id="last-column" class="text-right g-color-black">
                <span id="span" class="g-color-gray-dark-v2 g-font-size-13 mr-4">$ ${result.price}</span>
                <span class="g-color-gray-dark-v4 g-color-black--hover g-cursor-pointer">
                  <i class="trash mt-auto fa fa-trash"></i>
                </span>
              </td>
            </tr>
          `);
        },
        complete: function(){
          updateTotal();
          fillQuantity();
        }
      });

    }

  }

}

function fillQuantity(){
  var i = 0;
  var name;
  var  qty;

  $('#prods tr').each(function() {
    if (i++ != 0) {
      qty = $(this).children("#qty").children("#div-input").children("#input");
      name = $(this).children('td:first').children('div:first').children('h4').text();

      entries.forEach(function(item, index){
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
      price = parseFloat($(this).children('#price').text().substr(2));
      qty = parseInt($(this).children("#qty").children("#div-input").children("#input").val());
      total += price*qty;
      $(this).children("#last-column").children("#span").text("$ " + price*qty + ".0")
    }
  });

  $('.subtotal').text("$ "+total+".0");
  $('.total').text("$ "+(Math.round(total*1.16 * 100) / 100));

}
