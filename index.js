const axios = require('axios').default;
require('dotenv').config();

/**
 * Pass the data to send as `event.data`, and the request options as
 * `event.options`. For more information see the HTTPS module documentation
 * at https://nodejs.org/api/https.html.
 *
 * Will succeed with the response body.
 */
exports.handler = async (event) => {
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
      });

    console.log(`Token ${process.env.BUTTONDOWN_SECRET}`);

    console.log(response);
    return {
      statusCode: 200,
      body: response.data,
      headers: { 'Content-Type': 'application/json' }
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 403,
      body: { error }
    };
  }
};
