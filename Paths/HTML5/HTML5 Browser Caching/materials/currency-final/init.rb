$: << File.expand_path(File.dirname(__FILE__))
Dir[File.dirname(__FILE__) + "/vendor/*"].each do |gemdir|
  $: << gemdir + "/lib"
end

require "rubygems"
require 'rubygems/user_interaction'
require "isolate/now"

require 'sinatra'
require 'haml'
require 'yajl'
require 'json'

