'use strict'

const _ = require('lodash')
const P = require('bluebird')


module.exports = (logSources, printer) => {
	var logSourceMap = _.map(logSources, (logSource)=>{
		return resolveNextLog(logSource);
	});
	
	printOrderedLogs(logSourceMap)

	function resolveNextLog(logSource) {
		return logSource.popAsync().then((log)=>{
			return {
				log: log,
				logSource: logSource
			}
		}, (error)=>{
			throw new Error(error);
		});
	};

	function printOrderedLogs(logSourceMap){
		P.all(logSourceMap).then(printNextLog);	

		function printNextLog(resolvedLogSourceMap){
			resolvedLogSourceMap = _.filter(resolvedLogSourceMap, (element)=>{
				return element.log != false;
			});
			if(resolvedLogSourceMap.length === 0){
				printer.done();
				return;
			}
			resolvedLogSourceMap = _.sortBy(resolvedLogSourceMap, (element)=>{
				return element.log.date;
			});
			printer.print(resolvedLogSourceMap[0].log);
			resolveNextLog(resolvedLogSourceMap[0].logSource).then((resolvedLog)=>{
				resolvedLogSourceMap[0].log = resolvedLog.log;
				printNextLog(resolvedLogSourceMap);
			});
		}	
	};

	
}