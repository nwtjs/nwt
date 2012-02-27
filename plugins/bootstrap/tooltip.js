nwt.register({

	name: 'Tooltip',

	methods: {
		init: function () {
			nwt.event.live('data-tooltip', /(.*)/, this.show, 'mousemove');
		},

		show: function(el, action) {


			if (el.hasClass('tooltip-shown') ) {

				return;
			}

			el.addClass('tooltip-shown');

			var region = el.region(),

				top,

				left,

				placement = el.data('position') || 'top',

				tooltip = nwt.node.create('<div class="tooltip fade ' + placement + ' in" style="display:block;"><div class="tooltip-arrow"></div><div class="tooltip-inner">' + el.data('tooltip') + '</div></div>'),
				
				tipRegion;

			// Append the tooltip so we know it's dimensions
			nwt.one('body').append(tooltip);
			tipRegion = tooltip.region();
	
			switch (placement) {
				case 'bottom':
					top = region.bottom;
					left = region.left + (region.width - tipRegion.width) / 2
				break
				case 'top':
					top = region.top - tipRegion.height
					left = region.left + (region.width - tipRegion.width) / 2
				break
				case 'left':
					top = region.top - (region.height / 2)
					left = region.left - tipRegion.width
				break
				case 'right':
					top = region.top - (region.height / 2)
					left = region.right;
				break
			}

			tooltip.setStyles({
				left: left,
				top: top
			});

			el.once('mouseout', function(){
				el.removeClass('tooltip-shown');
				tooltip.remove();
			});
		}
	}
});
nwt.plugin('Tooltip');