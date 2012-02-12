nwt.unit
.describe('Tests nwt.anim().')
.setup([
        '<div id="anim" style="position:absolute;top:0px;left:0px;">linear</div>',
        '<div id="anim2" style="position:absolute;top:20px;left:0px;">ease</div>',
        '<div id="anim3" style="position:absolute;top:40px;left:0px;">ease-in</div>',
        '<div id="anim4" style="position:absolute;top:60px;left:0px;">ease-out</div>',
        '<div id="anim5" style="position:absolute;top:80px;left:0px;">ease-out-in</div>',
        '<div id="anim6" style="position:absolute;top:100px;left:0px;">cubic-bezier</div>'
        ].join(''))
.equal(
	function () {
		nwt.one('#anim').anim({left:400, opacity:0}, 2, 'linear').wait(4).anim({left:0, opacity:1}, 2, 'linear');
		nwt.one('#anim2').anim({left:400, color:'#FF0000'}, 2, 'ease').wait(4).anim({left:0, color:'#00FF00'}, 2, 'ease');
		nwt.one('#anim3').anim({left:400, background:'#0000FF'}, 2, 'ease-in').wait(4).anim({left:0}, 2, 'ease-in');
		nwt.one('#anim4').anim({left:400}, 2, 'ease-out').wait(4).anim({left:0}, 2, 'ease-out');
		nwt.one('#anim5').anim({left:400}, 2, 'ease-in-out').wait(4).anim({left:0}, 2, 'ease-in-out');
		nwt.one('#anim6').anim({left:400}, 2, 'cubic-bezier(1,0,1,0)').wait(4).anim({left:0}, 2, 'cubic-bezier(1,0,1,0)');

		return true;
	},
	function () {
		return true;
	}
);
