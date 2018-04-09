class AddUsersToStoriesAndBranches < ActiveRecord::Migration[5.1]
  def change
    add_column :stories, :user_id, :integer
    add_column :branches, :user_id, :integer
  end
end
