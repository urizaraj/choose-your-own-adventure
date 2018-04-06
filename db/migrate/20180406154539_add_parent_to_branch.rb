class AddParentToBranch < ActiveRecord::Migration[5.1]
  def change
    add_column :branches, :parent_id, :integer
  end
end
