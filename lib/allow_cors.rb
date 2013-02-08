# Mixin that sets wildcard CORS headers
module AllowCors
  def set_cors_headers
      headers['Access-Control-Allow-Origin'] = '*' 
      headers['Access-Control-Request-Method'] = '*' 
  end
end
