

export default class SoundPad {

	constructor(element) {
		this.element = element;
		this.audio = this.element.querySelector('.pad-audio');
		this.keyboardTrigger = this.element.getAttribute('data-keyboard-triggger')

		// bound functions
		// this.onTransitionEnd = this.onTransitionEnd.bind(this);
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.setupEvents();
	}

	setupEvents() {
		this.element.addEventListener('transitionend', this.onTransitionEnd);
		this.element.addEventListener('mousedown', this.onMouseDown);
		this.element.addEventListener('mouseup', this.onMouseUp);
		this.element.addEventListener('touchstart', this.onTouchStart);
		this.element.addEventListener('touchstart', this.onTouchEnd);
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
	}

	onMouseDown() {
		console.log('mouse down');

		this.element.classList.add('pushed');
		this.play();
	}

	onMouseUp() {
		console.log('mouse up');

		this.element.classList.remove('pushed');
	}

	onTouchStart() {
		console.log('touch start');

		this.element.classList.add('pushed');
		this.play();
	}

	onTouchEnd() {
		console.log('touch end');

		this.element.classList.remove('pushed');
	}

	onKeyDown() {
		console.log('key down');

		this.element.classList.add('pushed');
		this.play();
	}

	onKeyUp() {
		this.element.classList.remove('pushed');
	}

	// onTransitionEnd(evt) {

	// 	if (evt.propertyName !== 'transform') return;

	// 	this.element.classList.remove('playing');
	// }

	play() {
		if(!this.audio) return; // if we dont have audio for the eky that was pressed, do nothing

		this.audio.currentTime = 0; // restart audio clip for rapid key hits
		this.audio.play();

		this.element.classList.add('playing');
	}

}
