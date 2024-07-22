import { app, BrowserWindow } from 'electron'
import serve from 'electron-serve'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// Define __filename and __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const appServe = app.isPackaged ? serve({
   directory: join(__dirname, '../out'),
}) : null

const createWindow = () => {
   const win = new BrowserWindow({
      width: 1080,
      height: 720,
      maximizable: true,
      webPreferences: {
         preload: join(__dirname, 'preload.js'),
         nodeIntegration: true,
      },
   })

   win.maximize()
   win.show()

   if (app.isPackaged) {
      appServe(win).then(() => {
         win.loadURL('app://-')
      })
   } else {
      win.loadURL('http://localhost:3000')
      win.webContents.openDevTools()
      win.webContents.on('did-fail-load', (e, code, desc) => {
         win.webContents.reloadIgnoringCache()
      })
   }
}

app.on('ready', () => {
   createWindow()
})

app.on('window-all-closed', () => {
   app.quit()
})