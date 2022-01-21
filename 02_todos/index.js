const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow, addWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});

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
  });

  addWindow.loadURL(`file://${__dirname}/add.html`);
}

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
