/**
 * This allows treeviews to function using semantic attributes
 */
nwt.register({

	name: 'Treeview',
	
	methods: {
		init: function (config) {
			this.node = config.node;

			this.node.on('click', this.collapse)
		},

		
		/**
		 * Collapses the next tree item
		 */
		collapse: function(e) {

			var leaf = e.target.next();

			// Add the in class for transitions
			if (!leaf.hasClass('in')) {
				leaf.addClass('in');
			}

			// If we are expanded, collapse and return
			if (leaf.hasClass('show')) {
				leaf.removeClass('show');
				return;
			}

			leaf.addClass('show');
			e.stop();
		}
	}
});
nwt.all('.treeview').plug('Treeview');