/* eslint-disable no-magic-numbers */
/* eslint-disable func-names */
/* eslint-disable max-lines-per-function */
const axios = require('axios').default;
require('dotenv').config();

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async function (event) {
  // Can only test with API Gateway
  const formData = JSON.parse(event.body);
  console.log('The whole event:');
  console.log(event);
  console.log('The form data:');
  console.log(formData);

  try {
    const response = await axios.post(
      '/subscribers',
      {
        email: formData.email,
        metadata: formData.metadata,
        notes: formData.notes,
        referrer_url: formData.referrer_url
      },
      {
        method: 'POST',
        baseURL: 'https://api.buttondown.email/v1',
        url: '/subscribers',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${process.env.BUTTONDOWN_SECRET}`
        }
      }
    );

    console.log(`Token ${process.env.BUTTONDOWN_SECRET}`);

    console.log(response);
    if (response.statusCode === 400) {
      return {
        statusCode: response.statusCode,
        headers: {
          'Content-Type': 'text/plain',
          'x-amzn-ErrorType': response.code
        },
        isBase64Encoded: false,
        body: `${response.code}: ${response.message}`
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      isBase64Encoded: false,
      body: JSON.stringify(response.body)
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 403,
      body: { error }
    };
  }
};
