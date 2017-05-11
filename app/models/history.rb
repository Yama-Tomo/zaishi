class History
  include ZaimModel

  def self.find(conditions = {})
    new.find conditions
  end

  def find(conditions = {})
    money_histories conditions
  end
end
