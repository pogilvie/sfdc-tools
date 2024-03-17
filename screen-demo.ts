import blessed from 'blessed';
import contrib from 'blessed-contrib';

// Initialize the screen
const screen: blessed.Widgets.Screen = blessed.screen();
const grid: contrib.grid = new contrib.grid({ rows: 12, cols: 12, screen: screen });

// Define a type for the data structure
interface ResourceUsage {
  name: string;
  max: number;
  used: number;
  remaining: number;
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
  columnWidth: [24, 10, 10, 12]
});

// Initial data
let data: ResourceUsage[] = [
  { name: "DailyApiRequests", max: 24910000, used: 19, remaining: 24909981 },
  { name: "DataStorageMB", max: 200, used: 127, remaining: 73 },
  { name: "PlatformEvents", max: 28500000, used: 2891258, remaining: 25608742 },
  { name: "PermissionSets", max: 1500, used: 339, remaining: 1161 }
];

// Function to update the table with new data
function updateTable(): void {
  let tableData: (string | number)[][] = data.map(item => [item.name, item.max, item.used, item.remaining]);
  table.setData({
    headers: ['Name', 'Max', 'Used', 'Remaining'],
    data: tableData
  });
  screen.render();
}

// Initial table update
updateTable();

// Mock function to simulate data updates
function simulateDataUpdates(): void {
  data.forEach(item => {
    item.used = Math.floor(Math.random() * item.max * 0.01); // Simulating random usage
    item.remaining = item.max - item.used;
  });

  updateTable();
}

// Set an interval to simulate data updates every 5 seconds
setInterval(simulateDataUpdates, 5000);

// Quit on Escape, q, or Control-C
screen.key(['escape', 'q', 'C-c'], () => {
  return process.exit(0);
});

// Render the screen
screen.render();
