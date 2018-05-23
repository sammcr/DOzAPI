puts '==> Filling the \'products\' table...'

Product.delete_all

# Restarts ids to 1
ActiveRecord::Base.connection.reset_pk_sequence!('products')

after :categories do
  argent = Category.find_by_name('Argent').id
  rings = Category.find_by_name('Rings').id
  collectibles = Category.find_by_name('69 Collectibles').id
  premier = Category.find_by_name('Premier').id

  Product.create(name: 'b0071', price: 39.00, width: 9, sizes: %w{M L XL}, url: 'https://i.imgur.com/5ofMZGw.jpg', category_id: argent)
  Product.create(name: 'b0070', price: 29.00, width: 6, sizes: %w{M L XL}, url: 'https://i.imgur.com/fuS936T.jpg', category_id: argent)
  Product.create(name: 'b0069', price: 39.00, width: 9, sizes: %w{M L XL}, url: 'https://i.imgur.com/N9WY7x3.jpg', category_id: argent)
  Product.create(name: 'b0068', price: 29.00, width: 6, sizes: %w{M L XL}, url: 'https://i.imgur.com/N77o0JV.jpg', category_id: argent)
  Product.create(name: 'b0067', price: 39.00, width: 9, sizes: %w{M L XL}, url: 'https://i.imgur.com/QjAihdA.jpg', category_id: argent)
  Product.create(name: 'b0066', price: 29.00, width: 6, sizes: %w{M L XL}, url: 'https://i.imgur.com/vHXliju.jpg', category_id: argent)
  Product.create(name: 'b0113', price: 29.00, width: 9, sizes: %w{M L XL}, url: 'https://i.imgur.com/i7fidV9.jpg', category_id: argent)
  Product.create(name: 'b0112', price: 29.00, width: 4, sizes: %w{M L XL}, url: 'https://i.imgur.com/zVszQwc.jpg', category_id: argent)
  Product.create(name: 'b0111', price: 29.00, width: 4, sizes: %w{M L XL}, url: 'https://i.imgur.com/KtxHeJm.jpg', category_id: argent)


  Product.create(name: 'r0791', price: 39.00, weight: 14.40, sizes: [48, 72], url: 'https://i.imgur.com/r0UnvyQ.jpg', category_id: rings)
  Product.create(name: 'r0792', price: 39.00, weight: 15.50, sizes: [48, 72], url: 'https://i.imgur.com/UJQqKRA.jpg', category_id: rings)
  Product.create(name: 'r0793', price: 39.00, weight: 16.80, sizes: [48, 72], url: 'https://i.imgur.com/zO1NzfM.jpg', category_id: rings)
  Product.create(name: 'r0871', price: 19.00, weight: 11.00, sizes: [48, 72], url: 'https://i.imgur.com/gsiaB2L.jpg', category_id: rings)
  Product.create(name: 'r0872', price: 29.00, weight: 13.50, sizes: [48, 72], url: 'https://i.imgur.com/hMAw8zb.jpg', category_id: rings)
  Product.create(name: 'r0873', price: 39.00, weight: 19.00, sizes: [48, 72], url: 'https://i.imgur.com/ruCUreO.jpg', category_id: rings)
  Product.create(name: 'r0771', price: 19.00, weight: 11.00, sizes: [48, 72], url: 'https://i.imgur.com/ZQBeOYe.jpg', category_id: rings)
  Product.create(name: 'r0772', price: 29.00, weight: 13.50, sizes: [48, 72], url: 'https://i.imgur.com/KeeDHQL.jpg', category_id: rings)
  Product.create(name: 'r0773', price: 39.00, weight: 19.00, sizes: [48, 72], url: 'https://i.imgur.com/Htep9iN.jpg', category_id: rings)

  Product.create(name: 'e0063-b6', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/dHRlhgm.jpg', category_id: collectibles)
  Product.create(name: 'e0063-b5', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/OXKXEna.jpg', category_id: collectibles)
  Product.create(name: 'e0063-b4', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/pIcyfc2.jpg', category_id: collectibles)
  Product.create(name: 'e0063-b3', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/Wn0aWmq.jpg', category_id: collectibles)
  Product.create(name: 'e0063-b2', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/MKwK41N.jpg', category_id: collectibles)
  Product.create(name: 'e0063-b1', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/PEkauQl.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b6', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/zHhc4g8.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b5', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/vvhP5Lh.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b4', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/Wv6N9SY.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b3', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/a0laGeH.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b2', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/NS09Wxg.jpg', category_id: collectibles)
  Product.create(name: 'e0061-b1', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/6tYpA8N.jpg', category_id: collectibles)
  Product.create(name: 'e0096-6', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/7zzN7J1.jpg', category_id: collectibles)
  Product.create(name: 'e0096-5', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/MLHj3yg.jpg', category_id: collectibles)
  Product.create(name: 'e0096-4', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/97gvhbe.jpg', category_id: collectibles)
  Product.create(name: 'e0096-3', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/R0gwL3a.jpg', category_id: collectibles)
  Product.create(name: 'e0096-2', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/3ko8FmO.jpg', category_id: collectibles)
  Product.create(name: 'e0096-1', price: 12.00, weight: 5.20, sizes: %w{S M L XL}, url: 'https://i.imgur.com/Cp7tXeW.jpg', category_id: collectibles)
  Product.create(name: 'e0094-4', price: 12.00, weight: 2.30, sizes: %w{S M L XL}, url: 'https://i.imgur.com/zAihmv7.jpg', category_id: collectibles)
  Product.create(name: 'e0164-5', price: 12.00, weight: 4.30, sizes: %w{S M L XL}, url: 'https://i.imgur.com/uxMPK1L.jpg', category_id: collectibles)
  Product.create(name: 'e0068-2', price: 12.00, weight: 1.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/PINTpR8.jpg', category_id: collectibles)
  Product.create(name: 'e0065-4', price: 9.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/A2ZAjMO.jpg', category_id: collectibles)
  Product.create(name: 'e0301-3', price: 12.00, weight: 0.40, sizes: %w{S M L XL}, url: 'https://i.imgur.com/W7symLm.jpg', category_id: collectibles)

  Product.create(name: 'z3003-1', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/qkWN7QE.jpg', category_id: premier)
  Product.create(name: 'z3003-2', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/8quQQLA.jpg', category_id: premier)
  Product.create(name: 'z3004', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/Lk33heX.jpg', category_id: premier)
  Product.create(name: 'z3021', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/nzWAJ8F.jpg', category_id: premier)
  Product.create(name: 'z3022', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/8u1oXxo.jpg', category_id: premier)
  Product.create(name: 'z3026', price: 42.00, weight: 15.93, sizes: %w{S M L XL}, url: 'https://i.imgur.com/kf9brYE.jpg', category_id: premier)
  Product.create(name: 'z0113', price: 49.00, weight: 19.73, sizes: %w{S M L XL}, url: 'https://i.imgur.com/s4xNLYy.jpg', category_id: premier)
  Product.create(name: 'z0112', price: 49.00, weight: 19.73, sizes: %w{S M L XL}, url: 'https://i.imgur.com/rQOBF8G.jpg', category_id: premier)
  Product.create(name: 'z0110', price: 49.00, weight: 19.73, sizes: %w{S M L XL}, url: 'https://i.imgur.com/pLdjOzd.jpg', category_id: premier)

end