#encoding: utf-8
class BackupController < ApplicationController
  require 'yaml'
  respond_to :json


  def full_backup
    @path = Rails.root.join('backup',Time.now.strftime("%Y-%d-%m_%H:%M:%S")+'-full_backup.sql').to_s
    @config = YAML.load_file(Rails.root.join('config','backup_config.yml').to_s)
    `mysqldump -u #{@config['username']}  -p#{@config['password']} #{@config['database']} > #{@path}`
    send_file(@path, status: 200)
  end

  private

  def self.regular_backup
    @path = Rails.root.join('backup',Time.now.strftime("%Y-%d-%m_%H:%M:%S")+'-regular_backup.sql').to_s
    @config = YAML.load_file(Rails.root.join('config','backup_config.yml').to_s)
    `mysqldump -u #{@config['username']}  -p#{@config['password']} #{@config['database']} > #{@path}`
  end


end
