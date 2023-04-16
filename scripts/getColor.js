const API_URL_COLOR = "https://eu-central-1.aws.data.mongodb-api.com/app/data-brhhi/endpoint/data/v1/action/find";
const URL_FOR_TOKEN = "https://realm.mongodb.com/api/client/v2.0/app/data-brhhi/auth/providers/api-key/login";

async function getToken() {
    const response = await fetch(URL_FOR_TOKEN, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ 
        "key": "4lZauuNDvhqRtUCWaBV36GSqiDU57V2nbTrHWe0rF42vTOBgoHhUtzYbxqL7EV7o"
       })
    });
    const data = await response.json();
    return data.access_token;
  }

async function getColor(emotion) {
    const token = await getToken();
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
    const data = await response.json();
    return data.documents[0].color
}