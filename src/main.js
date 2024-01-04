const { app, BrowserWindow, Menu, ipcMain, Notification, shell, Tray } = require('electron');
const path = require('path');

require("electron-reload")(__dirname)
app.setAppUserModelId("Zaasgobas")
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}



const menuItems = [
  {
    label: "App",
    submenu: [
      {
        label: "Exit Zaasgobas",
        click: () => {
          app.exit();
        }
      },
      {
        role: "minimize"
      }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "I need help",
        click: async () => {
          await shell.openExternal('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
        }
      }
    ]
  }
]

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu)

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 630,
    maxWidth: 630,
    height: 550,
    icon: path.join(__dirname, '/img/exclamation.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      backgroundThrottling: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();



  // and load the index.html of the app.

  const overlayWin = new BrowserWindow({
    width:200,
    height:70,
    maxHeight:280, minHeight:70,
    maxWidth:400, minWidth:200,
    show: false,
    frame: false,
    autoHideMenuBar: true,
    resizable: false,
    icon: path.join(__dirname, '/img/exclamation.png'),
    webPreferences: {
      preload: path.join(__dirname, 'overlayPreload.js'),
      nodeIntegration: true,
      backgroundThrottling: false,
    },
    transparent: true,
    alwaysOnTop: true,
  });



  mainWindow.on('close', (e) => {
    e.preventDefault()
    mainWindow.hide()
  });


  overlayWin.loadFile(path.join(__dirname, 'overlay.html'));
  // overlayWin.webContents.openDevTools();


  // TRAY 
  let tray = null
  tray = new Tray(`${path.join(__dirname, '/img/exclamation.png')}`)
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "Exit Zaasgobas",
      click() {
        app.exit();
      }
    }
  ])
  tray.setToolTip('mafiou ilé pd')
  tray.setContextMenu(contextMenu)

  tray.on('double-click', () => {
    mainWindow.show();
    
  })

  const isVisible = false;
  ipcMain.on('is-visible', (event, data) => {
    isVisible = data.isVisible;
  })

  ipcMain.on('close-app', () => {
    tray.destroy();
    app.exit()
  });

  ipcMain.on('close-overlay', (event, clicked) => {
    overlayWin.hide();
    mainWindow.restore();
  })

  ipcMain.on('submit-overlay', (event, data) => {
    overlayWin.setAlwaysOnTop(true);
    const dataClone = {...data};
    console.log("dataClone : " + dataClone);
    overlayWin.webContents.send('set-overlay', dataClone);
    var numberOfTrue = 0;
    let option = [data.asgo, data.ic, data.lod];
    option.forEach(item => {
      if (item == true) numberOfTrue++;
    })

    switch (numberOfTrue) {
      case (0) : overlayWin.setBounds({ height: 0, width: 0}), overlayWin.hide(); break;
      case (1) : overlayWin.setBounds({ height: 70}), overlayWin.show(); break;
      case (2) : overlayWin.setBounds({ height: 140}), overlayWin.show(); break;
      case (3) : overlayWin.setBounds({ height: 210}), overlayWin.show(); break;
      case (4) : overlayWin.setBounds({ height: 280}), overlayWin.show(); break;
      case (5) : overlayWin.setBounds({ height: 280}), overlayWin.show(); break;
      case (6) : overlayWin.setBounds({ height: 280}), overlayWin.show(); break;
    }
    mainWindow.minimize();
  })

  function showNotification (eventName, timeBefore) {
    let notification = new Notification({
      silent: true,
      toastXml: `
          <toast launch="myapp:action=navigate&amp;contentId=351" activationType="protocol">
          <audio silent="true" />
              <visual>
                  <binding template="ToastGeneric">
                      <image id="1" src="${path.join(__dirname, '/img/' + eventName + '.png')}" alt="img" placement="appLogoOverride"/>
                      <text>${timeBefore + " minutes before " + eventName + " starts, get ready !"}</text>
                  </binding>
              </visual>
          </toast>`
    }, )
    try {
      notification.show();
      setTimeout(function () { notification.close(); }, 60000);
    } catch (error) {
      console.log(error);
    }
  }

  function beneNotif (eventName) {
    let notification = new Notification({
      silent: true,
      toastXml: `
          <toast launch="myapp:action=navigate&amp;contentId=351" activationType="protocol">
          <audio silent="true" />
              <visual>
                  <binding template="ToastGeneric">
                      <image id="1" src="${path.join(__dirname, '/img/' + eventName + '.png')}" alt="img" placement="appLogoOverride"/>
                      <text>Your benediction of anceollan is over !</text>
                  </binding>
              </visual>
          </toast>`
    }, )
    try {
      notification.show();
      setTimeout(function () { notification.close(); }, 60000);
    } catch (error) {
      console.log(error);
    }
  }

  ipcMain.on('notif-alert', (event, data) => {
    showNotification(data.img, data.time)

    const sound = require("sound-play");
    sound.play(`${path.join(__dirname, '/sounds/ic_sound.mp3')}`);
  })

  ipcMain.on('bene-notif', () => {
    const bene = "ancel"
    beneNotif(bene);

    const sound = require("sound-play");
    sound.play(`${path.join(__dirname, '/sounds/notif.mp3')}`);
  } )


};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.hide();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
