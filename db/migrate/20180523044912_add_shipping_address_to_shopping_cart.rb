class AddShippingAddressToShoppingCart < ActiveRecord::Migration[5.1]
  def change
    add_column :shopping_carts, :shipping_address, :json
  end
end
