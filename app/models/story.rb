class Story < ApplicationRecord
  belongs_to :start_branch, class_name: 'Branch'
  has_many :branches
end
