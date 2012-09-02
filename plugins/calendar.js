nwt.register({

	name: 'Calendar',

	methods: {
		
		/**
		 * Initializes the calendar plugin.
		 * You can plug a calendar into any DOM node.
		 * E.g., n.one('#mynode').plug('Calendar', {format: 'F jS, Y'})
		 * Possible config options:
		 *   panes - Number of month panes to show
		 *   format - Format string to return the date
		 *   mode - A string 'single', or 'multiple'. Whether the user should select one or multiple days. Defaults to single.
		 */
		init: function (config) {			

			this.panes = config.panes || 1
			this.mode = config.mode || 'single'
			this.dateFormat = config.format || 'F jS, Y'

			// From -> to range to select days
			this.selected = []

			this.weekdays = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']
			this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			this.suffix = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' }
		
			this.currentDate = new Date()
		
			this.month = this.currentDate.getMonth()
			this.year = this.currentDate.getFullYear()
		
			this.el = config.node

			// Default the selected day to be today if we're in 'single' mode
			if (this.mode == 'single') {
				this.selected = [{day:this.currentDate.getDate(), month: this.month, year: this.year}]
			}

			this.build()
		},


		/**
		 * Formats a date
		 */
		format: function(milliseconds) {
	
			var formattedDate = '',
	
			self = this,
	
			dateObj = new Date(milliseconds),
	
			format = {
				d: function() {
					var day = format.j()
					return (day < 10) ? '0' + day : day
				},
				D: function() {
					return self.weekdays[format.w()].substring(0, 3)
				},
				j: function() {
					return dateObj.getDate()
				},
				l: function() {
					return self.weekdays[format.w()] + 'day'
				},
				S: function() {
					return self.suffix[format.j()] || 'th'
				},
				w: function() {
					return dateObj.getDay()
				},
				F: function() {
					return self._convertMonthIdx(format.n(), true)
				},
				m: function() {
					var month = format.n() + 1
					return (month < 10) ? '0' + month : month
				},
				M: function() {
					return self._convertMonthIdx(format.n(), false)
				},
				n: function() {
					return dateObj.getMonth()
				},
				Y: function() {
					return dateObj.getFullYear()
				},
				y: function() {
					return format.Y().substring(2, 4)
				}
			},
			formatPieces = this.dateFormat.split('')
			
			for(i = 0, x = formatPieces.length; i < x; i++) {
				formattedDate += format[formatPieces[i]] ? format[formatPieces[i]]() : formatPieces[i]
			}
	
			return formattedDate
		},
	
		/**
		 * Converts a month index to a string
		 * @param object Month index
		 * @param bool Whether or not to display the full string
		 */
		_convertMonthIdx: function(date, full) {
			return ((full == true) ? this.months[date] : ((this.months[date].length > 3) ? this.months[date].substring(0, 3) : this.months[date]))
		},

		/**
		 * Returns the year based on month offset
		 * The year only changes if the month wraps to the next year
		 * @param integer month offset
		 */
		getOffsetYear: function(offset) {
			offset = offset || 0
			var year = this.year

			var monthNum = this.month
			monthNum += offset
			if(monthNum < 0) { year-- }
			if(monthNum > 11) { year++ }
			
			return year
		},
		
		/**
		 * Returns the month based on offset
		 * (Months after index of 11 return 0)
		 * @param integer month offset
		 */
		getOffsetMonth: function(offset) {
			var monthNum = this.month	

			offset = offset || 0

			monthNum += offset

			if(monthNum < 0) { monthNum = 11 }
			if(monthNum > 11) { monthNum = 0 }

			return monthNum
		},

		/**
		 * Renders the month based on current month +- offset
		 * @param integer offset month to add to the current
		 */
		renderMonth: function(offset) {
			var monthNum = this.getOffsetMonth(offset)
			return this._convertMonthIdx(monthNum, true)
		},


		/**
		 * Returns the current year
		 * @param integer offset in months to add/subtract from the the current date
		 */
		renderYear: function(offset) {
			var year = this.getOffsetYear(offset)
			return year
		},
	
		/**
		 * Returns the current number of days in the month
		 */
		currentNumDaysInMonth: function() {
			// checks to see if february is a leap year otherwise return the respective # of days
			return (this.month == 1 && !(this.year & 3) && (this.year % 1e2 || !(this.year % 4e2))) ? 29 : this.daysInMonth[this.month]
		},
	
	
		/**
		 * Called when we press previous/next
		 */
		loadMonth: function() {
			// if we go too far into the past
			if(this.month < 0) {
				this.year--
				
				// start our month count at 11 (11 = december)
				this.month = 11
			}
			
			// if we go too far into the future
			if(this.month > 11) {
				this.year++

				// restart our month count (0 = january)
				this.month = 0
			}

			// rebuild the calendar
			this.build()
		},
		
	
		/**
		 * Gets HTML for weekdays
		 */
		weekdayHeaderMarkup: function() {
			var html = ''
	
			for(i = 0, x = this.weekdays.length; i < x; i++) {
				html += '<th>' + this.weekdays[i].substring(0, 2) + '</th>'
			}
			return html
		},


		/**
		 * Builds calendar markup
		 * @param integer month offset
		 */
		calendarMarkup: function(offset) {

			var monthNum = this.month
			offset = offset || 0
			monthNum += offset

			if(monthNum < 0) { monthNum = 11 }
			if(monthNum > 11) { monthNum = 0 }
			var month = this.getOffsetMonth(offset)
				, year = this.getOffsetYear(offset)

			// get the first day of the month we are currently viewing
			var firstOfMonth = new Date(year, month, 1).getDay(),
	
			// get the total number of days in the month we are currently viewing
			numDays = this.currentNumDaysInMonth(),
	
			// declare our day counter
			dayCount = 0,
	
			html = '',
	
			row = '<tr>'
			
			// print out previous month's "days"
			for(i = 1; i <= firstOfMonth; i++) {
				row += '<td>&nbsp;</td>'
				dayCount++
			}
	
			for(i = 1; i <= numDays; i++) {
				// if we have reached the end of a week, wrap to the next line
				if(dayCount == 7) {
					row += '</tr>'
					html += row
					row = '<tr>'
					dayCount = 0
				}

				// output the text that goes inside each td
				// if the day is the current day, add a class of "selected"
				// Only show a default date if the selection mode is 'single'
				row += '<td data-day="' + i + '" class=""><a href="#">' + i + '</a></td>'
				dayCount++
			}
			
			// if we haven't finished at the end of the week, start writing out the "days" for the next month
			for(i = 1; i <= (7 - dayCount); i++) {
				row += '<td>&nbsp;</td>'
			}
	
			html += row
			
			return html
		},
	
	
		/**
		 * Selects all cells in this.selection
		 */
		doSelection: function() {
			// First deselect everything
			this.el.all('td.selected').removeClass('selected')
			
			for (var i=0,date;date=this.selected[i];i++) {
				var cell = this.el.one('.pane[data-month="' + date.month + '"][data-year="' + date.year + '"] td[data-day="' + date.day + '"]')
				if (cell._node) {
					cell.addClass('selected')
				}
			}
		},
	
		/**
		 * Creates the calendar element
		 */
		build: function() {

			// Remove any existing calendar (only one instance per node is allowed)
			var existing = this.el.one('.calendar')
			if (existing._node) {
				existing.remove()
			}

			this.calendarEl = n.node.create('<div class="calendar"></div>')

			var content = []

			for (var i=0;i<this.panes;i++) {
				var prevLink = ''
					, nextLink = ''

				if (i==0) {
					prevLink = '<span class="prev-month"><a href="#">&lt;</a></span>'
				}
				
				if (i+1 == this.panes) {
					nextLink = '<span class="next-month"><a href="#">&gt;</a></span>'
				}

				content = content.concat([
					'<div class="pane" data-month="', this.getOffsetMonth(i) ,'" data-year="', this.getOffsetYear(i), '">',
						'<div class="months">',
							prevLink,
							'<span class="current-month">' + this.renderMonth(i) + ' ' + this.renderYear(i) + '</span>',
							nextLink,
						'</div>',
						'<div class="days">',
							'<table><thead><tr class="weekdays">' + this.weekdayHeaderMarkup() + '</tr></thead>',
								'<tbody>' + this.calendarMarkup(i) + '</tbody>',
							'</table>',
						'</div>',
					'</div>'
				])
			}

			this.calendarEl.setHtml(content.join(''))

			// Position the calendar
			this.calendarEl.appendTo(this.el)

			this.doSelection()

			this.calendarEl.one('.prev-month').on('click', function(e){
				this.month--
				this.loadMonth()
				e.stop()
			}.bind(this))
	
			this.calendarEl.one('.next-month').on('click', function(e){
				this.month++
				this.loadMonth()
				e.stop()
			}.bind(this))
	
			this.calendarEl.on('click', function(e) {
				var dayNumber = parseInt(e.target.getHtml(), 10)
	
				if (isNaN(dayNumber)) {
					return
				}

				var paneEl = e.target.ancestor('.pane')

					, month = parseInt(paneEl.data('month'), 10)
					, year = parseInt(paneEl.data('year'), 10)

					, dateObj = new Date(year, month, dayNumber).getTime()
					, self = this

				function getdPickedDayEl() {
					return self.el.one('.pane[data-month="' + month + '"]').one('td[data-day="' + dayNumber + '"]')
				}

				// Handle single selection
				if (this.mode == 'single') {
					this.selected = [{year:year, month:month, day:dayNumber}]
					this.doSelection()
				}

				// Handle multiple selections
				if (this.mode == 'multiple') {

					if (this.selected.length > 1) {
						// Reset all nodes
						this.selected = [{year:year, month:month, day:dayNumber}]

					} else if (this.selected.length == 1 && this.selected[0].month == month && this.selected[0].year == year && this.selected[0].day == dayNumber ){
						// If the clicked square is the one in the selection, just clear the selection
						this.selected = []
						this.el.fire('pickClear')

					} else if (this.selected.length == 1){

						// Populate the selected array
						var dayI = this.selected[0].day+1,
							monthI = this.selected[0].month,
							yearI = this.selected[0].year

						// Swap values if the clicked day is before the start date
						if (dayI-1 > dayNumber || (monthI > month || yearI > year)) {
							var temp = {year:year, month:month, day:dayNumber}

							dayNumber = dayI-1
							month = monthI
							year = yearI
							
							this.selected = [temp]
							dayI = temp.day
							monthI = temp.month
							yearI = temp.year
						}


						while(true) {

							this.selected.push({year:yearI, month:monthI, day:dayI})

							if (dayI >= dayNumber && monthI >= month && yearI >= year) { break }

							if (dayI >= this.daysInMonth[monthI]) {
								dayI=0
								monthI++
							}
							if (monthI==11) {
								monthI=0
								yearI++
							}
							dayI++
						}

						this.el.fire('rangePick', {
							from: this.selected[0],
							to: {
								year: year,
								month: month,
								day: dayNumber
							}
						})

					} else {
						// First selection, so push something onto the selection stack
						this.selected.push({year:year, month:month, day:dayNumber})
					}

					this.doSelection()
				}

				this.el.fire('pick', {
					year: year,
					month: month,
					day: dayNumber,
					formatted: this.format(dateObj),
					date: dateObj
				})
				e.stop()
			}.bind(this))
		}
	}
})

nwt.register({

	name: 'CalendarPicker',

	methods: {
		/**
		 * Initializes the CalendarPicker plugin
		 * A simple calendar popup when the user interacts with the node
		 * Configurations may be passed into the Calendar plugin via the 'calendar' config key
		 */
		init: function (config) {

			var self = this

			config.node.on('focus', function() {

				var region = config.node.region()
				  , top = region.top -100
				  , left = region.right
				  , instanceId = 'calendar-popover-' + config.node.get('id')
				  , existingInstance = n.one('#' + instanceId)

				// If the picker is already displayed, return
				if (existingInstance) {
					return
				}
				
				self.popover = n.node.create('<div class="popover calendar-popover"><div class="popover-inner" style="width:auto;"><h3 class="popover-title">Select a date</h3><div class="popover-content"></div></div></div>')
				
				self.popover.setStyles({
					display: 'block',
					left: left,
					top:top
				})

				self.popover.appendTo('body')
				
				var contentEl = self.popover.one('.popover-content')
				
				contentEl.plug('Calendar', config.calendar)
				
				contentEl.on('pick', function(e, o){
					config.node.set('value', o.formatted)
				})

				setTimeout(function() {
					var removePopover = function(e) {
						var ancestor = e.target.ancestor('.popover')
						if (!ancestor || !ancestor._node || ancestor._node != self.popover._node) {
							self.popover.remove()
							n.one('body').off('click', removePopover)
						}
					}
					n.one('body').on('click', removePopover)
				},500)
			})
		}
	}
})