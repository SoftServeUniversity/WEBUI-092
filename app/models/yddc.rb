require 'tempfile'
require 'fileutils'

class Yddc # Year depend, database changer

  @@instance = Yddc.new

  def self.instance
    return @@instance
  end

  def test_exec
    system("echo 'this works'")
  end

  def clone_current_db(year=Date.today.year)
    unless year == Date.today.year
      current_db_conf = ActiveRecord::Base.configurations[Rails.env]
      new_db_name = "db_#{year}"
      # system is an method using whitch, we can execute bash comands
      # it returns true if command is executed succesly, or false elsecase.
      if system("expect <<EOF \"\n 
        spawn mysql -u #{current_db_conf['username']} -p #{current_db_conf['password']} -e 'create database #{new_db_name}' \n
        expect \"password:\"\n
        send \"#{current_db_conf['password']}\r\"\n
        expect eof \n
        EOF \" \n
        ")
        # generate path, something like this "/Applications/projects/sites/WEBUI-092/config/databases_development.txt"
        dbs = File.open("#{Dir[Rails.root.join('config/')].join}databases_#{Rails.env}.txt", "w")
        dbs.puts new_db_name
        dbs.close 
      end
      if system("expect <<EOF \"\n 
        spawn mysqldump -u #{current_db_conf['username']} -p #{current_db_conf['password']} #{current_db_conf['database']} | 
        mysql -u #{current_db_conf['username']} -p #{current_db_conf['password']} #{new_db_name} \n
        expect \"password:\"\n
        send \"#{current_db_conf['password']}\r\"\n
        expect eof \n
        EOF \" \n
        ")
        puts("************ Cloned all data from #{current_db_conf['database']} DB to new #{new_db_name} DB ************")
      end
    end
  end

  def establish_connection(year=Date.today.year)
    old_config = new_config = ActiveRecord::Base.configurations[Rails.env].clone
    new_config['database'] = "db_#{year}"
    ActiveRecord::Base.remove_connection
    new_connection = ActiveRecord::Base.establish_connection new_config
    begin
      #the error may apear after some query on not existing database.
      User.first 
    rescue Mysql2::Error
      puts "********************** unknown database db_#{year} *******************************"
      ActiveRecord::Base.remove_connection
      ActiveRecord::Base.establish_connection old_config  # conecting to current db
      false    
    end
  end

  #private
    def sh_db_create 
      configs = ActiveRecord::Base.configurations[Rails.env]
      path = Dir[Rails.root.join('script', 'year_changer', 'create_db.exp')].join
      temp_file = Tempfile.new('foo')
      begin
        File.open path, 'r' do |file|
          file.each_line do |line|
            case line
              when /^db_name/ then temp_file.puts "db_name='#{ configs['database'] || '' }'"
              when /^db_host/ then temp_file.puts "db_host='#{ configs['host'] || 'localhost' }'"
              when /^db_user/ then temp_file.puts "db_user='#{ configs['username'] || '' }'"
              when /^db_pass/ then temp_file.puts "db_pass='#{ configs['password'] || '' }'"
              else temp_file.puts line
            end
          end
        end
        temp_file.rewind
        FileUtils.mv(temp_file.path, path)
      ensure
        temp_file.close
        temp_file.unlink
      end
      system("expect -f #{File.read(path)}")
    end

  # ensure that it is an singleton
  private_class_method :new

end