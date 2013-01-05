class AddEmployeeToKudos < ActiveRecord::Migration
  def up
    add_column :kudos, :employee_id, :integer
  end

  def down
    remove_column :kudos, :employee_id
  end

end
