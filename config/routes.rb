Rails.application.routes.draw do
  mount ActionCable.server => '/cable'
  resources :categories do
    resources :products, shallow: true
  end

end
