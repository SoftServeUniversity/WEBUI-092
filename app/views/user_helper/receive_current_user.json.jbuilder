if @user
  json.partial! 'shared/user_jbuilder', resource: @user
else
  false
end