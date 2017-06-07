Rails.application.routes.draw do

  mount RailsAdmin::Engine => '/admin', as: 'rails_admin'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :refuges, only: [:index, :create] do
        resources :entities, only: :index
        resources :responses, only: :create
        collection do
          get :multiple_choice_ids
        end
      end
    end
  end

  scope ":locale", locale: /#{I18n.available_locales.join("|")}/ do
    root 'refuges#index'
    resources :refuges, only: [:index, :show] do
      member do
        get :detail
        get :historical_issues_by_entity
      end
      collection do
        get :filter_by
      end
    end
  end

  match '*path', to: redirect("/#{I18n.default_locale}/%{path}"), via: :all
  match '', to: redirect("/#{I18n.default_locale}"), via: :all

end
