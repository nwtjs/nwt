nwt.register({

	name: 'Carousel',

	methods: {
		init: function () {
			nwt.event.live('data-slide', /(.*)/, this.slide);
		},


		/**
		 * Sets the carousel to autoplay
		 */
		play: function() {

			  this.interval = setInterval(this.next, 5000);

			  return this;
		},


		/**
		 * Pauses the carousel
		 */
		pause: function () {
			clearInterval(this.interval)
			this.interval = null
			return this
		},

		/**
		 * Rotates to the next item in the carousel
		 */
		next: function() {
		},


		/**
		 * Slides the carousel
		 * Dispatched callback from nwt.event.live
		 */
		slide: function(origEl, el, matches) {

			var dir = matches[1],

				carouselEl = el.ancestor('.carousel'),

				method = dir == 'next' ? 'next' : 'previous',

				direction = dir == 'next' ? 'left' : 'right',

				activeItem = carouselEl.one('.active'),

				nextItem = activeItem[method]();

			if (nextItem && nextItem._node) {
				nextItem.addClass(dir)
				nextItem.region() // force reflow
				activeItem.addClass(direction)
				nextItem.addClass(direction)

				setTimeout(function(){
					nextItem.removeClass(direction).removeClass(dir).addClass('active')
					activeItem.removeClass('active').removeClass(direction)
				}, 600)
			}
		}
	}
});
nwt.plugin('Carousel');