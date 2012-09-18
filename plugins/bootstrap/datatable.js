/**
 * This allows dattables to function using semantic attributes
 *
 * Usage:
 *	nwt.plugin('Datatable', {node: '#mytable', data: jsonObj});
 *	nwt.plugin('Datatable', {node: el, data: '#some table .selector'});
 */ 

!function() {

// Lookups data by table instance/row count
var dataLookup = []

/**
 * Standardizes the column definitions 
 * E.g., if the user passes a string for a column def, fill out the defaults
 */
function standardizeCols(columns) {

	/**
	 * Gets the default column name
	 */
	function getDefaultFormatter(colName) {
		return function(o) {
			return o[colName];
		};
	}

	/**
	 * Gets the default column sorter
	 */
	function getDefaultSorter(colName) {
		return function(a, b, dir){

			var 
				firstRec = dir == 'asc' ? a : b,
				secondRec = dir == 'asc' ? b : a,

				fA = firstRec[colName].toLowerCase(),
				fB = secondRec[colName].toLowerCase();

			// Handle numbers
			if (fA<fB) return -1
			if (fA>fB) return +1
			return 0
		};
	}


	for (var i in columns) {
		var column = columns[i];

		if (typeof column == "string") {
			column = {name: column};
		}

		column.dir = column.sortDir || 'asc';
		column.formatter = column.formatter || getDefaultFormatter(column.key || column.name);
		column.sorter = column.sorter || getDefaultSorter(column.key || column.name);

		columns[i] = column;
	}
	return columns;
}


/**
 * Datasource from a local JSON object
 */
function JSONDataSource(config) {
	// Default to the first col ASC for sorting
	this.colSortIdx = config.defaultSortCol || -1

	this.data = config.data;
	this.columns = standardizeCols(config.columns);
}

/**
 * No updates required, just render
 */
JSONDataSource.prototype.update = function(callback) {
	var mythis = this;

	if (mythis.colSortIdx >= 0) {
		this.data.sort(function(a, b){
			return mythis.columns[mythis.colSortIdx].sorter(a, b, mythis.columns[mythis.colSortIdx].dir);
		});
	}

	callback();
};


/**
 * Datasource from a remote IO source
 */
function IODataSource(config) {
	this.columns = standardizeCols(config.columns);
	this.io = config.data;
	this.node = config.node;

	this.fetch = config.fetch || function(io, sort, dir) {
		io.post('sort=' + sort + '&dir=' + dir);
	}

	// Default to the first col ASC for sorting
	this.colSortIdx = config.defaultSortCol || -1
}

/**
 * No updates required, just render
 */
IODataSource.prototype.update = function(callback) {
	var self = this;
	self.io.success(function(o){
		self.data = o.obj.results;

		callback();
		self.node.fire('update', o);
	});

	self.fetch(self.io, self.columns[self.colSortIdx].name, self.columns[self.colSortIdx].dir);
};


/**
 * All we do is transform the table into json and reutrn a JSONDataSource
 */
function ElementDataSource(config) {
	var newData = [],
		newColumns = [];

	var headings = config.data.all('tr th');

	headings.each(function(th){
		newColumns.push(th.getHtml());
	});

	config.data.all('tr').each(function(tr){
		var newRow = {},
			populated = false;

		for (var i = 0, numCols = headings.size(); i < numCols; i++) {

			if (!tr.all('td').item(i)) { continue; }

			newRow[headings.item(i).getHtml()] = tr.all('td').item(i).getHtml();
			populated = true;
		}

		if (populated) {
			newData.push(newRow);
		}
	});

	config.columns = newColumns;
	config.data = newData;

	return new JSONDataSource(config);
}


nwt.register({

	name: 'Datatable',

	methods: {
		/**
		 * Initializes a datatable
		 * Sets up listeners, etc
		 * @param object Receives a config object with the following:
		 * - node: String or node object, where to render the table
		 * - defaultSortCol: Column index to use as the default sort. Defaults to 0.
		 * - data: Data to use. Can be a JSON object, table, or nwt.io instance
		 * For JSON or IO datatable you need to specify a columns object, like so:
		 *  columns: [
		 		{
					name: "My Column", // Title of the column

					formatter: function(o){ // (Optional) Formats the return result
						return o.somekey;
					},

					sorter: function(a, b) { (Optional) Special way to sort this column
						return a - b;
					},

					key: "name" // (Optional) If not given we will use a numerical index
				} 
			]
		 */
		init: function (config) {

			var mythis = this;

			this.instanceCount = dataLookup.length
			dataLookup[this.instanceCount] = []

			// If there is no data, default to the node
			config.data = config.data || config.node;

			// Default the class of the <table> element
			this.tableClass = config.tableClass || 'table table-striped table-bordered';

			// Set the node to render to
			this.node = typeof config.node == 'string' ? nwt.one(config.node) : config.node;

			// Default the header sort formatter
			this.formatSortHeader = config.formatSortHeader || function(name, dir) {
				var content = '<i class="icon-chevron-' + (dir == 'asc' ? 'up' : 'down') + '">' + (dir == 'asc' ? '&#9650;' : '&#9660;') + '</i>'
				return name  + ' ' + content	
			}

			// Determine the datasource
			if (typeof config.data == 'string' || typeof config.data == 'object' && config.data._node) {
				// Query selector
				this.source = new ElementDataSource(config);

			// TODO: Use instanceof here instead
			} else if(typeof config.data == 'object' && config.data.ioData !== undefined) {
				// n.io Object 
				this.source = new IODataSource(config);

			} else if(typeof config.data == 'object') {
				this.source = new JSONDataSource(config);
			}

			this.source.update(function() {
				mythis.render();
			});
		},

		/**
		 * Sorts the datatable
		 */
		sort: function(el) {
			var mythis = this;

			this.source.colSortIdx = el.data('col-idx');
			this.source.columns[el.data('col-idx')].dir = this.source.columns[el.data('col-idx')].dir == 'asc' ? 'desc' : 'asc';

			this.source.update(function() {
				mythis.render();
			});
		},

		/**
		 * When we render, the datasource should be updated
		 */
		render: function() {

			var self = this;

			// Populate table html
			var content = ['<table class="' + this.tableClass + '" data-instance="' + this.instanceCount + '"><thead>',
				'<tr>'];

			for (var i in this.source.columns) {

				var sortContent = this.source.columns[i].name,
					colDir = self.source.columns[i].dir;

				if (self.source.colSortIdx == i) {
					sortContent = self.formatSortHeader(this.source.columns[i].name, colDir)
				}
				
				content.push('<th class="col-' + i + '"><a data-col-idx="' + i + '" data-sort="sort" href="#" title="' + this.source.columns[i].name +'">' + sortContent + '</a></th>');
			}

			content.push('</tr></thead><tbody>');

			for (var i = 0, rows = this.source.data.length; i < rows; i++) {
				var datum = this.source.data[i];

				// Add in a reference to the data
				dataLookup[this.instanceCount][i] = datum

				content.push('<tr class="row-' + i + '"">');

				for (var j in this.source.columns) {
					content.push('<td class="col-' + j +'">' + this.source.columns[j].formatter(datum) + '</td>');
				}

				content.push('</tr>');
			}

			content.push('</tbody></table>');

			this.node.setHtml(content.join(''));

			this.node.one('table thead').on('click', function(e) {
				if (e.target.data('sort')) {
					self.sort(e.target);

					self.node.all('th a').item(e.target.data('col-idx'))._node.focus()
					e.stop();
				}
			});
			this.node.fire('render')
		}
	}
});


/**
 * Returns the data record for the data table row which is an ancestor of this row
 */
nwt.augment('Node', 'getPluginData', function() {
	var row = this.ancestor('tr')
		, className = row._node.className
		, idx = className.match(/row-([0-9]*)/)[1]
		, tableIdx = this.ancestor('table').data('instance')
	
	return dataLookup[tableIdx][idx]
})

}();
