
import { app, BrowserWindow, Menu, ipcMain, dialog } from 'electron';
import path from 'path';
import os from 'os';
import { download } from 'electron-dl';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  // Set the Content-Security-Policy header
  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      const responseHeaders = Object.assign({}, details.responseHeaders, {
        'Content-Security-Policy': "script-src 'self' http://localhost:8000;",
      });
      callback({ cancel: false, responseHeaders });
    },
  );

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });

  Menu.setApplicationMenu(null);
  mainWindow.removeMenu();
}

app.whenReady().then(createWindow);
app.commandLine.appendSwitch('disable-web-security');

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

ipcMain.on('download-file', async(event, fileToDownload) => {
  const win = BrowserWindow.getFocusedWindow();
  const { filePath } = await dialog.showSaveDialog(win, {
    title: 'Save download',
    defaultPath: fileToDownload
  })

  if (!filePath) return

  download(win, fileToDownload, {
    directory: '',
  }).catch(error => console.error('Error downloading file: ', error));
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

