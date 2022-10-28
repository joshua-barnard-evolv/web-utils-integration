module.exports = function(config) {
	
	function docComplete(fn) {
		// see if DOM is already available
		if (document.readyState === "complete") {
				// call on next available tick
				setTimeout(fn, 1);
		} else {
				document.addEventListener('readystatechange', function(event) {
						if (event.target.readyState === 'complete') {
							fn();
						}
				});
		}
	}

	function waitForExist(selectors, callback, timeout, clearIntervalOnTimeout, resolveCb, rejectCb) {
			let existInterval = setInterval(function () {
					if (selectors.every(function (ss) {
							return document.querySelector(ss);
					})) {

							// Always clear interval once all selectors are found
							clearInterval(existInterval);

							try {
									callback();
							} catch (err) {
									window.evolv.client.contaminate({details: err.message, reason: 'error-thrown'});
									throw err;
							}

							// Only set interval to null and resolve if callback() runs without error
							existInterval = null;
							resolveCb();
					}
			}, 100);

			function checkExist() {
					setTimeout(function () {
							if (existInterval) {
									if (clearIntervalOnTimeout) {
											clearInterval(existInterval);
									}
									console.info(selectors);
									rejectCb({message: 'Selectors not found or other error thrown: ' + selectors.toString()});
							}
					}, timeout);
			};

			// wait until document is complete before starting timer to check
			// for selector existence.
			docComplete(checkExist);
	};

	if (!window.evolv.webUtils) {
			window.evolv.webUtils = {};
			window.evolv.webUtils.waitForExist = waitForExist;
	}
};
