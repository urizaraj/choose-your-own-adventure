Rails.application.routes.draw do
  root to: 'static#home'
  
  resources :stories do
    resources :branches
  end

  devise_for :users
end
