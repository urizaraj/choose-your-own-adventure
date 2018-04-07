Rails.application.routes.draw do
  root to: 'static#home'

  get '/admin', to: 'static#admin'
  
  resources :stories do
    resources :branches
  end

  devise_for :users
end
