nwt.register({

	name: 'Button',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(button-state|buttons-checkbox|buttons-radio|button)/, this.toggle);
		},

		toggle: function(el,target, action) {
			var togglers = {
				'button-state' : function(){
					el.setData('original-text', el.getHtml());
					el.setHtml(el.data('loading-text'));
					el.set('disabled', true);
				},
				'buttons-checkbox' : function(){
					togglers.button();
				},
				'buttons-radio' : function(){
					el.parent().all('.btn').removeClass('active');
					el.addClass('active');
				},
				'button' : function(){
					if ( el.hasClass('active') ) {
						el.removeClass('active');
					} else {
						el.addClass('active');
					}
				}
			};
			console.log('Performing action', action[1])
			togglers[action[1]]();
		}
	}
});
nwt.plugin('Button');