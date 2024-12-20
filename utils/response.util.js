const createResponse = (status = 200, data = null, message = '', error = null) => ({
    status,
    data,
    message,
    error
  });
  
  module.exports = {
    createResponse,
  };