lint:
	@/bin/echo -n "[miniLock] Linting... "
	@node_modules/.bin/jshint --verbose --config .jshintrc \
		src/js/*.js \
		src/js/workers/*.js \
		src/js/lib/phrase.js \
		test/tests/*.js
	@/bin/echo ""

chrome:
	@mkdir -p release
	@rm -f release/minilock.chrome.zip
	@cd src/ && zip -q -r9 ../release/minilock.chrome.zip * -x "*/\.*" -x "\.*" -x "package.json" -x "js/lib/node-webkit/*"
	@/bin/echo "[miniLock] Chrome build available in release/"

desktop-run:
	@node_modules/.bin/nwbuild -r src 

desktop:
	@mkdir -p release
	@node_modules/.bin/nwbuild -p win,osx,linux32,linux64\
	 -o release/ src 
	@/bin/echo "[miniLock] Desktop build available in release/"
