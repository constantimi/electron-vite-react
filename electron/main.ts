/* eslint-disable import/no-extraneous-dependencies */
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import os from 'node:os';

const DIST_DIR = app.isPackaged
  ? app.getAppPath()
  : path.join(__dirname, '../');
const ICONS_DIR = path.join(DIST_DIR, 'app/icons');

// Set environment variables for consistency
process.env.DIST = DIST_DIR;
process.env.PUBLIC = DIST_DIR;

let win: BrowserWindow | null;
const { VITE_DEV_SERVER_URL } = process.env;

// Helper function to select the icon based on the OS
function getIconPath(): string {
  if (os.platform() === 'win32') {
    return path.join(ICONS_DIR, 'app-icon.ico'); // ICO for Windows
  }

  if (os.platform() === 'darwin') {
    return path.join(ICONS_DIR, 'app-icon.icns'); // ICNS for macOS
  }

  return path.join(ICONS_DIR, 'app-icon.png'); // PNG for Linux
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: getIconPath(),
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true,
      allowRunningInsecureContent: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  win.once('ready-to-show', () => {
    if (win) win.show();
  });

  // Load the app
  if (VITE_DEV_SERVER_URL) {
    // Development: load Vite dev server URL
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    // Production: load index.html from the DIST folder
    win.loadFile(path.join(DIST_DIR, 'index.html'));
  }

  // Open DevTools in development mode
  if (VITE_DEV_SERVER_URL) {
    win.webContents.openDevTools();
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(createWindow);
