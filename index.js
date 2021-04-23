const axios = require('axios').default;
require('dotenv').config();

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = (event, context, lambdaCallback) => {
  const formData = JSON.parse(event);
  console.log('The whole event:');
  console.log(event);
  console.log('The form data:');
  console.log(formData);

  axios.post('api.buttondown.email/v1/subscribers', formData, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.BUTTONDOWN_SECRET}`
    }
  }).then(function (response) {
    console.log(response);
    if (!response.data.email) {
      lambdaCallback(null, JSON.stringify(({
        statusCode: 200,
        body: response.data,
        headers: { 'Content-Type': 'application/json' }
      })));
    }
    lambdaCallback(null, JSON.stringify({
      statusCode: 201,
      body: response.data,
      headers: { 'Content-Type': 'application/json' }
    }));
  })
    .catch(function (error) {
      console.log(error);
      lambdaCallback(null, JSON.stringify({
        statusCode: 403,
        body: error
      }));
    });

  return {
    statusCode: 200,
    body: JSON.stringify(event.data),
    headers: { 'Content-Type': 'application/json' }
  };
};
