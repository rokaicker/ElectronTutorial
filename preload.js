const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  // we can also expose variables, not just functions
  ping: () => ipcRenderer.invoke('ping'), // note how we wrap ipcRenderer inside of a helper function, this is for security purposes ( we don't want to expose entirety of ipcRenerer module via context bridge)
})
