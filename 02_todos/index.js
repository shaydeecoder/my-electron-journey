const electron = require("electron");

const { app, BrowserWindow, Menu } = electron;

let mainWindow;

app.on("ready", () => {
  mainWindow = new BrowserWindow({});

  // Link main.html to mainWindow
  mainWindow.loadURL(`file://${__dirname}/main.html`);

  // Build mainMenu from template
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
});

// Create menuTemplate
const menuTemplate = [
  {
    label: "File",
  },
];
