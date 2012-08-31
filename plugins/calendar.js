nwt.register({

	name: 'Calendar',

	methods: {
		
		/**
		 * Initializes the calendar plugin.
		 * You can plug a calendar into any DOM node.
		 * E.g., n.one('#mynode').plug('Calendar', {format: 'F jS, Y'})
		 */
		init: function (config) {			

			this.panes = config.panes || 1
			this.dateFormat = config.format || 'F jS, Y'

			this.weekdays = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']
			this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
			this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
			this.suffix = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' }
		
			this.currentDate = new Date()
		
			this.month = this.currentDate.getMonth()
			this.year = this.currentDate.getFullYear()
		
			this.el = config.node

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
				// if the day is the current day, add a class of "today"
				row += '<td class="' + ((i == this.currentDate.getDate() && month == this.currentDate.getMonth() && year == this.renderYear(offset)) ? 'today' : '') + '"><a href="#">' + i + '</a></td>'
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
					'<div class="pane">',
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
			//calendarEl.setStyles() 'display: none; position: absolute; top: ' + (element.offsetTop + element.offsetHeight) + 'px; left: ' + element.offsetLeft + 'px;'
			this.calendarEl.appendTo(this.el)

			this.calendarEl.one('.prev-month').on('click', function(e){
				this.month--
				this.loadMonth()
			}.bind(this))
	
			this.calendarEl.one('.next-month').on('click', function(e){
				this.month++
				this.loadMonth()
			}.bind(this))
	
			this.calendarEl.one('tbody').on('click', function(e) {
				var dayNumber = e.target.getHtml()
	
				if (isNaN(dayNumber)) {
					return
				}
	
				var formattedDate = this.format(new Date(this.year, this.month, dayNumber).getTime())
				console.log('Date is:', formattedDate)
			}.bind(this))
		}
	}
})