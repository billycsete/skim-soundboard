function playSound(evt) {
    const audio = document.querySelector(`audio[data-key="${evt.keyCode}"]`); // ES6 template literals
    const key = document.querySelector(`.key[data-key="${evt.keyCode}"]`);

    if(!audio) return; // if we dont have audio for the eky that was pressed, do nothing

    audio.currentTime = 0; // restart audio clip for rapid key hits
    audio.play();

    key.classList.add('playing');
  };

  function removeTransition(evt) {
    if(evt.propertyName !== 'transform') return; // ignore the event if its not a transform

    this.classList.remove('playing');
  };

  const keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', removeTransition));

  window.addEventListener('keydown', playSound);
