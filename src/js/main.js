
import SoundboardPad from './components/SoundboardPad';

const pads = document.querySelectorAll('.soundboard-pad');

pads.forEach(key => new SoundboardPad(key));

