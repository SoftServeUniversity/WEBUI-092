class ThesisChangeMailer < ActionMailer::Base
  default from: 'webUI092@ua.com'

  def notification (thesis_change, record)
    @thesis_change = thesis_change
    @record = record
    if (record.class.to_s == 'Task')
      email = [record.work.student.user.email, record.work.teacher.user.email]
      @record_name = "завданні"
      link_to = 'task'
    else
      email = [record.student.user.email, record.teacher.user.email]
      @record_name = "роботі"
      link_to = 'work'
    end
    @record_url = "http://#{ActionMailer::Base.default_url_options[:host]}/#/#{link_to}/#{record.id}"
    subject = "Зміни в #{@record_name} #{record.name}"
    mail(to: email, subject: subject)
  end
end