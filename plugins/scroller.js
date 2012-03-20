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
			this.scrollbar = n.node.create('<div class="scrollbar" style="background:#DDD; border-radius:5px;position:absolute;z-index:100;width:16px;margin-left:11px;cursor: pointer;"></div>').append(this.thumb),

			// Current ratio of region height to total scroll area
			// If this is >= there is no need to scroll
			this.currRatio;

			// Set the element we are scrolling to overflow:hidden so there isnt' two scrollbars
			this.node.setStyle('overflow', 'hidden')
			
			// Append the scrollbar to the body and render absolutely
			this.scrollbar.appendTo('body');

			this.scrollbar.setStyles({
				left: this.node.region().right,
				top: this.scrollbarOffset + this.node.region().top
			});

			// Add dom events
			/**
			 * Handle mousewheel scrolling
			 * Bubble up through the parents of the target and find the container
			 */
			n.one(window).on('mousewheel', function(e){
				var target = e.target;

				while (target && target._node) {
					// Only scroll if we found the target and there is something to scroll
					if (target._node == this.node._node && this.currRatio < 1) {
						this.setPositionIfValid(parseInt(this.thumb.getStyle('top'), 10) - (e._e.wheelDelta*this.wheelScroll))
						e.noDefault();
						break;
					}
					target = target.parent();
				}
			}.bind(this));

			// Add events
			this.scrollbar.on('mousedown', this.startInteract.bind(this));
			this.scrollbar.on('mouseup', this.endInteract.bind(this));
			
			this.setSizing();
		},
			
		setSizing: function() {
			// Size the scrollbar appropriately
			this.scrollbar.setStyle('height', parseInt(this.node.getStyle('height'), 10)+ 'px');
		
			// Update the ratio
			this.currRatio = this.node.region().height / this.node.get('scrollHeight')
			
			// Hide elements if the ratio is < 1
			if (this.currRatio >= 1) {
				this.scrollbar.setStyle('display', 'none');
			} else {
				this.scrollbar.setStyle('display', 'block');
			}
		
			// Size the thumb based on ratio
			this.thumb.setStyle('height', Math.round(this.currRatio*100) + '%');
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
			this.setPositionIfValid(e._e.pageY - (this.node.region().top + this.scrollbarOffset) - thumbOffset);
		},
		
		
		/**
		 * Called when we init an interaction
		 */
		startInteract: function(e) {
			this.updatePositionFromEvent(e)
			this.scrollbar.on('mousemove', this.updatePositionFromEvent.bind(this));
		},
		
		/**
		 * Called when we end an interaction
		 */
		endInteract: function(e) {
			this.updatePositionFromEvent(e)
			this.scrollbar.off('mousemove', this.updatePositionFromEvent.bind(this));
		}
	}
});

