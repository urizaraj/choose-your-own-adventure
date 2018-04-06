class AddEndToBranch < ActiveRecord::Migration[5.1]
  def change
    add_column :branches, :end, :boolean, default: false
  end
end
