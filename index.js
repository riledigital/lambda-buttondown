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
  const formData = event.body;
  console.log('The whole event:');
  console.log(event);
  console.log('The form data:');
  console.log(formData);

  axios.post('api.buttondown.email/v1/subscribers', {
    email: formData.email,
    metadata: formData.metadata,
    notes: formData.notes,
    referrer_url: formData.referrer_url
  }, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${process.env.BUTTONDOWN_SECRET}`
    }
  }).then(function (response) {
    console.log(response);
    if (!response.data.email) {
      lambdaCallback(null,({
        statusCode: 200,
        body: response.data,
        headers: { 'Content-Type': 'application/json' }
      }));
    }
    lambdaCallback(null, {
      statusCode: 201,
      body: response.data,
      headers: { 'Content-Type': 'application/json' }
    });
  })
    .catch(function (error) {
      console.log(error);
      lambdaCallback(null,{
        statusCode: 403,
        body: error
      });
    });

  return {
    statusCode: 200,
    body: event.data,
    headers: { 'Content-Type': 'application/json' }
  };
};
