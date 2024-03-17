import { options, debug } from './options'
import { getLimits } from './rest';
import { printTable } from './print-table';
import { displayScreen } from './display-screen';

debug(options);

const result = await getLimits();

if (!options.pollingTime) {
    printTable(result);
    process.exit(0);
} else {
    displayScreen(options);
}


