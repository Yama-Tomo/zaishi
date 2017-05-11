class AddColumnsUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :provider, :string
    add_column :users, :uid, :string
    add_column :users, :access_token, :string, default: nil
    add_column :users, :access_secret, :string, default: nil
    add_column :users, :username, :string, default: nil
    add_column :users, :profile_img, :string, default: nil
  end
end
