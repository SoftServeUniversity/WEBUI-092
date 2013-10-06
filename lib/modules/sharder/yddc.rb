require 'tempfile'
require 'fileutils'

class Yddc # Year depend, database changer
  include OctopusConnector
  
  def self.instance
    return @@instance
  end
  @@instance = Yddc.new
  private_class_method :new
  
  def configs 
    ActiveRecord::Base.configurations[Rails.env]
  end

  def create_db year
    path = create_path_to 'create_db.exp'
    temp_file = Tempfile.new('tmp')
    begin
      File.open path, 'r' do |file|
        file.each_line do |line|
          case line
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
    clone_current year if system("expect -f #{File.read(path)}")
  end #def clone_current year


  private
    def clone_current year
      path = create_path_to 'clone_db.exp'
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
      add_to_config "db_#{ year }" if system("expect -f #{File.read(path)}")
    end #def clone_current year

    def create_path_to file 
      Dir[Rails.root.join('script', 'year_changer', file)].join
    end

    def add_to_config new_database

    end
end