
import playSound from './playSound';

function removeTransition(evt) {
	if(evt.propertyName !== 'transform') return; // ignore the event if its not a transform

	this.classList.remove('playing');
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

window.addEventListener('keydown', playSound);

// console.log('it works');
