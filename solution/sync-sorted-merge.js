'use strict'
const Message = require('../lib/message');

module.exports = (logSources, printer) => {
	logSources.forEach((logSource)=>{
		var log = logSource.pop()
		while(log !== false){
			printer.print(log);
			log = logSource.pop();
		}
	})
}