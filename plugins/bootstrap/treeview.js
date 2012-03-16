/**
 * This allows treeviews to function using semantic attributes
 */
/*
nwt.register({

	name: 'Treeview',

	methods: {
		init: function () {
			nwt.event.live('class', /(.*)/, this.toggle);
		},

		toggle: function(el) {
			if ( el.parent().hasClass('active') ) return;

			var list = el.ancestor('ul');

			list.all('li').removeClass('active');
			el.parent().addClass('active');

			try {
				list.next().all('.tab-pane.active').removeClass('active');
				list.next().one('.tab-pane' + el.get('href').substring(el.get('href').indexOf('#'))).addClass('active');
			} catch(e) {
			}
		}
	}
});
nwt.plugin('Treeview');
*/