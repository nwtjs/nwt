nwt.register({

	name: 'Collapse',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(collapse)/, this.collapse);
		},

		/**
		 * Gets the el to expand/collapse
		 */
		_getEl: function(el) {
			return el.parent().next('.collapse');
		},
		
		collapse: function(el) {

			var body = this._getEl();

			// Add the in class for transitions
			if (!body.hasClass('in')) {
				body.addClass('in');
			}

			// If we are expanded, collapse and return
			if (parseInt(body.getStyle('height'), 10) !== 0) {
				body.setStyle('height', '0px');
				return;
			}

			// Shrink all others in the accordian
			body.ancestor('.accordion').all('.collapse').setStyle('height', '0px');

			body.setStyle('height', body.get('scrollHeight'));
		}
	}
});
nwt.plugin('Collapse');