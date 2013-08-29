class ThesisChangeMailer < ActionMailer::Base
  default from: 'webui092@gmail.com'

  def test_email
    mail(to: 'lena.og@inbox.ru', subject: 'Welcome to My Awesome Site', body: 'test message')
  end
end