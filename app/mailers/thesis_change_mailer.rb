class ThesisChangeMailer < ActionMailer::Base
  default from: 'webui092@gmail.com'

  def notification (thesis_change, record)
    @thesis_change = thesis_change
    @record = record
    if (record.class.to_s == 'Task')
      email = record.work.student.user.email
      link_to = 'task'
    else
      email = record.student.user.email
      link_to = 'work'
    end
    @record_url = "http://#{ActionMailer::Base.default_url_options[:host]}/#/#{link_to}/#{record.id}"
    subject = "#{record.class.to_s} N #{record.id} was changed"
    mail(to: email, subject: subject)
  end
end