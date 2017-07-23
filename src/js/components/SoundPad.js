

export default class SoundPad {

	constructor(element) {
		this.element = element;
		this.audio = this.element.querySelector('.pad-audio');
		this.keyboardTrigger = parseInt(this.element.getAttribute('data-keyboard-triggger'));

		// bound functions
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);

		this.setupEvents();
	}

	setupEvents() {
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

	onTouchStart(evt) {
		console.log('touch start');

		this.element.classList.add('pushed');
		this.play();
	}

	onTouchEnd() {
		console.log('touch end');

		this.element.classList.remove('pushed');
	}

	onKeyDown(evt) {
		console.log('key down', evt.keyCode);

		// if the key pressed is not for this pad, do nothing
		if( evt.keyCode !== this.keyboardTrigger) return;

		this.element.classList.add('pushed');
		this.play();
	}

	onKeyUp() {
		this.element.classList.remove('pushed');
	}


	play() {
		// if we dont have audio for the eky that was pressed, do nothing
		if(!this.audio) return;

		this.audio.currentTime = 0; // restart audio clip for rapid key hits
		this.audio.play();

		this.element.classList.add('playing');
	}

}
