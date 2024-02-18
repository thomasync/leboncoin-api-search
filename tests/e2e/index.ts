import * as location from './location.e2e-spec';
import * as search from './search.e2e-spec';

function log(message: string, color: 'green' | 'red' | 'white' = 'white') {
	const colors = {
		green: '\x1b[32m',
		red: '\x1b[31m',
		white: '\x1b[37m',
	};
	console.log(`${colors[color]}${message}\x1b[0m`);
}

async function testFunction(test, func, hasFocusFunction) {
	const funcName = func.replace(/^(f|x)/, '');
	if ((hasFocusFunction && !func.startsWith('f')) || (!hasFocusFunction && func.startsWith('x'))) {
		log(`[${funcName}]: Skipped`, 'white');
		return;
	} else {
		try {
			await test[func]();
			log(`[${funcName}]: OK`, 'green');
		} catch (error) {
			log(`[${funcName}]: ${error.message}`, 'red');
		}
	}
}

async function main() {
	const tests = [location, search];
	const funcs = tests.map((test) => Object.keys(test)).flat();
	const hasFocusFunction = funcs.some((func) => func.startsWith('f'));

	for (const test of tests) {
		for (const func of Object.keys(test)) {
			await testFunction(test, func, hasFocusFunction);
		}
	}
}

main();
