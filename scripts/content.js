// Listen for mouseup events
document.addEventListener("mouseup", function(event) {
    // Get the selected text
    var selectedText = window.getSelection().toString().trim();
    
    // If text is selected, highlight it and display a message above it
    if (selectedText !== "") {
      // Create a span element with the selected text
      var highlightedText = document.createElement("span");
      highlightedText.textContent = selectedText;
      highlightedText.style.backgroundColor = "yellow";
      
      // Create a div element for the message
      var message = document.createElement("div");
      message.textContent = "Emotion";
      message.style.backgroundColor = "gray";
      message.style.color = "white";
      message.style.padding = "5px";
      message.style.position = "absolute";
      message.style.top = event.pageY - 30 + "px";
      message.style.left = event.pageX + "px";
      
      // Add the highlighted text and message to the page
      document.body.appendChild(highlightedText);
      document.body.appendChild(message);
    }
});
  