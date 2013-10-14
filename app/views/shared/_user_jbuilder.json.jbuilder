json.id                resource.id
json.name              resource.name
json.last_name         resource.last_name
json.middle_name       resource.middle_name
json.email             resource.email
json.role_pending      resource.role_pending
if resource.teacher
  json.teacher_attributes do
    json.department_id resource.teacher.department_id
    json.degree        resource.teacher.degree
    json.title         resource.teacher.title
    json.teacher_id    resource.teacher.id
  end
end
if resource.student
  json.student_attributes do
    json.student_id    resource.student.id
    json.group_id      resource.student.group_id
    json.group_pending resource.student.group_pending

  end
end
if resource.faculty_admin
  json.faculty_admin_attributes do
    json.faculty_id resource.faculty_admin.faculty_id
  end
end