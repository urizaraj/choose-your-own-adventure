class ChangeDescriptionFromStringToText < ActiveRecord::Migration[5.1]
  def up
    change_column :branches, :body, :text
    change_column :stories, :description, :text
  end

  def down
    change_column :branches, :body, :string
    change_column :stories, :description, :string
  end
end
