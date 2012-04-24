nwt.register({

	name: 'Tooltip',

	methods: {
		init: function () {
			nwt.event.live('data-tooltip', /(.*)/, this.show, 'mousemove', 2);
		},

		show: function(target, el, action) {

			if (el.hasClass('tooltip-shown') ) {

				return;
			}

			el.addClass('tooltip-shown');

			var layout = el.data('layout') || 'tooltip',

				region = el.region(),

				top,

				left,

				placement = el.data('position') || 'top',

				popoverContent = layout == 'tooltip' ? el.data('tooltip') : '<h3 class="popover-title">' + el.data('title') + '</h3><div class="popover-content">' + el.data('tooltip') + '</div>',

				tooltip = nwt.node.create('<div class="' + layout + ' fade ' + placement + ' in" style="display:block;"><div class="arrow ' + layout + '-arrow"></div><div class="' + layout + '-inner">' + popoverContent + '</div></div>'),

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
					top = region.top + (region.height - tipRegion.height) / 2
					left = region.left - tipRegion.width
				break
				case 'right':
					top = region.top + (region.height - tipRegion.height) / 2
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