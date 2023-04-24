// Define the URL of the emotion detection API (HuggingFace EmoRoBERTa API)
const API_URL_EMOTION = "https://api-inference.huggingface.co/models/arpanghoshal/EmoRoBERTa?head=emotion_name";


// Define an async function to get the emotion for a given text
async function getEmotion(text) {
    // Send a POST request to the API_URL_EMOTION
    const response = await fetch(API_URL_EMOTION, {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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", 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify({ inputs: text }) 
    });

    // Parse the response as JSON
    const data = await response.json();
    // Extract and return the detected emotion label from the response
    return data[0][0].label;
}