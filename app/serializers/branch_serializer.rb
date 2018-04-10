class BranchSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :end, :returnable
  has_many :branches
  belongs_to :user
end
