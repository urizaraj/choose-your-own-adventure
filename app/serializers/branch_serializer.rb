class BranchSerializer < ActiveModel::Serializer
  attributes :id, :title, :body, :end
  has_many :branches
end
