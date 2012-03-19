/**
 * The Scroller plugin is a plugin which is an easy way to allow custom scrollbars
 */
nwt.register({

	name: 'Scroller',

	methods: {
		init: function (config) {

			var self = this;

			// The node we scroll inside of
			this.node = config.node;

			// Amount to scroll by
			this.wheelScroll = config.wheelScroll || 15;

			// How far offset is the scrollbar from the top of the scrollable area
			this.scrollbarOffset = config.scrollbarOffset || 0;

			// Build the markup
			this.thumb = n.node.create('<div class="thumb" style="width:25px;cursor:pointer;overflow:hidden;position:absolute;top:0;left:-4px;"><div style="background:#98bb47;border-radius:5px;height:100%;width:12px;margin:0 0 0 6px;"></div></div>'),
			this.scrollbar = n.node.create('<div class="scrollbar" style="background:#DDD; border-radius:5px;position:absolute;right:3px;top:' + this.scrollbarOffset + 'px;z-index:100;width:16px;margin-left:11px;cursor: pointer;"></div>').append(this.thumb),

			// Current ratio of region height to total scroll area
			// If this is >= there is no need to scroll
			this.currRatio;

			// Append the scrollbar to the node
			this.node.prepend(this.scrollbar);

			// Add dom events
			/**
			 * Handle mousewheel scrolling
			 * Bubble up through the parents of the target and find the container
			 */
			n.one(document).on('mousewheel', function(e){
				var target = e.target;
			
				while (target) {
					// Only scroll if we found the target and there is something to scroll
					if (target == this.node && currRatio < 1) {
						this.setPositionIfValid(parseInt(this.thumb.getStyle('top'), 10) - (e.wheelDelta*wheel))
						e.preventDefault();
						break;
					}
					target = target.get('parentNode');
				}
			}, this.node);

			// Add events
			this.scrollbar.on('mousedown', this.startInteract);
			this.scrollbar.on('mouseup', this.endInteract);
			
			this.setSizing();
		},
			
		setSizing: function() {
			// Size the scrollbar appropriately
			this.scrollbar.setStyle('height', parseInt(el.getStyle('height'), 10)+ 'px');
		
			// Update the ratio
			currRatio = this.node.region().height / this.node.get('scrollHeight')
			
			// Hide elements if the ratio is < 1
			if (currRatio >= 1) {
				this.scrollbar.setStyle('display', 'none');
			} else {
				this.scrollbar.setStyle('display', 'block');
			}
		
			// Size the thumb based on ratio
			this.thumb.setStyle('height', Math.round(currRatio*100) + '%');
		},
		
		setPositionIfValid: function(pos) {
			var thumbRegion = this.thumb.region();

			var scrollHeight = this.scrollbar.region().height;
		
			if (pos < 0) {
				pos = 0;
			} else if (pos + thumbRegion.height/2 > scrollHeight - thumbRegion.height/2){
				pos = scrollHeight - thumbRegion.height;
			}
		
			this.thumb.setStyle('top', pos);
		
			// Now set the style of the scrollable area based on the slider
			var scrollVal = (parseInt(this.thumb.getStyle('top'), 10) * this.node.get('scrollHeight')) / this.scrollbar.region().height;
			scrollVal = Math.round(scrollVal);
			this.node.set('scrollTop', scrollVal);
		},
		
		/**
		 * Update the position of the thumb from an event
		 */
		updatePositionFromEvent: function(e) {
			var thumbOffset = this.thumb.region().height/2;
			this.setPositionIfValid(e.pageY - (el.region().top + this.scrollbarOffset) - thumbOffset);
		},
		
		
		/**
		 * Called when we init an interaction
		 */
		startInteract: function(e) {
			this.updatePositionFromEvent(e)
			this.scrollbar.on('mousemove', this.updatePositionFromEvent);
		},
		
		/**
		 * Called when we end an interaction
		 */
		endInteract: function(e) {
			this.updatePositionFromEvent(e)
			this.scrollbar.detach('mousemove', this.updatePositionFromEvent);
		}
	}
});

