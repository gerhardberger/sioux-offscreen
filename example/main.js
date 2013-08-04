var $ = require('sioux-global');
window.$ = $;
var Offscreen = require('../index.js');

window.onload = function () {
	var offscr = new Offscreen($('.offscreen'), $('.onscreen'));
	$('.menu').on('tap', function () {
		offscr.toggle();
	}).on('click', function () {
		offscr.toggle();
	});
};