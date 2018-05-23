class RemoveShippingAndAddressFromShoppingCarts < ActiveRecord::Migration[5.1]
  def change
    remove_column :shopping_carts, :shipping, :string
    remove_column :shopping_carts, :address, :string
  end
end
