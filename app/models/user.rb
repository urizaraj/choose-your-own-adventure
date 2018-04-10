class User < ApplicationRecord
  attr_accessor :login

  has_many :stories
  has_many :branches
  has_many :forks, through: :branches, source: :story

  validates :name, presence: true, uniqueness: { case_sensitive: false }
  validates_format_of :name, with: /^[a-zA-Z0-9_\.]*$/, multiline: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    if login = conditions.delete(:login)
      where(conditions.to_h).where(['lower(name) = :value OR lower(email) = :value', { value: login.downcase }]).first
    elsif conditions.key?(:name) || conditions.key?(:email)
      where(conditions.to_h).first
    end
  end
end
