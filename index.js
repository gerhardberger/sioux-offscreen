var preventDefault = function (e) { e.preventDefault(); };

function Offscreen (offscreen, onscreen) {
	var self = this;

	if (!offscreen) self.offscreen = document.querySelector('.offscreen');
	else self.offscreen = offscreen._elems ? offscreen.element : offscreen;
	if (!onscreen) self.onscreen = document.querySelector('.onscreen');
	else self.onscreen = onscreen._elems ? onscreen.element : onscreen;

	self.hidden = true;


	var onscr = self.onscreen;
	var duration = '';
	var translateX = 0;

	var translate = function (left, right, delta) {
		var d = translateX + (right ? delta : -delta);
		if (d < 0) d = 0;
		else if (d > self.offscreen.offsetWidth) d = self.offscreen.offsetWidth;
		onscr.style.webkitTransform = 'translateX(' + d + 'px)';
	};

	onscr.addEventListener('swipestart', function (event) {
		var left = !self.hidden && event.direction === 'LEFT';
		var right = self.hidden && event.direction === 'RIGHT';

		if (!(left ^ right)) return;
		
		onscr.ontouchmove = preventDefault;
		duration = getComputedStyle(onscr).webkitTransitionDuration;
		onscr.style.webkitTransitionDuration = '0s';
		onscr.style.webkitOverflowScrolling = 'auto';
		onscr.style.overflow = 'hidden';
		var s = self.onscreen.style.webkitTransform.match(/\d+/);
		translateX = Number(s ? s[0] : 0);
		
		translate(left, right, event.delta);
	}, false);

	onscr.addEventListener('swipemove', function (event) {
		var left = !self.hidden && event.direction === 'LEFT';
		var right = self.hidden && event.direction === 'RIGHT';

		if (!(left ^ right)) return;

		translate(left, right, event.delta);
	}, false);

	onscr.addEventListener('swipeend', function (event) {
		var left = !self.hidden && event.direction === 'LEFT';
		var right = self.hidden && event.direction === 'RIGHT';

		if (!(left ^ right)) return;

		onscr.style.webkitOverflowScrolling = 'touch';
		onscr.style.overflow = 'auto';
		onscr.style.webkitTransitionDuration = duration;

		var enough = event.delta > 35;
		if ((right && enough) || (left && !enough)) self.show();
		if ((left && enough) || (right && !enough)) self.hide();
	}, false);
}

Offscreen.prototype.show = function (cb) {
	var self = this;
	self.onscreen.ontouchmove = preventDefault;

	var s = self.onscreen.style.webkitTransform.match(/\d+/);
	var translate = Number(s ? s[0] : 0);
	if (translate === this.offscreen.offsetWidth) {
		self.hidden = false;
		if (cb) cb();
		return;
	}
	self.onscreen.style.webkitTransform = 'translateX(' + this.offscreen.offsetWidth + 'px)';
	var handler = function (event) {
		if (event.propertyName !== '-webkit-transform') return;

		self.hidden = false;
		if (cb) cb();
		this.removeEventListener('webkitTransitionEnd', handler, false);
	};
	self.onscreen.addEventListener('webkitTransitionEnd', handler, false);
};

Offscreen.prototype.hide = function (cb) {
	var self = this;

	self.onscreen.ontouchmove = null;

	var s = self.onscreen.style.webkitTransform.match(/\d+/);
	var translate = Number(s ? s[0] : 0);
	if (translate === 0) {
		self.hidden = true;
		if (cb) cb();
		return;
	}
	self.onscreen.style.webkitTransform = 'translateX(0)';
	var handler = function (event) {
		if (event.propertyName !== '-webkit-transform') return;

		self.hidden = true;
		if (cb) cb();
		this.removeEventListener('webkitTransitionEnd', handler, false);
	};
	self.onscreen.addEventListener('webkitTransitionEnd', handler, false);

	return this;
};

Offscreen.prototype.toggle = function(cb) {
	if (this.hidden) this.show(cb);
	else this.hide(cb);

	return this;
};

module.exports = Offscreen;