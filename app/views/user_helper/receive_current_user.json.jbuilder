if @user
  json.id           @user.id
  json.name         @user.name
  json.last_name    @user.last_name
  json.middle_name  @user.middle_name
  json.email        @user.email
  json.role_pending @user.role_pending
  if @user.teacher
    json.teacher_attributes do 
      json.department_id @user.teacher.department_id
      json.degree        @user.teacher.degree
      json.title         @user.teacher.title
    end
  end
  if @user.student
    json.student_attributes do 
      json.group_id      @user.student.group_id
      json.group_pending @user.student.group_pending
    end
  end
else
  false
end