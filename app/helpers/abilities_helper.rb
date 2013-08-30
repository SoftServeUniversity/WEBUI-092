module AbilitiesHelper
  def receive_abilities_for *classes
    classes.inject([]) { |res, klass| res + eval( klass.to_s.capitalize + '.accessible_by(current_ability).map { |element| element = {type: "' + klass.to_s.capitalize + '", id: element.id} }') }
  end
end