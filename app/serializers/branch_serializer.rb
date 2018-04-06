class BranchSerializer < ActiveModel::Serializer
  attributes :id, :title, :body
  has_many :branches
end
