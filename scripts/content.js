// Define a null variable to store the box container element
let boxContainer = null;

// Add an event listener for "selectionchange" event, which is triggered when the user selects text
document.addEventListener("selectionchange", async () => {
  // Get the selected text and remove leading/trailing whitespace
  const selectedText = window.getSelection().toString().trim();
  
  // Check if there is selected text and the box container is not already displayed
  if (selectedText !== "" &&  boxContainer == null) {

    // Call the "getEmotion()" function to get the emotion for the selected text
    const emotion = await getEmotion(selectedText);
    // Call the "getColor()" function to get the color corresponding to the emotion
    const color = await getColor(emotion);

    // Check if emotion is detected and the box container is not already displayed
    if (emotion && boxContainer == null) {
      // Get the URL of the box.html file
      const boxUrl = chrome.runtime.getURL('../box/box.html');

      if (boxContainer == null) {
      // Fetch the content of the box.html file
      fetch(boxUrl).then(response => response.text()).then(html => {
        if (boxContainer == null) {
        // Create a new div element to be used as the box container  
        boxContainer = document.createElement('div');
        // Set the inner HTML of the box container with the fetched content
        boxContainer.innerHTML = html;
        // Append the box container to the body of the page
        document.body.appendChild(boxContainer);
        // Set the text content of the "emotion" element in the box to the detected emotion
        emotion_name = document.getElementById("emotion");
        emotion_name.textContent = emotion + ".";
        // Set the background color of the box to the color corresponding to the emotion
        document.getElementById("box").style.background = color;

        // Add event listener for "click" event on the "close" button
        let close =  document.getElementById("box_container")        
        document.getElementById("close").addEventListener("click", () => {
          // Remove the box container when the "close" button is clicked
          close.remove()
          boxContainer = null;
        });

        // Add event listener for "click" event on the "like" button
        document.getElementById("like").addEventListener("click", async () => {
          // Call the "insertFeedback()" function with the selected text, emotion, and feedback type
          await insertFeedback(selectedText, emotion, "like")
          // Remove the box container after providing feedback
          close.remove()
          boxContainer = null;
        })

        // Add event listener for "click" event on the "dislike" button
        document.getElementById("dislike").addEventListener("click", async () => {
          // Call the "insertFeedback()" function with the selected text, emotion, and feedback type
          await insertFeedback(selectedText, emotion, "dislike")
          // Remove the box container after providing feedback
          close.remove()
          boxContainer = null;
        })
      }
      }).catch(error => console.error(error));
    }

    }
  }  
});
