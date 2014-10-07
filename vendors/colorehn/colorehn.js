/**
 * Round a value to at most N decimals. Source: http://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-in-javascript
 * @param  {Number} value    Value to be rounded
 * @param  {Number} decimals Amount of decimals to round to
 * @return {Number}          The rounded value
 */
Math._roundTo = function(value, decimals) {
	return +(value.toFixed(decimals));
};
/**
 * Converts a color from the RGB color space to the HSV color space. Source: http://www.cs.rit.edu/~ncs/color/t_convert.html
 * @param  {Object} rgb        An object containing color RGB color information
 * @param  {Number} rgb.r      Representing the red value of the color. Ranges from 0 to 255
 * @param  {Number} rgb.g      Representing the green value of the color. Ranges from 0 to 255
 * @param  {Number} rgb.b      Representing the blue value of the color. Ranges from 0 to 255
 * @return {Object}            An object with a h(=0-360), s(=0-1) and v(=0-1) property
 */
function rgbToHsv(rgb) {
	var hsv = {};
	var min, max, delta;

	//Convert 0-255 range to 0-1 range
	rgb.r /= 255;
	rgb.g /= 255;
	rgb.b /= 255;

	min = Math.min(rgb.r, rgb.g, rgb.b);
	max = Math.max(rgb.r, rgb.g, rgb.b);
	delta = max - min;

	//Decide value
	hsv.v = max;


	if (max !== 0) {
		//Decide saturation
		hsv.s = delta / max;
	} else {
		//saturation = 0, value is undefined
		hsv.s = 0;
		hsv.h = 0;
		return hsv;
	}

	if (rgb.r === max) {
		//Betwwen yellow & magenta
		hsv.h = (rgb.g - rgb.b) / delta;
	} else if (rgb.g === max) {
		//Between cyan & yellow
		hsv.h = 2 + (rgb.b - rgb.r) / delta;
	} else {
		//Between magenta & cyan
		hsv.h = 4 + (rgb.r - rgb.g) / delta;
	}

	//If delta === 0, then set h to 0
	if (!hsv.h) {
		hsv.h = 0;
	}

	//Degrees
	hsv.h *= 60;
	if (hsv.h < 0) {
		hsv.h += 360;
	}

	//Rounding to remove trailing digits
	hsv.h = Math._roundTo(hsv.h, 2);
	hsv.s = Math._roundTo(hsv.s, 4);
	hsv.v = Math._roundTo(hsv.v, 4);

	return hsv;
}

/**
 * Converts a color from the HSV color space to the RGB color space. Source: http://www.cs.rit.edu/~ncs/color/t_convert.html
 * @param  {Object} hsv        An object containing color HSV color information
 * @param  {Number} hsv.h      Representing the hue. Ranges from 0 to 360
 * @param  {Number} hsv.s      Representing the saturation. Ranges from 0 to 1
 * @param  {Number} hsv.v      Representing the value. Ranges from 0 to 1
 * @return {Object}            An object with a r, g and b property, all ranging from 0 to 255
 */
function hsvToRgb(hsv) {
	var rgb = {};
	var i, f, p, q, t;

	if (hsv.s === 0) {
		//Achromatic (grey)
		rgb.r = rgb.g = rgb.b = hsv.v;
		return rgb;
	}

	//Sector 0 to 5
	hsv.h /= 60;
	i = Math.floor(hsv.h);
	//Factorial part of h
	f = hsv.h - i;
	p = hsv.v * (1 - hsv.s);
	q = hsv.v * (1 - hsv.s * f);
	t = hsv.v * (1 - hsv.s * (1 - f));

	switch(i) {
		case 0:
			rgb.r = hsv.v;
			rgb.g = t;
			rgb.b = p;
			break;
		case 1:
			rgb.r = q;
			rgb.g = hsv.v;
			rgb.b = p;
			break;
		case 2:
			rgb.r = p;
			rgb.g = hsv.v;
			rgb.b = t;
			break;
		case 3:
			rgb.r = p;
			rgb.g = q;
			rgb.b = hsv.v;
			break;
		case 4:
			rgb.r = t;
			rgb.g = p;
			rgb.b = hsv.v;
			break;
		default:
			rgb.r = hsv.v;
			rgb.g = p;
			rgb.b = q;
			break;
	}

	//Scale the RGB 0-1 range to 0-255 range again
	rgb.r *= 255;
	rgb.g *= 255;
	rgb.b *= 255;

	//RGB is supposed to be integers only
	rgb.r = Math.round(rgb.r);
	rgb.g = Math.round(rgb.g);
	rgb.b = Math.round(rgb.b);

	return rgb;
}

/**
 * Converts a color from the HSL color space to the RGB color space. Source: http://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
 * @param  {Object} hsl        An object containing color HSL color information
 * @param  {Number} hsl.h      Representing the hue. Ranges from 0 to 360
 * @param  {Number} hsl.s      Representing the saturation. Ranges from 0 to 1
 * @param  {Number} hsl.l      Representing the lightness. Ranges from 0 to 1
 * @return {Object}            An object with a r, g and b property, all ranging from 0 to 255
 */
function hslToRgb(hsl) {
	var rgb = {};
	var chroma, x, hPrime, i, m;

	//Find chroma	
	chroma = (1 - Math.abs(2 * hsl.l - 1)) * hsl.s;

	//Sector 0 to 5
	hPrime = hsl.h / 60;
	i = Math.floor(hPrime);

	x = chroma * (1 - Math.abs(hPrime % 2 - 1));

	switch(i) {
		case 0:
			rgb.r = chroma;
			rgb.g = x;
			rgb.b = 0;
			break;
		case 1:
			rgb.r = x;
			rgb.g = chroma;
			rgb.b = 0;
			break;
		case 2:
			rgb.r = 0;
			rgb.g = chroma;
			rgb.b = x;
			break;
		case 3:
			rgb.r = 0;
			rgb.g = x;
			rgb.b = chroma;
			break;
		case 4:
			rgb.r = x;
			rgb.g = 0;
			rgb.b = chroma;
			break;
		default:
			rgb.r = chroma;
			rgb.g = 0;
			rgb.b = x;
			break;
	}

	//Add m to match lightness
	m = hsl.l - chroma / 2;
	rgb.r += m;
	rgb.g += m;
	rgb.b += m;

	//Scale the RGB 0-1 range to 0-255 range again
	rgb.r *= 255;
	rgb.g *= 255;
	rgb.b *= 255;

	//RGB is supposed to be integers only
	rgb.r = Math.round(rgb.r);
	rgb.g = Math.round(rgb.g);
	rgb.b = Math.round(rgb.b);

	return rgb;
}

/**
 * Converts a color from the RGB color space to the HSL color space. Source: http://www.rapidtables.com/convert/color/rgb-to-hsl.htm
 * @param  {Object} rgb        An object containing color RGB color information
 * @param  {Number} rgb.r      Representing the red value of the color. Ranges from 0 to 255
 * @param  {Number} rgb.g      Representing the green value of the color. Ranges from 0 to 255
 * @param  {Number} rgb.b      Representing the blue value of the color. Ranges from 0 to 255
 * @return {Object}            An object with a h(=0-360), s(=0-1) and l(=0-1) property
 */
function rgbToHsl(rgb) {
	var hsl = {};
	var min, max, delta, rPrime, gPrime, bPrime;

	//Convert 0-255 range to 0-1 range
	rPrime = rgb.r / 255;
	gPrime = rgb.g / 255;
	bPrime = rgb.b / 255;

	min = Math.min(rPrime, gPrime, bPrime);
	max = Math.max(rPrime, gPrime, bPrime);
	delta = max - min;

	//Lightness calculation
	hsl.l = (max + min) / 2;

	//Hue calculation
	if (delta === 0) {
		hsl.h = 0;
	} else if (max === rPrime) {
		hsl.h = ((gPrime - bPrime) / delta) % 6;
	} else if (max === gPrime) {
		hsl.h = (bPrime - rPrime) / delta + 2;
	} else {
		hsl.h = (rPrime - gPrime) / delta + 4;
	}
	//Scale to degrees
	hsl.h *= 60;
	if (hsl.h < 0) {
		hsl.h += 360;
	}

	//Saturation calculation
	if (delta === 0) {
		hsl.s = 0;
	} else {
		hsl.s = delta / (1 - Math.abs(2 * hsl.l - 1));
	}

	//Rounding to remove trailing digits
	hsl.h = Math._roundTo(hsl.h, 2);
	hsl.s = Math._roundTo(hsl.s, 4);
	hsl.l = Math._roundTo(hsl.l, 4);

	return hsl;
}

/**
 * Hsl([h, s, l])
 * @class Represents a color with HSL scheme
 * @param {int} [h] [h - hue - ranging from 0 to 360]
 * @param {float} [s] [s - saturation - ranging from 0 to 1]
 * @param {float} [l] [l - lightness - ranging from 0 to 1]
 */
function Hsl() {
	if (!(this instanceof Hsl)) {
		throw new Error('Hsl can only be called with the \'new\' operand');
	}

	this.h = 0;
	this.s = 0;
	this.l = 0;

	switch (arguments.length) {
		case 0:
			break;
		case 3:
			this.h = arguments[0];
			this.s = arguments[1];
			this.l = arguments[2];

			if (this.h < 0 || this.h > 360) {
				throw new Error('Value of \'h\' must be between 0-360');
			}
			if (this.s < 0 || this.s > 1) {
				throw new Error('Value of \'s\' must be between 0-1');
			}
			if (this.l < 0 || this.l > 1) {
				throw new Error('Value of \'l\' must be between 0-1');
			}

			break;
		default:
			throw new Error('No overload method with ' + arguments.length + ' arguments for \'Hsl\' is available');
	}

}

/**
 * Converts the color to the RGB color scheme
 * @return {Rgb} A Rgb object
 */
Hsl.prototype.toRgb = function() {
	var rgb = hslToRgb({ h: this.h, s: this.s, l: this.l });
	return new Rgb(rgb.r, rgb.g, rgb.b);
};

/**
 * Converts the color to the HSV color scheme
 * @return {Hsv} A Hsv object
 */
Hsl.prototype.toHsv = function() {
	return this.toRgb().toHsv();
};

/**
 * Converts the color to a hex encoded string
 * @return {String} A hex encoded string, e.g. #AB1B33
 */
Hsl.prototype.toHex = function() {
	return this.toRgb().toHex();
};

Hsl.prototype.getComplementary = function() {
	var newH = this.h + 180;
	if (newH > 360)
		newH -= 360;

	return new Hsl(newH, this.s, this.l);
};

/**
 * Hsv([h, s, v])
 * @class Represents a color with HSV scheme
 * @param {int} [h] [h - hue - ranging from 0 to 360]
 * @param {float} [s] [s - saturation - ranging from 0 to 1]
 * @param {float} [v] [v - value - ranging from 0 to 1]
 */
function Hsv() {
	if (!(this instanceof Hsv)) {
		throw new Error('Hsv can only be called with the \'new\' operand');
	}

	this.h = 0;
	this.s = 0;
	this.v = 0;

	switch (arguments.length) {
		case 0:
			break;
		case 3:
			this.h = arguments[0];
			this.s = arguments[1];
			this.v = arguments[2];

			if (this.h < 0 || this.h > 360) {
				throw new Error('Value of \'h\' must be between 0-360');
			}
			if (this.s < 0 || this.s > 1) {
				throw new Error('Value of \'s\' must be between 0-1');
			}
			if (this.v < 0 || this.v > 1) {
				throw new Error('Value of \'v\' must be between 0-1');
			}

			break;
		default:
			throw new Error('No overload method with ' + arguments.length + ' arguments for \'Hsv\' is available');
	}

}

/**
 * Converts the color to the RGB color scheme
 * @return {Rgb} A Rgb object
 */
Hsv.prototype.toRgb = function() {
	var rgb = hsvToRgb({ h: this.h, s: this.s, v: this.v });
	return new Rgb(rgb.r, rgb.g, rgb.b);
};

/**
 * Converts the color to the HSL color scheme
 * @return {Hsl} A Hsl object
 */
Hsv.prototype.toHsl = function() {
	var rgb = hsvToRgb({ h: this.h, s: this.s, v: this.v });
	return new Rgb(rgb.r, rgb.g, rgb.b).toHsl();
};

/**
 * Converts the color to a hex encoded string
 * @return {String} A hex encoded string, e.g. #AB1B33
 */
Hsv.prototype.toHex = function() {
	return this.toRgb().toHex();
};

/**
 * Rgb([{r, g, b} | {value}])
 * @class Represents a color with the RGB scheme
 * @param {int} [r] [red value, ranges from 0-255]
 * @param {int} [g] [green value, ranges from 0-255]
 * @param {int} [b] [blue value, ranges from 0-255]
 * @param {int} [value] [set all of r, g and b to value, ranges from 0-255]
 */
function Rgb() {
	if (!(this instanceof Rgb)) {
		throw new Error('Rgb can only be called with the \'new\' operand');
	}

	this.r = 0;
	this.g = 0;
	this.b = 0;

	switch (arguments.length) {
		case 0:
			break;
		case 1:
			if (arguments[0] < 0 || arguments[0] > 255) {
				throw new Error('Value of \'value\' must be between 0-255');
			}

			this.r = this.g = this.b = arguments[0];

			break;
		case 3:
			this.r = arguments[0];
			this.g = arguments[1];
			this.b = arguments[2];

			if (this.r < 0 || this.r > 255) {
				throw new Error('Value of \'r\' must be between 0-255');
			}
			if (this.g < 0 || this.g > 255) {
				throw new Error('Value of \'g\' must be between 0-255');
			}
			if (this.b < 0 || this.b > 255) {
				throw new Error('Value of \'b\' must be between 0-255');
			}

			break;
		default:
			throw new Error('No overload method with ' + arguments.length + ' arguments for \'Rgb\' is available');
	}
}

/**
 * Converts the color to the HSV color scheme
 * @return {Hsv} A Hsv object
 */
Rgb.prototype.toHsv = function() {
	var hsv = rgbToHsv({ r: this.r, g: this.g, b: this.b });
	return new Hsv(hsv.h, hsv.s, hsv.v);
};

/**
 * Converts the color to the HSL color scheme
 * @return {Hsl} A Hsl object
 */
Rgb.prototype.toHsl = function() {
	var hsl = rgbToHsl({ r: this.r, g: this.g, b: this.b });
	return new Hsl(hsl.h, hsl.s, hsl.l);
};

/**
 * Converts the color to a hex encoded string
 * @return {String} A hex encoded string, e.g. #AB1B33
 */
Rgb.prototype.toHex = function() {
	//Round in case of earlier conversions causing floats, to hex string
	var r = Math.round(this.r).toString(16);
	var g = Math.round(this.g).toString(16);
	var b = Math.round(this.b).toString(16);

	//See if Object.toString(16) only left one letter, color hex strings always requires two, i.e. '0E' and not 'E'
	if (r.length === 1)
		r = '0' + r;
	if (g.length === 1)
		g = '0' + g;
	if (b.length === 1)
		b = '0' + b;

	return r + g + b;
};