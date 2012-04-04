/**
 * Fix IE Events
 */
nwt.augment('Event', 'pageX', function () {
	if (this._e.clientX) {
		return this._e.pageX = this._e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
	}
});

nwt.augment('Event', 'pageY', function () {
	if (this._e.clientY) {
		return this._e.pageY = this._e.clientY + document.body.scrollTop + document.documentElement.scrollTop
	}
});