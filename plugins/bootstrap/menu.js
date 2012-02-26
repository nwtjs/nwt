/**
 * This allows tabs to function using semantic attributes
 * Expected tab markup:
 
<div class="btn-group">
	<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
		Action
		<span class="caret"></span>
	</a>
	<ul class="dropdown-menu">
		<!-- dropdown menu links -->
	</ul>
</div>
 */

nwt.register({

	name: 'BootstrapMenu',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(dropdown)/, this.toggle);
		},

		toggle: function(el) {

			var btnParent = el.parent();

			// Remove the open  
			if (btnParent.hasClass('open')) {
				btnParent.removeClass('open');
			} else {
				btnParent.addClass('open');
				nwt.one('body').once('click', function (e) {

					btnParent.removeClass('open');

					// Return if we clicked on the top level menu item
					if (e.target.hasClass('dropdown-toggle') || e.target.get('nodeName').toLowerCase() !== 'a') { return; }

					// If we clicked on a nested link, update the contents of the trigger
					var targetParent = e.target.parent();
					while(true) {
						if (targetParent && targetParent._node == btnParent._node) {
							el.setContent(e.target.getContent() + ' <span class="caret"></span>');
							e.stop();
							break;
						}

						if (!targetParent._node || !targetParent._node.parentNode) {
							break;
						}
						targetParent = targetParent.parent();
					}
				});
			}

		}
	}
});
nwt.plugin('BootstrapMenu');