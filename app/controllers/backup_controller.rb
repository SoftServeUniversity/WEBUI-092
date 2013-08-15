#encoding: utf-8
class BackupController < ApplicationController


  def full_backup
    path = Rails.root.join('backup',Time.now.strftime("%Y-%d-%m_%H:%M")+'-full_backup').to_s
    `pg_dump webui_dev > '#{path}'`

    send_file(path, status: 200)
  end

  def restore_from_backup(infile)
    pid = File.read(Rails.root.join('tmp','pids','server.pid').to_s)
    puts 'ok'
    `kill -9 #{pid}`
    puts 'ok1'
    `dropdb webui_dev | create_db webui_dev`
    `psql webui_dev < #{infile}`
    `rails s`

  end
end
