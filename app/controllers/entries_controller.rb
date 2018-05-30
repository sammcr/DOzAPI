class EntriesController < ApplicationController
  before_action :set_shopping_cart
  before_action :set_entry, only: [:show, :update, :destroy]
  # GET /shopping_carts/:id/entries
  def index
    @entries = Entry.all.paginate(page: params[:page], per_page: 12)
    @entries = Entry.where('shopping_cart_id = ?', @shopping_cart.id).paginate(page: params[:page], per_page: 12).order("created_at DESC") if @shopping_cart
    set_custom_headers @entries
    render json: @entries
  end
  # GET shopping_carts/:id/entries/:id
  def show
    render json: @entry
  end
  # POST shopping_carts/:id/entries
  def create
    @entry = @shopping_cart.entries.new(entry_params)
    if @entry.save
      render json: @entry, status: :created, location: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end
  # PATCH/PUT shopping_carts/:id/entries/:id
  def update
    if @entry.update(entry_params)
      render json: @entry
    else
      render json: @entry.errors, status: :unprocessable_entity
    end
  end
  # DELETE shopping_carts/:id/entries/:id
  def destroy
    @entry.destroy
  end
  private
  # Use callbacks to share common setup or constraints between actions.
  def set_entry
    @entry = @shopping_cart.entries.find(params[:id]) if @shopping_cart
  end
  # Only allow a trusted parameter "white list" through.
  def entry_params
    params.require(:entry).permit(:product_id, :quantity, :total, :selected_size)
  end
  def set_shopping_cart
    @shopping_cart = ShoppingCart.find(params[:shopping_cart_id])
  end
  def set_custom_headers entries
    response.set_header('X-CurrentPage', entries.current_page)
    response.set_header('X-TotalPages', entries.total_pages)
    response.set_header('X-NumberEntries', entries.total_entries)
    response.set_header('Access-Control-Expose-Headers', 'X-CurrentPage, X-TotalPages, X-NumberEntries')
  end
end
