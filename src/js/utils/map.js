/**
 * @function map
 * @param {float} value
 * @param {float} inMin
 * @param {float} inMax
 * @param {float} outMin
 * @param {float} outMax
 * @returns {float}
 */
export default map = (value, inMin, inMax, outMin, outMax) => {
	if (value < inMin) {
		return outMin;
	}

	if (value > inMax) {
		return outMax;
	}

	return (value - inMin) / (inMax - inMin) * (outMax - outMin) + outMin;
}
