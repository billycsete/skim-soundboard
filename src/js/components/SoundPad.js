
// import ZingTouch from 'zingtouch';


export default class SoundPad {

	constructor(element) {
		this.element = element;
		this.audio = this.element.querySelector('.pad-audio');
		this.keyboardTrigger = parseInt(this.element.getAttribute('data-keyboard-triggger'));

		// bound functions
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onTap = this.onTap.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onTransitionEnd = this.onTransitionEnd.bind(this);

		// this.isPlaying;
		this.isPadHeld = false;

		this.setupEvents();
	}

	setupEvents() {
		var hammertime = new Hammer(this.element);

		hammertime.on('tap', this.onTap);

		this.element.addEventListener('mousedown', this.onMouseDown);
		this.element.addEventListener('mouseup', this.onMouseUp);
		this.element.addEventListener('touchstart', this.onTouchStart);
		this.element.addEventListener('touchend', this.onTouchEnd);
		this.element.addEventListener('transitionend', this.onTransitionEnd);
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
	}

	onMouseDown() {
		console.log('mouse down');

		this.isPadHeld = true;

		this.element.classList.add('pushed');
		this.play();
	}

	onMouseUp() {
		console.log('mouse up');

		this.isPadHeld = false;
		console.log(this.isPadHeld);

		this.element.classList.remove('pushed');
	}

	onTap() {
		console.log('tap');
		// this.element.classList.add('pushed');
		this.play();
	}

	onTouchStart(evt) {
		console.log(evt);
		console.log('touch start');

		this.element.classList.add('pushed');
		// this.play();
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

	onKeyUp(evt) {
		console.log('key up', evt);

		if( evt.keyCode !== this.keyboardTrigger) return;

		this.element.classList.remove('pushed');
	}

	onTransitionEnd(evt) {
		console.log('transitionend');
		// if (evt.propertyName !== 'transform') return;
		// this.element.classList.remove('pushed');
	}

	play() {
		// if we dont have audio for the eky that was pressed, do nothing
		if(!this.audio) return;

		this.audio.volume = 0.1;
		this.audio.currentTime = 0; // restart audio clip for rapid key hits
		// this.audio.play();

		this.element.classList.add('playing');
	}

}
