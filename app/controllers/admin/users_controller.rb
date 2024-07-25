module Admin
  class UsersController < Admin::ApplicationController
    before_action :authenticate_user!
    before_action :require_admin, only: [:grant_admin, :revoke_admin]

    def grant_admin
      user = User.find(params[:id])
      user.update(admin: true)
      redirect_to admin_users_path, notice: "#{user.email} is now an admin"
    end

    def revoke_admin
      user = User.find(params[:id])
      user.update(admin: false)
      redirect_to admin_users_path, notice: "#{user.email} is no longer an admin"
    end

    private

    def require_admin
      redirect_to root_path, alert: 'Access denied' unless current_user.admin?
    end
  end
end
