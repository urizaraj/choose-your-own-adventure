class CreateBranches < ActiveRecord::Migration[5.1]
  def change
    create_table :branches do |t|
      t.string :title
      t.string :body
      t.integer :story_id
      t.timestamps
    end
  end
end
