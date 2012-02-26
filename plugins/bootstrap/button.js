nwt.register({

	name: 'BootstrapButton',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(buttons-checkbox|buttons-radio|button)/, this.toggle);
		},

		toggle: function(el) {
			console.log('Toggling!!', el, el.get('className'));
		}
	}
});
nwt.plugin('BootstrapButton');