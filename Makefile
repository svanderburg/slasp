JSDUCK = jsduck
MOCHA = mocha

duck:
	mkdir -p build
	$(JSDUCK) --config=doc/config.json --output=build `find lib -name \*.js`

doc: duck # DUH!!

clean:
	rm -rf build

check:
	cd tests/nodejs; \
	for i in funinvocation assignment sequence ifthen ifthenelse switch while dowhile for foreach exception exception2 new inherit recursion; do \
	    cd $$i; \
	    echo "Running testcase: $$i"; \
	    node sync.js > sync.log; \
	    node async.js > async.log; \
	    if ! cmp -s sync.log async.log; then \
	        echo "Ouputs do not match for testcase: $$i"; \
	        exit 1; \
	    fi; \
	    cd ..; \
	done
