class StaticController < ApplicationController
  before_action :require_admin, only: %i[admin]
  def home
  end

  def admin
  end
end