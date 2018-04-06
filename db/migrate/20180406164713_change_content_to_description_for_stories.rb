class ChangeContentToDescriptionForStories < ActiveRecord::Migration[5.1]
  def change
    rename_column :stories, :content, :description
  end
end
