class BranchSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :end, :returnable
  has_many :branches
  belongs_to :user

  attribute :same_user

  def same_user
    (current_user == object.user) || current_user.admin if current_user
  end

  class BranchSerializer < ActiveModel::Serializer
    attributes :id, :title
  end
end
