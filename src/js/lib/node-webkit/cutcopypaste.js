"use strict";

$(function() {
	function Menu(cutLabel, copyLabel, pasteLabel) {
		var gui = require('nw.gui')
		var menu = new gui.Menu()

		var cut = new gui.MenuItem({
			label: cutLabel || 'Cut',
			click: function() {
				document.execCommand('cut')
			}
		})

		var copy = new gui.MenuItem({
			label: copyLabel || 'Copy',
			click: function() {
				document.execCommand('copy')
			}
		})

		var paste = new gui.MenuItem({
			label: pasteLabel || 'Paste',
			click: function() {
				document.execCommand('paste')
			}
		})

		menu.append(cut)
		menu.append(copy)
		menu.append(paste)

		return menu
	}

	var menu = new Menu(/* pass cut, copy, paste labels if you need i18n*/)
	$(document).on('contextmenu', function(e) {
		e.preventDefault()
		//pay attention to node-webkit bug https://github.com/rogerwang/node-webkit/issues/2072
		if (/^win/.test(process.platform) && process.versions['node-webkit'] == "0.10.0")
			menu.popup(e.originalEvent.screenX, e.originalEvent.screenY)
		else
			menu.popup(e.originalEvent.x, e.originalEvent.y)
	})
})


// Local Variables:
// indent-tabs-mode: t
// tab-width: 4
// End:
