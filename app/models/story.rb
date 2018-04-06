class Story < ApplicationRecord
  has_one :start_branch, class_name: 'Branch'
  has_many :branches
end
