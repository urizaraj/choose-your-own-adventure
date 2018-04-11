class ChangeBranchReturnableDefaultToFalse < ActiveRecord::Migration[5.1]
  def change
    change_column_default :branches, :returnable, from: true, to: false
  end
end
