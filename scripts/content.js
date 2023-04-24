let boxContainer = null;

document.addEventListener("selectionchange", async () => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText !== "" &&  boxContainer == null) {
    const emotion = await getEmotion(selectedText);
    const color = await getColor(emotion);

    if (emotion && boxContainer == null) {
      const boxUrl = chrome.runtime.getURL('../box/box.html');

      if (boxContainer == null) {
      fetch(boxUrl).then(response => response.text()).then(html => {
        if (boxContainer == null) {
        boxContainer = document.createElement('div');
        boxContainer.innerHTML = html;
        document.body.appendChild(boxContainer);
        emotion_name = document.getElementById("emotion");
        emotion_name.textContent = emotion + ".";
        document.getElementById("box").style.background = color;

        let close =  document.getElementById("box_container")        
        document.getElementById("close").addEventListener("click", () => {
          close.remove()
          boxContainer = null;
        })

        document.getElementById("like").addEventListener("click", async () => {
          await insertFeedback(selectedText, emotion, "like")
          close.remove()
          boxContainer = null;
        })

        document.getElementById("dislike").addEventListener("click", async () => {
          await insertFeedback(selectedText, emotion, "dislike")
          close.remove()
          boxContainer = null;
        })
      }
      }).catch(error => console.error(error));
    }

    }
  }  
});
