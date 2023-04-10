import pymongo

# Connect to MongoDB
client = pymongo.MongoClient("mongodb+srv://aniguloyan13:jyU6uKH4KMlYlltW@color-names.zo4ftse.mongodb.net/?retryWrites=true&w=majority")

db = client["Maily"]
collection = db["color-names"]

def get_emotion_color(emotion):
    # Query MongoDB for emotion color
    result = collection.find_one({"emotion": emotion.lower()})
    # If emotion not found, return None
    if not result:
        return None

    return result["color"]
