const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});

  // Link main.html to mainWindow
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  // Build mainMenu from template
  const mainMenu = Menu.buildFromTemplate(menuTemplate);

  // Set mainMenu as application menu
  Menu.setApplicationMenu(mainMenu);
});

// Create menuTemplate
const menuTemplate = [
  {
    label: "File",
    submenu: [{ label: "New Todo" }],
  },
];

// If platform is macOS (darwin), Add empty obj as first value to menuTemplate
if (process.platform === "darwin") {
  menuTemplate.unshift({});
}
