Rails.application.routes.draw do
  namespace :admin do
      resources :projects
      resources :users do
        member do
          patch :grant_admin
          patch :revoke_admin
        end
      end

      root to: "projects#index"
    end
  devise_for :users
  devise_scope :user do  
    get '/users/sign_out' => 'devise/sessions#destroy'     
 end
  resources :projects
  #get 'home/index'
 #get 'home/about'
  root 'home#index'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
 