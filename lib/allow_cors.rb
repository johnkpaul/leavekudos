# This is the mixin
module AllowCors
  def set_cors_headers
      headers['Access-Control-Allow-Origin'] = '*' 
      headers['Access-Control-Request-Method'] = '*' 
  end
end
