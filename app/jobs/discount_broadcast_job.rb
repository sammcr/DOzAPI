class DiscountBroadcastJob < ApplicationJob
  def perform(product)
    ActionCable.server.broadcast "discount_channel", product: product
  end
end