/**
 * This allows dattables to function using semantic attributes
 *
 * Usage:
 *	nwt.plugin('Datatable', {node: '#mytable', data: jsonObj});
 *	nwt.plugin('Datatable', {node: el, data: '#some table .selector'});
 */ 

!function() {

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
	this.colSortIdx = 0;

	this.data = config.data;
	this.columns = standardizeCols(config.columns);
}

/**
 * No updates required, just render
 */
JSONDataSource.prototype.update = function(callback) {
	var mythis = this;

	this.data.sort(function(a, b){
		return mythis.columns[mythis.colSortIdx].sorter(a, b, mythis.columns[mythis.colSortIdx].dir);
	});

	callback();
};


/**
 * Datasource from a remote IO source
 */
function IODataSource(config) {
	this.columns = standardizeCols(config.columns);
	this.io = config.data;

	// Default to the first col ASC for sorting
	this.colSortIdx = 0;
}

/**
 * No updates required, just render
 */
IODataSource.prototype.update = function(callback) {
	var self = this;
	this.io.success(function(o){
		self.data = o.obj.results;

		callback();
	}).post('sort=' + self.columns[self.colSortIdx].name + '&dir=' + self.columns[self.colSortIdx].dir);
};


/**
 * All we do is transform the table into json and reutrn a JSONDataSource
 */
function ElementDataSource(config) {
	var newData = [],
		newColumns = [];

	var headings = config.data.all('tr th');

	headings.each(function(th){
		newColumns.push(th.getContent());
	});

	config.data.all('tr').each(function(tr){
		var newRow = {},
			populated = false;

		for (var i = 0, numCols = headings.size(); i < numCols; i++) {

			if (!tr.all('td').item(i)) { continue; }

			newRow[headings.item(i).getContent()] = tr.all('td').item(i).getContent();
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

			// If there is no data, default to the node
			config.data = config.data || config.node;

			// Default the class of the <table> element
			this.tableClass = config.tableClass || 'table table-striped table-bordered';

			// Set the node to render to
			this.node = typeof config.node == 'string' ? nwt.one(config.node) : config.node;

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

			// Populate table content
			var content = ['<table class="' + this.tableClass + '"><thead>',
				'<tr>'];

			for (var i in this.source.columns) {
				content.push('<th class="' + i + '-row"><a data-col-idx="' + i + '" data-sort="sort" href="#">' + this.source.columns[i].name + '</a></th>');
			}

			content.push('</tr></thead><tbody>');

			for (var i = 0, rows = this.source.data.length; i < rows; i++) {
				var datum = this.source.data[i];
				content.push('<tr>');

				for (var j in this.source.columns) {
					content.push('<td class="' + j +'-row">' + this.source.columns[j].formatter(datum) + '</td>');
				}

				content.push('</tr>');
			}

			content.push('</tbody></table>');

			this.node.setContent(content.join(''));

			this.node.one('table thead').on('click', function(e) {
				if (e.target.data('sort')) {
					self.sort(e.target);
					e.stop();
				}
			});
		}
	}
});

}();