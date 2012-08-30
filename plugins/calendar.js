
/**
 * Calendar instance class
 */
function Calendar(el, target) {

	this.dateFormat = 'F jS, Y'

	this.weekdays = ['Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur']
	this.months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	this.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
	this.suffix = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' }

	this.currentDate = new Date()

	this.month = this.currentDate.getMonth()
	this.year = this.currentYear()

	this.el = el

	this.create()	
}

Calendar.prototype = {

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
	 * Returns the current year
	 */
	currentMonth: function() {
		var date = this.currentDate.getMonth()
		return this._convertMonthIdx(date, true)
	},


	/**
	 * Returns the current year
	 */
	currentYear: function() {
		return this.currentDate.getFullYear()
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

		this.calendarEl.one('.current-month').setHtml(this._convertMonthIdx(this.month, true) + ' ' + this.year)

		// rebuild the calendar
		this.calendarEl.one('tbody').setHtml(this.calendarMarkup())
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
	 */
	calendarMarkup: function() {
		// get the first day of the month we are currently viewing
		var firstOfMonth = new Date(this.year, this.currentDate.getMonth(), 1).getDay(),

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
			row += '<td class="' + ((i == this.currentDate.getDate() && this.month == this.currentDate.getMonth() && this.year == this.currentYear()) ? 'today' : '') + '"><a href="#">' + i + '</a></td>'
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
	create: function() {

		this.calendarEl = n.node.create('<div class="calendar"></div>')

		var content

		content = [
			'<div class="months">',
				'<span class="prev-month"><a href="#">&lt;</a></span>',
				'<span class="next-month"><a href="#">&gt;</a></span>',
				'<span class="current-month">' + this.currentMonth() + ' ' + this.currentYear() + '</span>',
			'</div>',
			'<table><thead><tr class="weekdays">' + this.weekdayHeaderMarkup() + '</tr></thead>',
			'<tbody>' + this.calendarMarkup() + '</tbody>',
			'</table>'
		]

		this.calendarEl.setHtml(content.join(''))

		this.calendarEl.setStyles({
			height:'200px',
			width: '200px'
		})
		
		// Position the calendar
		//calendarEl.setStyles() 'display: none; position: absolute; top: ' + (element.offsetTop + element.offsetHeight) + 'px; left: ' + element.offsetLeft + 'px;'
		this.calendarEl.appendTo('body')

		n.one('.prev-month').on('click', function(e){
			this.month--
			this.loadMonth()
		}.bind(this))

		n.one('.next-month').on('click', function(e){
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

nwt.register({

	name: 'Calendar',

	methods: {
		init: function () {
			nwt.event.live('data-toggle', /(calendar)/, this.toggle.bind(this))
		},

		/**
		 * Shows or hides a calendar
		 */
		toggle: function(el,target, action) {

			var calendar = el.one('.calendar')

			if (!calendar._node) {
				var calendar = new Calendar(el, target)
				return
			}
			if (calendar.hasClass('hide')) {
				calendar.removeClass('hide')
			} else {
				calendar.addClass('hide')
			}
		}
	}
})
nwt.plugin('Calendar')

/*
// Sample CSS from: http://www.joshsalverda.com/sandbox/date_pick/datePick.html
  	.calendar {
				font-family: 'Trebuchet MS', Tahoma, Verdana, Arial, sans-serif;
				font-size: 0.9em;
				background-color: #EEE;
				color: #333;
				border: 1px solid #DDD;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;
				border-radius: 4px;
				padding: 0.2em;
				width: 14em;
			}
			
			.calendar a {
				outline: none;
			}
			
			.calendar .months {
				background-color: #F6AF3A;
				border: 1px solid #E78F08;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;
				border-radius: 4px;
				color: #FFF;
				padding: 0.2em;
				text-align: center;
			}
			
			.calendar .prev-month,
			.calendar .next-month {
				padding: 0;
			}
			
			.calendar .prev-month {
				float: left;
			}
			
			.calendar .next-month {
				float: right;
			}
			
			.calendar .current-month {
				margin: 0 auto;
			}
			
			.calendar .months a {
				color: #FFF;
				text-decoration: none;
				padding: 0 0.4em;
				-moz-border-radius: 4px;
				-webkit-border-radius: 4px;
				border-radius: 4px;
			}
			
			.calendar .months a:hover {
				background-color: #FDF5CE;
				color: #C77405;
			}
			
			.calendar table {
				border-collapse: collapse;
				padding: 0;
				font-size: 0.8em;
				width: 100%;
			}
			
			.calendar th {
				text-align: center;
			}
			
			.calendar td {
				text-align: right;
				padding: 1px;
				width: 14.3%;
			}
			
			.calendar td a {
				display: block;
				color: #1C94C4;
				background-color: #F6F6F6;
				border: 1px solid #CCC;
				text-decoration: none;
				padding: 0.2em;
			}
			
			.calendar td a:hover {
				color: #C77405;
				background-color: #FDF5CE;
				border: 1px solid #FBCB09;
			}
			
			.calendar td.today a {
				background-color: #FFF0A5;
				border: 1px solid #FED22F;
				color: #363636;
			}
			
 */
