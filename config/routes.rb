Rails.application.routes.draw do
  resources :stories
  devise_for :users

  root to: 'static#home'
end
