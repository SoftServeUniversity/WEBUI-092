class AuditObserver < ActiveRecord::Observer
  include UserInfo
  observe :work, :task

  def after_update(record)
    process_record(record, "UPDATE")
  end

  def after_create(record)
    process_record(record, "CREATE")
    end

  def after_destroy(record)
    process_record(record, "DELETE")
  end

  def process_record(record, action)
    @thesisChange = ThesisChange.new
    @thesisChange.action = action
    value = "";
    record.attributes.each_pair do |att_name, att_value|
      if !att_name.include? "_id" and !att_name.include? "_at" and att_name != 'id'
        value = value + "#{att_name} - #{att_value}; "
      end
    end
    @thesisChange.value = value
    @thesisChange.auditable_id=record.id
    @thesisChange.auditable_type=record.class.name
    @thesisChange.user_name = current_user
    @thesisChange.save
  end

end