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
  end
end
if resource.student
  json.student_attributes do 
    json.group_id      resource.student.group_id
    json.group_pending resource.student.group_pending
  end
end