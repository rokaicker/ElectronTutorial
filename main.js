// Importing core Electron modules
// - app: controls app lifecycle
// - BrowserWindow: creates and manages app windows
const {app, BrowserWindow} = require('electron');
const path = require('path')

// Function that creates a new "BrowserWindow" object/ instance
// - https://www.electronjs.org/docs/latest/api/browser-window
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html'); // loads the index.html file into the window. Returns Promise<void> which will resolve when page finished loading. 
}

// app module calls the createWindow function when the app is ready
app.whenReady().then(()=> {
  createWindow();

  // if all windows are closed, create a new window
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

