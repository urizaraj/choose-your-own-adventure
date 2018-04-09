class Story < ApplicationRecord
  belongs_to :start_branch, class_name: 'Branch'
  belongs_to :user
  has_many :branches
end
