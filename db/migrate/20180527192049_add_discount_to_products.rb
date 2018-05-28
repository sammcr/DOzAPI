class AddDiscountToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :discount, :float
  end
end
