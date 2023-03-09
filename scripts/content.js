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
      // Create a div element for the message
      let message = document.createElement("div");
      message.textContent = "Emotion";
      message.classList.add(emotionClass);

      // position on the page
      message.style.top = event.pageY - 50 + "px";
      message.style.left = event.pageX + "px";
      
      // Add the highlighted text and message to the page
      document.body.appendChild(message);

      // Updates the prev element
      prev = message;
    }

});