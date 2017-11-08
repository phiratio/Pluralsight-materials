module ApplicationHelper
  
  def manifest_attribute
    Rails.env.production? ? 'manifest="/production.appcache"'.html_safe : ''
  end
  
end
