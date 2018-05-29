$(document).ready(function(){
  var localStorage = window.localStorage;
  var entries = JSON.parse(localStorage.getItem('entries'));

  loadProducts(entries);

})

$('body').on('click', 'i.js-plus', function(){
  var input = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  input += 1;
  $(this).parents('td:first').children('div:first').children("input:first").val(input);
  updateTotal();

});

$('body').on('click', 'i.js-minus', function(){
  var input = parseInt($(this).parents('td:first').children('div:first').children("input:first").val());
  if (input > 1){
    input -= 1;
  }
  $(this).parents('td:first').children('div:first').children("input:first").val(input);
  updateTotal();
});

function loadProducts(entries){

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
                <h4 class="h6 g-color-black">${result.name}</h4>
                <ul class="list-unstyled g-color-gray-dark-v4 g-font-size-12 g-line-height-1_6 mb-0">
                  <li>Width: ${result.width}</li>
                  <li>Size: Nose</li>
                </ul>
              </div>
            </td>
            <td class="g-color-gray-dark-v2 g-font-size-13">$ ${result.price}</td>
            <td>
              <div class="js-quantity input-group u-quantity-v1 g-width-80 g-brd-primary--focus">
                <input id="input${result.name}" class="js-result form-control text-center g-font-size-13 rounded-0 g-pa-0" type="text" value="1" readonly>

                <div class="input-group-addon d-flex align-items-center g-width-30 g-brd-gray-light-v2 g-bg-white g-font-size-12 rounded-0 g-px-5 g-py-6">
                  <i class="js-plus g-color-gray g-color-primary--hover fa fa-angle-up"></i>
                  <i class="js-minus g-color-gray g-color-primary--hover fa fa-angle-down"></i>
                </div>
              </div>
            </td>
            <td class="text-right g-color-black">
              <span id="span${result.name}" class="g-color-gray-dark-v2 g-font-size-13 mr-4">$ ${result.price}</span>
              <span class="g-color-gray-dark-v4 g-color-black--hover g-cursor-pointer">
                <i class="mt-auto fa fa-trash"></i>
              </span>
            </td>
          </tr>
        `);
      }
    });
  }
}

function updateTotal(entries){
  var row;
  var i = 0;
  $('#prods tr').each(function() {
    row[i++] = $(this).children('.js-result').val();
    alert(row[i]);
  });
}
