async function fetchingImageUrl(something,color) {
  try {
    // 1. Make the API request
    const response = await fetch('https://the-ai-symphony.vercel.app/api/v1/generateImg', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      // Include prompt in the body if your backend requires it
      body: JSON.stringify({
        "name":something,
        "color":color
      }),
      credentials: 'include'
    });

    // 2. Check for successful response
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`API Error ${response.status}: ${errorData.message || 'Unknown error'}`);
    }

    // 3. Parse the response
    const data = await response.json();
    
    // 4. Extract the secure_url
    if (data.cloudinaryResponse && data.cloudinaryResponse.secure_url) {
      return data.cloudinaryResponse.secure_url;
    } else {
      throw new Error('Secure URL not found in response');
    }
  } catch (error) {
    console.error('Error fetching image URL:', error.message);
    throw error; // Re-throw to allow caller handling
  }
}

export default fetchingImageUrl;

// Usage example:
// fetchingImageUrl()
//   .then(secureUrl => {
//     console.log('Image URL:', secureUrl);
//     // Use the secureUrl in your React component
//     // Example: setImageUrl(secureUrl);
//   })
//   .catch(error => {
//     console.error('Failed to get image URL:', error);
//     // Handle errors in your UI
//   });