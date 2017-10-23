'use strict'
const _ = require('lodash')

module.exports = (logSources, printer) => {
	var logSourceMap = _.map(logSources, (logSource)=>{
		return {
			log: logSource.pop(),
			logSource: logSource
		};
	})

	while(true){
		logSourceMap = _.filter(logSourceMap, (element)=>{
			return element.log != false;
		});
		if(logSourceMap.length === 0){
			break;
		}

		logSourceMap = _.sortBy(logSourceMap, (element)=>{
			return element.log.date;
		});
		printer.print(logSourceMap[0].log);
		logSourceMap[0].log = logSourceMap[0].logSource.pop();
	}

	printer.done()
}