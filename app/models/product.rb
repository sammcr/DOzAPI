require "bunny"
class Product < ApplicationRecord
  belongs_to :category
  has_many :entries
  after_create :send_rabbit

  private

  def send_rabbit
    b = Bunny.new('amqp://nixzxhzf:sEQnsBGQ03B2r11798UCCsmcmmCXT1lh@eagle.rmq.cloudamqp.com/nixzxhzf')
    b.start # start a communication session with the amqp server
    channel = b.create_channel
    queue = channel.queue('hello')
    channel.default_exchange.publish(self.to_json, routing_key: queue.name)
    b.close
  end
end
