const API_URL_EMOTION = "https://api-inference.huggingface.co/models/arpanghoshal/EmoRoBERTa?head=emotion_name";


async function getEmotion(text) {
    const response = await fetch(API_URL_EMOTION, {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: text })
    });
    const data = await response.json();
    return data[0][0].label;
}