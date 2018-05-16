class CreateShoppingCarts < ActiveRecord::Migration[5.1]
  def change
    create_table :shopping_carts do |t|
      t.integer :subtotal
      t.integer :total
      t.string :shipping
      t.string :address
      t.string :notes

      t.timestamps
    end
  end
end
