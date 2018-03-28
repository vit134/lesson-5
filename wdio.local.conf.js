exports.config = {
	specs: ['test-webd.js'],

	capabilities: [{
		browserName: 'firefox' // latest
	}],

	services: ['selenium-standalone'],
	seleniumLogs: './selenium.log',
	seleniumInstallArgs: { version: '3.0.1' },
	seleniumArgs: { version: '3.0.1' },

	framework: 'mocha',
	reporters: ['spec'],
	mochaOpts: {
		ui: 'bdd',
		timeout: 30000
	},
};