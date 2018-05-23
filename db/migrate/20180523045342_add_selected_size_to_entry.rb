class AddSelectedSizeToEntry < ActiveRecord::Migration[5.1]
  def change
    add_column :entries, :selected_size, :string
  end
end
