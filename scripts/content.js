let prev = null;
// Listen for mouseup events
document.addEventListener("mouseup", function(event) {
    // Get the selected text
    let selectedText = window.getSelection().toString().trim();
    
    // If text is selected, highlight it and display a message above it
    if (selectedText !== "") {
      if (prev !== null) {
        prev.remove();
      }
      // Create a div element for the message
      let message = document.createElement("div");
      message.textContent = "Emotion";
      message.style.backgroundColor = "yellow";
      message.style.fontWeight = "bold";
      message.style.color = "white";
      message.style.padding = "5px";
      message.style.position = "absolute";
      message.style.top = event.pageY - 50 + "px";
      message.style.left = event.pageX + "px";
      
      // Add the highlighted text and message to the page
      document.body.appendChild(message);
      prev = message;
    }
    else if (prev !== null) {
      prev.remove();
      prev = null;
    }
});




