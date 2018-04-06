class CreateStories < ActiveRecord::Migration[5.1]
  def change
    create_table :stories do |t|
      t.string :title
      t.string :content
      t.integer :start_branch_id
      t.timestamps
    end
  end
end
