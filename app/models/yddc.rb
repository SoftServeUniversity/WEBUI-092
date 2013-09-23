require 'tempfile'
require 'fileutils'

class Yddc # Year depend, database changer
  @@instance = Yddc.new
  def configs 
    ActiveRecord::Base.configurations[Rails.env]
  end

  def self.instance
    return @@instance
  end
  # ensure that it is a singleton
  private_class_method :new

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
  end #def establish_connection

  private

    def db_exists? db_name 
      path = create_path_to
      temp_file = Tempfile.new('tmp')
      begin
        File.open path, 'r' do |file|
          file.each_line do |line|
            case line
              when /^current_db_name/ then temp_file.puts "db_name='#{configs['database'] || '' }'"
              when /^db_host/         then temp_file.puts "db_host='#{configs['host'] || 'localhost' }'"
              when /^db_user/         then temp_file.puts "db_user='#{configs['username'] || '' }'"
              when /^db_pass/         then temp_file.puts "db_pass='#{configs['password'] || '' }'"
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
    end #def db_exists? 

    def db_empty?
    end
    def create_db_for year
    end

    def clone_current year
      path = create_path_to 'create_db.exp'
      temp_file = Tempfile.new('tmp')
      begin
        File.open path, 'r' do |file|
          file.each_line do |line|
            case line
              when /^current_db_name/ then temp_file.puts "current_db_name='#{ configs['database'] || '' }'"
              when /^db_host/         then temp_file.puts "db_host='#{ configs['host'] || 'localhost' }'"
              when /^db_user/         then temp_file.puts "db_user='#{ configs['username'] || '' }'"
              when /^db_pass/         then temp_file.puts "db_pass='#{ configs['password'] || '' }'"
              when /^new_db_name/     then temp_file.puts "new_db_name='db_#{ year }'"
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
    end #def clone_current year

    def create_path_to file 
      Dir[Rails.root.join('script', 'year_changer', file)].join
    end
end