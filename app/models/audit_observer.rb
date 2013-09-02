class AuditObserver < ActiveRecord::Observer
  include UserInfo
  observe :work, :task

  def after_update(record)
    value = ""
    record.changes.each_key { |key|
      if !key.include? "_id" and !key.include? "_at" and key != 'id' and key != 'priority'
        value = value + "#{key} was changed from  #{record.changes[key][0]} to #{record.changes[key][1]} "
      end
    }
    if value != ""
      process_record(record, "UPDATE", value)
    end
  end

  def after_create(record)
    value = "";
    record.attributes.each_pair do |att_name, att_value|
      if !att_name.include? "_id" and !att_name.include? "_at" and att_name != 'id' and att_name != 'priority'
        value = value + "#{att_name} - #{att_value}; "
      end
    end
    process_record(record, "CREATE", value)
    end

  def after_destroy(record)
    process_record(record, "DELETE", 'ITEM DELETED')
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