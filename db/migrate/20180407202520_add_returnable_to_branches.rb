class AddReturnableToBranches < ActiveRecord::Migration[5.1]
  def change
    add_column :branches, :returnable, :boolean, default: true
  end
end
