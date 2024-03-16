import { Command } from 'commander';
import nodePackage from './package.json';
import creds from './creds.json';

const program = new Command();

program
    .name('sfdc-limits')
    .description('Poll Salesforce org limits')
    .option('-t, --polling-time <number>', 'polling-frequency (default 0 seconds to run and quit')
    .option('-v, --verbose', 'turn on verbose printing for debugging')
    .version(nodePackage.version);
    

program.parse();

const opts = program.opts();

export type Options = {
    pollingTime: number;
    verbose: boolean;
}
export const options: Options = {
    pollingTime: 0,
    verbose: false
}

for (let o in opts) {
    if (o == 'pollingTime') {
        const time = Number(opts.pollingTime);
        if (!Number.isNaN(time)) {
            options[o] = time;
        } else {
            console.log(`polling time much be a number: ${opts[o]}`);
            process.exit(1);
        }
    } else if (o == 'verbose') {
        options.verbose = true;
    }

}

export function debug(input: any) {
    if (options.verbose) console.log(input);
}