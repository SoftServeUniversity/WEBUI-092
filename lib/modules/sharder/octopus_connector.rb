require 'active_support/concern'

module OctopusConnector
  extend ActiveSupport::Concern
  include Octopus::Model
  included do
    class_eval do
        octopus_establish_connection "admin_#{Rails.env}"
        connection_proxy.current_shard = :admin # :master otherwise
    end
  end
end