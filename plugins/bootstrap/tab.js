/**
 * This allows tabs to function using semantic attributes
 * Expected tab markup:
 
 <ul class="tabs">
	<li><a href="#home" data-toggle="tab">Home</a></li>
	<li><a href="#profile" data-toggle="tab">Profile</a></li>
	<li><a href="#messages" data-toggle="tab">Messages</a></li>
	<li><a href="#ettings" data-toggle="tab">Settings</a></li>
</ul>
<div class="tab-content">
	<div class="tab-pane active" id="home">First Tab</div>
	<div class="tab-pane" id="profile">Second Tab</div>
	<div class="tab-pane" id="messages">Third Tab</div>
	<div class="tab-pane" id="settings">Fourth Tab</div>
</div> 
 */

nwt.register({

	name: 'BootstrapTab',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(tab)/, this.tabClick);
		},

		tabClick: function(el) {
			if ( el.parent().hasClass('active') ) return;

			var list = el.ancestor('ul');

			list.all('li').removeClass('active');
			el.parent().addClass('active');

			list.next().all('.tab-pane.active').removeClass('active');
			list.next().one('.tab-pane' + el.get('href').substring(el.get('href').indexOf('#'))).addClass('active');
		}
	}
});
nwt.plugin('BootstrapTab');