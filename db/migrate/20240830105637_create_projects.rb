class CreateProjects < ActiveRecord::Migration[7.2]
  def change
    create_table :projects do |t|
      t.string :project_name
      t.text :project_discription

      t.timestamps
    end
  end
end
