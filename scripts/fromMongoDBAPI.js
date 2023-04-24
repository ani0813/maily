// Define the URLs for the MongoDB API endpoints
const API_URL_COLOR = "https://eu-central-1.aws.data.mongodb-api.com/app/data-brhhi/endpoint/data/v1/action/find";
const API_URL_FEEDBACK = "https://eu-central-1.aws.data.mongodb-api.com/app/data-brhhi/endpoint/data/v1/action/insertOne";
const URL_FOR_TOKEN = "https://realm.mongodb.com/api/client/v2.0/app/data-brhhi/auth/providers/api-key/login";

// Define an async function to get an access token for authentication
async function getToken() {
    // Send a POST request to the URL_FOR_TOKEN endpoint with the API key as input
    const response = await fetch(URL_FOR_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ 
        "key": "4lZauuNDvhqRtUCWaBV36GSqiDU57V2nbTrHWe0rF42vTOBgoHhUtzYbxqL7EV7o" 
       })
    });
    // Parse the response as JSON
    const data = await response.json();
    // Extract and return the access token from the response
    return data.access_token;
  }

// Define an async function to get the color associated with a given emotion
async function getColor(emotion) {
    // Get the access token for authentication
    const token = await getToken();
    // Send a POST request to the API_URL_COLOR endpoint 
    const response = await fetch(API_URL_COLOR, {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + token, 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ 
        "collection":"color-names", 
        "database":"Maily", 
        "dataSource":"color-names", 
        "filter": {"emotion": emotion}, 
        "projection": {"_id": 1, "emotion": 1, "color": 1} 
    })
    });
    // Parse the response as JSON
    const data = await response.json();
    // Extract and return the color from the first document in the response
    return data.documents[0].color
}

// Define an async function to insert feedback data into MongoDB
async function insertFeedback(text, emotion, feedback) {
  // Get the access token for authentication
  const token = await getToken();
  // Send a POST request to the API_URL_FEEDBACK endpoint
  const response = await fetch(API_URL_FEEDBACK, {
    method: "POST",
    headers: {
      "Authorization": "Bearer " + token, 
      "Content-Type": "application/json" 
    },
    body: JSON.stringify({ 
      "collection":"feedbacks", 
      "database":"Maily", 
      "dataSource":"color-names", 
      "document": { 
        "text": text,
        "emotion": emotion,
        "feedback": feedback
      }
  })
  });
  // Parse the response as JSON
  const data = await response.json();
  // return the response
  return data
}