class Genre
  include ZaimModel

  def self.find(conditions = {})
    new.find conditions
  end

  def find(conditions = {})
    genres conditions
  end
end
