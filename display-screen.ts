import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { getLimits } from './rest';

const screen: blessed.Widgets.Screen = blessed.screen();
const grid: contrib.grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: screen
});

// Define a type for the data structure
interface OrgLimit {
    name: string;
    max: number;
    used: number;
    remaining: number;
}

// Create a table
const table = grid.set(0, 0, 12, 12, contrib.table, {
    keys: true,
    fg: 'white',
    interactive: false,
    label: 'Resource Usage',
    width: '100%',
    height: '100%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [24, 10, 10, 12]
});

let data: OrgLimit[];

export async function displayScreen(options: any) {
    await updateData();
    setInterval(updateData, 5000);
}



// Quit on Escape, q, or Control-C
screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
});

async function updateData() {
    const result = await getLimits();

    for (let limit in result) {
        let max = Number(result[limit].Max);
        let remaining = Number(result[limit].Remaining);
        if (max != remaining) {
            data.push({
                name: limit as string,
                max: max,
                remaining: remaining,
                used: max - remaining
            });
        }
    }
    updateTable();
}

function updateTable(): void {
    const tableData: (string | number)[][] = data.map(item => [item.name, item.max, item.used, item.remaining]);
    table.setData({
        headers: ['LIMIT', 'ORG LIMIT', 'USED', 'REMAINING'],
        data: tableData
    });
    screen.render();
}