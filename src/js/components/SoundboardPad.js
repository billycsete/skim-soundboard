import '../utils/map';


/*
 * @class SoundboardPad
 */
export default class SoundboardPad {

	/*
	@param {HTML element} element - pad element
	 */
	constructor(element) {
		this.element = element; // TODO: better name for the soundboard grid pad item thingy
		this.boundingRect = this.element.getBoundingClientRect(); // TODO: update on resize

		this.padElement = this.element.querySelector('.pad');
		this.audioElement = this.element.querySelector('.pad-audio');
		this.audioProgressElement = this.element.querySelector('.pad-audio-progress');
		this.audioDuration = null;
		this.audioProgressTween = null;

		this.keyboardTrigger = parseInt( this.element.getAttribute('data-keyboard-triggger') );

		this.isPushed = false;

		// bound functions
		this.onMouseDown = this.onMouseDown.bind(this);
		this.onMouseUp = this.onMouseUp.bind(this);
		this.onMouseMove = this.onMouseMove.bind(this);
		this.onTouchStart = this.onTouchStart.bind(this);
		this.onTouchEnd = this.onTouchEnd.bind(this);
		this.onTouchMove = this.onTouchMove.bind(this);
		this.onKeyDown = this.onKeyDown.bind(this);
		this.onKeyUp = this.onKeyUp.bind(this);
		this.onAudioEnded = this.onAudioEnded.bind(this);
		this.onAudioLoaded = this.onAudioLoaded.bind(this);
		this.playProgressTween = this.playProgressTween.bind(this);
		this.onPushTweenComplete = this.onPushTweenComplete.bind(this);

		this.padPushTween = TweenMax.fromTo(this.padElement, 0.1, {scale: 1}, { scale: 0.9, onComplete: this.onPushTweenComplete});
		this.padPushTween.pause();

		this.setupEvents();
	}

	onPushTweenComplete() {
		console.log('complete');
		if (this.isPushed) return;
		this.padPushTween.reverse();
	}


	/*
	 * setup event handlers
	 */
	setupEvents() {
		// click
		this.element.addEventListener('mousedown', this.onMouseDown);
		this.element.addEventListener('mouseup', this.onMouseUp);
		// touch
		this.element.addEventListener('touchstart', this.onTouchStart);
		this.element.addEventListener('touchend', this.onTouchEnd);
		// keypress
		window.addEventListener('keydown', this.onKeyDown);
		window.addEventListener('keyup', this.onKeyUp);
		// audio
		this.audioElement.addEventListener('loadedmetadata', this.onAudioLoaded);
	}


	/*
	 * onAudioLoaded
	 */
	onAudioLoaded() {
		this.audioDuration = this.audioElement.duration;

		this.audioProgressTween = TweenMax.to( this.audioProgressElement, this.audioDuration, { scaleX: 1} );
		this.audioProgressTween.pause();

		this.audioElement.addEventListener('ended', this.onAudioEnded);
	}


	/*
	 * onMouseDown
	 */
	onMouseDown() {
		// start listening for mouse move on the window
		// so we can detect when a mouse drag leaves the pad
		window.addEventListener('mousemove', this.onMouseMove);

		this.padPushTween.play();
		this.isPushed = true;
		this.playAudio();
	}


	/*
	 * onMouseUp
	 */
	onMouseUp() {
		this.padPushTween.reverse();
		this.isPushed = false;

		window.removeEventListener('mousemove', this.onMouseMove);
	}


	/*
	 * onMouseMove
	 * 
	 * 
	 * @param {Object} evt - mouse move event
	 */
	onMouseMove(evt) {
		let pointerX = evt.clientX;
		let pointerY = evt.clientY;

		// if a mouse drag comes close to the edge of the pad, release the button
		if ( pointerX < this.boundingRect.left || pointerX > this.boundingRect.right) {
			this.padPushTween.reverse();
			this.isPushed = false;
			window.removeEventListener('mousemove', this.onMouseMove);
		}
		if ( pointerY < this.boundingRect.top || pointerY > this.boundingRect.bottom) {
			this.padPushTween.reverse();
			this.isPushed = false;
			window.removeEventListener('mousemove', this.onMouseMove);
		}
	}


	/*
	 * onTouchStart
	 * 
	 * 
	 * @param {Object} evt - touch start event
	 */
	onTouchStart(evt) {
		// start listening for mouse move on the window
		// so we can detect when a mouse drag leaves the pad
		window.addEventListener('touchmove', this.onTouchMove);

		// timer
		this.touchStartTime = Date.now();

		this.padPushTween.play();
		this.isPushed = true;
		this.playAudio();

		// we need to stop native touch events because
		// we dont want double tap to zoom the page, zooming is
		// disruptive to a soundboard experience
		evt.preventDefault();
	}


	/*
	 * onTouchEnd
	 */
	onTouchEnd() {

		let touchEndTime = Date.now();
		let touchLength = touchEndTime - this.touchStartTime;

		this.isPushed = false;
		this.padPushTween.reverse();

		// if ( touchLength < 100 ) {
			
		// } else {
		// 	this.isPushed = false;
		// }


		window.removeEventListener('touchend', this.onTouchMove);
	}


	/*
	 * onTouchMove
	 * 
	 * 
	 * @param {Object} evt - touch move event
	 */
	onTouchMove(evt) {
		let touchX = evt.touches[0].clientX;
		let touchY = evt.touches[0].clientY;

		// if a touch drag comes close to the edge of the pad, release the button
		if ( touchX < this.boundingRect.left || touchX > this.boundingRect.right) {
			this.padPushTween.reverse();
			this.isPushed = false;
			window.removeEventListener('touchmove', this.onTouchMove);
		}
		if ( touchY < this.boundingRect.top || touchY > this.boundingRect.bottom) {
			this.padPushTween.reverse();
			this.isPushed = false;
			window.removeEventListener('touchmove', this.onTouchMove);
		}
	}


	/*
	 * onKeyDown
	 * 
	 * 
	 * @param {Object} evt - keydown event
	 */
	onKeyDown(evt) {
		console.log('key down', evt.keyCode);

		// if the key pressed is not for this pad, do nothing
		if( evt.keyCode !== this.keyboardTrigger ) return;

		this.padPushTween.play();
		this.isPushed = true;
		this.playAudio();
	}


	/*
	 * onKeyUp
	 * 
	 * 
	 * @param {Object} evt - keyup event
	 */
	onKeyUp(evt) {
		console.log('key up', evt);

		if( evt.keyCode !== this.keyboardTrigger ) return;

		this.padPushTween.reverse();
		this.isPushed = false;
	}


	/*
	 * playAudio
	 */
	playAudio() {
		// if we dont have audio for the pad that was pressed, do nothing
		if ( !this.audioElement ) return;

		this.audioElement.volume = 0.2;
		this.audioElement.currentTime = 0; // restart audio clip for rapid key hits
		this.audioElement.play();

		this.playProgressTween();
		this.element.classList.add('playing');
	}


	/*
	 *
	 * @param {Number} time - length of time in ms
	 */
	playProgressTween() {
		this.audioProgressTween.restart();
		this.audioProgressTween.play();
	}


	/*
	 * onAudioEnded
	 */
	onAudioEnded() {
		this.audioProgressTween.restart();
		this.audioProgressTween.pause();

		this.element.classList.remove('playing');

		// if the button is being held down, repeat the audio
		if ( this.isPushed ) {
			this.playAudio();
		}
	}


}
