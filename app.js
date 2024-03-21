const { BrowserWindow, Menu, dialog, ipcMain, app } = require('electron');

// When the Electron application is ready to create windows
app.on('ready', () => {
    console.log("Application is ready!");

    // Create a new browser window for the application
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 605,
        resizable: false,
        webPreferences: {
            nodeIntegration: true, // default false
            contextIsolation: false // default true
        }
    });

    // Load the HTML file into the main window
    mainWindow.loadFile('testIndex.html');

    // Define the customized menu template for the application
    const template = [
        {
            label: 'Electron',
            submenu: [
                {
                    label: 'About ...',
                    click: () => {
                        console.log('About Clicked');
                    }
                }
            ]
        },
        {
            label: 'File',
            submenu: [
                {
                    label: 'Video',
                    submenu: [
                        {
                            label: 'Load...',
                            accelerator: 'CmdOrCtrl+L',
                            click: loadVideoFile
                        },
                        { type: 'separator' },
                        {
                            label: 'Option 1',
                            click: () => {
                                console.log('Option 1 clicked');
                            }
                        },
                        {
                            label: 'Option 2',
                            click: () => {
                                console.log('Option 2 clicked');
                            }
                        },
                        {
                            label: 'Option 3',
                            click: () => {
                                console.log('Option 3 clicked');
                            }
                        },
                        { type: 'separator' },
                        {
                            label: 'Convert to AVI',
                            accelerator: 'CmdOrCtrl+A',
                            click:  () => {
                                console.log('Convert to AVI clicked');
                            }
                        }
                    ]
                },
                // Add a separator between menu items
                { type: 'separator' },
                {
                    label: 'Quit',
                    accelerator: 'CmdOrCtrl+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Developer',
            submenu: [
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'CmdOrCtrl+Shift+I',
                    click: () => {
                        mainWindow.webContents.toggleDevTools();
                    }
                }
            ]
        }
    ];

    // Build the application menu from the template
    const menu = Menu.buildFromTemplate(template);

    // Set the application menu to the menu built from the template
    Menu.setApplicationMenu(menu);
});

// Functionality for loading a video file
function loadVideoFile() {
    // Open a file dialog to select a video file
    dialog.showOpenDialog(mainWindow, {
        filters: [{ name: 'Videos', extensions: ['mp4', 'avi', 'mkv', 'mov'] }],
        properties: ['openFile']
    }).then(result => {
        if (!result.canceled) {
            mainWindow.webContents.send('selected-file', result.filePaths[0]);
        }
    }).catch(err => {
        console.log(err);
    });
}

// Event listener for opening the file dialog
ipcMain.on('open-file-dialog', (event) => {
    loadVideoFile();
});

// Quit the application when all windows are closed
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
