let prevEmotion = null;

document.addEventListener("mouseup", async (event) => {
  const selectedText = window.getSelection().toString().trim();
  
  if (selectedText !== "" && prevEmotion == null) {
    removePrevEmotion();
    const emotion = await getEmotion(selectedText);
    const color = await getColor(emotion);

    if (emotion) {
      removePrevEmotion();

      const message = createMessage(emotion, color);
      message.style.top = event.pageY - 50 + "px";
      message.style.left = event.pageX + "px";
      document.body.appendChild(message);
      prevEmotion = message;
    }
  }
});


document.addEventListener("click", () => {
  removePrevEmotion();
});

fetch(chrome.runtime.getURL('./box/box.html')).then(r => r.text()).then(html => {
  document.body.insertAdjacentHTML('beforeend', html);
});


