nwt.unit
.describe('Tests nwt.anim().')
.setup('<div id="anim" style="position:absolute;top:0px;left:0px;">a</div>')
.equal(
	function () {
		nwt.one('#anim').anim({top:100, left:100}, 2).wait(3).setContent('bbq').wait(2).setContent('asdf').wait(2).anim({top:500, left:500}, 2);
	},
	function () {
		return true;
	}
);
