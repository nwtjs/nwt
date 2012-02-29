nwt.register({

	name: 'Alert',

	methods: {
		init: function () {
			nwt.event.live('data-dismiss', /(alert)/, this.close);
		},

		close: function(el) {
			var alertBox = el.ancestor('.alert');

			alertBox.removeClass('in');

			setTimeout(function(){
				alertBox.remove();
			}, 350)
		}
	}
});
nwt.plugin('Alert');