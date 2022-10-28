function addGlobalUtils(config) {

		function waitForExist() {
		  console.log('WAIT FOR EXIST: INTEGRATION LOADED');
		};

		if (!window.evolv.webUtils) {
				window.evolv.webUtils = {};
				window.evolv.webUtils.waitForExist = waitForExist;
		}
};

module.exports = addGlobalUtils;
