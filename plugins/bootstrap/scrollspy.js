nwt.register({

	name: 'Scrollspy',

	methods: {
		init: function (config) {

			var self = this;

			// The node we scroll inside of
			this.node = config.node;

			// The node that we update on scroll
			this.updateEl = config.node.data('target') ? nwt.one(config.node.data('target')) : config.node.previous();

			// A list of all targets inside of the scroll area
			var targets = [];
			config.node.all('*[id]').each(function(el){
				var region = el.region();
				targets.push({node:el, top: region.top, bottom: region.bottom});
			})

			var containerTop = config.node.region().top,

				checkTargets = function(){
				var scrollStart = config.node.get('scrollTop') + containerTop,
					scrollBottom = scrollStart + config.node.region().height,
					foundTarget;

				for (var i=0, numTargets=targets.length; i < numTargets; i++) {
					var target = targets[i];

					if (target.bottom < scrollStart || target.top > scrollBottom) { continue; }

					// Otherwise we hit a target that's scrolled into view, cache it
					foundTarget = target;
					break;
				}
				return self.activate(foundTarget);
			};

			config.node.on('scroll', checkTargets);

			// Make the initial highlight
			checkTargets();
		},

		activate: function(spec) {
			var node = spec.node;
			this.updateEl.all('li.active').removeClass('active');
			this.updateEl.one('a[href="#' + node.get('id') + '"]').parent().addClass('active');
		}
	}
});

nwt.all('*[data-spy="scroll"]').plug('Scrollspy');