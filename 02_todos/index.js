const electron = require("electron");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow, addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    // webPreferences: {
    //   nodeIntegration: true,
    //   contextIsolation: false,
    // },
  });

  // Link main.html to mainWindow
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  // Close all apps processes on close
  mainWindow.on("closed", () => app.quit());

  // Build mainMenu from template
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  // Set mainMenu as application menu
  Menu.setApplicationMenu(mainMenu);
});

// Create add new todo window
function createAddWindow() {
  addWindow = new BrowserWindow({
    width: 300,
    height: 200,
    title: "Add New Todo",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);

  // Garbage collection & cleanup
  addWindow.on("closed", () => (addWindow = null));
}

// Receive todo from addWindow process
ipcMain.on("todo:add", (event, todo) => {
  // Send todo to mainWindow process
  mainWindow.webContents.send("todo:add", todo);

  // Programmatically close addWindow after submit
  addWindow.close();
});

// Create menuTemplate
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "New Todo",
        click() {
          createAddWindow();
        },
      },
      {
        label: "Quit",
        accelerator: (() => {
          // Hotkeys for macOS
          if (process.platform === "darwin") return "Command+Q";

          // Hotkeys for linux & windows
          return "Ctrl+Q";
        })(),
        click() {
          app.quit();
        },
      },
    ],
  },
];

// If platform is macOS (darwin), Add empty obj as first value to menuTemplate
if (process.platform === "darwin") {
  menuTemplate.unshift({});
}

// Check environment - production, development, staging, test
// Add DevTools if env is not production
if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "View",
    submenu: [
      {
        label: "Toggle Developer Tools",
        accelerator:
          process.platform === "darwin" ? "Command+Alt+I" : "Ctrl+Shift+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
