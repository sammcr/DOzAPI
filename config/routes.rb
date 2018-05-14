Rails.application.routes.draw do
  resources :categories do
    resources :products, shallow: true
  end

end
