class CreateEntries < ActiveRecord::Migration[5.1]
  def change
    create_table :entries do |t|
      t.references :product, foreign_key: true
      t.integer :quantity
      t.integer :total
      t.references :shopping_cart, foreign_key: true

      t.timestamps
    end
  end
end
