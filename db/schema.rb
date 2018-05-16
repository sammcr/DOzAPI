# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180516001621) do

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "parent_id"
    t.index ["parent_id"], name: "index_categories_on_parent_id"
  end

  create_table "entries", force: :cascade do |t|
    t.integer "product_id"
    t.integer "quantity"
    t.integer "total"
    t.integer "shopping_cart_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["product_id"], name: "index_entries_on_product_id"
    t.index ["shopping_cart_id"], name: "index_entries_on_shopping_cart_id"
  end

  create_table "products", force: :cascade do |t|
    t.string "name"
    t.integer "category_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.decimal "price"
    t.float "weight"
    t.float "width"
    t.float "length"
    t.string "url"
    t.text "description"
    t.index ["category_id"], name: "index_products_on_category_id"
  end

  create_table "shopping_carts", force: :cascade do |t|
    t.integer "subtotal"
    t.integer "total"
    t.string "shipping"
    t.string "address"
    t.string "notes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
