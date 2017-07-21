export default function(evt) {
  const audio = document.querySelector(`audio[data-key="${evt.keyCode}"]`); // ES6 template literals
  const key = document.querySelector(`.key[data-key="${evt.keyCode}"]`);

  if(!audio) return; // if we dont have audio for the eky that was pressed, do nothing

  audio.currentTime = 0; // restart audio clip for rapid key hits
  audio.play();

  key.classList.add('playing');
}
