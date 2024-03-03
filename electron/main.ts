import { app, BrowserWindow } from 'electron';
import path from 'node:path';

process.env.DIST = path.join(__dirname, '../dist');
process.env.PUBLIC = app.isPackaged
  ? process.env.DIST
  : path.join(process.env.DIST, '../public');

let win: BrowserWindow | null;
const { VITE_DEV_SERVER_URL } = process.env;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600,
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
    show: false,
  });

  win.on('ready-to-show', win.show);

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadURL(
      path.format({
        dir: __dirname,
        base: 'index.html',
      })
    );
  }
}

app.on('window-all-closed', () => {
  win = null;
});

app.whenReady().then(createWindow);
