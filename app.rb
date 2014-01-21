require 'rubygems'
require 'sinatra'
require 'json'

get '/' do
  haml :todo, :attr_wrapper => '"', :locals => {:title => 'A Modern Room'}
end


