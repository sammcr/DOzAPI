class ProductsController < ApplicationController
  before_action :set_product, only: [:show, :update, :destroy]

  # GET /categories/1/products
  def index
    @products = Product.all.paginate(page: params[:page], per_page: get_pagination)
    @products = Product.where('category_id = ?', category).paginate(page: params[:page], per_page: get_pagination).order("created_at DESC") if category
    set_custom_headers @products
    render json: @products
  end

  # GET /products/2
  def show
    render json: @product, include: {category: {only: :name}}
  end

  # POST /products
  def create
    @product = Product.new(product_params)

    if @product.save
      render json: @product, status: :created, location: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /products/1
  def update
    if @product.update(category_params)
      render json: @product
    else
      render json: @product.errors, status: :unprocessable_entity
    end
  end

  # DELETE /products/1
  def destroy
    @product.destroy
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_product
    @product = Product.find(params[:id])
  end

  # Only allow a trusted parameter "white list" through.
  def product_params
    params.require(:product).permit(:name, :category_id)
  end

  def category
    params[:category_id]
  end

  def set_custom_headers products
    response.set_header('X-CurrentPage', products.current_page)
    response.set_header('X-TotalPages', products.total_pages)
    response.set_header('X-NumberProducts', products.total_entries)
    response.set_header('Access-Control-Expose-Headers', 'X-CurrentPage, X-TotalPages, X-NumberProducts')
  end

  def get_pagination
    if params[:per_page]
      params[:per_page].to_i > 500 ? @per_page = 500 : @per_page = params[:per_page]
    else
      @per_page = 12
    end
  end

end
