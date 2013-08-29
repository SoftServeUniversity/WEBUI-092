module UserInfo
  # get current user name
  def current_user
    Thread.current[:user].nil? ? "anonymous" : Thread.current[:user]
  end
  # store current user name
  def self.current_user=(user)
    Thread.current[:user] = user
  end
end