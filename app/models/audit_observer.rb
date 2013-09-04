class AuditObserver < ActiveRecord::Observer
  include UserInfo
  observe :work, :task, :task_progress

  def after_update(record)
    value = "";
    record.changes.each_key { |key|
      if key == "name"
        value = value + "ім'я \"#{record.changes[key][0]}\" на \"#{record.changes[key][1]}\" "
      end
      if key == "progress"
        if record.changes[key][0] != ""
          value = value + "прогрес з \"#{record.changes[key][0]}\" на \"#{record.changes[key][1]}\" "
        end
      end
    }
    if record.class.to_s == 'TaskProgress'
       record = record.task
    end
    prefix = (record.class.to_s == 'Work' ? "В роботі" : "В завданні") + "#{record.name} #{current_user} змінив: "
    if value == ""
      process_record(record, "UPDATE", prefix + value)
    end
  end

  def after_create(record)
    if record.class.to_s == 'TaskProgress'
      after_update(record)
    else
      process_record(record, "CREATE", current_user + " створив " + (record.class.to_s == 'Task' ? "завдання " : "роботу ") + record.name)
    end
  end

  def after_destroy(record)
    if record.class.to_s != 'TaskProgress'
      process_record(record, "DELETE", current_user + " видалив " + (record.class.to_s == 'Task' ? "завдання" : "роботу") + record.name)
    end
  end

  def process_record(record, action, value)
    @thesisChange = ThesisChange.new
    @thesisChange.action = action
    @thesisChange.value = value
    @thesisChange.auditable_id=record.id
    @thesisChange.auditable_type=record.class.name
    @thesisChange.user_name = current_user
    @thesisChange.save
    ThesisChangeMailer.notification(@thesisChange, record).deliver
  end

end