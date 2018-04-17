class StorySerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_many :branches

  class BranchSerializer < ActiveModel::Serializer
    attributes :id, :end
  end
end
