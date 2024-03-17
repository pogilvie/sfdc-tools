import blessed from 'blessed';
import contrib from 'blessed-contrib';
import { getLimits } from './rest';

// Initialize the screen
const screen: blessed.Widgets.Screen = blessed.screen();
const grid: contrib.grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// Define a type for the data structure
interface ResourceUsage {
    name: string;
    max: number;
    remaining: number;
    used: number;
    percent: string
}

// Create a table
let table = grid.set(0, 0, 12, 12, contrib.table, {
    keys: true,
    fg: 'white',
    interactive: false,
    label: 'Resource Usage',
    width: '100%',
    height: '100%',
    border: { type: 'line', fg: 'cyan' },
    columnSpacing: 10,
    columnWidth: [38, 10, 10, 12, 12]
});

// Initial data
let data: ResourceUsage[] = [];

// Function to update the table with new data
function updateTable(): void {
    let tableData: (string | number)[][] = data.map(item => [item.name, item.max, item.remaining, item.used, item.percent]);
    table.setData({
        headers: ['Name', 'Max', 'Remaining', 'Used', '% Remaining'],
        data: tableData
    });
    screen.render();
}

// Initial table update
await updateData();

// Mock function to simulate data updates
function simulateDataUpdates(): void {
    data.forEach(item => {
        item.used = Math.floor(Math.random() * item.max * 0.01); // Simulating random usage
        item.remaining = item.max - item.used;
    });

    updateTable();
}

async function updateData() {
    const result = await getLimits();
    data = [];
    for (let limit in result) {
        let max = Number(result[limit].Max);
        let remaining = Number(result[limit].Remaining)
        if (max != remaining) {
            let used = max - remaining;
            let percent = ((remaining / max) * 100).toFixed(0);
            data.push({
                name: limit as string,
                max: max,
                remaining: remaining,
                used: used,
                percent: percent
            });
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
