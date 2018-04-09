class StorySerializer < ActiveModel::Serializer
  attributes :id, :title, :description
  has_many :branches
end
