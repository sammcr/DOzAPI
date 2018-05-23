puts '==> Filling the \'categories\' table...'

Category.delete_all

# Restarts ids to 1
ActiveRecord::Base.connection.reset_pk_sequence!('categories')

Category.create(name: 'All')
all = Category.find_by_name('All')

all.categories.create(name: 'Argent')
all.categories.create(name: 'Rings')
all.categories.create(name: '69 Collectibles')
all.categories.create(name: 'Premier')
all.categories.create(name: 'New')
all.categories.create(name: 'Best sellers')