import { options, debug } from './options'
import { getLimits } from './rest';
import  table  from 'text-table';

debug(options);

const result = await getLimits();

setInterval(pollLimits, 5000);

type Limit = {
    name: string;
    max: number;
    used: number;
    remaining: number;
};

const limits: Limit[] = [];

for (let stat in result) {
    let max = result[stat].Max;
    let remaining = result[stat].Remaining;
    let used = max - remaining;

    if (max != remaining) {
        // console.log(`${stat}: max: ${max} used: ${used}`);
        limits.push({
            name: stat as string,
            max: max,
            used: used,
            remaining: remaining
        });
    }
}


console.log(limits);

async function pollLimits() {
    console.log('Hello, World!');
}