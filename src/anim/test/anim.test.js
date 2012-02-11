nwt.unit
.describe('Tests nwt.anim().')
.setup('<div id="anim">a</div>')
.equal(
	function () {
		nwt.anim(nwt.one('#anim'), {top:100, left:100}, 2);
	},
	function () {
		return true;
	}
);
