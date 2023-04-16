const EMOTION_CLASS = "emotion-label";

function createMessage(emotion, color) {

  const message = document.createElement("div");
  message.textContent = emotion;
  message.classList.add(EMOTION_CLASS);
  message.style.background = color;
  return message;
}

// function createMessage(emotion, color) {

// //   const message = document.createElement("div");
//   const message = document.querySelector('.element_to_select')
//   message.textContent = emotion;
//   message.classList.add(EMOTION_CLASS);
//   message.style.background = color;
//   return message;
// }
