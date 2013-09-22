module UserInfo
  # get current user name
  def current_user
    Thread.current[:user].nil? ? "anonymous" : Thread.current[:user]
  end
  # store current user name
  def self.current_user=(user)
    unless user.nil?
      Thread.current[:user] = user.name + " " + user.last_name;
    else
      Thread.current[:user] = nil;
    end
  end
end