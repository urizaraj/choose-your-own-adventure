Rails.application.routes.draw do
  resources :branches
  resources :stories
  devise_for :users

  root to: 'static#home'
end
