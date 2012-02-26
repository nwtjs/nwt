nwt.register({

	name: 'Modal',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(modal)/, this.toggle);
			nwt.event.live('data-dismiss', /(modal)/, this.toggle);
		},

		toggle: function(el, action) {

			var id,
				modalEl;

			if (el.hasAttribute('data-dismiss')) {
				id = '#' + el.ancestor('.modal').get('id');
			} else {
				var href = el.get('href');
				id = href.substring(href.indexOf('#'));
			}
			modalEl = nwt.one(id);

			if (modalEl.hasClass('in')) {
				modalEl.swapClass('in', 'hide');
				modalEl.setStyle('display', 'none');

				nwt.one('.modal-backdrop[data-modal="' + id + '"]').remove();
			} else {
				modalEl.swapClass('hide', 'in');
				modalEl.setStyle('display', 'block');

				nwt.one('body').append(nwt.node.create('<div class="modal-backdrop fade in" data-modal="' + id + '"></div>'));
			}
		}
	}
});
nwt.plugin('Modal');