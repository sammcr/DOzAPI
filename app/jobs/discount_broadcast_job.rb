class DiscountBroadcastJob < ApplicationJob
  queue_as :default
  def perform(product)
    ActionCable.server.broadcast "discount_channel", product: product
  end
end