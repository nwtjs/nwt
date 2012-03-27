nwt.register({

	name: 'Collapse',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(collapse)/, this.collapse.bind(this));
		},

		/**
		 * Gets the el to expand/collapse
		 */
		_getEl: function(el) {
			return el.next('.collapse');
		},

		collapse: function(el, target) {

			var body = this._getEl(target);

			// Add the in class for transitions
			if (!body.hasClass('in')) {
				body.addClass('in');
			}

			// Shrink all others in the accordian
			try {
				body.ancestor('.accordion').all('.collapse').each(function(el){
					if (parseInt(el.getStyle('height'), 10) !== 0) el.anim({'height': 0}, 0.20);
				})
			} catch(e) {}

			body.popAnim() || body.anim({'height': body.get('scrollHeight')}, 0.20);
		}
	}
});
nwt.plugin('Collapse');