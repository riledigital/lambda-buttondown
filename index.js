/* eslint-disable no-magic-numbers */
/* eslint-disable func-names */
/* eslint-disable max-lines-per-function */
const axios = require('axios').default;
require('dotenv').config();

// This requires node >8 for async/await syntax.
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
    if (response.statusCode !== 201) {
      return {
        statusCode: response.statusCode,
        headers: {
          'Content-Type': 'text/plain',
          'x-amzn-ErrorType': response.code
        },
        isBase64Encoded: false,
        body: `${response.code}: ${response.data}`
      };
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      isBase64Encoded: false,
      body: response.data
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 502,
      headers: {
        'Content-Type': 'text/plain',
        'x-amzn-ErrorType': 502
      },
      isBase64Encoded: false,
      body: `502: ${error}`
    };
  }
};
