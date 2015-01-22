require 'rubygems'
require 'sinatra'
require 'json'
require 'haml'

get '/' do
  haml :todo, :attr_wrapper => '"', :locals => {:title => 'A Modern Room'}
end


