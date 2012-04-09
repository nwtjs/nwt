nwt.register({

	name: 'Typeahead',

	methods: {
		init: function (config) {

			var cachedSource = null,

				self = this,

				numItems = parseInt(config.node.data('items'), 10) || 4,

				matcher = config.matcher || function(item, lcQuery) {
					return ~item.toLowerCase().indexOf(lcQuery)
				};

			this.node = config.node;

			this.menu = nwt.node.create('<ul class="typeahead dropdown-menu"></ul>');

			/**
			 * Handles clicking on typeahead results when expanded
			 */
			this.menu.on('click', function(e){
				e.target.ancestor('ul').one('.active').removeClass('active');
				e.target.parent().addClass('active');
				self.select(config.node);
				e.stop();
			});

			nwt.one('body').append(this.menu);

			config.node.on('keydown', function(e){

				switch(e.code()) {
					case 40: // down arrow
						e.noDefault()
						self.moveActive('next')
						return;
						break

					case 38: // up arrow
						e.noDefault()
						self.moveActive('previous')
						return;
						break
				
					case 13: // enter
						self.select(e.target)
						return;
					break
				
					case 27: // escape
						self.hide()
						return;
						break;
					break
					default:
					break
				}

				var el = e.target;

				// Cache and get the source
				if (!cachedSource) {
					cachedSource = JSON.parse(el.data('source'));
				}

				var items = [],
					lcQuery = el.get('value').toLowerCase();

				for (var i = 0, itemLen = cachedSource.length; i< itemLen; i++) {
					if (matcher(cachedSource[i], lcQuery)) {
						items.push(cachedSource[i]);
					}

					if (items.length > numItems) {
						break;
					}
				}

				if (!items.length) {
					return self.hide();
				}

				// Hide in 50ms if there is nothing entered
				setTimeout(function(){
					if (el.get('value') == '') {
						self.hide();
					}
				}, 50);
	
				return self.render(items);
			});

			nwt.one('body').on('cleanup', self.hide.bind(this))
		},


		/**
		 * Moves the active selected item
		 * @param string (next | previous)
		 */
		moveActive: function(dir) {
			var curr = this.menu.one('li.active'),
				targetNode = curr[dir]();

			this.menu.one('li.active').removeClass('active');

			targetNode.addClass('active');
			return this;
		},


		/**
		 * Hides the typehahead results
		 */
		hide: function(el) {

			this.node.fire('typeahead:hide')
			this.menu.setStyle('display', 'none')

			return this;
		},


		/**
		 * Renders the typeahead items
		 * @param array Matched items to render
		 */
		render: function(items) {

			var itemMarkup = '', i;
			for (i=0; i< items.length; i++) {
				itemMarkup += '<li><a href="#" data-value="' + items[i] + '">' + this.highlighter(items[i]) + '</a></li>';
			}

			var inputRegion = this.node.region();

			this.menu.setHtml(itemMarkup)
			this.menu.one('li').addClass('active')

			this.menu.setStyles({
				left: inputRegion.left,
				top: inputRegion.bottom,
				display:'block'
			});

			this.node.fire('typeahead:show')

			return this;
		},


		/**
		 * Highlights part of an item name
		 */
		highlighter: function (item) {
			return item.replace(new RegExp('(' + this.query + ')', 'ig'), function ($1, match) {
				return '<strong>' + match + '</strong>'
			})
		},


		/**
		 * Handles selection of an element
		 */
		select: function (el) {
			el.set('value', this.menu.one('li.active a').getHtml());
			this.node.fire('typeahead:select')
			return this.hide();
		}
	}
});

nwt.all('input[data-provide="typeahead"]').plug('Typeahead');