import { Command } from 'commander';
import nodePackage from './package.json';
import creds from './creds.json';

const program = new Command();

program
    .name('sfdc-limits')
    .description('Poll Salesforce org limits')
    .option('-t, --polling-time <number>', 'polling-frequency (default 0 seconds to run and quit')
    .version(nodePackage.version);
    

program.parse();

const opts = program.opts();
export const options = {}

for (let o in opts) {
    if (o == 'pollingTime') {
        const time = Number(opts.pollingTime);
        if (!Number.isNaN(time)) {
            options[o] = time;
        } else {
            console.log(`polling time much be a number: ${opts[o]}`);
            process.exit(1);
        }
    }
}