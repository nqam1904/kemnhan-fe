const errors = {
  UNAUTHORIZED: 'Invalid token.',

  // HTTP status code
  BAD_REQUEST: 'An error has occurred, please contact Administrator',
  ACCESS_DENIED: 'Access is denied due to invalid credentials.',
  INTERNAL_SERVER_ERROR: 'An error has occurred, please contact Administrator',
  PROVISIONAL_HEADERS_ARE_SHOWN:
    'The system is having server connection problems. Please come back later!',
  FORBIDDEN: 'User does not have access!',
  NOT_FOUND: 'Could not find the API related to the request!',

  // FETCH WITH RTK QUERY
  FETCH_ERROR: 'Oops, something went wrong, Please try again later.',
  CUSTOM_ERROR: 'Oops, something went wrong, Please try again later.',
  PARSING_ERROR: 'Oops, something went wrong, Please try again later.',
  METHOD_NOT_ALLOWED:
    'An error has occurred while communicating with the server. The operation was not successful.',
};

export default errors;
