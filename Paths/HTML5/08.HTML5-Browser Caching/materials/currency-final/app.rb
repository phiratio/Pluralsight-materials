require './init'

set :root, File.dirname(__FILE__)
set :logging, false
mime_type :appcache, "text/cache-manifest"

get '/' do
  erb :index
end

get '/offline.appcache' do
  content_type :appcache
  erb :"offline.appcache"
end

post '/exchange' do
  content_type :json

  # A JSON string of currencies
  {
    "HKD" => 0.1284,
    "EUR" => 1.416,
    "AUD" => 1.0739,
    "JPY" => 0.0126,
    "GBP" => 1.6146
  }.to_json
end
