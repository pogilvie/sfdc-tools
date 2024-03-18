import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { getLimits } from './rest';

// Initialize the screen
const screen: blessed.Widgets.Screen = blessed.screen();
const grid: contrib.grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });
const lastRemaining: Map<string, number> = new Map();

// Define a type for the data structure
interface ResourceUsage {
    name: string;
    max: number;
    remaining: number;
    used: number;
    percent: string
    delta: string
}

// Create a table
let table = grid.set(0, 0, 12, 12, contrib.table, {
    keys: true,
    fg: 'white',
    interactive: false,
    label: 'Org Limit Usage',
    width: '100%',
    height: '100%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [38, 10, 10, 12, 12, 10]
});

// Initial data
let data: ResourceUsage[] = [];

// Function to update the table with new data
function updateTable(): void {
    let tableData: (string | number)[][] = data.map(item => [item.name, item.max, item.remaining, item.used, item.percent, item.delta]);
    table.setData({
        headers: ['Name', 'Max', 'Remaining', 'Used', '% Remaining', 'Delta'],
        data: tableData
    });
    screen.render();
}

// Initial table update
await updateData();

async function updateData() {
    const result = await getLimits();
    data = [];
    for (let limit in result) {
        let max = Number(result[limit].Max);
        let remaining = Number(result[limit].Remaining)
        if (max != remaining) {
            let used = max - remaining;
            let percent = ((remaining / max) * 100).toFixed(0);
            let stat = limit as string;
            let last = lastRemaining.get(stat);
            let delta = 0;
            if (last) {
                delta = last - remaining;
            }
            data.push({
                name: stat,
                max: max,
                remaining: remaining,
                used: used,
                percent: percent,
                delta: delta > 0 ? delta.toString() : ''
            });
            lastRemaining.set(stat, remaining);
        }
    }
    updateTable();
}

// Set an interval to simulate data updates every 5 seconds
setInterval(updateData, 5000);

// Quit on Escape, q, or Control-C
screen.key(['escape', 'q', 'C-c'], () => {
    return process.exit(0);
});

// Render the screen
screen.render();
