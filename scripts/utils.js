function removePrevEmotion() {
    if (prevEmotion) {
      prevEmotion.remove();
      prevEmotion = null;
    }
}