let prev = null;
const emotionClass = "emotion-label";

// Function to remove the previous "Emotion" after highlighting the new
function removePrev(){
  if (prev) {
    prev.remove();
    prev = null;
  }
}


// Listen for mouseup events
document.addEventListener("mouseup", function(event) {
    // Get the selected text
    let selectedText = window.getSelection().toString().trim();
    
    // If text is selected, highlight it and display a message above it
    if (selectedText !== "") {
      if (prev !== null) {
        removePrev()
      }
      // fetching  EmoRoBERTa API
      fetch("https://api-inference.huggingface.co/models/arpanghoshal/EmoRoBERTa?head=emotion", {
        method: "POST",
        headers: {
          "Authorization": "Bearer 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",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "inputs": selectedText
        })
      })
      .then(response => response.json())
      .then(data => {
        const emotion = JSON.stringify(data[0][0].label).slice(1, -1);
        
        //alert(emotion)
        // Create a div element for the emotion
        let message = document.createElement("div");
        message.textContent = emotion;
        
        let color = "#000"

        message.style.background = color;
        message.classList.add(emotionClass);
        // background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);

        // position on the page
        message.style.top = event.pageY - 50 + "px";
        message.style.left = event.pageX + "px";

        // Add the highlighted text and message to the page
        document.body.appendChild(message);

        // Updates the prev element
        if (emotion){
          prev = message;
        }
        
      })
      .catch(error => {
        console.log("Error calling Hugging Face API:", error);
      });
    }
});

//Listen for click events on the page
document.addEventListener("click", function(event) {
  // Remove the emotion label if it exists
  if (prev !== null) {
    removePrev();
  }
});