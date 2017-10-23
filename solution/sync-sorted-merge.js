'use strict'

module.exports = (logSources, printer) => {
	var logSourceMap = logSources.map((logSource)=>{
		return {
			log: logSource.pop(),
			logSource: logSource
		};
	})

	while(true){
		logSourceMap = logSourceMap.filter((element)=>{
			return element.log != false;
		});
		if(logSourceMap.length === 0){
			break;
		}

		logSourceMap = logSourceMap.sort((a, b)=>{
			return new Date(a.log.date) - new Date(b.log.date);
		});
		printer.print(logSourceMap[0].log);
		logSourceMap[0].log = logSourceMap[0].logSource.pop();
	}

	printer.done()
}