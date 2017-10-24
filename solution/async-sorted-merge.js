'use strict'

const _ = require('lodash')
const P = require('bluebird')


module.exports = (logSources, printer) => {
	var logSourceMap = _.map(logSources, (logSource)=>{
		return logSource.popAsync().then((log)=>{
			return {
				log: log,
				logSource: logSource
			}
		}, (error)=>{
			throw new Error(error);
		});
	});

	P.all(logSourceMap).then((resolvedLogSourceMap)=>{
		printNextOrderedLog(resolvedLogSourceMap);
	});


	printer.done()
}