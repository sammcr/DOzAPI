class DiscountChannel < ApplicationCable::Channel
  def subscribed
    stream_from "discount_channel"
  end
end