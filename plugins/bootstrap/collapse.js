nwt.register({

	name: 'Collapse',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(collapse)/, this.collapse);
		},

		collapse: function(el) {

			var collapseGroup = el.ancestor('.accordion-group'),
				body = collapseGroup.one('.accordion-body');

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