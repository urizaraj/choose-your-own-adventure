class Branch < ApplicationRecord
  belongs_to :parent, class_name: 'Branch', optional: true
  has_many :branches, foreign_key: 'parent_id'
  belongs_to :story
  belongs_to :user
end
