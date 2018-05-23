class Category < ApplicationRecord
  has_many :categories, class_name: "Category", foreign_key: "parent_id"
  belongs_to :parent, class_name: "Category", required: false
  has_many :products, dependent: :delete_all
end
