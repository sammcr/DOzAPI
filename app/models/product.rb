require "bunny"
class Product < ApplicationRecord
  belongs_to :category
  has_many :entries
  after_create :send_rabbit

  private

  def send_rabbit
    b = Bunny.new('amqp://ibawrdgw:CvGZrUCmBL8mfTz0PY4MmPHUKDhJFfno@emu.rmq.cloudamqp.com/ibawrdgw')
    b.start # start a communication session with the amqp server
    channel = b.create_channel
    #queue = channel.queue('hello')
    exchange = channel.fanout('products')
    exchange.publish(self.to_json, routing_key: 'hello')
    b.close
  end
end
