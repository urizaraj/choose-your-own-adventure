class Branch < ApplicationRecord
  belongs_to :parent, class_name: 'Branch', optional: true
  has_many :branches, foreign_key: 'parent_id'
  belongs_to :story
  belongs_to :user

  validates :title, presence: true
  validates :body, presence: true
  validate :zero_or_one_type

  def zero_or_one_type
    return unless self.end && self.returnable
    errors.add(:base, 'Cannot be returnable and an ending.')
  end
end
