import table from 'text-table';
import chalk from 'chalk';
import stripAnsi from 'strip-ansi';

export function printTable(result: any) {
    const output: string[][] = [];

    output.push([
        chalk.yellow('STAT'), 
        chalk.yellow('ORG LIMIT'), 
        chalk.yellow('REMAINING'), 
        chalk.yellow('% REMAINING'), 
        chalk.yellow('USED')
    ]);
    
    for (let stat in result) {
        let max = result[stat].Max;
        let remaining = result[stat].Remaining;
        let used = max - remaining;
        if (max != remaining) {
            let remainingFormated = formatNumber(remaining);
            let usedFormatted = formatNumber(used);
            let percentRemaining = Number(remaining) / Number(max);
            let percentRemainingFormatted = (percentRemaining * 100).toFixed(0)
            if (percentRemaining < 0.3) {
                remainingFormated = chalk.red(remainingFormated);
                usedFormatted = chalk.red(usedFormatted);
                percentRemainingFormatted = chalk.red(percentRemainingFormatted);
            }
            output.push([
                stat as string,
                formatNumber(max),
                remainingFormated,
                percentRemainingFormatted,
                usedFormatted,
            ]);
        }
    }

    console.log(table(output, {
        align: ['l', 'r', 'r', 'r', 'r'],
        stringLength: s => stripAnsi(s).length
    }));
}

function formatNumber(input: number): string {
    let num = input.toString()
    let result = '';
    let count = 0;

    for (let i = num.length - 1; i >= 0; i--) {
        // Insert a comma every third digit from the right
        if (count > 0 && count % 3 === 0) {
            result = ',' + result;
        }
        result = num.charAt(i) + result;
        count++;
    }
    return result;
}
