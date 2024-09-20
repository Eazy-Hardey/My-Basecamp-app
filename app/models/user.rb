class User < ApplicationRecord
  has_many :projects
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  def toggle_admin
    self.admin = !admin
    save
  end
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
