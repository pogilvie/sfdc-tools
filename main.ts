import { options, debug } from './options'
import { getLimits } from './rest';
import { printTable } from './print-table';

debug(options);

const result = await getLimits();

if (!options.pollingTime) {
    printTable(result);
    process.exit(0);
} else {
    setInterval(pollLimits, options.pollingTime * 1000);
}

async function pollLimits() {
    console.log('Hello, World!');
}