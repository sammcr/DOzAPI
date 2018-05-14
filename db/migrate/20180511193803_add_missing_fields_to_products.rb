class AddMissingFieldsToProducts < ActiveRecord::Migration[5.1]
  def change
    add_column :products, :price, :decimal
    add_column :products, :weight, :float
    add_column :products, :width, :float
    add_column :products, :length, :float
    add_column :products, :url, :string
    add_column :products, :description, :text
  end
end
