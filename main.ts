import { Command } from 'commander';
import nodePackage from './package.json';
import creds from './creds.json';

const program = new Command();

program
    .name('sfdc-limits')
    .description('Poll Salesforce org limits')
    .version(nodePackage.version);

program.command('polling-frequency <seconds>')
    .description('Call limits continuously at the specified polling interval. Default is 0 or no polling')
    .argument('<number>', 'polling intervald in seconds')
    .option('-t, --polling-time <number>');

program.parse();