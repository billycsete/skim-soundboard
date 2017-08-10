
import SoundPad from './components/SoundPad';

const pads = document.querySelectorAll('.pad');

pads.forEach(key => new SoundPad(key));

