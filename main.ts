import { options, debug } from './options'
import { getLimits } from './rest';

debug(options);

const result = await getLimits();

console.log(result['AnalyticsExternalDataSizeMB']);
for (let stat in result) {
    let max = result[stat].Max;
    let remaining = result[stat].Remaining;
    let used = max - remaining;

    if (max != remaining) {
        console.log(`${stat}: max: ${max} used: ${used}`);
    }
}


// console.log(result);
